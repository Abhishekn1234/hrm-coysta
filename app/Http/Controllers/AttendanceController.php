<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attendance;

class AttendanceController extends Controller
{
    // Store or update attendance for the day
    public function store(Request $request, $userId)
    {
        $request->validate([
            'status' => 'required|in:present,absent,late',
            'check_in' => 'nullable|date_format:H:i',
            'check_out' => 'nullable|date_format:H:i',
        ]);

        $attendance = Attendance::updateOrCreate(
            ['user_id' => $userId, 'date' => now()->toDateString()],
            [
                'status' => $request->status,
                'check_in' => $request->check_in,
                'check_out' => $request->check_out,
            ]
        );

        return response()->json([
            'success' => true,
            'data' => $attendance
        ]);
    }

    // Get monthly summary
    public function monthlySummary(Request $request, $userId)
    {
        $month = $request->get('month', now()->month);
        $year = $request->get('year', now()->year);

        $present = Attendance::where('user_id', $userId)->where('status', 'present')
            ->whereMonth('date', $month)->whereYear('date', $year)->count();

        $absent = Attendance::where('user_id', $userId)->where('status', 'absent')
            ->whereMonth('date', $month)->whereYear('date', $year)->count();

        $late = Attendance::where('user_id', $userId)->where('status', 'late')
            ->whereMonth('date', $month)->whereYear('date', $year)->count();

        $totalDays = $present + $absent + $late;
        $percentage = $totalDays > 0 ? round(($present / $totalDays) * 100, 2) : 0;

        return response()->json([
            'present' => $present,
            'absent' => $absent,
            'late' => $late,
            'total_days' => $totalDays,
            'attendance_percentage' => $percentage
        ]);
    }
}
