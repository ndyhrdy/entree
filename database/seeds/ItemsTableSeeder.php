<?php

use Illuminate\Database\Seeder;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(
            Entree\Item\Item::class, 
            Entree\Store\Store::count() * 20)
            ->create();
    }
}
