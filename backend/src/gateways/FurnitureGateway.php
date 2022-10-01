<?php

namespace Project\Gateways;

use PDO;
use Project\Database;
use Project\Entities\Product;

class FurnitureGateway extends ProductGateway
{
    public function __construct(Database $database)
    {
        parent::__construct($database);
        $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, 1);
    }

    public function getAll(): array
    {
        $sql = 'SELECT *
                FROM product
                INNER JOIN furniture ON product.id = furniture.id
                WHERE type = 2';

        $stmt = $this->conn->query($sql);

        $data = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $furniture = (object) $row;
            $data[] = $furniture;
        }

        return $data;
    }

    public function create(Product $furniture): string
    {
        $sql = 'INSERT INTO
        product
    SET
        sku = :sku, 
        name = :name, 
        price = :price,
        type = 2;
        INSERT INTO
        furniture
    SET
        id = (SELECT id FROM product WHERE sku = :sku), 
        height = :height,
        width = :width,
        length = :length';

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(':sku', $furniture->getSku(), PDO::PARAM_STR);
        $stmt->bindValue(':name', $furniture->getName(), PDO::PARAM_STR);
        $stmt->bindValue(':price', $furniture->getPrice(), PDO::PARAM_STR);
        $stmt->bindValue(':height', $furniture->getHeight(), PDO::PARAM_INT);
        $stmt->bindValue(':width', $furniture->getWidth(), PDO::PARAM_INT);
        $stmt->bindValue(':length', $furniture->getLength(), PDO::PARAM_INT);

        $stmt->execute();

        return $this->conn->lastInsertId();
    }

    public function delete(array $ids): int
    {
        $sql = 'DELETE FROM product
                WHERE id = :id';

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(':id', $id, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt->rowCount();
    }
}
