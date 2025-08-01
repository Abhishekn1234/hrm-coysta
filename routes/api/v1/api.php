<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\CrmController;
use App\Http\Controllers\Admin\InventoryController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\QuotationController;
use App\Http\Controllers\QuotationTemplateController;
use App\Http\Controllers\Admin\HrmController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\UserController;
use  App\Http\Controllers\Admin\PayrollController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */
// use App\Http\Controllers\Admin\HrmController;
use App\Http\Controllers\Admin\DepartmentController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\LeaveRequestController;
use App\Http\Controllers\UserAttendanceController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\PeopleController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\VendorController;
Route::prefix('projects')->group(function () {
    Route::get('/', [ProjectController::class, 'index']); // All projects
    Route::post('/', [ProjectController::class, 'store']); // Add project
    Route::get('/{id}', [ProjectController::class, 'show']); // Get project by ID
    Route::put('/{id}', [ProjectController::class, 'update']); // Update project
    Route::delete('/{id}', [ProjectController::class, 'destroy']); // Delete project

   
    Route::get('/customer/{customer_id}', [ProjectController::class, 'getByCustomer']);
});
Route::prefix('admin')->group(function () {
    Route::get('/organizations', [HrmController::class, 'index'])->name('organizations.index');
    Route::get('/organizations/create', [HrmController::class, 'create'])->name('organizations.create');
    Route::post('/organizations', [HrmController::class, 'store'])->name('organizations.store');
    Route::get('/organizations/{organization}', [HrmController::class, 'show'])->name('organizations.show');
    Route::get('/organizations/{organization}/edit', [HrmController::class, 'edit'])->name('organizations.edit');
    Route::put('/organizations/{organization}', [HrmController::class, 'update'])->name('organizations.update');
    Route::delete('/organizations/{organization}', [HrmController::class, 'destroy'])->name('organizations.destroy');
});
Route::post('/v1/customers/{customer}/invoices', [CustomerController::class, 'storeInvoice']);
Route::get('/v1/customers/{customer}/invoices', [CustomerController::class, 'getInvoices']);

Route::prefix('v1')->group(function () {

    // Attendance (Mark, View, Monthly)
    Route::post('/users/{id}/attendance', [UserAttendanceController::class, 'update']); // Mark
    Route::get('/users/{id}/attendance', [UserAttendanceController::class, 'show']);    // View
    Route::get('/users/{id}/attendance-monthly-summary', [AttendanceController::class, 'monthlySummary']);

    // Leave
    Route::post('/users/{id}/leave-request', [LeaveController::class, 'store']);

    // Payslip
    // Using PeopleController
Route::get('/users/{id}/payslip', [PeopleController::class, 'showPayslip']);
Route::post('/users/{id}/assign-task', [PeopleController::class, 'assignTask']);

});

Route::prefix('customer')->group(function () {
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::get('/customer/count', [CustomerController::class, 'count']);
    Route::post('/customer', [CustomerController::class, 'store']);
    Route::get('/customer-count-business', [CustomerController::class, 'countBusinessCustomers']);
    Route::get('/customer-count-individual', [CustomerController::class, 'countIndividualCustomers']);
    Route::get('/customer-count-per-month', [CustomerController::class, 'countPerMonth']);
Route::get('/customers/{id}/tasks', [PeopleController::class, 'UserTasks']);
Route::post('/customers/{id}/assign-task', [PeopleController::class, 'assignTaskToCustomer']);

   
    Route::get('/customer/{id}', [CustomerController::class, 'show']);
    Route::put('/customer/{id}', [CustomerController::class, 'update']);
    Route::delete('/customer/{id}', [CustomerController::class, 'destroy']);
});

Route::prefix('v1')->group(function () {
    Route::get('/vendors', [VendorController::class, 'index']); // List all vendors
    Route::post('/vendors', [VendorController::class, 'store']); // Create new vendor with contacts
    Route::get('/vendors/{id}', [VendorController::class, 'show']); // Show single vendor
    Route::put('/vendors/{id}', [VendorController::class, 'update']); // Update vendor and contacts
    Route::delete('/vendors/{id}', [VendorController::class, 'destroy']); // Delete vendor
    Route::get('/vendor-count', [VendorController::class, 'count']); // Count vendors by type
});


