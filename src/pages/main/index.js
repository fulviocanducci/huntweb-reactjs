import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles.css';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      products: null,
      productInfo: {},
      page: 1
    };
  }
  componentDidMount() {
    this.loadProducts();
  }
  pageAction = type => {
    const {
      page,
      productInfo: { pages }
    } = this.state;
    if ((type === '-' && page === 1) || (type === '+' && page === pages))
      return;
    const pageNumber = type === '+' ? page + 1 : page - 1;
    this.loadProducts(pageNumber);
  };
  prevPage = () => {
    this.pageAction('-');
  };
  nextPage = () => {
    this.pageAction('+');
  };

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);
    const { docs: products, ...productInfo } = response.data;
    this.setState({ products, productInfo, page });
  };
  render() {
    const {
      products,
      page,
      productInfo: { pages }
    } = this.state;
    if (!products) {
      return (
        <div className="product-list">
          <article>Carregando ...</article>
        </div>
      );
    }
    return (
      <div className="product-list">
        {products.map((product, key) => (
          <article key={key}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <Link to={`/products/${product._id}`}>Acessar</Link>
          </article>
        ))}
        <div className="actions">
          <button onClick={this.prevPage} disabled={page === 1}>
            Anterior
          </button>
          <button onClick={this.nextPage} disabled={page === pages}>
            Próximo
          </button>
        </div>
      </div>
    );
  }
}
