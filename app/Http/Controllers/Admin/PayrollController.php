<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
class PayrollController extends Controller
{
 public function getPayrollDetails($id)
{
    $employee = User::find($id);

    if (!$employee) {
        return response()->json(['error' => 'Employee not found'], 404);
    }

    // Parse numeric values and fallback to 0
    $basic = (float) $employee->base_salary ?? 0;
    $hra = (float) $employee->housing_allowance ?? 0;
    $transport = (float) $employee->transport_allowance ?? 0;
    $medical = (float) $employee->medical_allowance ?? 0;
    $other = (float) $employee->other_allowances ?? 0;

    // Example deductions (you can pull from other tables if needed)
    $ptax = 2500;
    $tds = 1200;
    $loan = 800;

    return response()->json([
        'basic_salary' => $basic,
        'hra' => $hra,
        'transport_allowance' => $transport,
        'medical_allowance' => $medical,
        'other_allowances' => $other,

        'total_earnings' => $basic + $hra + $transport + $medical + $other,

        'professional_tax' => $ptax,
        'tds' => $tds,
        'loan_recovery' => $loan,

        'total_deductions' => $ptax + $tds + $loan,

        'net_pay' => ($basic + $hra + $transport + $medical + $other) - ($ptax + $tds + $loan),
    ]);
}
}
