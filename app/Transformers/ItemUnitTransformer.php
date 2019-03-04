<?php

namespace Entree\Transformers;

use Entree\Item\Unit;
use League\Fractal\TransformerAbstract;

class ItemUnitTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Unit $unit)
    {
        return [
            'id' => $unit->id,
            'name' => $unit->name,
            'shortName' => $unit->short_name,
            'pluralName' => $unit->plural_name,
        ];
    }
}