Route::prefix('benefits')->group(function () {
    Route::get('/{userId}', [HrmController::class, 'getBenefit']);  
     Route::get('/', [HrmController::class, 'getBenefits']);  
    Route::put('/benefits-bulk-update', [HrmController::class, 'bulkUpdateBenefits']);
   Route::get('/benefits-export-pdf', [HrmController::class, 'exportBenefitsToPDF']);

    Route::post('/', [HrmController::class, 'addBenefit']);              // POST
    Route::put('/{userId}', [HrmController::class, 'editBenefit']);      // PUT
    Route::delete('/{userId}', [HrmController::class, 'deleteBenefit']); // DELETE
});

   Route::get('/staff/counts', [PeopleController::class, 'getCounts']);
Route::get('/staff/monthly', [PeopleController::class, 'getMonthlyStaffCounts']);

Route::prefix('staff')->group(function () {
    Route::get('/', [PeopleController::class, 'getAllStaff']);
    Route::get('/{id}', [PeopleController::class, 'getStaffById']);
    Route::post('/', [PeopleController::class, 'store']);
    Route::put('/{id}', [PeopleController::class, 'update']);
    Route::delete('/{id}', [PeopleController::class, 'destroy']);
});

Route::prefix('attendance')->group(function () {
    Route::get('/user/{id}/daily-logs', [UserAttendanceController::class, 'getDailyLogs']);
    Route::get('/user/{id}/summary', [UserAttendanceController::class, 'getAttendanceSummary']);
    Route::get('/all/daily', [UserAttendanceController::class, 'getAllUsersDailyAttendance']);
});

Route::post('/users/{id}/attendance', [UserAttendanceController::class, 'update']);
 Route::get('/users/{id}/attendance-monthly-summary', [AttendanceController::class, 'monthlySummary']);
Route::get('/users/{id}/attendance', [UserAttendanceController::class, 'show']);
Route::get('/department-distribution', [HrmController::class, 'getDepartmentDistribution']);

Route::get('/messages/priorities', [MessageController::class, 'getPriorityEnums']);

Route::prefix('v1')->group(function () {
    Route::post('/employees/{id}/suspend', [HrmController::class, 'suspend']);
    Route::post('/employees/{id}/unsuspend', [HrmController::class, 'unsuspend']);
});
Route::get('/positions', [HrmController::class, 'getAvailablePositions']);

Route::prefix('leave')->group(function () {
    Route::post('/apply', [LeaveRequestController::class, 'apply']);
    Route::get('/', [LeaveRequestController::class, 'index']);
    Route::get('/{id}', [LeaveRequestController::class, 'show']);
    Route::get('/leave/user/{userId}', [LeaveRequestController::class, 'getLeavesByUser']);

    Route::patch('/{id}', [LeaveRequestController::class, 'update']);
    Route::delete('/{id}', [LeaveRequestController::class, 'destroy']);
});
Route::get('/enums/users', [HrmController::class, 'getEnums']);

Route::middleware('auth:sanctum')->get('/user', function () {
    return response()->json([
        'name' => Auth::user()->name,
        'user_type' => Auth::user()->user_type,
    ]);
});
Route::get('/leave-requests/enums', [LeaveRequestController::class, 'getEnums']);

Route::prefix('users')->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('{id}', [UserController::class, 'show']);
    Route::post('/', [UserController::class, 'store']);
    Route::patch('{id}', [UserController::class, 'update']);
    Route::put('{id}', [UserController::class, 'update']);
    Route::delete('{id}', [UserController::class, 'destroy']);
});
Route::prefix('v1')->group(function () {
    Route::prefix('departments')->group(function () {
        Route::get('/', [DepartmentController::class, 'index']);          // GET all
        Route::post('/', [DepartmentController::class, 'store']);         // POST create
        Route::get('/{id}', [DepartmentController::class, 'show']);       // GET by ID
        Route::put('/{id}', [DepartmentController::class, 'update']);     // PUT update
        Route::patch('/{id}', [DepartmentController::class, 'update']);   // PATCH update
        Route::delete('/{id}', [DepartmentController::class, 'destroy']); // DELETE
    });
});
Route::get('/leave/stats', [HrmController::class, 'getEmployeeLeaveStats']);
Route::get('/employee/{id}/payroll', [PayrollController::class, 'getPayrollDetails']);

