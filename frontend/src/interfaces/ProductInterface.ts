interface ProductInterface {
    id: number,
    type: number,
    sku: string,
    name: string,
    price: number,
    size?: number,
    weight?: number,
    height?: number,
    length?: number,
    width?: number
};

export default ProductInterface;
