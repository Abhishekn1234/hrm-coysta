<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = [
        'user_id',
        'status',
        'date',
        'check_in',
        'check_out',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