Route::get('/employees', [HrmController::class, 'getEmployees']);
Route::post('/v1/employee/{id}/upload-document', [HrmController::class, 'uploadDocument']);
Route::get('/v1/employees/{id}', [HrmController::class, 'getEmployeeById']);
Route::get('/test-controller', [HrmController::class, 'test']);
Route::get('/v1/employee/{id}/documents', [HrmController::class, 'getDocuments']);
// Route::get('/auth-failed', function () {
//     return response()->json(['message' => 'Authentication failed'], 401);
// })->name('authentication-failed');
// middleware('auth:sanctum')->
// Route::get('/admin/profile', [HrmController::class, 'getProfile']);
Route::get('/v1/dashboard/employee-metrics', [HrmController::class, 'employeeStats']);


Route::post('/send-message', [MessageController::class, 'send']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/notifications', function (Request $request) {
        return $request->user()->notifications;
    });

    // Optional: Get only unread notifications
    Route::get('/notifications/unread', function (Request $request) {
        return $request->user()->unreadNotifications;
    });

    // Optional: Mark a specific notification as read
    Route::post('/notifications/read/{id}', function ($id, Request $request) {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->markAsRead();
        return response()->json(['status' => 'marked as read']);
    });

    // Optional: Mark all as read
    Route::post('/notifications/read-all', function (Request $request) {
        $request->user()->unreadNotifications->markAsRead();
        return response()->json(['status' => 'all marked as read']);
    });
});
Route::delete('/employee/{id}', [EmployeeController::class, 'destroy']);

