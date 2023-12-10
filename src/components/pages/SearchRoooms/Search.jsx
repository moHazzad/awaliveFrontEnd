import { useContext, useEffect, useState } from "react"
import PageAnimation from "../../PageAnimation/PageAnimation"
import BannerPage from "../../sharedPages/PageBanner/BannerPage"
import DatesSearch from "./DatesSearch"
import axios from "axios"
import AllRooms from "./AllRooms"
import { FaChevronDown } from "react-icons/fa6";
import { AuthContext } from "../../sharedPages/Context/AuthProvider"
import SearchBar from "../Home/SearchBar"
// import Filter from "./filter"

const Search = () => {
  const [loading, setLoading] = useState(true);
  const[allRooms , setAllRooms] = useState([])
  const [noRoomsMessage, setNoRoomsMessage] = useState("");
  const {
    sortByPrice,
    category,
    setSortByPrice,
    setCategory,
  } = useContext(AuthContext)
  // const [category, setCategory] = useState('All Categories');
  
 
  useEffect(() => {
    const fetchAllRooms = async () => {     
      try {
        const response = await axios.get('https://awalive-server-side-hzpa.vercel.app/rooms'); 
        setAllRooms(response.data);
        
        // setSearchLoading(false);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching room rates:', error);
        // setSearchLoading(false);
      }
      setLoading(false)
    };

    fetchAllRooms();
    // setSearchLoading(false)
  }, []);

  const handleValue = (value) => {
    setSortByPrice(value)
  }

  if (sortByPrice === "lowPrice") {
    allRooms.sort((a, b) => a.roomPrice - b.roomPrice);
  } else if (sortByPrice === "highPrice") {
    allRooms.sort((a, b) => b.roomPrice - a.roomPrice);
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <PageAnimation>
      <BannerPage  text={'Search'} />
      <section className="bg-[#1a1919]  py-8  " style={{ fontFamily: "Gilda Display, serif" }}>
      <SearchBar setAllRooms={setAllRooms} setNoRoomsMessage={setNoRoomsMessage} pageContext="search"  />
      <div className="flex gap-5 py-3 justify-center items-center">
        <div>
        <li className="relative group list-none">
            <div className="flex gap-2 items-center">

              <p
               className="text-white" 
               >
                Sort Price
              </p>
              <FaChevronDown className="font-thin text-xs text-white" />
                </div>

            {/* Dropdown Content */}
            <ul className="absolute w-36 left-0 hidden pt-2 bg-[#1a1919] drop-shadow-md text-md text-zinc-400 group-hover:block z-10 rounded-sm">
              <li>
                <option
                  value={'lowPrice'}
                  className="p-2 block hover:bg-slate-50 transition duration-300 ease-in-out cursor-pointer "
                  onClick={()=> handleValue("lowPrice")}
                >
                  Low Price
                </option>
              </li>
              <li>
                <option
                  value={"highPrice"}
                  className="p-2 block hover:bg-slate-50 transition duration-300 ease-in-out  cursor-pointer "
                  onClick={()=> handleValue("highPrice")}
                >
                  High Price
                </option>
              </li>
            </ul>
          </li>
          
        </div>
          
        <div>
          <select
            id=""
            className="text-white bg-transparent outline-none "
            onChange={handleCategoryChange}
            value={category} // This is important to make the selected value controlled
          >
            <option className="bg-[#1C1C1D] py-2  border-b hover:bg-[#BE9874] " value="">All Categories</option>
          
            <option className="bg-[#1C1C1D] py-2  border-b" value="Suite">
              Suite
            </option>
            <option className="bg-[#1C1C1D]" value="Standard">
              Standard
            </option>
            <option className="bg-[#1C1C1D]" value="Executive">
              Executive
            </option>
          </select>
        </div>
        </div>
      </section>
      <section className="w-[90%] mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-5">
      <DatesSearch   />
      <AllRooms allRooms={allRooms} noRoomsMessage={noRoomsMessage} loading={loading} setLoading={setLoading}  />
      </div>

      </section>
    
    </PageAnimation>
  )
}

export default Search