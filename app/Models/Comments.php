<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    protected $fillable = ['content', 'task_id', 'user_id', 'parent_id'];


    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function commentReply()
    {
        return $this->hasMany(Comments::class, 'parent_id', 'id');
    }
}
