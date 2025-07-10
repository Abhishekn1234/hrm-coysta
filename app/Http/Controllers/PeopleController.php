<?php



namespace App\Http\Controllers;

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
            'salutation' => 'nullable',
            'staff_type' => 'nullable|in:Monthly,Daily',
            'parent_mobile' => 'nullable|string|max:20',
            'work_phone' => 'nullable|string|max:50',
            'personal_email' => 'nullable|string|max:255',
            'emergency_contact_1' => 'nullable|string|max:20',
            'emergency_contact_2' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'info_date' => 'nullable|date',
            'info_title' => 'nullable|string|max:255',
            'info_description' => 'nullable|string',
            'bank_document_date' => 'nullable|date',
            'bank_document_title' => 'nullable|string|max:255',
            'bank_document_description' => 'nullable|string',
        ]);

        $user = new User($validated);
        $user->user_type = 'STAFF';

        // File uploads
        $user->aadhar_front = $this->storeFile($request, 'aadhar_front');
        $user->aadhar_back = $this->storeFile($request, 'aadhar_back');
        $user->driving_license_front = $this->storeFile($request, 'driving_license_front');
        $user->driving_license_back = $this->storeFile($request, 'driving_license_back');
        $user->photo = $this->storeFile($request, 'photo');
        $user->passport_size_photo = $this->storeFile($request, 'passport_size_photo');
        $user->pan_card = $this->storeFile($request, 'pan_card');
        $user->passport_front = $this->storeFile($request, 'passport_front');
        $user->passport_back = $this->storeFile($request, 'passport_back');
        $user->pf_document = $this->storeFile($request, 'pf_document');
        $user->esi_document = $this->storeFile($request, 'esi_document');
        $user->bank_document_file = $this->storeFile($request, 'bank_document_file');

        $user->name = $user->first_name . ' ' . $user->last_name;
        $user->save();

        return response()->json(['message' => 'Staff added successfully', 'data' => $user]);

    } catch (\Illuminate\Validation\ValidationException $e) {
        // Log validation errors
        Log::error('Validation failed during staff store', ['errors' => $e->errors()]);
        return response()->json([
            'message' => 'Validation error',
            'errors' => $e->errors()
        ], 422);

    } catch (\Exception $e) {
        // Log general errors
        Log::error('Error storing staff: ' . $e->getMessage(), ['stack' => $e->getTraceAsString()]);
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
        // ... same validation as store
    ]);

    $user->fill($validated);

    // Update file fields if new files uploaded
    foreach ([
        'aadhar_front', 'aadhar_back', 'driving_license_front', 'driving_license_back',
        'photo', 'passport_size_photo', 'pan_card', 'passport_front', 'passport_back',
        'pf_document', 'esi_document', 'bank_document_file'
    ] as $field) {
        if ($request->hasFile($field)) {
            $user->$field = $this->storeFile($request, $field);
        }
    }

    $user->name = $user->first_name . ' ' . $user->last_name;
    $user->save();

    return response()->json(['message' => 'Staff updated successfully', 'data' => $user]);
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
private function storeFile(Request $request, string $key): ?string
{
    if ($request->hasFile($key)) {
        $file = $request->file($key);
        $filename = time() . '_' . $file->getClientOriginalName();
        return $file->storeAs('uploads/staff_documents', $filename, 'public');
    }
    return null;
}


}
