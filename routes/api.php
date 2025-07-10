// routes/api.php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\HrmController;

Route::prefix('admin/api/v1')->group(function () {
    Route::get('/staff/counts', [HrmController::class, 'getCounts']);
    Route::get('/staff/monthly', [HrmController::class, 'getMonthlyStaffCounts']);
});
