<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['name','description','assigned_to','status'];

    const ASSIGNED = 1;
    const PROGRESS = 2;
    const READY = 3;
    const FAILED = 4;
    const DONE = 5;


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function assignedUser()
    {
        return $this->belongsTo(User::class, 'id', 'assigned_to');
    }

}
