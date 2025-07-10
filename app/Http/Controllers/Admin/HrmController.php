<?php

namespace App\Http\Controllers\Admin;
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

class HrmController extends Controller
{
    // 1️⃣ Create a new employee with optional files
    public function storePersonalDetails(Request $request)
    {
        $validated = $request->validate([
            // Personal Info
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:20',
            'dob' => 'required|date',
            'gender' => 'required|string|max:50',
            'address' => 'required|string|max:255',
            'place' => 'nullable|string|max:250',
            'qualification' => 'nullable|string|max:250',
            'experience' => 'nullable|string|max:250',
            'expertise' => 'nullable|string|max:250',
            'hourlyRate' => 'nullable|string|max:250',
            'monthlyRate' => 'nullable|string|max:250',
            'annualCTC' => 'nullable|string|max:250',
            'probationPeriod' => 'nullable|string|max:250',
            'joinType' => 'nullable|in:DIRECT,CANDIDATE',
            'image' => 'nullable|string|max:250',

            // Emergency Contact
            'emergencyContactName' => 'required|string|max:255',
            'emergencyContactRelationship' => 'required|string|max:255',
            'emergencyContactPhone' => 'required|string|max:20',
            'emergencyContactEmail' => 'nullable|email|max:255',

            // Employment
            'position' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'employmentType' => 'required|in:FULL_TIME,PARTIAL',
            'hireDate' => 'required|date',
            'reportingManager' => 'required|string|max:255',
            'workLocation' => 'required|string|max:255',

            // Salary
            'baseSalary' => 'required|numeric',
            'payFrequency' => 'required|string|in:Monthly,Bi-weekly,Weekly',
            'housingAllowance' => 'nullable|numeric',
            'transportAllowance' => 'nullable|numeric',
            'medicalAllowance' => 'nullable|numeric',
            'otherAllowances' => 'nullable|numeric',
              'documentsAuthentic'=>'nullable|boolean',
            // Bank
            'bankName' => 'required|string|max:255',
            'routingNumber' => 'nullable|string|max:255',
            'paymentMethod' => 'nullable|string|max:255',
            'accountNumber' => 'nullable|string|max:255',

            // Documents
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
            'idProof' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'employmentContract' => 'nullable|file|mimes:pdf,doc,docx|max:5120',
            'medicalCertificate' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
            'educationCertificates' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',

            // Employment History
            'positions' => 'nullable|array',
            'positions.*.previousCompany' => 'required_with:positions|string|max:255',
            'positions.*.previousStartDate' => 'required_with:positions|date',
            'positions.*.previousEndDate' => 'required_with:positions|date',
            'positions.*.previousPosition' => 'required_with:positions|string|max:255',
            'positions.*.previousResponsibilities' => 'nullable|string',
        ]);

        try {
            // Store uploaded files
            $resumePath = $request->file('resume')?->store('resumes', 'public');
            $idProofPath = $request->file('idProof')?->store('id_proofs', 'public');
            $contractPath = $request->file('employmentContract')?->store('contracts', 'public');
            $medCertPath = $request->file('medicalCertificate')?->store('medical_certificates', 'public');
            $eduCertPath = $request->file('educationCertificates')?->store('education_certificates', 'public');

            // Create User
            $user = User::create([
                'user_type' => 'STAFF',
                'first_name' => $validated['firstName'],
                'last_name' => $validated['lastName'],
                'name' => $validated['firstName'] . ' ' . $validated['lastName'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'date_of_birth' => $validated['dob'],
                'gender' => $validated['gender'],
                'address' => $validated['address'],
                'place' => $validated['place'] ?? null,
                'qualification' => $validated['qualification'] ?? null,
                'experience' => $validated['experience'] ?? null,
                'expertise' => $validated['expertise'] ?? null,
                'hourly_rate' => $validated['hourlyRate'] ?? null,
                'monthly_rate' => $validated['monthlyRate'] ?? null,
                'annual_ctc' => $validated['annualCTC'] ?? null,
                'probation_period' => $validated['probationPeriod'] ?? null,
                'join_type' => $validated['joinType'] ?? 'DIRECT',
                'image' => $validated['image'] ?? null,

                'emergency_contact_name' => $validated['emergencyContactName'],
                'emergency_contact_relationship' => $validated['emergencyContactRelationship'],
                'emergency_contact_phone' => $validated['emergencyContactPhone'],
                'emergency_contact_email' => $validated['emergencyContactEmail'] ?? null,

                'designation' => $validated['position'],
                'position' => $validated['position'],
                'department' => $validated['department'],
                'employment_type' => $validated['employmentType'],
                'hire_date' => $validated['hireDate'],
                'join_date' => $validated['hireDate'],
                'reporting_manager' => $validated['reportingManager'],
                'work_location' => $validated['workLocation'],
                'status' => 1,

                'base_salary' => $validated['baseSalary'],
                'basic_salary' => $validated['baseSalary'],
                'pay_frequency' => $validated['payFrequency'],
                'hra' => $validated['housingAllowance'] ?? 0,
                'transport_allowance' => $validated['transportAllowance'] ?? 0,
                'medical_allowance' => $validated['medicalAllowance'] ?? 0,
                'special_allowances' => $validated['otherAllowances'] ?? 0,
                  'housing_allowance' => $validated['housingAllowance'] ?? 0,
                  'other_allowances'=>$validated['otherAllowances'] ?? 0,
                'bank_name' => $validated['bankName'],
                'account_number' => $validated['accountNumber'] ?? null,
                'routing_number' => $validated['routingNumber'] ?? null,
                'payment_method' => $validated['paymentMethod'] ?? null,

                'resume' => $resumePath,
                'id_proof' => $idProofPath,
                'employment_contract' => $contractPath,
                'medical_certificate' => $medCertPath,
                'education_certificates' => $eduCertPath,
                'documents_authentic'=>$validated['documentsAuthentic']
            ]);

            // Save Employment History
            if (!empty($validated['positions'])) {
                foreach ($validated['positions'] as $position) {
                    EmploymentHistory::create([
                        'user_id' => $user->id,
                        'previous_company' => $position['previousCompany'],
                        'previous_start_date' => $position['previousStartDate'],
                        'previous_end_date' => $position['previousEndDate'],
                        'previous_position' => $position['previousPosition'],
                        'previous_responsibilities' => $position['previousResponsibilities'] ?? null,
                    ]);
                }
            }

            return response()->json([
                'message' => 'Employee created successfully',
                'user' => $user,
            ], 201);

        } catch (\Exception $error) {
            \Log::error('Error in storePersonalDetails: ' . $error->getMessage());
            return response()->json([
                'message' => 'Error creating employee',
                'error' => $error->getMessage()
            ], 500);
        }
    }

    // 2️⃣ Upload Document
    public function uploadDocument(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:5120',
        ]);

