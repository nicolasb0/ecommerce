import React from 'react';

interface FurnitureProps {
  onInputChange: React.ChangeEventHandler<HTMLInputElement>,
  errors: {
    height: string,
    width: string,
    length: string
  }
};

class Furniture extends React.Component<FurnitureProps> {
  constructor(props: FurnitureProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onInputChange(e);
  }

  render() {
    return (
      <>
        <span className=''>Please provide dimensions in HxWxL format</span>
        <label htmlFor="height">Height (CM)
          <input id="height"
            name="height"
            onChange={this.handleChange} />
        </label>
        {this.props.errors.height.length > 0 &&
          <><span className='error'>{this.props.errors.height}</span></>}
        <label htmlFor="width">Width (CM)
          <input id="width"
            name="width"
            onChange={this.handleChange} />
        </label>
        {this.props.errors.width.length > 0 &&
          <><span className='error'>{this.props.errors.width}</span></>}
        <label htmlFor="length">Length (CM)
          <input id="length"
            name="length"
            onChange={this.handleChange} />
        </label>
        {this.props.errors.length.length > 0 &&
          <><span className='error'>{this.props.errors.length}</span></>}
      </>
    );
  };
};

export default Furniture;

