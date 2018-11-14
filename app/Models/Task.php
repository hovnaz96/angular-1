<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['name','description','assigned_to','status', 'assigned_from'];

    const ASSIGNED = 1;
    const PROGRESS = 2;
    const READY = 3;
    const FAILED = 4;
    const DONE = 5;


    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'assigned_from', 'id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'assigned_to', 'id');
    }

    public function scopeStatusName(\Illuminate\Database\Eloquent\Builder $query)
    {
        $query->selectRaw('
            CASE 
                WHEN status = '. self::ASSIGNED .' THEN "assigned"
                WHEN status = '. self::PROGRESS .' THEN "progress"
                WHEN status = '. self::READY.' THEN "ready"
                WHEN status = '. self::FAILED.' THEN "failed"
                WHEN status = '. self::DONE .' THEN "done"
                ELSE "assigned"
            END as status_task 
        ');
    }
}
