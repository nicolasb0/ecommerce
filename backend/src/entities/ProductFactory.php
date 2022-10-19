<?php

namespace Project\Entities;

use InvalidArgumentException;

class ProductFactory
{
    public function __construct()
    {
    }

    private static $productMap = [
        1 => Dvd::class,
        2 => Furniture::class,
        3 => Book::class
    ];

    public static function createProduct(int $type): Product
    {
        if (!array_key_exists($type, self::$productMap)) {
            throw new InvalidArgumentException(
                'No product type with this number'
            );
        }

        $product = new self::$productMap[$type]();

        return $product;
    }
}
