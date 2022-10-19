<?php

namespace Project\Gateways;

use Project\Database;
use InvalidArgumentException;

class GatewayFactory
{
    public function __construct()
    {
    }

    private static $gatewayMap = [
        1 => DvdGateway::class,
        2 => FurnitureGateway::class,
        3 => BookGateway::class
    ];

    public static function createGateway(int $type, Database $database): ProductGateway
    {
        if (!array_key_exists($type, self::$gatewayMap)) {
            throw new InvalidArgumentException(
                'No product type with this number'
            );
        }

        $gateway = new self::$gatewayMap[$type]($database);

        return $gateway;
    }
}
