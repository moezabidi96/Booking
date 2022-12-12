import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels/?featured=true&limit=4");
  const images = [
    " https://t-cf.bstatic.com/xdata/images/hotel/max500/62261541.jpg?k=3ef9943ed49b4959b2cb9fbbb4f75ee2a7a6c9460bbfd7634b6fcd23674863f3&o=",
    "https://t-cf.bstatic.com/xdata/images/hotel/max500/7991107.jpg?k=b4c80a2ce0a0649879fc9e78efaadbc8be9bb79ae661aff7f37262ef872586a0&o=",
    "https://t-cf.bstatic.com/xdata/images/hotel/max500/7991107.jpg?k=b4c80a2ce0a0649879fc9e78efaadbc8be9bb79ae661aff7f37262ef872586a0&o=",
    "https://t-cf.bstatic.com/xdata/images/hotel/max500/69813393.jpg?k=aca2217cc21edcf3f108b94bc79ee527f8c709732b6e20815fcf4ba1f7fae991&o=",
  ];
  if (error) {
    <div>Error please try again</div>;
  }

  return (
    <div className="fp">
      {loading || !data.hotels
        ? "loading please wait"
        : data.hotels.map((hotel, index) => (
            <div className="fpItem" key={index}>
              <img
                src={hotel.photo ? hotel.photo[0] : images[index]}
                alt="les meilleurs randonnée tunisie"
                className="fpImg"
              />
              <div className="fpTitles">
                <h5>{hotel.name}</h5>
                <h6>{hotel.city}</h6>
                <h3>Starting from {hotel.cheapestPrice}$</h3>
              </div>
              {hotel.rating && (
                <div className="reviews">
                  <div className="numReview">
                    <h1>{hotel.rating}</h1>
                  </div>
                  <h3 className="reviewTitle">Wonderful</h3>
                  <h6 className="totalReview">507 reviews</h6>
                </div>
              )}
            </div>
          ))}
    </div>
  );
};

export default FeaturedProperties;
