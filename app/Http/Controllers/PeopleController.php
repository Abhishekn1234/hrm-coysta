<?php



namespace App\Http\Controllers;
use App\Models\Customer;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\LeaveRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\EmploymentHistory;
use App\Models\EmployeeDocument;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
class PeopleController extends Controller
{
    public function assignTask(Request $request, $id)
{
    $request->validate([
        'task_name' => 'required|string|max:255',
        'task_description' => 'nullable|string',
        'deadline' => 'required|date',
        'project_name' => 'nullable|string|max:255',
        'customer' => 'nullable|string|max:255',
        'project_value' => 'nullable|numeric',
        'project_status' => 'nullable|in:In Progress,Completed,Pending',
    ]);

    $user = Customer::findOrFail($id);

    $task = $user->tasks()->create([
        'task_name' => $request->task_name,
        'task_description' => $request->task_description,
        'deadline' => $request->deadline,
        'assigned_by' => auth()->id() ?? null,
        'project_name' => $request->project_name,
        'customer' => $request->customer,
        'project_value' => $request->project_value,
        'project_status' => $request->project_status,
    ]);

    return response()->json([
        'message' => 'Task with project assigned successfully',
        'task' => $task,
    ]);
}
// ✅ GET: Show all tasks assigned to a specific customer
public function customerTasks($id)
{
    $customer = Customer::with('tasks')->findOrFail($id);

    return response()->json([
        'customer' => $customer->display_name,
        'tasks' => $customer->tasks
    ]);
}
public function UserTasks($id)
{
    $customer = User::with('tasks')->findOrFail($id);

    return response()->json([
        'customer' => $customer->display_name,
        'tasks' => $customer->tasks
    ]);
}

    public function getCounts()
    {
        $total = User::where('user_type', 'STAFF')->count();

        $active = User::where('user_type', 'STAFF')
            ->where('status', 1) // assuming 1 means active
            ->count();

        $inactive = User::where('user_type', 'STAFF')
            ->where(function ($query) {
                $query->where('status', 0)->orWhereNull('status');
            })
            ->count();

        return response()->json([
            'total_staff' => $total,
            'active_staff' => $active,
            'inactive_staff' => $inactive
        ]);
    }

    // Get monthly count of staff (based on join_date)
    public function getMonthlyStaffCounts()
    {
        $monthlyCounts = User::select(
                DB::raw("DATE_FORMAT(join_date, '%Y-%m') as month"),
                DB::raw("COUNT(*) as count")
            )
            ->where('user_type', 'STAFF')
            ->whereNotNull('join_date')
            ->groupBy('month')
            ->orderBy('month', 'asc')
            ->get();

        return response()->json($monthlyCounts);
    }

