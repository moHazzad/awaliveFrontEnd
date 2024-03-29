import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { notification } from "antd";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { addDays } from "date-fns";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [promotionsData, setPromotionsData] = useState([])
  const [promotionLoading, setPromotionLoading] = useState(true)
  const [promotionError, setPromotionError] = useState(null)
  // const [userRole, setUserRole] = useState(null);
  

  const [allRooms, setAllRooms] = useState([]);
  const [loadingAllRooms, setLoadingAllRooms] = useState(true);

  const [roomId, setRoomId] = useState(0);
  const [RoomName, setRoomName] = useState("");
  const [RoomPrice, setRoomPrice] = useState(0);
  const [RoomImage, setRoomImage] = useState("");
  const [sortByPrice, setSortByPrice] = useState(null);
  const [error, setError] = useState("");

  const [searchLoader, setSearchLoader] = useState(true);
  const [category, setCategory] = useState("");
  const [night, setNight] = useState(0);
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(addDays(new Date(), 1));
  const [createdBooking, setCreatedBooking] = useState({})
  const [calender, setCalender] = useState([{ startDate: null, endDate: null, key: "selection" }]);
  // const [guests, setGuests] = useState(1);
  const [numberOfGuests, setGuests] = useState(1);
  const [child, setChild] = useState(0);
  const [childAges, setChildAges] = useState([]);

  const currentLanguage = i18next.language;
  const { t } = useTranslation();

  const handleBookNow = () => {
    // const totalPrice = night * RoomPrice;
    // const taxPercentage = 0.15; // 15% tax rate
    // const tax = parseFloat((totalPrice * taxPercentage).toFixed(2));
    // const totalWithTax = parseFloat((totalPrice + tax).toFixed(2));
    // // const tax = totalPrice * taxPercentage;
    // // const totalWithTax = totalPrice + tax;
    // const formattedTotalPrice = totalPrice.toLocaleString("en-US", {
    //   minimumFractionDigits: 2,
    //   maximumFractionDigits: 2,
    // });
    // const formattedTax = tax.toLocaleString("en-US", {
    //   minimumFractionDigits: 2,
    //   maximumFractionDigits: 2,
    // });
    // const formattedTotalWithTax = totalWithTax.toLocaleString("en-US", {
    //   minimumFractionDigits: 2,
    //   maximumFractionDigits: 2,
    // });

    const bookingInfo = {
      
      roomId: roomId,
      checkIn: checkIn.toLocaleDateString(),
      checkOut: checkOut.toLocaleDateString(),
      numberOfGuests: numberOfGuests,
     
      // guests,
      // tax: formattedTax,
      // totalWithTax: formattedTotalWithTax,
      // night,
      // RoomName,
      // RoomPrice,
      // RoomImage,
      // totalPrice: formattedTotalPrice,
    };
    
    // Save booking information to localStorage
    localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
  };

  // login the user
  const handleLogin = async (email, password) => {
    
    try {
      setLoading(true);
      const response = await axios.post(
        // "https://awalive-server-side-hzpa.vercel.app/login",
        "https://type-script-server.vercel.app/api/auth/login",
        // "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      const { data } = response.data;
      // setUser(data.user);
      // setUserRole(data.user.role);
      localStorage.setItem("userData", JSON.stringify(data.user));
      localStorage.setItem("token", data.accessToken);
      setUser(JSON.parse(localStorage.getItem("userData")))
      notification["success"]({
        message: "Welcome Nice to see you",
        placement: "topRight",
        duration: 3.5,
      });
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", error.response.data);
        setError(error.response.data.message || "Incorrect email or password");
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        setError("No response from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        setError("Error during login");
      }
      notification["error"]({
        message: "Access denied",
        description: "PLease check Email and Password is correct",
        placement: "topRight",
        duration: 3.5,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear user data and token from state and localStorage
    // setUser(null);
    setUser("");
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    // setUserRole(null);
    notification.info({
      message: "Logged Out",
      description: "You have been logged out successfully.",
      placement: "topRight",
      duration: 3.5,
    });
    // notification logic here
  };

  // checking if user token is expire or not
  // useEffect(() => {
  //   const checkTokenExpiration = () => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       const tokenExpiration = JSON.parse(atob(token.split(".")[1])).exp;
  //       const currentTime = Date.now() / 1000; // current time in seconds
  //       if (tokenExpiration < currentTime) {
  //         handleLogout();
  //       }
  //     }
  //   };
  //   const intervalId = setInterval(checkTokenExpiration, 60000); // check every minute
  //   return () => clearInterval(intervalId); // clear interval on component unmount
  // }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { exp } = JSON.parse(atob(token.split('.')[1]));
      if (Date.now() >= exp * 1000) {
        handleLogout();
      } else {
        setUser(JSON.parse(localStorage.getItem("userData")));
      }
    }
  }, []);

  //  local storageing getting data  
  
  // useEffect(() => {
  //   // Retrieve booking information from localStorage on component mount
  //   const storedBookingInfo = localStorage.getItem("bookingInfo");
  //   if (storedBookingInfo) {
  //     const parsedBookingInfo = JSON.parse(storedBookingInfo);
  //     setCheckIn(parsedBookingInfo.checkIn);
  //     setCheckOut(parsedBookingInfo.checkOut);
  //     setGuests(parsedBookingInfo.numberOfGuests);
  //     setNight(parsedBookingInfo.night);
  //     setRoomName(parsedBookingInfo.roomName);
  //     setRoomPrice(parsedBookingInfo.roomPrice);
  //     setRoomImage(parsedBookingInfo.roomImage);
  //   }
  // }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
    setLoading(false);
  }, []);

  // fetching all rooms from db
  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const response = await axios.get(
          `https://type-script-server.vercel.app/api/room/?lang=${currentLanguage}`
          // "https://awalive-server-side-hzpa.vercel.app/rooms"
        );
        let rooms = response.data.data;
        // if (rooms.length > 1) {
        //   // setErrorMessage('No rooms available for the selected criteria.');
       
        //   // Client-side sorting based on the first price option
        //   rooms = rooms.sort((a, b) => {
        //     const priceA = a.priceOptions[0]?.price || 0; // Assuming first price option is the one to sort by
        //     const priceB = b.priceOptions[0]?.price || 0; // Adjust if your data structure differs
        //     return sortByPrice === 'asc' ? priceA - priceB : priceB - priceA;
        //   });
        // }
        setAllRooms(rooms);
        // setSearchLoading(false);
        setLoadingAllRooms(false);
      } catch (error) {
        console.error("Error fetching room rates:", error);
        // setSearchLoading(false);
      }
      setLoadingAllRooms(false);
    };
    fetchAllRooms();
    // setSearchLoading(false)
  }, [currentLanguage, t, setLoadingAllRooms]);



  useEffect(() => {
    
    const fetchPromotionData = async () => {
      try {
        const response = await axios.get(`https://type-script-server.vercel.app/api/promotion/?lang=${currentLanguage}`);

        console.log(response.data.data,'promotion data ');
        const firstFourItems = response.data.data
    
        setPromotionsData(firstFourItems)
        setPromotionLoading(false)
      } catch (error) {
        if (error.response) {
          // The request was made, but the server responded with an error status
          console.error('Server responded with an error:', error.response.data);
          console.error('Status code:', error.response.status);
          setPromotionLoading(false)
          setPromotionError(error.response.status || error.response.data )
        } else if (error.request) {
          // The request was made, but no response was received
          console.error('No response received from the server');
          setPromotionLoading(false)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', error.message);
          setPromotionLoading(false)
        }
        
        // Handle the error as needed
      }
    };
    
    fetchPromotionData(); // Call the async function
    setPromotionLoading(false)
  }, [currentLanguage]); 



  const authInfo = {
    loading,
    setLoading,
    // guests,
    numberOfGuests,
    RoomImage,
    RoomPrice,
    RoomName,
    searchLoader,
    sortByPrice,
    childAges,
    allRooms,
    calender,
    loadingAllRooms,
    checkIn,
    checkOut,
    category,
    // userRole,
    child,
    night,
    setChild,
    setNight,
    setGuests,
    setCheckIn,
    setCalender,
    setCheckOut,
    setAllRooms,
    setChildAges,
    setSortByPrice,
    setLoadingAllRooms,
    setCategory,
    setSearchLoader,
    handleBookNow,
    setCreatedBooking,
    createdBooking,
    promotionError,
    promotionLoading,
    promotionsData,
    // roomId,
    setRoomImage,
    setRoomPrice,
    setRoomName,
    setRoomId,
    // bookingInfo,
    handleLogin,
    handleLogout,
    setError,
    error,
    user,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
