<?php

namespace Project;

use Guzzlehttp\psr7\Response;

class ResponseEmitter
{
    public function emit(Response $response)
    {
        if (headers_sent()) {
            throw new RuntimeException('Headers were already sent. The response could not be emitted!');
        }

        // Step 1: Send the "status line".
        $statusLine = sprintf(
            'HTTP/%s %s %s',
            $response->getProtocolVersion(),
            $response->getStatusCode(),
            $response->getReasonPhrase()
        );
        header($statusLine, true); /* The header replaces a previous similar header. */

        // Step 2: Send the response headers from the headers list.
        foreach ($response->getHeaders() as $name => $values) {
            $responseHeader = sprintf(
                '%s: %s',
                $name,
                $response->getHeaderLine($name)
            );
            header($responseHeader, false); /* The header doesn't replace a previous similar header. */
        }

        // Step 3: Output the message body.
        echo $response->getBody();
    }
}
