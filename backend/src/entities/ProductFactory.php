<?php

namespace Project\Entities;

class ProductFactory
{
    public function __construct()
    {
    }

    public static function createProduct(int $type): Product
    {
        switch ($type) {
            case 1:
                $product = new Dvd();
                break;
            case 2:
                $product = new Furniture();
                break;
            case 3:
                $product = new Book();
                break;
        }

        return $product;
    }
}
