<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\VendorContactPerson;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    // List all vendors
    public function index()
    {
        $vendors = Vendor::withCount('contactPersons')->get();
        return response()->json($vendors);
    }

    // Create vendor with contact persons
    public function store(Request $request)
{
    $vendor = Vendor::create($request->only([
        'salutation', 'name', 'phone', 'email', 'gst_no', 'type', 'material', 'address',
        'organization', 'login_enabled'  // Added the missing fields
    ]));

    if ($request->has('contact_persons')) {
        foreach ($request->contact_persons as $person) {
            $vendor->contactPersons()->create($person);
        }
    }

    return response()->json(['message' => 'Vendor created', 'vendor' => $vendor]);
}
    // Show single vendor
   public function show($id)
{
    $vendor = Vendor::with('contactPersons')->findOrFail($id);
    return response()->json($vendor);
}


    // Update vendor and contact persons
    public function update(Request $request, $id)
{
    $vendor = Vendor::findOrFail($id);

    // Update vendor base fields
    $vendor->update($request->only([
        'salutation',
        'name',
        'phone',
        'email',
        'gst_no',
        'type',
        'material',
        'address',
        'login_enabled',
        'organization',
        'username',
        'password', // You may hash this if needed
    ]));

    // Update Contact Persons
    $vendor->contactPersons()->delete();

    if ($request->has('contact_persons') && is_array($request->contact_persons)) {
        foreach ($request->contact_persons as $person) {
            $vendor->contactPersons()->create([
                'name' => $person['name'] ?? '',
                'designation' => $person['designation'] ?? null,
                'work_email' => $person['email'] ?? null,
                'work_phone' => $person['phone'] ?? null,
            ]);
        }
    }

    return response()->json(['message' => 'Vendor updated successfully']);
}

    // Delete vendor
    public function destroy($id)
    {
        $vendor = Vendor::findOrFail($id);
        $vendor->delete();

        return response()->json(['message' => 'Vendor deleted']);
    }

    // Count vendors
    public function count()
{
    $total = Vendor::count();
    $material = Vendor::where('type', 'Material')->count();
    $service = Vendor::where('type', 'Service')->count();

    return response()->json([
        'total' => $total,
        'material' => $material,
        'service' => $service,
    ]);
}

}