    public function getAllStaff()
{
    $staff = User::where('user_type', 'STAFF')->get();
    return response()->json($staff);
}

// Get a specific staff user by ID
public function getStaffById($id)
{
    $staff = \App\Models\User::with([
        'leaveRequests',
        'departmentInfo' // optional, for department name
    ])->where('user_type', 'STAFF')->find($id);

    if (!$staff) {
        return response()->json(['message' => 'Staff not found'], 404);
    }

    return response()->json($staff);
}


public function store(Request $request)
{
    try {
        // ✅ Validation for all expected fields
        $validated = $request->validate([
            // Basic Info
            'salutation' => 'nullable|string|max:10',
            'first_name' => 'required|string|max:191',
            'last_name' => 'required|string|max:191',
            'designation' => 'required|string|max:250',
            'status' => 'nullable|integer',
            'date_of_birth' => 'nullable|date',
            'blood_group' => 'nullable|string|max:5',
            'join_date' => 'nullable|date',
            'nature_of_staff' => 'nullable|in:Probation,Permanent,Contract',
            'staff_type' => 'nullable|in:Monthly,Daily',
            'user_type' => 'required|in:STAFF',
            'experience' => 'nullable|string|max:255',
            'qualification' => 'nullable|string|max:250',
            'organization' => 'nullable|string|max:255',

            // Contact Info
            'phone' => 'required|string|max:250',
            'work_phone' => 'nullable|string|max:50',
            'email' => 'nullable|string|email|max:255',
            'personal_email' => 'nullable|string|email|max:255',
            'emergency_contact_1' => 'nullable|string|max:20',
            'emergency_contact_2' => 'nullable|string|max:20',
            'parent_mobile' => 'nullable|string|max:20',
            'address' => 'nullable|string',

            // Financial Info
            'daily_remuneration' => 'nullable|numeric',
            'rent_allowance_percent' => 'nullable|numeric',
            'casual_leaves' => 'nullable|integer',
            'esi_card_no' => 'nullable|string|max:100',
            'pf_no' => 'nullable|string|max:100',
            'covid_vaccinated' => 'nullable|boolean',

            // Optional Info
            'skills' => 'nullable|string',
            'bank_document_date' => 'nullable|date',
            'bank_document_title' => 'nullable|string|max:255',
            'bank_document_description' => 'nullable|string',

            // Previous Employment
            'position' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:191',
            'previous_company' => 'nullable|string|max:255',
            'previous_position' => 'nullable|string|max:255',
            'previous_responsibilities' => 'nullable|string',

            // Login
            'login_enabled' => 'nullable|boolean',
        ]);

        // ✅ Create the user object
        $user = new User($validated);

        // Set default user_type and full name
        $user->user_type = 'STAFF';
        $user->name = $user->first_name . ' ' . $user->last_name;

        // ✅ Handle login toggle
        $user->isLogin = $request->input('login_enabled', 0);

        // ✅ Handle file uploads
        $uploadFields = [
            'resume',
            'aadhar_front',
            'aadhar_back',
            'driving_license_front',
            'driving_license_back',
            'photo',
            'passport_size_photo',
            'pan_card',
            'passport_front',
            'passport_back',
            'pf_document',
            'esi_document',
            'employment_contract',
            'bank_document_file',
        ];

        foreach ($uploadFields as $field) {
            $user->$field = $this->storeFile($request, $field);
        }

        // ✅ Save user
        $user->save();

        return response()->json([
            'message' => 'Staff added successfully',
            'data' => $user
        ]);

    } catch (\Illuminate\Validation\ValidationException $e) {
        \Log::error('Validation failed during staff store', ['errors' => $e->errors()]);
        return response()->json([
            'message' => 'Validation error',
            'errors' => $e->errors()
        ], 422);

    } catch (\Exception $e) {
        \Log::error('Error storing staff: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
        return response()->json([
            'message' => 'Something went wrong while saving staff.',
            'error' => $e->getMessage()
        ], 500);
    }
}

public function update(Request $request, $id)
{
    $user = User::where('id', $id)->where('user_type', 'STAFF')->firstOrFail();

    $validated = $request->validate([
        'first_name' => 'required|string|max:191',
        'last_name' => 'required|string|max:191',
        'phone' => 'required|string|max:250',
        'user_type' => 'required|in:STAFF',
        'designation' => 'required|string|max:250',
        'status' => 'nullable|integer',
        'date_of_birth' => 'nullable|date',
        'blood_group' => 'nullable|string|max:5',
        'join_date' => 'nullable|date',
        'nature_of_staff' => 'nullable|in:Probation,Permanent,Contract',
        'daily_remuneration' => 'nullable|numeric',
        'rent_allowance_percent' => 'nullable|numeric',
        'casual_leaves' => 'nullable|integer',
        'esi_card_no' => 'nullable|string|max:100',
        'pf_no' => 'nullable|string|max:100',
        'covid_vaccinated' => 'nullable|boolean',
        'skills' => 'nullable|string',
        'qualification' => 'nullable|string|max:250',
        'experience' => 'nullable|string',
        'salutation' => 'nullable|string',
        'staff_type' => 'nullable|in:Monthly,Daily',
        'parent_mobile' => 'nullable|string|max:20',
        'work_phone' => 'nullable|string|max:50',
        'personal_email' => 'nullable|string|max:255',
        'email' => 'nullable|string|email|max:255',
        'emergency_contact_1' => 'nullable|string|max:20',
        'emergency_contact_2' => 'nullable|string|max:20',
        'address' => 'nullable|string',
        'info_date' => 'nullable|date',
        'info_title' => 'nullable|string|max:255',
        'info_description' => 'nullable|string',
        'bank_document_date' => 'nullable|date',
        'bank_document_title' => 'nullable|string|max:255',
        'bank_document_description' => 'nullable|string',
        'organization' => 'nullable|string',
        'isLogin' => 'nullable|boolean',
        'department' => 'nullable|string|max:191',
    ]);

    $user->fill($validated);

    // Force user_type
    $user->user_type = 'STAFF';

    // Full name
    $user->name = $user->first_name . ' ' . $user->last_name;

    // Optional flags
    $user->isLogin = $request->input('isLogin', 0);

    // Optional file uploads
    $user->resume = $this->storeFile($request, 'resume', $user->resume);
    $user->aadhar_front = $this->storeFile($request, 'aadhar_front', $user->aadhar_front);
    $user->aadhar_back = $this->storeFile($request, 'aadhar_back', $user->aadhar_back);
    $user->driving_license_front = $this->storeFile($request, 'driving_license_front', $user->driving_license_front);
    $user->driving_license_back = $this->storeFile($request, 'driving_license_back', $user->driving_license_back);
    $user->photo = $this->storeFile($request, 'photo', $user->photo);
    $user->passport_size_photo = $this->storeFile($request, 'passport_size_photo', $user->passport_size_photo);
    $user->pan_card = $this->storeFile($request, 'pan_card', $user->pan_card);
    $user->passport_front = $this->storeFile($request, 'passport_front', $user->passport_front);
    $user->passport_back = $this->storeFile($request, 'passport_back', $user->passport_back);
    $user->pf_document = $this->storeFile($request, 'pf_document', $user->pf_document);
    $user->esi_document = $this->storeFile($request, 'esi_document', $user->esi_document);
    $user->employment_contract = $this->storeFile($request, 'employment_contract', $user->employment_contract);
    $user->bank_document_file = $this->storeFile($request, 'bank_document_file', $user->bank_document_file);

    $user->save();

    return response()->json([
        'message' => 'Staff updated successfully',
        'data' => $user
    ]);
}

public function destroy($id)
{
    $user = User::where('id', $id)->where('user_type', 'STAFF')->first();

    if (!$user) {
        return response()->json(['message' => 'Staff not found'], 404);
    }

    $user->delete();

    return response()->json(['message' => 'Staff deleted successfully']);
}


public function assignTaskToCustomer(Request $request, $customerId)
{
    $request->validate([
        'user_id' => 'required|exists:users,id',
        'task_name' => 'required|string|max:255',
        'task_description' => 'nullable|string',
        'deadline' => 'required|date',
        'project_value' => 'nullable|numeric',
        'project_status' => 'nullable|in:In Progress,Completed,Pending',
    ]);

    $customer = User::findOrFail($customerId);

    $now = Carbon::now();
    $deadline = Carbon::parse($request->deadline);

    // ✅ Calculate time difference
    $diff = $now->diff($deadline);

    // ✅ Build duration string like "6 days 3 hours 15 minutes"
    $parts = [];
    if ($diff->d > 0) {
        $parts[] = $diff->d . ' day' . ($diff->d > 1 ? 's' : '');
    }
    if ($diff->h > 0) {
        $parts[] = $diff->h . ' hour' . ($diff->h > 1 ? 's' : '');
    }
    if ($diff->i > 0) {
        $parts[] = $diff->i . ' minute' . ($diff->i > 1 ? 's' : '');
    }
    if (empty($parts)) {
        $parts[] = 'less than 1 minute';
    }

    $detailedDuration = implode(' ', $parts);

    // ✅ Store task
    $task = $customer->tasks()->create([
        'user_id' => $request->user_id,
        'task_name' => $request->task_name,
        'task_description' => $request->task_description,
        'deadline' => $request->deadline,
        'assigned_by' => auth()->id() ?? null,
        'project_name' => $request->project_name,
        'project_value' => $request->project_value,
        'project_status' => $request->project_status,
        'duration' => $detailedDuration, // Store readable string
    ]);

    return response()->json([
        'message' => 'Task assigned to customer successfully',
        'task' => $task,
        'duration_detailed' => $detailedDuration
    ]);
}
protected function storeFile(Request $request, $field)
{
    if ($request->hasFile($field)) {
        return $request->file($field)->store('uploads/staff', 'public');
    }
    return null;
}





}
