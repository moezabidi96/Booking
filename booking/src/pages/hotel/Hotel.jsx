import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import "./hotel.css";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  // faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Hotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);

  const { user } = useContext(AuthContext);

  const { data, loading, error } = useFetch(`/hotels/${id}`);

  const [openModal, setOpenModal] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const selectHandler = (index) => {
    setImageIndex(index);
    setOpenImage(true);
  };

  const handleMove = (dirrection) => {
    if (dirrection === "l" && imageIndex > 0) {
      setImageIndex((prevIndex) => prevIndex - 1);
    }
    if (dirrection === "r" && imageIndex < data.hotel.photos.length - 1) {
      setImageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  useEffect(() => {
    if (dates.length === 0) {
      navigate("/");
    }
  });

  let days;
  if (dates.length > 0) {
    days = dayDifference(
      dates[0].startDate || new Date(),
      dates[0].endDate || new Date()
    );
  }

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  if (error) {
    <div>error please try again</div>;
  }
  return (
    <React.Fragment>
       <div>
                <title>Hotel</title>
                <link rel="icon" href={"path"}/>
                <meta name="description" content={"Decouvrir le sud tunisien, Visite des monuments de Dougga, randonnée au nature de bizerte, Explorez Ain Draham"}/>
                <meta name="keywords" content={"Decouvrir le sud tunisien, Visite des monuments de Dougga, randonnée au nature de bizerte, Explorez Ain Draham"}/>
                <meta property="og:title" content={"og:title"}/>
                <meta property="og:description" content={"og:description"}/>
             </div>
      {openImage && (
        <div className="modalContainer">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="close"
            onClick={() => setOpenImage(false)}
          />
          <div className="modal">
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />

            <img
              src={data.hotel.photos[imageIndex]}
              alt="randonnée tunisie, incroyable randonnées tunisie,voyage avec hébergement, camping découverte nature Tunisie"
              className="modalImage"
            />

            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        </div>
      )}
      <Navbar />
      <Header type="list" />

      <div className="hotelBody">
        {loading || !data.hotel ? (
          "Please wait"
        ) : (
          <div className="hotelContainer">
            <div className="topContainer">
              <div className="hotelInformation">
                <span className="hotelTitle">{data.hotel.name} </span>
                <span className="hotelAddress">{data.hotel.address}</span>
                <span className="hotelDistance">
                  Excellent location - {data.hotel.distance}m from center
                </span>
                <span className="hotelPriceHighlight">
                  Book a stay over $114 at this property and get a free airport
                  taxi{" "}
                </span>
              </div>
              <button className="bookNow" onClick={handleClick}>
                Reserve or Book Now!
              </button>
            </div>
            <div className="hotelImages">
              {data.hotel.photos
                ? data.hotel.photos?.map((image, index) => {
                    return (
                      <img
                        key={index}
                        src={image}
                        alt="randonnée tunisie, incroyable randonnées tunisie,voyage avec hébergement, camping découverte nature Tunisie"
                        className="hotelImg"
                        onClick={() => selectHandler(index)}
                      />
                    );
                  })
                : "No Image"}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.hotel.title}</h1>
                <p className="hotelDesc">{data.hotel.desc}</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>
                  Perfect for a{" "}
                  {dayDifference(dates[0].startDate, dates[0].endDate)}-night
                  stay!
                </h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  ${data.hotel.cheapestPrice * days * options.room}
                  <b>
                    ({days + " "}
                    night)
                  </b>
                </h2>
                <button
                  className="bookNow"
                  style={{ width: "100%" }}
                  onClick={handleClick}
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
        )}
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
      </div>
      <MailList />
      <Footer />
    </React.Fragment>
  );
};

export default Hotel;
