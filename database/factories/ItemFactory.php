<?php

use Faker\Generator as Faker;

$factory->define(Entree\Item\Item::class, function (Faker $faker) {
    $store = Entree\Store\Store::all()->random();
    $hasUnit2 = $faker->boolean(75);
    $hasUnit3 = $hasUnit2 ? $faker->boolean(75) : false;
    
    return [
        'store_id' => $store->id,
        'sku' => $faker->ean8,
        'name' => $faker->company . ' ' . $faker->firstName,
        'description' => $faker->sentence,
        'unit_id' => $store->units->random()->id,
        'unit_2_id' => $hasUnit2 ? $store->units->random()->id : null,
        'unit_2_ratio' => $hasUnit2 ? $faker->numberBetween(5, 1000) : 0,
        'unit_3_id' => $hasUnit3 ? $store->units->random()->id : null,
        'unit_3_ratio' => $hasUnit2 ? $faker->numberBetween(5, 1000) : 0,
        'created_by' => $store->users->random()->id,
    ];
});
