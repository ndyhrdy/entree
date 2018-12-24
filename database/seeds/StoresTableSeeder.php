<?php

use Entree\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class StoresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('store_user')->truncate();
        DB::table('stores')->truncate();
        
        $users = User::all();
        factory(Entree\Store\Store::class, ceil($users->count() / 2))->create()
            ->each(function ($store) use ($users)
            {
                $owner = null;
                $users->random(rand(1, 5))
                    ->each(function ($user, $index) use ($store, $owner)
                    {
                        if ($index == 0) {
                            $owner = $user;
                        }
                        $store->users()->attach($user, [
                            'invited_by' => $index > 0 ? $user->id : null,
                            'accepted_at' => $index > 0 ? Carbon::now() : null,
                        ]);
                    });
            });
    }
}