Route::post('/hrm/personal-details', [HrmController::class, 'storePersonalDetails']);
Route::group(['namespace' => 'api\v1', 'prefix' => 'v1', 'middleware' => ['api_lang']], function () {

    Route::group(['prefix' => 'auth', 'namespace' => 'auth'], function () {
        Route::post('register', 'PassportAuthController@register');
        Route::post('login', 'PassportAuthController@login');

        Route::post('check-phone', 'PhoneVerificationController@check_phone');
        Route::post('verify-phone', 'PhoneVerificationController@verify_phone');

        Route::post('check-email', 'EmailVerificationController@check_email');
        Route::post('verify-email', 'EmailVerificationController@verify_email');

        Route::post('forgot-password', 'ForgotPassword@reset_password_request');
        Route::post('verify-otp', 'ForgotPassword@otp_verification_submit');
        Route::put('reset-password', 'ForgotPassword@reset_password_submit');

        Route::any('social-login', 'SocialAuthController@social_login');
        Route::post('update-phone', 'SocialAuthController@update_phone');
    });

    Route::group(['prefix' => 'config'], function () {
        Route::get('/', 'ConfigController@configuration');
    });

    Route::group(['prefix' => 'shipping-method','middleware'=>'auth:api'], function () {
        Route::get('detail/{id}', 'ShippingMethodController@get_shipping_method_info');
        Route::get('by-seller/{id}/{seller_is}', 'ShippingMethodController@shipping_methods_by_seller');
        Route::post('choose-for-order', 'ShippingMethodController@choose_for_order');
        Route::get('chosen', 'ShippingMethodController@chosen_shipping_methods');

        Route::get('check-shipping-type','ShippingMethodController@check_shipping_type');
    });
    

    Route::group(['prefix' => 'cart','middleware'=>'auth:api'], function () {
        Route::get('/', 'CartController@cart');
        Route::post('add', 'CartController@add_to_cart');
        Route::put('update', 'CartController@update_cart');
        Route::delete('remove', 'CartController@remove_from_cart');
        Route::delete('remove-all','CartController@remove_all_from_cart');

    });

    Route::get('faq', 'GeneralController@faq');
   // Route::post('/leads', [CrmController::class, 'store']);
      

       Route::group(['prefix' => 'crm'], function () {
            Route::post('leads', [CrmController::class, 'store']);
            Route::get('leads', [CrmController::class, 'list']);  // <-- Add this line
            Route::post('leads/{lead}/tasks', [CrmController::class, 'addTask']);
            // Route::patch('leads/{lead}/status', [CrmController::class, 'updateLeadStatus']);
            Route::put('leads/{lead}/update-full', [CrmController::class, 'updateLead']);
            Route::post('leads/activities', [CrmController::class, 'activities']);
            Route::delete('leads/{lead}', [CrmController::class, 'destroy']);
            Route::post('leads/{lead}/tasks/change', [CrmController::class, 'task_store']);

        });
        Route::group(['prefix' => 'pos'], function () {
            // Route::post('leads', [CrmController::class, 'store']);
            // Route::get('leads', [CrmController::class, 'list']);  // <-- Add this line
            // Route::post('leads/{lead}/tasks', [CrmController::class, 'addTask']);
            // Route::patch('leads/{lead}/status', [CrmController::class, 'updateLeadStatus']);
            // Route::post('leads/activities', [CrmController::class, 'activities']);
            // Route::delete('leads/{lead}', [CrmController::class, 'destroy']);
            // Route::post('leads/{lead}/tasks/change', [CrmController::class, 'task_store']);

        });
         Route::group(['prefix' => 'quotations'], function () {
             Route::post('saveall', [QuotationController::class, 'store']);
             Route::get('list', [QuotationController::class, 'index']);
             Route::delete('delete/{id}', [QuotationController::class, 'delete']);
             Route::post('save_pdf', [QuotationController::class, 'save_pdf']);
             Route::put('{id}/status', [QuotationController::class, 'change_status']);
             Route::post('save-items-pdf', [QuotationController::class, 'saveItemsPdf']);
             Route::get('quotationTemplates', [QuotationTemplateController::class, 'index']);
             Route::post('quotationTemplates/save', [QuotationTemplateController::class, 'store']);
             
             
            // Route::get('leads', [CrmController::class, 'list']);  // <-- Add this line
            // Route::post('leads/{lead}/tasks', [CrmController::class, 'addTask']);
            // Route::patch('leads/{lead}/status', [CrmController::class, 'updateLeadStatus']);
            // Route::post('leads/activities', [CrmController::class, 'activities']);
            // Route::delete('leads/{lead}', [CrmController::class, 'destroy']);
            // Route::post('leads/{lead}/tasks/change', [CrmController::class, 'task_store']);

        });
        
        Route::group(['prefix' => 'inventories'], function () {
            Route::post('inventory_save', [InventoryController::class, 'save']);
            Route::get('inventories', [InventoryController::class, 'new_list']);
            Route::post('saveinventory', [InventoryController::class, 'store']);
            Route::put('new_update', [InventoryController::class, 'updatenew']);

            Route::get('customer-inventories', [InventoryController::class, 'customer_inventories']);
            // Route::get('leads', [CrmController::class, 'list']);  // <-- Add this line
            // Route::post('leads/{lead}/tasks', [CrmController::class, 'addTask']);
            // Route::patch('leads/{lead}/status', [CrmController::class, 'updateLeadStatus']);
            // Route::post('leads/activities', [CrmController::class, 'activities']);
            // Route::delete('leads/{lead}', [CrmController::class, 'destroy']);
            // Route::post('leads/{lead}/tasks/change', [CrmController::class, 'task_store']);

        });


        Route::group(['prefix' => 'products'], function () {
                Route::post('add_product', [ProductController::class, 'save']);
                Route::get('list', [ProductController::class, 'list']);
                Route::match(['post', 'put'],'update/{id}', [ProductController::class, 'update']);
                Route::delete('delete/{id}', [ProductController::class, 'destroy']);
                
            });

    Route::group(['prefix' => 'products'], function () {
        // Route::post('add_product', 'ProductController@add_product');
        Route::get('latest', 'ProductController@get_latest_products');
        Route::get('featured', 'ProductController@get_featured_products');
        Route::get('top-rated', 'ProductController@get_top_rated_products');
        Route::any('search', 'ProductController@get_searched_products');
        Route::get('details/{slug}', 'ProductController@get_product');
        Route::get('related-products/{product_id}', 'ProductController@get_related_products');
        Route::get('reviews/{product_id}', 'ProductController@get_product_reviews');
        Route::get('rating/{product_id}', 'ProductController@get_product_rating');
        Route::get('counter/{product_id}', 'ProductController@counter');
        Route::get('shipping-methods', 'ProductController@get_shipping_methods');
        Route::get('social-share-link/{product_id}', 'ProductController@social_share_link');
        Route::post('reviews/submit', 'ProductController@submit_product_review')->middleware('auth:api');
        Route::get('best-sellings', 'ProductController@get_best_sellings');
        Route::get('home-categories', 'ProductController@get_home_categories');
        ROute::get('discounted-product', 'ProductController@get_discounted_product');
    });

    Route::group(['prefix' => 'notifications'], function () {
        Route::get('/', 'NotificationController@get_notifications');
    });

    Route::group(['prefix' => 'brands'], function () {
        Route::get('/', 'BrandController@get_brands');
        Route::get('products/{brand_id}', 'BrandController@get_products');
    });

    Route::group(['prefix' => 'attributes'], function () {
        Route::get('/', 'AttributeController@get_attributes');
    });

    Route::group(['prefix' => 'flash-deals'], function () {
        Route::get('/', 'FlashDealController@get_flash_deal');
        Route::get('products/{deal_id}', 'FlashDealController@get_products');
    });

    Route::group(['prefix' => 'deals'], function () {
        Route::get('featured', 'DealController@get_featured_deal');
    });

    Route::group(['prefix' => 'dealsoftheday'], function () {
        Route::get('deal-of-the-day', 'DealOfTheDayController@get_deal_of_the_day_product');
    });

    Route::group(['prefix' => 'categories'], function () {
        Route::get('/', 'CategoryController@get_categories');
        Route::get('products/{category_id}', 'CategoryController@get_products');
    });

    Route::group(['prefix' => 'customer', 'middleware' => 'auth:api'], function () {
        Route::get('info', 'CustomerController@info');
        Route::put('update-profile', 'CustomerController@update_profile');
        Route::put('cm-firebase-token', 'CustomerController@update_cm_firebase_token');

        Route::group(['prefix' => 'address'], function () {
            Route::get('list', 'CustomerController@address_list');
            Route::post('add', 'CustomerController@add_new_address');
            Route::delete('/', 'CustomerController@delete_address');
        });

        Route::group(['prefix' => 'support-ticket'], function () {
            Route::post('create', 'CustomerController@create_support_ticket');
            Route::get('get', 'CustomerController@get_support_tickets');
            Route::get('conv/{ticket_id}', 'CustomerController@get_support_ticket_conv');
            Route::post('reply/{ticket_id}', 'CustomerController@reply_support_ticket');
        });

        Route::group(['prefix' => 'wish-list'], function () {
            Route::get('/', 'CustomerController@wish_list');
            Route::post('add', 'CustomerController@add_to_wishlist');
            Route::delete('remove', 'CustomerController@remove_from_wishlist');
        });

        Route::group(['prefix' => 'order'], function () {
            Route::get('list', 'CustomerController@get_order_list');
            Route::get('details', 'CustomerController@get_order_details');
            Route::get('place', 'OrderController@place_order');
            Route::get('refund', 'OrderController@refund_request');
            Route::post('refund-store', 'OrderController@store_refund');
            Route::get('refund-details', 'OrderController@refund_details');
        });
        // Chatting
        Route::group(['prefix' => 'chat'], function () {
            Route::get('/', 'ChatController@chat_with_seller');
            Route::get('messages', 'ChatController@messages');
            Route::post('send-message', 'ChatController@messages_store');
        });
    });

    Route::group(['prefix' => 'order'], function () {
        Route::get('track', 'OrderController@track_order');
        Route::get('cancel-order','OrderController@order_cancel');
    });

    Route::group(['prefix' => 'banners'], function () {
        Route::get('/', 'BannerController@get_banners');
    });

    Route::group(['prefix' => 'seller'], function () {
        Route::get('/', 'SellerController@get_seller_info');
        Route::get('{seller_id}/products', 'SellerController@get_seller_products');
        Route::get('top', 'SellerController@get_top_sellers');
        Route::get('all', 'SellerController@get_all_sellers');
    });

    Route::group(['prefix' => 'coupon','middleware' => 'auth:api'], function () {
        Route::get('apply', 'CouponController@apply');
    });

    //map api
    Route::group(['prefix' => 'mapapi'], function () {
        Route::get('place-api-autocomplete', 'MapApiController@place_api_autocomplete');
        Route::get('distance-api', 'MapApiController@distance_api');
        Route::get('place-api-details', 'MapApiController@place_api_details');
        Route::get('geocode-api', 'MapApiController@geocode_api');
    });
});
