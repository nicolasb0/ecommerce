<?php

namespace Project\Tests;

use Httpful\Client;
use PHPUnit\Framework\TestCase;

class BooksTest extends TestCase
{
    protected $client;

    protected function setUp()
    {
        $this->client = new Client();
    }

    public function test()
    {
        $response = $this->client->get('http://localhost:8000/products');

        $this->assertEquals(200, $response->getStatusCode());

        $data = json_decode($response->getBody(), true);

        $this->assertArrayHasKey('id', $data[0]);
        $this->assertArrayHasKey('sku', $data[0]);
        $this->assertArrayHasKey('name', $data[0]);
        $this->assertArrayHasKey('price', $data[0]);
        $this->assertArrayHasKey('type', $data[0]);
    }
}
