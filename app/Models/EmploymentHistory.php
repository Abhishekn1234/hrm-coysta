<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmploymentHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'previous_company',
        'previous_start_date',
        'previous_end_date',
        'previous_position',
        'previous_responsibilities'
    ];

    protected $casts = [
        'previous_start_date' => 'date',
        'previous_end_date' => 'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}