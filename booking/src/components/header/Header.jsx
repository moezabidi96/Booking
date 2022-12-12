import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faPlane,
  faTaxi,
  faCar,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useContext, useState } from "react";
import { format } from "date-fns";
import Options from "../options/Options";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
const Header = ({ type }) => {
  const navigate = useNavigate();

  const [openDate, setOpenDate] = useState(false);
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const initialOptionsState = {
    adult: 1,
    children: 0,
    room: 1,
  };
  const [options, setOptions] = useState(initialOptionsState);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: tomorrow,
      key: "selection",
    },
  ]);

  const incOptionHandler = (option) => {
    const copyOptions = options;
    const updatedOptions = {
      ...copyOptions,
      [option]: copyOptions[option] + 1,
    };
    setOptions(updatedOptions);
  };
  const decOptionHandler = (option) => {
    const copyOptions = options;
    if (copyOptions[option] > initialOptionsState[option]) {
      const updatedOptions = {
        ...copyOptions,
        [option]: copyOptions[option] - 1,
      };
      setOptions(updatedOptions);
    }
  };
  const destinationHandler = (e) => {
    setDestination(e.target.value);
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    if (destination && date[0].endDate > date[0].startDate) {
      dispatch({
        type: "NEW_SEARCH",
        payload: { city: destination, dates: date, options },
      });
      navigate("/hotels");
    }
  };

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <div>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels unlock instant saving of 10% or more
              with a free Booking account
            </p>
            <button className="headerBtn">Sign in / Register</button>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="where are you going?"
                  className="headerSearchInput"
                  onChange={destinationHandler}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate((prevDate) => !prevDate)}
                  className="headerSearchText"
                >
                  {`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
                    date[0].endDate,
                    "dd/MM/yyyy"
                  )}`}
                </span>

                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    minDate={new Date()}
                    className="date"
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  className="headerSearchText"
                  onClick={() => setOpenOptions((prevOption) => !prevOption)}
                >{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
                {openOptions && (
                  <Options
                    decOptionHandler={decOptionHandler}
                    incOptionHandler={incOptionHandler}
                    options={options}
                    initialOptionsState={initialOptionsState}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <button onClick={handleSearch} className="headerBtn">
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
