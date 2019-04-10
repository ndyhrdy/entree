<?php

use Illuminate\Database\Seeder;

class SuppliersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $stores = Entree\Store\Store::all();

        factory(Entree\Purchase\Supplier::class, $stores->count() * 10)->make()
            ->each(function ($supplier) use ($stores) {
                $store = $stores->random();
                $supplier->store_id = $store->id;
                $supplier->created_by = $store->owner->id;

                $supplier->save();
            });
    }
}
