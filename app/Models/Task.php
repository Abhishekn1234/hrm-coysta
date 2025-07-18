<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
class Task extends Model
{
     use HasFactory;
    // Specify non-standard table name
    protected $table = 'task';

    // Allow mass assignment
    protected $fillable = [
        'user_id',
        'task_name',
        'task_description',
        'deadline',
        'assigned_by',
        'project_name',
        'customer',
        'project_value',
        'project_status',
        'duration'
    ]; // ← ✅ semicolon was missing here

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function tasks()
{
    return $this->hasMany(Task::class, 'customer_id');
}

    public function assigner()
    {
        return $this->belongsTo(User::class, 'assigned_by');
    }
}
