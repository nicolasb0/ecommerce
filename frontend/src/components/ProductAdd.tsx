import "./ProductAdd.scss";
import React from 'react';
import Dvd from "./Dvd";
import Furniture from "./Furniture";
import Book from "./Book";
import axios from 'axios';

interface IErrors {
  general: string,
  name: string,
  sku: string,
  price: string,
  size: string,
  height: string,
  width: string,
  length: string,
  weight: string
};

interface ProductAddProps {
  onCancelClick: () => void,
  onProductSaved: () => void
};

interface ProductAddState {
  type: number,
  name: string,
  sku: string,
  price: string,
  size: string,
  height: string,
  width: string,
  length: string,
  weight: string,
  errors: IErrors
};

class ProductAdd extends React.Component<ProductAddProps, ProductAddState> {
  constructor(props: ProductAddProps) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.createProductMap = this.createProductMap.bind(this);
    this.state = {
      type: 1,
      sku: '',
      name: '',
      price: '',
      size: '',
      height: '',
      width: '',
      length: '',
      weight: '',
      errors: {
        general: '',
        name: '',
        sku: '',
        price: '',
        size: '',
        height: '',
        width: '',
        length: '',
        weight: ''
      }
    };
  };

  validateForm = () => {
    let valid = true;
    let errors = this.state.errors;

    for (const propt in errors) {
      switch (propt) {
        case 'sku':
          if (this.state.sku.length < 1) {
            errors.sku = 'SKU must not be empty.';
            valid = false;
          } else {
            errors.sku = '';
          };
          break;
        case 'name':
          if (this.state.name.length < 1) {
            errors.name = 'Name must not be empty.';
            valid = false;
          } else if (typeof this.state.sku !== 'string') {
            errors.name = 'Name must be a string.';
            valid = false;
          } else {
            errors.name = '';
          };
          break;
        case 'price':
          if (this.state.price.length < 1) {
            errors.price = 'Price must not be empty.';
            valid = false;
          } else if (isNaN(Number(this.state.price))) {
            errors.price = 'Price must be a number.';
            valid = false;
          } else {
            errors.price = '';
          };
          break;
        case 'size':
          if (this.state.type != 1) {
            errors.size = '';
          } else if (this.state.size.length < 1) {
            errors.size = 'Size must not be empty.';
            valid = false;
          } else if (isNaN(Number(this.state.size))) {
            errors.size = 'Size must be a number.';
            valid = false;
          } else {
            errors.size = '';
          };
          break;
        case 'height':
          if (this.state.type != 2) {
            errors.height = '';
          } else if (this.state.height.length < 1) {
            errors.height = 'Height must not be empty.';
            valid = false;
          } else if (isNaN(Number(this.state.height))) {
            errors.height = 'Height must be a number.';
            valid = false;
          } else {
            errors.height = '';
          };
          break;
        case 'width':
          if (this.state.type != 2) {
            errors.width = '';
          } else if (this.state.width.length < 1) {
            errors.width = 'Width must not be empty.';
            valid = false;
          } else if (isNaN(Number(this.state.width))) {
            errors.width = 'Width must be a number.';
            valid = false;
          } else {
            errors.width = '';
          };
          break;
        case 'length':
          if (this.state.type != 2) {
            errors.length = '';
          } else if (this.state.length.length < 1) {
            errors.length = 'Length must not be empty.';
            valid = false;
          } else if (isNaN(Number(this.state.length))) {
            errors.length = 'Length must be a number.';
            valid = false;
          } else {
            errors.length = '';
          };
          break;
        case 'weight':
          if (this.state.type != 3) {
            errors.weight = '';
          } else if (this.state.weight.length < 1) {
            errors.weight = 'Weight must not be empty.';
            valid = false;
          } else if (isNaN(Number(this.state.weight))) {
            errors.weight = 'Weight must be a number.';
            valid = false;
          } else {
            errors.weight = '';
          };
          break;
        default:
          break;
      };
    };

    this.setState({ errors });

    return valid;
  };

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value
    });
  };

  handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const target = event.target as HTMLSelectElement;
    const value = Number(target.value);
    const name = target.name;

    this.setState({
      ...this.state,
      [name]: value
    });
  };

  handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (this.validateForm()) {
      const headers = {
        'Content-Type': 'application/json',
      };

      let body: {
        type?: number
        name?: string,
        sku?: string,
        price?: string,
        size?: string,
        height?: string,
        width?: string,
        length?: string,
        weight?: string
      } = {};

      switch (this.state.type) {
        case 1:
          body.type = this.state.type;
          body.name = this.state.name;
          body.sku = this.state.sku;
          body.price = this.state.price;
          body.size = this.state.size;
          break;
        case 2:
          body.type = this.state.type;
          body.name = this.state.name;
          body.sku = this.state.sku;
          body.price = this.state.price;
          body.height = this.state.height;
          body.width = this.state.width;
          body.length = this.state.length;
          break;
        case 3:
          body.type = this.state.type;
          body.name = this.state.name;
          body.sku = this.state.sku;
          body.price = this.state.price;
          body.weight = this.state.weight;
          break;
        default:
          break;
      };

      axios.post('http://localhost:' + process.env.REACT_APP_SERVER_PORT + '/products', body, {
        headers: headers
      })
        .then((response) => {
          console.log(response);

          console.info('Valid Form')

          this.props.onProductSaved();
        })
        .catch((error) => {
          let errors = this.state.errors;

          if (error.response.error == 'SKU already exists.') {
            errors.sku = 'SKU already exists';
          }
          else {
            errors.general = error.message;
          };

          this.setState({ errors });

          console.log(error);
        });
    } else {
      console.error('Invalid Form')
    };
  };

  handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    this.props.onCancelClick();
  };

  createProductMap = (errors: IErrors, type: number) => {
    const productMap: { [key: number]: JSX.Element; } = {
      1: <Dvd
        onInputChange={this.handleInputChange}
        errors={(({ size }) => ({ size }))(errors)}
      />,
      2: <Furniture
        onInputChange={this.handleInputChange}
        errors={(({ height, width, length }) => ({ height, width, length }))(errors)}
      />,
      3: <Book
        onInputChange={this.handleInputChange}
        errors={(({ weight }) => ({ weight }))(errors)}
      />
    };

    return productMap[type];
  };

  render() {
    return (
      <div className="product-add">
        <header>
          <h1>
            Product Add
          </h1>
          <div className="buttons">
            <button form="myform" onClick={this.handleSubmit}>
              Save
            </button>
            <button
              onClick={this.handleCancel}
            >
              Cancel
            </button>
          </div>
        </header>
        <div>
          <form id="product_form">
            {this.state.errors.general.length > 0 &&
              <><span className='error'>{this.state.errors.general}</span></>}
            <label htmlFor="sku">SKU
              <input type="text" id="sku" name="sku" value={this.state.sku} onChange={this.handleInputChange} />
            </label>
            {this.state.errors.sku.length > 0 &&
              <><span className='error'>{this.state.errors.sku}</span></>}
            <label htmlFor="name">Name
              <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleInputChange} />
            </label>
            {this.state.errors.name.length > 0 &&
              <><span className='error'>{this.state.errors.name}</span></>}
            <label htmlFor="price">Price ($)
              <input type="text" id="price" name="price" value={this.state.price} onChange={this.handleInputChange} />
            </label>
            {this.state.errors.price.length > 0 &&
              <><span className='error'>{this.state.errors.price}</span></>}
            <label htmlFor="type">Type Switcher
              <select id="productType" name="type" onChange={this.handleSelectChange} value={this.state.type}>
                <option id="DVD" value="1">DVD</option>
                <option id="Furniture" value="2">Furniture</option>
                <option id="Book" value="3">Book</option>
              </select>
            </label>
            {this.createProductMap(this.state.errors, this.state.type)}
          </form>
        </div>
      </div>
    );
  };
};

export default ProductAdd;
