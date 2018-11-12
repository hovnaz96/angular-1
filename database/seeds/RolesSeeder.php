<?php

use Illuminate\Database\Seeder;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \Spatie\Permission\Models\Role::create([
            'name' => 'admin',
            'guard_name' => 'api'
        ]);

        $admin = \App\Models\User::query()->create([
            'name' => 'Admin User',
            'email' => 'admin@tasks.com',
            'password' => bcrypt('secret')
        ]);

        $admin->assignRole('admin');
    }
}
