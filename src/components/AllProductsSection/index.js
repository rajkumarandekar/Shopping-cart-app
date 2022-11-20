import { Component } from "react";
import Loader from "react-loader-spinner";

import FiltersGroup from "../FiltersGroup";
import ProductCard from "../ProductCard";

import "./index.css";

const categoryOptions = [
  {
    name: "Samsung",
    categoryId: "1",
  },
  {
    name: "Sony",
    categoryId: "2",
  },
];

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeCategoryId: "",
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });

    const { activeCategoryId } = this.state;
    const apiUrl = ` https://gist.githubusercontent.com/sandeepdillerao/edb372a95d6cf1a2a49b79577d023281/raw?/75bf5e59e47748fad0d01ca63c81dd3791c2615c/product.json/products?category=${activeCategoryId}`;
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    if (response.ok) {
      const fetchedData = await response.json();
      console.log(response);
      const updatedData = fetchedData.map((product) => ({
        name: product.name,

        price: product.price,
        id: product.id,
        icon: product.icon,
      }));

      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      });
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      });
    }
  };

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please Try again.
      </p>
    </div>
  );

  renderProductsListView = () => {
    const { productsList } = this.state;
    const shouldShowProductsList = productsList.length > 0;

    return shouldShowProductsList ? (
      <div className="all-products-container">
        <ul className="products-list">
          {productsList.map((product) => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
          className="no-products-img"
          alt="no products"
        />
        <h1 className="no-products-heading">No Products Found</h1>
        <p className="no-products-description">
          We could not find any products. Try other filters.
        </p>
      </div>
    );
  };
  changeCategory = (activeCategoryId) => {
    this.setState({ activeCategoryId }, this.getProducts);
  };
  renderAllProducts = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      default:
        return null;
    }
  };

  render() {
    const { activeCategoryId } = this.state;
    return (
      <div className="all-products-section">
        <FiltersGroup
          categoryOptions={categoryOptions}
          activeCategoryId={activeCategoryId}
          changeCategory={this.changeCategory}
        />

        {this.renderAllProducts()}
      </div>
    );
  }
}

export default AllProductsSection;
