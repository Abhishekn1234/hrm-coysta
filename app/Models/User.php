<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
      public function employmentHistories()
    {
        return $this->hasMany(EmploymentHistory::class, 'user_id');
    }
    public function departmentInfo()
{
    return $this->belongsTo(Department::class, 'department');
}
public function documents()
{
    return $this->hasMany(EmployeeDocument::class, 'user_id');
}
// public function documents()
// {
//     return $this->hasMany(Document::class, 'user_id');
// }

    /**
     * 
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
   protected $fillable = [
    'first_name',
    'last_name',
    'user_type',
    'name',
    'email',
    'email_verified_at',
    'password',
    'phone',
    'place',
    'address',
    'gender',
    'hourly_rate',
    'monthly_rate',
    'date_of_birth',
    'qualification',
    'experience',
    'expertise',
    'designation',
    'role',
    'image',
    'reports_to',
    'status',
    'join_type',
    'join_date',
    'work_location',
    'employment_type',
    'annual_ctc',
    'basic_salary',
    'hra',
    'special_allowances',
    'probation_period',
    'bank_name',
    'account_holder_name',
    'account_number',
    'ifsc_code',
    'branch',
    'remember_token',

    // Emergency contact
    'emergency_contact_name',
    'emergency_contact_relationship',
    'emergency_contact_phone',
    'emergency_contact_email',

    // Employment
    'position',
    'department',
    'hire_date',
    'reporting_manager',

    // Employment history (flattened)
    'previous_company',
    'previous_start_date',
    'previous_end_date',
    'previous_position',
    'previous_responsibilities',

    // Salary
    'base_salary',
    'pay_frequency',
    'housing_allowance',
    'transport_allowance',
    'medical_allowance',
    'other_allowances',

    // Banking
    'routing_number',
    'payment_method',

    // Document uploads
    'resume',
    'id_proof',
    'employment_contract',
    'medical_certificate',
    'education_certificates',

    // Flags
    'documents_authentic',
    'suspend'
];


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
           public function departmentRelation()
{
    return $this->belongsTo(\App\Models\Department::class, 'department', 'id');
}

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
