import { useContext, useEffect, useState } from "react"
import PageAnimation from "../../PageAnimation/PageAnimation"
import BannerPage from "../../sharedPages/PageBanner/BannerPage"
import DatesSearch from "./DatesSearch"
import axios from "axios"
import AllRooms from "./AllRooms"
import { FaChevronDown } from "react-icons/fa6";
import { AuthContext } from "../../sharedPages/Context/AuthProvider"
// import Filter from "./filter"

const Search = () => {
  const authInfo = useContext(AuthContext)
  // const [loading, setLoading] = useState(true);
  const[allRooms , setAllRooms] = useState([])
  
  const {
    setSearchLoading,
    setSortByPrice

  } = authInfo.searchValue

  useEffect(() => {
    const fetchRoomRates = async () => {     
      try {
        const response = await axios.get('/roomData.json'); 
        setAllRooms(response.data);
        setSearchLoading(false);
      } catch (error) {
        console.error('Error fetching room rates:', error);
        setSearchLoading(false);
      }
    };

    fetchRoomRates();
    setSearchLoading(false)
  }, [setSearchLoading]);

  const handleValue = (value) => {
    setSortByPrice(value)
  }
    

  return (
    <PageAnimation>
      <BannerPage  text={'Search'} />
      <section className="bg-[#1a1919] flex gap-5 justify-center items-center py-8  " style={{ fontFamily: "Gilda Display, serif" }}>
        <div>
        <li className="relative group list-none">
            <div className="flex gap-2 items-center">

              <p
               className="text-white" 
               >
                Stay Price
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
            <select id="cars" className="text-white bg-transparent outline-none">
                <option className="bg-[#1C1C1D] py-2  border-b" value="volvo">Room Size</option>
                <option className="bg-[#1C1C1D]" value="volvo">Smaller Rooms</option>
                <option className="bg-[#1C1C1D]" value="volvo">Larger Rooms</option>
              </select>
        </div>
      </section>
      <section className="w-[90%] mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-5">
      <DatesSearch  />
      <AllRooms allRooms={allRooms}   />
      </div>

      </section>
    
    </PageAnimation>
  )
}

export default Search