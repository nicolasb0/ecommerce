<?php

namespace Project\Entities;

class Dvd extends Product
{
    private $size;

    public function setSize($size)
    {
        $this->size = $size;
    }

    public function getSize()
    {
        return $this->size;
    }

    public function setData(array $data)
    {
        parent::setData($data);
        $this->setSize($data['size']);
    }
}
