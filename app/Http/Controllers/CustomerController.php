<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // ✅ GET: List all customers
    public function index()
    {
        $customers = Customer::with(['gstDetails', 'shippingAddresses', 'contactPersons'])->get();
        return response()->json($customers);
    }

    // ✅ POST: Store new customer with related data
    public function store(Request $request)
    {
        $data = $request->validate([
            'profile_logo' => 'nullable|string',
            'customer_type' => 'required|string',
            'company_name' => 'nullable|string',
            'display_name' => 'required|string',
            'owner_name' => 'nullable|string',
            'primary_contact_name' => 'required|string',
            'primary_contact_phone' => 'required|string',
            'email' => 'nullable|email',
            'pan_no' => 'nullable|string',

            'gst_details' => 'array',
            'gst_details.*.gst_number' => 'nullable|string',
            'gst_details.*.registered_address' => 'nullable|string',
            'gst_details.*.place_of_supply' => 'nullable|string',

            'shipping_addresses' => 'array',
            'shipping_addresses.*.address' => 'nullable|string',
            'shipping_addresses.*.city' => 'nullable|string',
            'shipping_addresses.*.state' => 'nullable|string',
            'shipping_addresses.*.pincode' => 'nullable|string',

            'contact_persons' => 'array',
            'contact_persons.*.contact_name' => 'nullable|string',
            'contact_persons.*.designation' => 'nullable|string',
            'contact_persons.*.work_email' => 'nullable|email',
            'contact_persons.*.work_phone' => 'nullable|string',
            'contact_persons.*.personal_email' => 'nullable|email',
            'contact_persons.*.personal_phone' => 'nullable|string',
        ]);

        $customer = Customer::create($data);

        $customer->gstDetails()->createMany($data['gst_details'] ?? []);
        $customer->shippingAddresses()->createMany($data['shipping_addresses'] ?? []);
        $customer->contactPersons()->createMany($data['contact_persons'] ?? []);

        return response()->json(['message' => 'Customer created successfully', 'customer' => $customer]);
    }

    // ✅ GET: Show customer by ID
    public function show(string $id)
    {
        $customer = Customer::with(['gstDetails', 'shippingAddresses', 'contactPersons'])->findOrFail($id);
        return response()->json($customer);
    }

    // ✅ PUT: Update customer
    public function update(Request $request, string $id)
    {
        $customer = Customer::findOrFail($id);

        $data = $request->validate([
            'profile_logo' => 'nullable|string',
            'customer_type' => 'required|string',
            'company_name' => 'nullable|string',
            'display_name' => 'required|string',
            'owner_name' => 'nullable|string',
            'primary_contact_name' => 'required|string',
            'primary_contact_phone' => 'required|string',
            'email' => 'nullable|email',
            'pan_no' => 'nullable|string',
        ]);

        $customer->update($data);

        // Optional: Update related tables if sent
        // You may also implement logic to sync or replace related records

        return response()->json(['message' => 'Customer updated successfully', 'customer' => $customer]);
    }

    // ✅ DELETE: Delete customer
    public function destroy(string $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return response()->json(['message' => 'Customer deleted successfully']);
    }

    // ✅ GET: Count of all customers
   

    // ✅ GET: Count of customers per month (last 12 months)
    public function countPerMonth()
    {
        $monthlyCounts = Customer::selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count")
            ->groupBy('month')
            ->orderBy('month', 'DESC')
            ->take(12)
            ->get();

        return response()->json($monthlyCounts);
    }

    // ✅ GET: Count of customers involved in business
  
    public function count()
{
    return response()->json(['total' => Customer::count()]);
}

public function countBusinessCustomers()
{
    return response()->json(['business' => Customer::where('customer_type', 'Business')->count()]);
}

public function countIndividualCustomers()
{
    return response()->json(['individual' => Customer::where('customer_type', 'Individual')->count()]);
}

}
