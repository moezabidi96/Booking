import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ hotel }) => {
  return (
    <div className="searchItem">
      <img
        src={
          !hotel.photos
            ? hotel.photos[0]
            : "https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        }
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{hotel.title}</h1>
        <span className="siDistance">{hotel.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">{hotel.address}</span>
        <span className="siFeatures">{hotel.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {hotel.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{hotel.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">{hotel.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${hotel._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