        try {
            $user = User::findOrFail($id);

            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $fileName = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('documents/' . $user->id, $fileName, 'public');

                $document = EmployeeDocument::create([
                    'user_id' => $user->id,
                    'title' => $request->input('title'),
                    'file_path' => $path,
                    'file_type' => $file->getClientOriginalExtension(),
                ]);

                return response()->json([
                    'message' => 'Document uploaded successfully',
                    'document' => $document,
                    'url' => asset('storage/' . $path),
                ], 200);
            }

            return response()->json(['message' => 'No file uploaded'], 400);
        } catch (\Exception $e) {
            \Log::error('Upload Document Error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Upload failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // 3️⃣ Get documents for a user
  public function getDocuments($id)
{
    try {
        $user = User::findOrFail($id);

        $fileFields = [
            'resume',
            'id_proof',
            'employment_contract',
            'medical_certificate',
            'education_certificates',
            'created_at'
        ];

        $documents = [];

        foreach ($fileFields as $field) {
            $documents[$field] = $user->$field
                ? asset('storage/' . ltrim($user->$field, '/')) // Avoid double slashes
                : null;
        }

        // Add flags
        $documents['documents_authentic'] = (bool) $user->documents_authentic;
        $documents['suspend'] = (bool) $user->suspend;
        $documents['signed_date']=$user->created_at;
        $documents['verified_date']=$user->verified_at;
        return response()->json(['data' => $documents]);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to fetch documents',
            'error' => $e->getMessage()
        ], 500);
    }
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

    // 4️⃣ Get all employees
  

public function getEmployees(Request $request)
{
    try {
        $month = $request->query('month'); // optional: format YYYY-MM
        $monthDate = $month ? Carbon::parse($month . '-01') : now();
        $year = $monthDate->year;
        $monthNum = $monthDate->month;

        // Calculate total working days (excluding Sundays)
        $totalWorkingDays = collect(range(1, $monthDate->daysInMonth))->filter(function ($day) use ($monthDate) {
            $date = Carbon::create($monthDate->year, $monthDate->month, $day);
            return !$date->isSunday();
        })->count();

        $employees = User::with('departmentRelation')
            ->where('user_type', 'STAFF')
            ->orderByDesc('id')
            ->get();

        $results = [];

        foreach ($employees as $emp) {
            $leaves = LeaveRequest::where('employee_id', $emp->id)
                ->whereMonth('from_date', $monthNum)
                ->whereYear('from_date', $year)
                ->get();

            $totalDaysTaken = 0;

            foreach ($leaves as $leave) {
                $start = Carbon::parse($leave->from_date);
                $end = Carbon::parse($leave->to_date);
                $days = $start->diffInDaysFiltered(function (Carbon $date) {
                    return !$date->isSunday();
                }, $end->copy()->addDay());

                $totalDaysTaken += $days;
            }

            $results[] = [
                'id' => $emp->id,
                'first_name' => $emp->first_name,
                'last_name' => $emp->last_name,
                'emp_code' => $emp->emp_code ?? 'EMP' . $emp->id,
                'department_relation' => $emp->departmentRelation,
                'position' => $emp->position,
                'status' => $emp->status,
                'daily_hours' => $emp->daily_hours,
                'monthly_hours' => $emp->monthly_hours,
                'leave_days' => $totalDaysTaken,
                'leaves_taken' => $totalDaysTaken,
                'total_leaves' => $totalWorkingDays,
                'base_salary' => $emp->base_salary,
                'email' => $emp->email,
                'phone' => $emp->phone,
                // other fields as needed...
            ];
        }

        return response()->json([
            'status' => 'success',
            'data' => $results
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to fetch employees with leave stats',
            'error' => $e->getMessage()
        ], 500);
    }
}



public function getEmployeeLeaveStats(Request $request)
{
    try {
        $month = $request->query('month') ?? now()->format('Y-m'); // default: current month

        $startOfMonth = Carbon::parse($month)->startOfMonth();
        $endOfMonth = Carbon::parse($month)->endOfMonth();

        $employees = User::where('user_type', 'STAFF')->with(['leaveRequests' => function ($q) use ($startOfMonth, $endOfMonth) {
            $q->whereBetween('from_date', [$startOfMonth, $endOfMonth])
              ->orWhereBetween('to_date', [$startOfMonth, $endOfMonth]);
        }])->get();

        $results = [];

        foreach ($employees as $emp) {
            $totalDaysTaken = 0;

            foreach ($emp->leaveRequests as $leave) {
                $from = Carbon::parse($leave->from_date);
                $to = Carbon::parse($leave->to_date);

                $days = 0;
                while ($from->lte($to)) {
                    if (!$from->isSunday()) {
                        $days++;
                    }
                    $from->addDay();
                }

                $totalDaysTaken += $days;
            }

            $totalWorkingDays = 0;
            $dateCursor = $startOfMonth->copy();
            while ($dateCursor->lte($endOfMonth)) {
                if (!$dateCursor->isSunday()) {
                    $totalWorkingDays++;
                }
                $dateCursor->addDay();
            }

            $results[] = [
                'employee_id' => $emp->id,
                'employee_name' => $emp->name,
                'total_leaves_taken' => $totalDaysTaken,
                'working_days' => $totalWorkingDays,
                'leave_percentage' => round(($totalDaysTaken / $totalWorkingDays) * 100, 2) . '%'
            ];
        }

        return response()->json([
            'status' => 'success',
            'data' => $results
        ]);

    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to fetch leave stats',
            'error' => $e->getMessage()
        ], 500);
    }
}
    public function getEmployeeById($id)
{
    try {
        $user = User::where('user_type', 'STAFF')->findOrFail($id);

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'employee_code' => $user->employee_code ?? 'EMP' . $user->id,
            'email' => $user->email,
            'phone' => $user->phone,
            'position' => $user->position,
            'department' => $user->department,
            'hire_date' => $user->hire_date,
            // Add more fields as needed
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Employee not found',
            'error' => $e->getMessage(),
        ], 404);
    }
}
public function employeeStats()
{
    $now = Carbon::now();
    $startOfThisMonth = $now->copy()->startOfMonth();
    $startOfLastMonth = $now->copy()->subMonth()->startOfMonth();
    $endOfLastMonth = $now->copy()->subMonth()->endOfMonth();

    $startOfWeek = $now->copy()->startOfWeek(Carbon::MONDAY);
    $endOfWeek = $now->copy()->endOfWeek(Carbon::SUNDAY);

    // ✅ Basic user stats
    $totalUsers = User::count();
    $totalActiveUsers = User::where('status', 1)->count();
    $newUsersThisMonth = User::whereBetween('created_at', [$startOfThisMonth, $now])->count();
    $newUsersLastMonth = User::whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();
    $userGrowth = $newUsersThisMonth - $newUsersLastMonth;
    $activeUsersThisMonth = User::where('status', 1)->whereBetween('created_at', [$startOfThisMonth, $now])->count();
    $activeUsersLastMonth = User::where('status', 1)->whereBetween('created_at', [$startOfLastMonth, $endOfLastMonth])->count();
    $activeGrowth = $activeUsersThisMonth - $activeUsersLastMonth;

    // ✅ Leave requests stats
    $totalLeavesThisMonth = LeaveRequest::whereMonth('from_date', $now->month)
        ->whereYear('from_date', $now->year)
        ->count();

    $approvedLeavesThisMonth = LeaveRequest::where('status', 'APPROVED')
        ->whereMonth('from_date', $now->month)
        ->whereYear('from_date', $now->year)
        ->count();

    $pendingLeavesThisMonth = LeaveRequest::where('status', 'PENDING')
        ->whereMonth('from_date', $now->month)
        ->whereYear('from_date', $now->year)
        ->count();

    $rejectedLeavesThisMonth = LeaveRequest::where('status', 'REJECTED')
        ->whereMonth('from_date', $now->month)
        ->whereYear('from_date', $now->year)
        ->count();
                // 👇 Get ENUM values for 'position'
           $column = DB::select("SHOW COLUMNS FROM users WHERE Field = 'position'")[0]->Type;
            preg_match('/enum\((.*)\)/', $column, $matches);
            $allPositions = array_map(fn($v) => trim($v, "'"), explode(',', $matches[1]));

            $filledPositions = User::whereNotNull('position')->distinct()->pluck('position')->toArray();
            $openPositions = array_diff($allPositions, $filledPositions);

    // ✅ Users expected to return this week
    $returningThisWeek = LeaveRequest::whereBetween('to_date', [$startOfWeek, $endOfWeek])
        ->where('status', 'APPROVED')
        ->distinct('employee_id')
        ->count('employee_id');

    return response()->json([
        'total_users' => $totalUsers,
        'active_users' => $totalActiveUsers,
        'new_users_this_month' => $newUsersThisMonth,
        'new_users_last_month' => $newUsersLastMonth,
        'user_growth' => $userGrowth,
        'active_users_this_month' => $activeUsersThisMonth,
        'active_users_last_month' => $activeUsersLastMonth,
        'active_growth' => $activeGrowth,

        // 👇 Leave stats
        'total_leaves_this_month' => $totalLeavesThisMonth,
        'approved_leaves' => $approvedLeavesThisMonth,
        'pending_leaves' => $pendingLeavesThisMonth,
        'rejected_leaves' => $rejectedLeavesThisMonth,
         'available_positions' => count($allPositions),
            'filled_positions' => count($filledPositions),
            'open_positions' => count($openPositions),
            'open_position_list' => array_values($openPositions), // optional

        // 👇 Returning this week
        'users_returning_this_week' => $returningThisWeek
    ]);
}

