<?php

namespace Entree\Transformers;

use Entree\Purchase\Supplier;
use League\Fractal\TransformerAbstract;

class SupplierTransformer extends TransformerAbstract
{

    protected $availableIncludes = [
        'createdBy',
    ];

    /**
     * A Fractal transformer.
     *
     * @return array
     */
    public function transform(Supplier $supplier)
    {
        return [
            'id' => $supplier->id,
            'slug' => str_slug($supplier->name),
            'name' => $supplier->name,
            'address' => $supplier->address,
            'phone' => $supplier->phone,
            'email' => $supplier->email,
            'createdAt' => $supplier->created_at->toIso8601String(),
        ];
    }

    public function includeCreatedBy(Supplier $supplier)
    {
        return $this->item($supplier->createdBy, new UserTransformer);
    }

}
