import React from 'react';

interface DvdProps {
  onInputChange: React.ChangeEventHandler<HTMLInputElement>,
  errors: {
    size: string
  }
};

class Dvd extends React.Component<DvdProps> {
  constructor(props: DvdProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onInputChange(e);
  }

  render() {
    return (
      <>
        <span className=''>Please provide size</span>
        <label htmlFor="size">Size (MB)
          <input id="size"
            name="size"
            onChange={this.handleChange} />
        </label>
        {this.props.errors.size.length > 0 &&
          <><span className='error'>{this.props.errors.size}</span></>}
      </>
    );
  }
};

export default Dvd;
