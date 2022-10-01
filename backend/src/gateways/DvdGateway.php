<?php

namespace Project\Gateways;

use PDO;
use Project\Database;
use Project\Entities\Product;

class DvdGateway extends ProductGateway
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
                INNER JOIN dvd ON product.id = dvd.id
                WHERE type = 1';

        $stmt = $this->conn->query($sql);

        $data = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $dvd = (object) $row;
            $data[] = $dvd;
        }

        return $data;
    }

    public function create(Product $dvd): string
    {
        $sql = 'INSERT INTO
        product
    SET
        sku = :sku, 
        name = :name, 
        price = :price,
        type = 1;
        INSERT INTO
        dvd
    SET
        id = (SELECT id FROM product WHERE sku = :sku), 
        size = :size';

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(':sku', $dvd->getSku(), PDO::PARAM_STR);
        $stmt->bindValue(':name', $dvd->getName(), PDO::PARAM_STR);
        $stmt->bindValue(':price', $dvd->getPrice(), PDO::PARAM_STR);
        $stmt->bindValue(':size', $dvd->getSize(), PDO::PARAM_INT);

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
