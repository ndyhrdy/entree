<?php

use Faker\Generator as Faker;

$factory->define(Entree\Purchase\Supplier::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'address' => $faker->address,
        'phone' => $faker->e164PhoneNumber,
        'email' => $faker->safeEmail,
    ];
});
