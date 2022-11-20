import { Link } from "react-router-dom";

import "./index.css";

const ProductCard = (props) => {
  const { productData } = props;
  const { name, icon, price, id } = productData;

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="link-item">
        <img src={icon} alt="product" className="thumbnail" />
        <h1 className="title">{name}</h1>
      
        <div className="product-details">
          <p className="price">Rs {price}/-</p>
        </div>
      </Link>
    </li>
  );
};
export default ProductCard;
