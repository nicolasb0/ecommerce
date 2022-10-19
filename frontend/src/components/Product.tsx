import ProductInterface from "../interfaces/ProductInterface";
import "./Product.scss";

interface ProductProps {
  product: ProductInterface,
  checked: boolean,
  removeFromCheckedProducts: (product: ProductInterface) => void,
  addToCheckedProducts: (product: ProductInterface) => void
};

function Product(props: ProductProps) {
  const toggle = () => {
    if (props.checked) {
      props.removeFromCheckedProducts(props.product);
    } else {
      props.addToCheckedProducts(props.product);
    }
  };

  const attributeMap: { [key: number]: JSX.Element; } = {
    1: <li>Size: {props.product.size} MB</li>,
    2: <li>Dimension: {props.product.height}x{props.product.width}x{props.product.length}</li>,
    3: <li>Weight: {props.product.weight}KG</li>
  };

  return (
    <div className="product">
      <input type="checkbox" className="delete-checkbox" onChange={() => toggle()} />
      <ul className="product-text">
        <li>{props.product.sku}</li>
        <li>{props.product.name}</li>
        <li>{Number(props.product.price).toFixed(2)} $</li>
        {attributeMap[Number(props.product.type)]}
      </ul>
    </div>
  );
};

export default Product;
