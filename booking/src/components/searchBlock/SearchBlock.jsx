import { format } from "date-fns";
import { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { SearchContext } from "../../context/SearchContext";
import "./searchBlock.css";

const SearchBlock = ({ location, searchHandler }) => {
  const { city, dates, options } = useContext(SearchContext);

  const [openDate, setOpenDate] = useState(false);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [destination, setDestination] = useState(city ?? "");
  const [newOptions, setNewOptions] = useState(options);

  const [date, setDate] = useState(dates);

  return (
    <div className="listSearch">
      <h1 className="lsTitle">Search</h1>
      <span className="label">Destination</span>
      <input
        type="text"
        placeholder={destination}
        className="inputSearch"
        onChange={(e) => setDestination(e.target.value)}
      />
      <span className="label">Check-in date</span>
      <div className="date__Container">
        <input
          type="text"
          placeholder={`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(
            date[0].endDate,
            "dd/MM/yyyy"
          )}`}
          className="inputdate"
          onClick={() => setOpenDate((prevDate) => !prevDate)}
        />
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
      <span className="label">Options</span>
      <div className="option">
        <span>Min Price (per night)</span>
        <input
          type="number"
          className="inputOption"
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div className="option">
        <span>Max Price (per night)</span>
        <input
          type="number"
          className="inputOption"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div className="option">
        <span>Adult</span>
        <input
          type="number"
          className="inputOption"
          placeholder={newOptions.adult}
          onChange={(e) =>
            setNewOptions({
              ...newOptions,
              adult: e.target.value,
            })
          }
        />
      </div>
      <div className="option">
        <span>Children</span>
        <input
          type="number"
          className="inputOption"
          placeholder={newOptions.children}
          onChange={(e) =>
            setNewOptions({
              ...newOptions,
              children: e.target.value,
            })
          }
        />
      </div>
      <div className="option">
        <span>Room</span>
        <input
          type="number"
          className="inputOption"
          placeholder={newOptions.room}
          onChange={(e) =>
            setNewOptions({
              ...newOptions,
              room: e.target.value,
            })
          }
        />
      </div>
      <button
        onClick={() =>
          searchHandler(destination, date, minPrice, maxPrice, newOptions)
        }
      >
        Search
      </button>
    </div>
  );
};

export default SearchBlock;
