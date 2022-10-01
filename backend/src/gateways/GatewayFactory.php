<?php

namespace Project\Gateways;

use Project\Database;

class GatewayFactory
{
    public function __construct()
    {
    }

    public static function createGateway(int $type, Database $database): ProductGateway
    {
        switch ($type) {
            case 1:
                $gateway = new DvdGateway($database);
                break;
            case 2:
                $gateway = new FurnitureGateway($database);
                break;
            case 3:
                $gateway = new BookGateway($database);
                break;
        }

        return $gateway;
    }
}
