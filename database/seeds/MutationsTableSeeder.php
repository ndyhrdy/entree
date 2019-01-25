<?php

use Entree\Item\Item;
use Entree\Item\Mutation;
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
        Item::with(['lastMutation', 'unit', 'unit2', 'unit3'])->get()->each(function (Item $item)
        {
            $numberOfMutations = rand(0, 50);
            $currentQuantity = $item->currentQuantity();
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
                $ratioField = $mutationUnit . '_ratio';
                $minimumQuantity = floor(($currentQuantity * -1) / ($isBaseUnit ? 1 : $item->$ratioField));
                $quantity = rand($minimumQuantity, 100);
                $endingQuantity = $currentQuantity + ($quantity * ($isBaseUnit ? 1 : $item->$ratioField));
                Mutation::create([
                    'item_id' => $item->id,
                    'quantity' => $quantity,
                    'quantity_unit_ratio' => $isBaseUnit ? 1 : $item->$ratioField,
                    'base_unit_quantity' => $quantity * ($isBaseUnit ? 1 : $item->$ratioField),
                    'starting_quantity' => $currentQuantity,
                    'ending_quantity' => $endingQuantity,
                ]);
                $currentQuantity = $endingQuantity;
            }
        });
    }
}
