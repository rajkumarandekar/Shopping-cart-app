import { Link } from "react-router-dom";

import Header from "../Header";

import "./index.css";

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-heading">Electronics That Get YOU Noticed</h1>
        <img
          src="https://digitalmarketerschicago.com/wp-content/uploads/2018/11/ecommerce-marketing-for-companies.jpg"
          alt="clothes that get you noticed"
          className="home-mobile-img"
        />
        <p className="home-description">
          Electronics are universal in our daily lives, and have led to a deep
          connection with technology in most of the world. Computers, etc. Of
          course, there are many who take it a step further and produce audio
          and video of their own! If you have a love for technology and want to
          share with the world, selling electronics online could be right for
          you.
        </p>
        <Link to="/products">
          <button type="button" className="shop-now-button">
            Shop Now
          </button>
        </Link>
      </div>
      <img
        src="https://www.witszen.com/wp-content/uploads/2018/05/ecommerce-website-development.jpg"
        alt="clothes that get you noticed"
        className="home-desktop-img"
      />
    </div>
  </>
);

export default Home;
