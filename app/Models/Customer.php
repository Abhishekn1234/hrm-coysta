<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'profile_logo',
        'customer_type',
        'company_name',
        'display_name',
        'owner_name',
        'primary_contact_name',
        'primary_contact_phone',
        'email',
        'pan_no',
    ];

    // Relationships

    public function gstDetails()
    {
        return $this->hasMany(GstDetail::class);
    }

    public function shippingAddresses()
    {
        return $this->hasMany(ShippingAddress::class);
    }

    public function contactPersons()
    {
        return $this->hasMany(ContactPerson::class);
    }
}
