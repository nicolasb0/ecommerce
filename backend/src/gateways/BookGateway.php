<?php

namespace Project\Gateways;

use PDO;
use Project\Database;
use Project\Entities\Product;

class BookGateway extends ProductGateway
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
                INNER JOIN book ON product.id = book.id
                WHERE type = 3';

        $stmt = $this->conn->query($sql);

        $data = [];

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $book = (object) $row;
            $data[] = $book;
        }

        return $data;
    }

    public function create(Product $book): string
    {
        $sql = 'INSERT INTO
        product
    SET
        sku = :sku, 
        name = :name, 
        price = :price,
        type = 3;
        INSERT INTO
        book
    SET
        id = (SELECT id FROM product WHERE sku = :sku), 
        weight = :weight';

        $stmt = $this->conn->prepare($sql);

        $stmt->bindValue(':sku', $book->getSku(), PDO::PARAM_STR);
        $stmt->bindValue(':name', $book->getName(), PDO::PARAM_STR);
        $stmt->bindValue(':price', $book->getPrice(), PDO::PARAM_STR);
        $stmt->bindValue(':weight', $book->getWeight(), PDO::PARAM_INT);

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
