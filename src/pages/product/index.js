import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }
  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get(`/products/${id}`);
    const { data: product } = response;
    this.setState({ product });
  }
  handleGoBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { product } = this.state;
    if (!product) {
      return <div className="product-info">Carregando ...</div>;
    }
    return (
      <>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>
            URL:{' '}
            <a target="_blank" rel="noopener noreferrer" href={product.url}>
              {product.url}
            </a>
          </p>
          <div>
            <Link to={'/'}>Voltar</Link>
          </div>
        </div>
      </>
    );
  }
}
