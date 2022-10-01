import React from 'react';

interface BookProps {
  onInputChange: React.ChangeEventHandler<HTMLInputElement>,
  errors: {
    weight: string
  }
};

class Book extends React.Component<BookProps> {
  constructor(props: BookProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onInputChange(e);
  }

  render() {
    return (
      <>
        <span className=''>Please provide weight</span>
        <label htmlFor="weight">Weight (KG)
          <input id="weight"
            name="weight"
            onChange={this.handleChange} />
        </label>
        {this.props.errors.weight.length > 0 &&
          <><span className='error'>{this.props.errors.weight}</span></>}
      </>
    );
  };
};

export default Book;
