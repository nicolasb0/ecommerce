<?php

declare(strict_types=1);

require './vendor/autoload.php';

use Dotenv\Dotenv;
use Equip\Dispatch\MiddlewareCollection;
use GuzzleHttp\Psr7\ServerRequest;
use Project\Database;
use Project\Middleware\ProductMiddleware;
use Project\ResponseEmitter;

set_error_handler('\Project\ErrorHandler::handleError');
set_exception_handler('\Project\ErrorHandler::handleException');

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

$parts = explode('/', $_SERVER['REQUEST_URI']);

$id = $parts[2] ?? null;

$database = new Database(
    getenv('DB_HOST') . ':' . getenv('DB_PORT'),
    getenv('DB_DATABASE'),
    getenv('DB_USER'),
    getenv('DB_PASSWORD')
);

$serverRequest = ServerRequest::fromGlobals();

$middleware = [
    new ProductMiddleware($database),
];

$default = function (ServerRequestInterface $request) {
    return new Response();
};

$collection = new MiddlewareCollection($middleware);

$response = $collection->dispatch($serverRequest, $default);

$emitter = new ResponseEmitter();
$emitter->emit($response);
