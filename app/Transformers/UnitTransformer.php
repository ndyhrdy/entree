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
            'id' => $unit->id,
            'name' => $unit->name,
            'pluralName' => $unit->plural_name,
            'shortName' => $unit->short_name,
            'isDefault' => (bool) $unit->is_default,

            'createdAt' => $unit->created_at->toIso8601String(),
            'isCreatedAutomatically' => $unit->created_by === null,
        ];
    }
}
