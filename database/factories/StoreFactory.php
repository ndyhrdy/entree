<?php

use Faker\Generator as Faker;

$factory->define(Entree\Store\Store::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'description' => $faker->text,
        'address' => $faker->address,
        'city' => $faker->city,
        'state' => $faker->state,
        'country' => $faker->country,
        'phone' => $faker->e164PhoneNumber,
        'email' => $faker->safeEmail,
        'web' => $faker->url,
    ];
});
