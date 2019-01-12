<?php

namespace Entree\Transformers;

use Entree\Item\Unit;
use League\Fractal\TransformerAbstract;

class UnitTransformer extends TransformerAbstract
{
    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Unit $unit)
    {
        return [
            'name' => $unit->name,
            'pluralName' => $unit->plural_name,
            'shortName' => $unit->short_name,
            'isDefault' => (bool) $unit->is_default,
        ];
    }
}
