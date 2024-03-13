import { useContext, useEffect, useState } from "react";
import PageAnimation from "../../PageAnimation/PageAnimation";
import BannerPage from "../../sharedPages/PageBanner/BannerPage";
import DatesSearch from "./DatesSearch";
// import axios from "axios";
import AllRooms from "./AllRooms";
import { FaChevronDown } from "react-icons/fa6";
import { AuthContext } from "../../sharedPages/Context/AuthProvider";
// import SearchBar from "../Home/SearchBar";

import axios from "axios";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { Helmet } from "react-helmet";

const Search = () => {
  const {
    category,
    setSortByPrice,
    setCategory,
    allRooms,
    checkIn,
    checkOut,
    sortByPrice,
    numberOfGuests,
    loadingAllRooms,
    setLoadingAllRooms,
  } = useContext(AuthContext);
  const { t } = useTranslation("search");
  const currentLanguage = i18next.language;
  // const [categories, setCategories] = useState([]);
  const [roomSize, setRoomSize] = useState([]);
  // const [loadingCategory, setLoadingCategory] = useState(true);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loadingAvailableRooms, setLoadingAvailableRooms] = useState(true);
  // const [notFoundRoom, setNotFoundRoom] = useState('');


  const formatDateString = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : null;
  };
  const formetDateCheckIn = formatDateString(checkIn);
  const formetDateCheckOut = formatDateString(checkOut);

  // console.log(sortByPrice);
  useEffect(() => {
    setLoadingAvailableRooms(true);
    const fetchAllRooms = async () => {
      try {
        const response = await axios.get(
          // `https://type-script-server.vercel.app/api/room/available/?lang=${currentLanguage}&checkInDate=${formetDateCheckIn}&checkOutDate=${formetDateCheckOut}&sortOrder=${sortByPrice}&maxGuests=${numberOfGuests},&sizeOrder=${roomSize}`
          `https://type-script-server.vercel.app/api/room/available/?lang=${currentLanguage}&checkInDate=${formetDateCheckIn}&checkOutDate=${formetDateCheckOut}&sortOrder=${sortByPrice}&maxGuests=${numberOfGuests},&sizeOrder=${roomSize}`
        );

        setAvailableRooms(response.data.data);
        // setCategories(response.data.data);
        // setSearchLoading(false);
        setLoadingAvailableRooms(false);
      } catch (error) {
        console.error("Error fetching room rates:", error?.response?.data?.error?.statusCode);
        console.error("Error fetching room rates:", error?.response?.data?.issues[0]?.message);
        // setNotFoundRoom("Error fetching room rates:", error?.response?.data?.issues[0]?.message);
        // setSearchLoading(false);
      }
      setLoadingAvailableRooms(false);
    };
    fetchAllRooms();
    // setSearchLoading(false)
  }, [setLoadingAvailableRooms, formetDateCheckIn, formetDateCheckOut, sortByPrice, numberOfGuests, currentLanguage, roomSize]);

  // useEffect(() => {
  //   const fetchAllRooms = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://type-script-server.vercel.app/api/category/?lang=${currentLanguage}`
  //         // "https://awalive-server-side-hzpa.vercel.app/rooms"
  //       );

  //       // setCategories(response.data.data);
  //       setRoomSize(response.data.data);
  //       // setSearchLoading(false);
  //       setLoadingCategory(false);
  //     } catch (error) {
  //       console.error("Error fetching room rates:", error);
  //       // setSearchLoading(false);
  //     }
  //     setLoadingCategory(false);
  //   };
  //   fetchAllRooms();
  //   // setSearchLoading(false)
  // }, [currentLanguage, setLoadingCategory]);

  const handleValue = (value) => {
    setSortByPrice(value);
  };

  const handleRoomSizeChange = (value) => {
    setRoomSize(value);
  };

  return (
    <>
      <Helmet>
        <title>Room Search - Awalive Hotel | Find Your Perfect Stay in Taif</title>
        <meta
          name="description"
          content="Explore and book your ideal room at Awalive Hotel. Discover our wide range of accommodations to suit all preferences and budgets. Start your unforgettable stay in Taif now!"
        />
        <meta
          name="keywords"
          content="hotel room search, Awalive Hotel rooms, book hotel in Taif, luxury rooms, accommodation in Taif, hotel booking"
        />
        <meta property="og:title" content="Room Search - Awalive Hotel | Find Your Perfect Stay in Taif" />
        <meta
          property="og:description"
          content="Easily find and book your ideal room at Awalive Hotel in Taif. Comfort, luxury, and style await you."
        />
        <meta property="og:image" content="[Link to an image showcasing the hotel or rooms]" />
        <meta property="og:url" content="awalivehotel.com/room-search" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Room Search - Awalive Hotel | Find Your Perfect Stay in Taif" />
        <meta
          name="twitter:description"
          content="Looking for the perfect room in Taif? Explore the various accommodations at Awalive Hotel and book your stay today."
        />
        <meta name="twitter:image" content="[Link to an image showcasing the hotel or rooms]" />
        {/* <!-- Other head elements like canonical link, viewport, language tag --> */}
      </Helmet>
      <PageAnimation>
        <BannerPage text={t("search")} />

        <section className="bg-[#1a1919]  py-4  " style={{ fontFamily: "poppins, serif" }}>
          {/* <SearchBar
            // setAllRooms={setAllRooms}
            // setNoRoomsMessage={setNoRoomsMessage}
            pageContext="search"
          /> */}
          <div className="max-w-lg mx-auto px-2 md:px-0 flex  gap-7 py-3 justify-center items-center   ">
            <div className="">
              <li className="relative group list-none">
                <div className="flex gap-2 items-center">
                  <p className="text-white uppercase tracking-widest text-sm">{t("sortByPrice")}</p>
                  <FaChevronDown className="font-thin text-xs text-white" />
                </div>

                {/* Dropdown Content */}
                <ul className="absolute w-36 left-0 hidden pt-2  bg-[#1a1919] drop-shadow-md text-md text-white group-hover:block z-10 rounded-sm">
                  <li>
                  <option
                      value={"desc"}
                      className="p-2 mb-2 block hover:bg-slate-50 hover:text-black transition duration-300 ease-in-out  cursor-pointer text-xs uppercase tracking-widest "
                      onClick={() => handleValue("desc")}
                    >
                      {t("highPrice")}
                    </option>
                  </li>
                  <li>
                    
                    <option
                      value={"asc"}
                      className="p-2  block hover:bg-slate-50 hover:text-black transition duration-300 ease-in-out cursor-pointer text-xs uppercase tracking-widest  "
                      onClick={() => handleValue("asc")}
                    >
                      {t("lowPrice")}
                    </option>
                  </li>
                </ul>
              </li>
            </div>

            {/* <div className="w-full ">
              <select
                id=""
                className="text-white bg-transparent outline-none w-full"
                onChange={handleCategoryChange}
                value={category} // This is important to make the selected value controlled
              >
                <option className="bg-[#1C1C1D] py-2 border-b hover:bg-[#BE9874]" value="">
                  {t("allCategories")}
                </option>
                {loadingCategory ? (
                  <Spin />
                ) : (
                  categories.map((categoryItem) => (
                    <option
                      key={categoryItem.id} // Replace 'id' with the actual property name that uniquely identifies a category
                      className="bg-[#1C1C1D] py-2 border-b"
                      value={categoryItem.id} // Replace 'name' with the property that holds the category name
                    >
                      {categoryItem.title}
                    </option>
                  ))
                )}
              </select>
            </div> */}
            {/* <p>asdsd</p> */}
            <div className=" ">
              <li className="relative group list-none">
                <div className="flex gap-2 items-center">
                  <p className="text-white uppercase tracking-widest text-sm">{t("ROOM SIZE")}</p>
                  <FaChevronDown className="font-thin text-xs text-white" />
                </div>

                {/* Dropdown Content */}
                <ul className="absolute w-36 left-0 hidden pt-2 bg-[#1a1919] drop-shadow-md text-md text-white group-hover:block z-10 rounded-sm">
                  <li>
                    <option
                      value={"lowToHigh"}
                      className="p-2 mb-2 block hover:bg-slate-50 hover:text-black transition duration-300 ease-in-out cursor-pointer text-xs uppercase tracking-widest"
                      onClick={() => handleRoomSizeChange("lowToHigh")}
                    >
                      {t("SMALLER ROOM")}
                    </option>
                  </li>
                  <li>
                    <option
                      value={"highToLow"}
                      className="p-2 block hover:bg-slate-50 hover:text-black transition duration-300 ease-in-out  cursor-pointer text-xs uppercase tracking-widest "
                      onClick={() => handleRoomSizeChange("highToLow")}
                    >
                      {t("LARGER ROOM")}
                    </option>
                  </li>
                </ul>
              </li>
            </div>

          </div>
        </section>
        <section className="max-w-7xl mx-auto py-20 px-2 md:px-0">
          <div dir="ltr" className="flex flex-col md:flex-row gap-5">
            <DatesSearch />
            <AllRooms
              allRooms={allRooms}
              // notFoundRoom={notFoundRoom}
              availableRooms={availableRooms}
              loadingAvailableRooms={loadingAvailableRooms}
              // noRoomsMessage={noRoomsMessage}
              loadingAllRooms={loadingAllRooms}
              setLoadingAllRooms={setLoadingAllRooms}
            />
          </div>
        </section>
      </PageAnimation>
    </>
  );
};

export default Search;
