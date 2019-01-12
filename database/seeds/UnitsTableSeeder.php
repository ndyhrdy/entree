<?php

use Illuminate\Database\Seeder;

class UnitsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $defaultUnits = collect([
            ['name' => 'piece', 'short_name' => 'pcs', 'is_default' => true, 'plural_name' => str_plural('piece')],
            ['name' => 'box', 'short_name' => 'box', 'plural_name' => str_plural('box')],
            ['name' => 'pack', 'short_name' => 'pk', 'plural_name' => str_plural('pack')],
            ['name' => 'bottle', 'short_name' => 'btl', 'plural_name' => str_plural('bottle')],
            ['name' => 'kilogram', 'short_name' => 'kg', 'plural_name' => str_plural('kilogram')],
            ['name' => 'sheet', 'short_name' => 'sheet', 'plural_name' => str_plural('sheet')],
        ]);

        \Entree\Store\Store::all()->each(function ($store) use ($defaultUnits)
        {
            $store->units()->saveMany(
                $defaultUnits->map(function ($unit) {
                    return new \Entree\Item\Unit($unit);
                })->all()
            );
        });
    }
}
