<?php

namespace Project\Middleware;

use GuzzleHttp\Psr7\Response;
use Nyholm\Psr7\Stream;
use Project\Database;
use Project\Entities\ProductFactory;
use Project\Gateways\GatewayFactory;
use Project\Gateways\ProductGateway;
use Project\Gateways\ProductsGateway;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class ProductMiddleware implements MiddlewareInterface
{
    private $database;

    public function __construct(Database $database)
    {
        $this->database = $database;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $response = new Response();
        $response = $response->withHeader('Content-type', 'application/json; charset=UTF-8');
        $response = $response->withHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
        $response = $response->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        switch ($request->getUri()->getPath()) {
            case '/products':
                switch ($request->getMethod()) {
                    case 'GET':
                        $gateway = new ProductsGateway($this->database);
                        $products = $gateway->getAll();

                        $stream = Stream::create(json_encode($products));
                        $response = $response->withBody($stream);
                        break;

                    case 'POST':
                        $data = (array) json_decode($request->getBody());

                        $gateway = GatewayFactory::createGateway(intval($data['type']), $this->database);
                        $product = ProductFactory::createProduct(intval($data['type']));

                        $skuExists = $gateway->checkSku($data);

                        if ($skuExists) {
                            echo json_encode(['error' => 'SKU already exists.']);
                            $response = $response->withStatus(422);
                            $stream = Stream::create(json_encode(['error' => 'SKU already exists.']));
                            $response = $response->withBody($stream);
                            break;
                        }

                        $product->setData($data);

                        $id = $gateway->create($product);

                        $response = $response->withStatus(201);

                        $stream = Stream::create(
                            json_encode(
                                [
                                'message' => 'Product created',
                                'id' => $id,
                                ]
                            )
                        );
                        $response = $response->withBody($stream);
                        break;

                    case 'OPTIONS':
                        $response = $response->withStatus(201);
                        break;

                    default:
                        $response = $response->withHeader('Allow', 'GET, POST');
                        $response = $response->withStatus(405);
                }
                break;

            case '/products/delete':
                switch ($request->getMethod()) {
                    case 'PATCH':
                        $gateway = new ProductGateway($this->database);

                        $data = (array) json_decode($request->getBody());
                        $ids = $data['ids'];

                        $gateway->delete($ids);

                        $response = $response->withStatus(201);

                        $stream = Stream::create(
                            json_encode(
                                [
                                'message' => 'Products deleted',
                                'ids' => $ids,
                                ]
                            )
                        );
                        $response = $response->withBody($stream);
                        break;

                    case 'OPTIONS':
                        $response = $response->withStatus(201);
                        break;

                    default:
                        $response = $response->withHeader('Allow', 'PATCH');
                        $response = $response->withStatus(405);
                }
                break;

            default:
                $response = $response->withStatus(404);
        }

        return $response;
    }
}
