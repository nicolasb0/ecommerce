<?php

namespace Project\Gateways;

use Project\Database;

class ProductsGateway
{
    private $database;
    private $dvdGateway;
    private $furnitureGateway;
    private $bookGateway;

    public function __construct(Database $database)
    {
        $this->dvdGateway = new DvdGateway($database);
        $this->furnitureGateway = new FurnitureGateway($database);
        $this->bookGateway = new BookGateway($database);
    }

    public function getAll(): array
    {
        $array = array_merge(
            $this->dvdGateway->getAll(),
            $this->furnitureGateway->getAll(),
            $this->bookGateway->getAll()
        );

        usort(
            $array,
            function ($a, $b) {
                return $a->id > $b->id;
            }
        );

        return $array;
    }
}
