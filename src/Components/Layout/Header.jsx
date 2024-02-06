import {
  useRef,
  useState,
} from "react";
import { MdLocationOn, MdLogout } from "react-icons/md";
import {
  HiCalendar,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import Separator from "../Shared/Separator";
import useOutsideClick from "../Hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { NavLink, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const Header = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    Adult: 1,
    Children: 0,
    Room: 1,
  });
  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);


  const navigate = useNavigate();
  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    //note : =>  setSearchParams(encodedParams);
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  return (

    <div className="flex justify-center items-center">
      <NavLink to="/bookmark">
        <strong>Bookmarks</strong>
      </NavLink>
      <div className="flex w-full xl:max-w-5xl justify-between items-center gap-1 border-[1px] border-solid border-slate-200 rounded-xl p-2 m-4">
        <div className="relative flex items-center gap-2">
          <MdLocationOn className="inline-block w-6 h-6 fill-red-900" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="Where to go?"
            className="text-sm"
            name="destination"
            id="destination"
          />
        </div>

        <Separator />

        <div className="relative flex items-center gap-2">
          <HiCalendar className="inline-block w-5 h-5 fill-red-900" />
          <div
            onClick={() => setOpenDate(!openDate)}
            className="mr-1 text-xs font-black">
            {
              `${format(date[0].startDate, "MM/dd/yyyy")}
             To
              ${format(date[0].endDate, "MM/dd/yyyy")}`
            }
          </div>
          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              ranges={date}
              className="absolute top-10 -end-2 z-20"
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
        </div>

        <div className="relative flex items-center gap-2">
          <div
            id="optionDropDown"
            onClick={() => setOpenOptions(!openOptions)}
            className="text-xs md:text-md"
          >
            <span className="font-black">{options.Adult} : </span>Adult &nbsp;&bull;&nbsp;
            <span className="font-black">{options.Children} : </span>Children &nbsp;&bull;&nbsp;
            <span className="font-black">{options.Room} : </span>Room
          </div>
          {openOptions &&
            <GuestOptionList
              setOpenOptions={setOpenOptions}
              handleOptions={handleOptions}
              options={options}
            />
          }
        </div>

        <div className="relative flex items-center gap-2">
          <button
            onClick={handleSearch}
            className="items-center justify-center bg-red-900 p-1 rounded-md">
            <HiSearch className="fill-white w-4 h-4" />
          </button>
        </div>
      </div>
      <User />
    </div>
  );
}

export default Header;

function GuestOptionList({
  options,
  handleOptions,
  setOpenOptions,
}) {

  const optionsRef = useRef();
  useOutsideClick(optionsRef, "optionDropDown", () => setOpenOptions(false))

  return (
    <div
      ref={optionsRef}
      className="absolute top-6 w-46 bg-white shadow-lg rounded-xl p-4 border-2 border-solid border-slate-200 z-20">
      <OptionItem
        handleOptions={handleOptions}
        type="Adult"
        options={options}
        minLimit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="Children"
        options={options}
        minLimit={0}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="Room"
        options={options}
        minLimit={1}
      />
    </div>
  );
}

function OptionItem({
  options,
  type,
  minLimit,
  handleOptions,
}) {
  return (
    <div className="flex items-center gap-1 justify-center">
      <span className="inline-block flex-1 text-sm">{type}</span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleOptions(type, "dec")}
          className="p-1 m-1 rounded-md bg-slate-100 "
          disabled={options[type] <= minLimit}
        >
          <HiMinus className="fill-red-800 w-3 h-3" />
        </button>
        <span className="flex items-center justify-center text-sm font-black w-4 h-4">{options[type]}</span>
        <button
          onClick={() => handleOptions(type, "inc")}
          className="p-1 m-1 rounded-md bg-slate-100 "
        >
          <HiPlus className="fill-red-800 w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

function User() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      {isAuthenticated ? (
        <div className="flex items-center justify-between gap-2">
          <strong className="text-xs">{user.name}</strong>
          <button >
            <MdLogout onClick={handleLogout} className="fill-red-500 w-5 h-5" />
          </button>
        </div>
      ) : (
        <NavLink to="/login"><strong>login</strong></NavLink>
      )}
    </div>
  );
}
