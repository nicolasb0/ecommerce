import React from 'react';
import Product from "./Product";
import axios from 'axios';
import ProductInterface from '../interfaces/ProductInterface';

interface ProductListProps {
  onAddClick: () => void
};

interface ProductListState {
  products: ProductInterface[],
  checkedProducts: ProductInterface[]
};

class ProductList extends React.Component<ProductListProps, ProductListState> {
  constructor(props: ProductListProps) {
    super(props);
    this.state = {
      products: [
      ],
      checkedProducts: [
      ]
    };
    this.addToCheckedProducts = this.addToCheckedProducts.bind(this);
    this.removeFromCheckedProducts = this.removeFromCheckedProducts.bind(this);
    this.handleMassDelete = this.handleMassDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  };

  addToCheckedProducts = (product: ProductInterface) => {
    const updatedCheckedProducts = [...this.state.checkedProducts];
    updatedCheckedProducts.push(product);
    this.setState({
      checkedProducts: updatedCheckedProducts
    });
  };

  removeFromCheckedProducts = (product: ProductInterface) => {
    const updatedCheckedProducts = this.state.checkedProducts.filter(
      (p) => p.id !== product.id
    );
    this.setState({
      checkedProducts: updatedCheckedProducts
    });
  };

  componentDidMount() {
    axios.get('http://localhost:' + process.env.REACT_APP_SERVER_PORT + '/products')
      .then((response) => {
        console.log(response);
        this.setState({
          products: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleMassDelete() {
    const headers = {
      'Content-Type': 'application/json',
    }

    let body = {
      ids: this.state.checkedProducts.map(product => product.id)
    }

    axios.patch('http://localhost:' + process.env.REACT_APP_SERVER_PORT + '/products/delete', body, {
      headers: headers
    })
      .then((response) => {
        console.log(response);
        this.setState({
          products: this.state.products.filter(product => !this.state.checkedProducts.includes(product))
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    this.props.onAddClick();
  };

  render() {
    return (
      <>
        <header>
          <h1>
            Product List
          </h1>
          <div className="buttons">
            <button
              onClick={this.handleAdd}
            >
              ADD
            </button>
            <button className="" onClick={this.handleMassDelete}>
              MASS DELETE
            </button>
          </div>
        </header>
        <div className="product-list">
          {this.state.products.map((product, key) =>
            <Product
              key={key}
              product={product}
              checked={this.state.checkedProducts.includes(product)}
              addToCheckedProducts={this.addToCheckedProducts}
              removeFromCheckedProducts={this.removeFromCheckedProducts}
            />
          )}
        </div>
      </>
    );
  };
};

export default ProductList;
