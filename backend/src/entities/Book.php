<?php

namespace Project\Entities;

class Book extends Product
{
    private $weight;

    public function setWeight($weight)
    {
        $this->weight = $weight;
    }

    public function getWeight()
    {
        return $this->weight;
    }

    public function setData(array $data)
    {
        parent::setData($data);
        $this->setWeight($data['weight']);
    }
}
