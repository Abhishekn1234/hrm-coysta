<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Attendance;
use Carbon\Carbon;
class UserAttendanceController extends Controller
{
    // Update attendance status
    public function update(Request $request, $id)
{
    $request->validate([
        'status' => 'required|in:present,absent,late',
        'check_in' => 'nullable|date_format:H:i',
        'check_out' => 'nullable|date_format:H:i',
    ]);

    $user = User::findOrFail($id);

    // ✅ Update status in `users` table
    $user->attendance = $request->status;
    $user->save();

    // ✅ Insert or update attendance log for today
    $today = Carbon::now()->toDateString();

    $attendance = Attendance::updateOrCreate(
        ['user_id' => $id, 'date' => $today],
        [
            'status' => $request->status,
            'check_in' => $request->check_in ?? null,
            'check_out' => $request->check_out ?? null,
        ]
    );

    return response()->json([
        'success' => true,
        'message' => 'Attendance status updated and logged successfully',
        'user' => $user,
        'attendance' => $attendance,
    ]);
}


    // Show current attendance status
    public function show($id)
    {
        $user = User::findOrFail($id);

        return response()->json([
            'attendance' => $user->attendance ?? 'not set'
        ]);
    }
}