public function getDepartmentDistribution()
{
    // Get total number of users with department
    $totalUsers = DB::table('users')
        ->whereNotNull('department')
        ->count();

    // Join with departments table to get department names
    $departments = DB::table('users')
        ->join('departments', 'users.department', '=', 'departments.id')
        ->select('departments.department_name as department_name', DB::raw('count(*) as count'))
        ->whereNotNull('users.department')
        ->groupBy('users.department', 'departments.department_name')
        ->get()
        ->map(function ($dept) use ($totalUsers) {
            $dept->percentage = round(($dept->count / $totalUsers) * 100, 1);
            return $dept;
        });

    return response()->json($departments);
}

public function suspend($id)
{
    $employee = User::find($id);
   
    if (!$employee) {
        return response()->json(['message' => 'Employee not found.'], 404);
    }

    $employee->suspend = 1;
    $employee->save();

    return response()->json([
        'message' => 'Employee suspended successfully.',
        'suspend' => $employee->suspend
    ]);
}

public function unsuspend($id)
{
    $employee = User::find($id);

    if (!$employee) {
        return response()->json(['message' => 'Employee not found.'], 404);
    }

    \Log::info("Before unsuspend: " . $employee->suspend);
    $employee->suspend = false;
    $employee->save();
    \Log::info("After unsuspend: " . $employee->suspend);

    return response()->json([
        'message' => 'Employee unsuspended successfully.',
        'suspend' => $employee->suspend
    ]);
}

