import { Component } from "react";
import { Link } from "react-router-dom";

import Loader from "react-loader-spinner";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

import CartContext from "../../context/CartContext";

import Header from "../Header";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class ProductItemDetails extends Component {
  state = {
    productData: {},
    similarProductsData: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 1,
  };

  componentDidMount() {
    this.getProductData();
  }

  getFormattedData = (data) => ({
    availability: data.availability,
    brand: data.brand,
    description: data.description,
    id: data.id,
    icon: data.icon,
    price: data.price,

    name: data.name,
  });

  getProductData = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });
    const apiUrl = `https://gist.githubusercontent.com/sandeepdillerao/edb372a95d6cf1a2a49b79577d023281/raw?/75bf5e59e47748fad0d01ca63c81dd3791c2615c/product.json/products?
    /products/${id}`;

    const response = await fetch(apiUrl);
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedData = this.getFormattedData(fetchedData);

      this.setState({
        productData: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <Link to="/products">
        <button type="button" className="button">
          Continue Shopping
        </button>
      </Link>
    </div>
  );

  onDecrementQuantity = () => {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
    }
  };

  onIncrementQuantity = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  renderProductDetailsView = () => (
    <CartContext.Consumer>
      {(value) => {
        const { productData, quantity } = this.state;
        const {
          availability,
          brand,
          description,
          icon,
          price,

          name,
        } = productData;
        const { addCartItem } = value;
        const onClickAddToCart = () => {
          addCartItem({ ...productData, quantity });
        };

        return (
          <div className="product-details-success-view">
            <div className="product-details-container">
              <img src={icon} alt="product" className="product-image" />
              <div className="product">
                <h1 className="product-name">{name}</h1>
                <p className="price-details">Rs {price}/20000-</p>
                <div className="rating-and-reviews-count"></div>
                <p className="product-description">
                  {description} A monitor is a display device like a TV screen
                  that interprets and displays the graphical output signal from
                  your computer’s graphics card and displays it on the screen.
                </p>
                <div className="label-value-container">
                  <p className="label">Available:</p>
                  <p className="value">{availability}</p>
                </div>
                <div className="label-value-container">
                  <p className="label">Brand:</p>
                  <p className="value">{brand}</p>
                </div>
                <hr className="horizontal-line" />
                <div className="quantity-container">
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onDecrementQuantity}
                    testid="minus"
                  >
                    <BsDashSquare className="quantity-controller-icon" />
                  </button>
                  <p className="quantity">{quantity}</p>
                  <button
                    type="button"
                    className="quantity-controller-button"
                    onClick={this.onIncrementQuantity}
                    testid="plus"
                  >
                    <BsPlusSquare className="quantity-controller-icon" />
                  </button>
                </div>
                <button
                  type="button"
                  className="button add-to-cart-btn"
                  onClick={onClickAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </CartContext.Consumer>
  );

  renderProductDetails = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    );
  }
}

export default ProductItemDetails;
