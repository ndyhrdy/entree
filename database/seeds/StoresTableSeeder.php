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
        factory(Entree\Store\Store::class, ceil($users->count() / 2))->make()
            ->each(function ($store) use ($users)
            {
                $storeUsers = $users->random(rand(1, 5));
                $owner = $storeUsers->first();
                $store->owner_id = $owner->id;
                $store->created_by = $owner->id;
                $store->save();

                $storeUsers->each(function ($user, $index) use ($store, $owner)
                    {
                        $storeUser = new \Entree\Store\StoreUser;
                        $storeUser->slug = str_random(12);
                        $storeUser->user_id = $user->id;
                        $storeUser->invited_by = $owner->id != $user->id ? $owner->id : null;
                        $storeUser->accepted_at = $owner->id != $user->id ? Carbon::now() : null;
                        $storeUser->last_switched_at = Carbon::now()->subDays(rand(0, 30));

                        $store->storeUsers()->save($storeUser);
                    });
            });
    }
}
