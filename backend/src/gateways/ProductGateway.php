<?php

namespace Project\Gateways;

use PDO;
use Project\Database;

class ProductGateway
{
    protected $conn;

    public function __construct(Database $database)
    {
        $this->conn = $database->getConnection();
    }

    public function delete(array $ids): int
    {
        $inQuery = implode(',', array_fill(0, count($ids), '?'));

        $sql = 'DELETE FROM product
                WHERE id IN (' . $inQuery . ')';

        $stmt = $this->conn->prepare($sql);

        foreach ($ids as $k => $id) {
            $stmt->bindValue(($k + 1), $id, PDO::PARAM_INT);
        }

        $stmt->execute();

        return $stmt->rowCount();
    }

    public function checkSku(array $data): bool
    {
        $sql = 'SELECT *
        FROM product
        WHERE sku = :sku';

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(':sku', $data['sku'], PDO::PARAM_STR);

        $stmt->execute();

        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($data) {
            $skuExists = true;
        } else {
            $skuExists = false;
        }

        return $skuExists;
    }
}
