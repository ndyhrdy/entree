<?php

use Carbon\Carbon;
use Faker\Factory;
use Entree\Item\Item;
use Entree\Item\Mutation;
use Entree\Item\Adjustment;
use Illuminate\Database\Seeder;

class MutationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('mutations')->truncate();
        DB::table('adjustments')->truncate();
        
        $faker = Factory::create();

        Item::with(['lastMutation', 'unit', 'unit2', 'unit3', 'store', 'store.users'])
            ->get()
            ->each(function (Item $item) use ($faker)
        {
            $numberOfMutations = rand(0, 20);
            $currentQuantity = $item->currentQuantity();
            $transactionDate = $faker->dateTimeBetween('-6 months', '-5 months');
            for ($i = 0; $i < $numberOfMutations; $i++) { 
                $unitWeights = [
                    rand(50, 100),                      // base unit
                    $item->unit2 ? rand(25, 100) : 0,   // secondary unit
                    $item->unit3 ? rand(0, 100) : 0,    // tertiary unit
                ];
                $mutationUnit = 'unit';
                for ($j = 2; $j < count($unitWeights) + 1; $j++) { 
                    if ($unitWeights[$j - 1] > $unitWeights[$j - 2]) {
                        $mutationUnit = 'unit_' . $j;
                    }
                }
                $isBaseUnit = $mutationUnit == 'unit';
                $unitField = $mutationUnit . '_id';
                $ratioField = $mutationUnit . '_ratio';
                $minimumQuantity = floor(($currentQuantity * -1) / ($isBaseUnit ? 1 : $item->$ratioField));
                $quantity = rand($minimumQuantity, 100);
                $endingQuantity = $currentQuantity + ($quantity * ($isBaseUnit ? 1 : $item->$ratioField));
                $unitRatio = $isBaseUnit ? 1 : $item->$ratioField;
                $baseUnitQuantity = $quantity * ($isBaseUnit ? 1 : $item->$ratioField);

                $mutable = Adjustment::create([
                    'batch_no' => 'ADJ' . Carbon::instance($transactionDate)->format('Ymd') . '0001',
                    'item_id' => $item->id,
                    'adjustment_type' => $i == 0 ? 'balance' : $quantity > 0 ? 'receipt' : 'issue',
                    'quantity' => $quantity,
                    'unit_id' => $item->$unitField,
                    'quantity_unit_ratio' => $unitRatio,
                    'base_unit_quantity' => $baseUnitQuantity,
                    'created_by' => $item->store->users->random()->id,
                    'created_at' => $transactionDate,
                    'updated_at' => $transactionDate,
                ]);
                
                $mutable->mutation()->save(Mutation::make([
                    'item_id' => $item->id,
                    'quantity' => $quantity,
                    'quantity_unit_ratio' => $unitRatio,
                    'base_unit_quantity' => $baseUnitQuantity,
                    'starting_quantity' => $currentQuantity,
                    'ending_quantity' => $endingQuantity,
                    'created_at' => $transactionDate,
                    'updated_at' => $transactionDate,
                ]));
                $currentQuantity = $endingQuantity;
                $transactionDate = $faker->dateTimeBetween($transactionDate, Carbon::instance($transactionDate)->addWeeks('1 week'));
            }
        });
    }
}
