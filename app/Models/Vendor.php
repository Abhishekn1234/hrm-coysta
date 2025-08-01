<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
   protected $fillable = [
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
    'password',
];

public function contactPersons()
{
    return $this->hasMany(VendorContactPerson::class, 'vendor_id');
}


}
