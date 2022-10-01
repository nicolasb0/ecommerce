<?php

namespace Project;

use ErrorException;
use GuzzleHttp\Psr7\Response;
use Nyholm\Psr7\Stream;
use Throwable;

class ErrorHandler
{
    public static function handleException(Throwable $exception)
    {
        $response = new Response();
        $response = $response->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        $response = $response->withHeader('Content-type', 'application/json; charset=UTF-8');
        $response = $response->withHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
        $response = $response->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        $response = $response->withStatus(500);

        $stream = Stream::create(
            json_encode(
                [
                'code' => $exception->getCode(),
                'message' => $exception->getMessage(),
                'file' => $exception->getFile(),
                'line' => $exception->getLine(),
                ]
            )
        );
        $response = $response->withBody($stream);

        $emitter = new ResponseEmitter();
        $emitter->emit($response);
    }

    public static function handleError(
        int $errno,
        string $errstr,
        string $errfile,
        int $errline
    ): bool {
        throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
    }
}
