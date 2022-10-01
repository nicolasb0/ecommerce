import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import ProductList from '../components/ProductList';
import axios from 'axios';

const mockFunction = jest.fn();

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Product list component', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', (done) => {

    const props = {
      onAddClick: mockFunction
    };

    const exampleProducts = [
      {
        type: 1,
        sku: 'SKU',
        name: 'NAME',
        price: 10,
        size: 5
      }
    ];

    const mockResponse = {
      data: exampleProducts
    };

    mockedAxios.get.mockResolvedValue(mockResponse);

    const wrapper: ShallowWrapper<typeof ProductList> = shallow<typeof ProductList>(<ProductList {...props} />,
      { disableLifecycleMethods: true });

    const instance = wrapper.instance() as ProductList;

    expect(wrapper.length).toBe(1);

    instance
      .componentDidMount();

    expect(axios.get).toHaveBeenCalled();

    console.log(wrapper.state())

    process.nextTick(() => {

      expect(wrapper.state()).toHaveProperty('products', [
        {
          type: 1,
          sku: 'SKU',
          name: 'NAME',
          price: 10,
          size: 5
        }
      ]);
      done();
    });

  });
});