public function getAvailablePositions()
{
    // This fetches ENUM values from the `position` column in `users` table
    $type = DB::select("SHOW COLUMNS FROM users WHERE Field = 'position'")[0]->Type;


    preg_match('/enum\((.*)\)/', $type, $matches);
    $enum = [];

    foreach (explode(',', $matches[1]) as $value) {
        $enum[] = trim($value, " '");
    }

    return response()->json([
        'positions' => $enum
    ]);
}
public function getEnums()
{
    $columns = [
        'employment_type',
        'gender',
        'work_location',
        'pay_frequency',
        'reporting_manager'
    ];

    $mapToCamel = [
        'employment_type' => 'employmentType',
        'gender' => 'gender',
        'work_location' => 'workLocation',
        'pay_frequency' => 'payFrequency',
        'reporting_manager' => 'reportingManager'
    ];

    $enums = [];

    foreach ($columns as $column) {
        $type = DB::select("SHOW COLUMNS FROM users WHERE Field = '{$column}'")[0]->Type;

        preg_match('/enum\((.*)\)/', $type, $matches);

        $enums[$mapToCamel[$column]] = array_map(function ($value) {
            return trim($value, " '");
        }, explode(',', $matches[1]));
    }

    return response()->json($enums);
}


public function getCurrentUser()
{
    $user = Auth::user();

    return response()->json([
        'name' => $user->name,
        'user_type' => $user->user_type,
    ]);
}

}
