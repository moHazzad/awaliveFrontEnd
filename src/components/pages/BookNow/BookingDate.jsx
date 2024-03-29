import {  useEffect, useState } from "react";
// import { AuthContext } from "../../sharedPages/Context/AuthProvider";
// import { CheckOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
// import { SlArrowDown } from "react-icons/sl";
import axios from "axios";
import { Skeleton } from "antd";
// import { Link } from "react-router-dom";
// import { differenceInCalendarDays, format } from "date-fns";
import moment from 'moment';

const BookingDate = () => {
  const currentLanguage = i18next.language;
  const { t } = useTranslation("booking");
  // const authInfo = useContext(AuthContext);
  // const [bookingInformation, setBookingInformation] = useState("");
  // const { loading, setLoading, } = authInfo;
  const [checkIn, setCheckIn] = useState(moment());
  const [checkOut, setCheckOut] = useState(moment().add(1, 'days')); // Default check-out is tomorrow
  const [nights, setNights] = useState(1); // Default to 1 night
  const [guests, setGuests] = useState(1); // Default to 1 guest
  const [roomDetails, setRoomDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   console.log('Effect running...');
  //   const fetchRoomDetails = async () => {
  //     console.log('Fetching room details...');
  //     setLoading(true);
  //     const storedBookingInfo = localStorage.getItem("bookingInfo");
  //     if (storedBookingInfo) {
  //       const { roomId, checkIn: storedCheckIn, checkOut: storedCheckOut, numberOfGuests: storedGuests } = JSON.parse(storedBookingInfo);
  //       const inDate = new Date(storedCheckIn);
  //       const outDate = new Date(storedCheckOut);
  
  //       setCheckIn(inDate);
  //       setCheckOut(outDate);
  //       setGuests(storedGuests || 1);
  //       setNights(differenceInCalendarDays(outDate, inDate));
  
  //       try {
  //         const response = await axios.get(`https://type-script-server.vercel.app/api/room/${roomId}?lang=${currentLanguage}`);
  //         setRoomDetails(response.data.data);
  //         console.log('Room details fetched:', response.data.data);
  //       } catch (err) {
  //         setError(err.message);
  //         console.error('Error fetching room details:', err);
  //       } finally {
  //         console.log('Setting loading to false');
  //         setLoading(false);
  //       }
  //     } else {
  //       console.log('No stored booking info found');
  //       setLoading(false); // Ensure loading is also set to false if there's no storedBookingInfo
  //     }
  //   };
  
  //   fetchRoomDetails();
  // }, [currentLanguage]);
  

   // Calculate total price and VAT
   
   useEffect(() => {
    const fetchRoomDetails = async () => {
      setLoading(true);
      const storedBookingInfo = localStorage.getItem("bookingInfo");
      console.log('Stored booking info:', storedBookingInfo);
      if (storedBookingInfo) {
        const { roomId, checkIn: storedCheckIn, checkOut: storedCheckOut, numberOfGuests: storedGuests } = JSON.parse(storedBookingInfo);
  
        console.log('Original stored dates:', storedCheckIn, storedCheckOut);
        const correctCheckInFormet = new Date(storedCheckIn)
        const correctCheckOutFormet = new Date(storedCheckOut)
  
        let checkInDate = moment(correctCheckInFormet, 'MM/DD/YYYY').isValid() ? moment(correctCheckInFormet, 'MM/DD/YYYY').format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
        let checkOutDate = moment(correctCheckOutFormet, 'MM/DD/YYYY').isValid() ? moment(correctCheckOutFormet, 'MM/DD/YYYY').format('YYYY-MM-DD') : moment().add(1, 'days').format('YYYY-MM-DD');
  
        console.log('Formatted dates:', checkInDate, checkOutDate);
  
        if (!checkInDate || !checkOutDate) {
          console.error('Invalid stored date formats');
          setError('Invalid stored date formats');
          setLoading(false);
          return; // Exit the function if dates are invalid
        }
  
        setCheckIn(new Date(checkInDate));
        setCheckOut(new Date(checkOutDate));
        setGuests(storedGuests || 1);
        setNights(moment(checkOutDate).diff(moment(checkInDate), 'days'));
  
        try {
          const response = await axios.get(`https://type-script-server.vercel.app/api/room/${roomId}?lang=${currentLanguage}`);
          setRoomDetails(response.data.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchRoomDetails();
  }, [currentLanguage]);
  

  console.log(checkIn, 'chjeckin dateerrrrrrrrrrrr ');
  console.log(checkIn ? (moment(checkIn).isValid() ? moment(checkIn).format('D') : "Invalid Date") : "") ;


  const perNightPrice = roomDetails.priceOptions?.[0]?.price ?? 0;
  const totalPriceBeforeVAT = perNightPrice * nights;
  const VAT = totalPriceBeforeVAT * 0.15; // 15% VAT
  const totalPrice = totalPriceBeforeVAT + VAT;

  // console.log(moment(checkIn).format('d'), 'chek in formtmonemt ');
 

  if (loading) return <Skeleton active />;
  if (error) return <div>Error fetching room: {error}</div>;
  if (!roomDetails) return <div>No room details available</div>;
   
  //  const perNightPrice = roomDetails.priceOptions?.[0]?.price ?? 0;
  // //  const perNightPrice = roomDetails ? roomDetails.priceOptions[0].price : 0;
  //  const totalPriceBeforeVAT = perNightPrice * nights;
  //  const VAT = totalPriceBeforeVAT * 0.15; // 15% VAT
  //  const totalPrice = totalPriceBeforeVAT + VAT;

  //   console.log( format(checkIn, "EEEE"), "forrmtt");
  //   console.log(nights, "forrmtt");


  // if (loading)
  //   return (
  //     <div className="w-full md:w-1/3 ">
  //       <Skeleton active />
  //     </div>
  //   );
  // if (error)
  //   return (
  //     <div>
  //       <p>Error fetching room: {error}</p>
  //       <Link className="bg-black px-4 py-2 " to={"/home"}>
  //         Home
  //       </Link>
  //     </div>
  //   );
  // if (!roomDetails) return <div>No room details available</div>;

  return (
    <div className=" w-full md:w-1/3">
      <div className={` ${currentLanguage === "ar" ? "body-ar font-medium " : "body-en-title"} `}>
        <div className="hidden md:flex md:flex-col relative">
          <div style={{ width: "100%", height: "100%", backgroundColor: "#e0e0e0" }}>
            <img src={roomDetails?.images[0]} alt="Room" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <p className="absolute top-4 left-4 text-white z-10 bg-[#151515] px-2 py-[2px] text-xs ">{roomDetails?.title}</p>
          <div className="overlay absolute inset-0 bg-gradient-to-t from-[#1C1C1C] to-transparent"></div>
        </div>
        <div
          className={`flex flex-col gap-5  items-center justify-center text-center bg-[#1C1C1C]  py-5 px-5 md:py-10 md:px-10 relative  ${
            currentLanguage === "ar" ? "body-ar" : "body-en"
          } `}
        >
          <p
            className={`text-white text-xs  tracking-widest uppercase  bg-[#151515]  w-full py-4 ${
              currentLanguage === "ar" ? "body-ar font-medium" : "body-en"
            } `}
          >
            {/* {t("selectDates")} */}
            {t("YOUR RESERVATION")}
          </p>
          <div className="grid grid-cols-2 gap-5  w-full">
            <div className="bg-[#151515] flex items-center justify-center py-6">
              <div className="text-black flex flex-col gap-2 items-center justify-center focus:outline-none cursor-pointer">
                <p className="tracking-widest text-sm uppercase text-white">{t("Check In")}</p>
                <div className="flex flex-col   items-center" style={{ fontFamily: "Gilda Display, serif" }}>
                  {/* <p className="text-5xl text-[#BE9874]">{checkIn ? format(checkIn, "dd") : ""}</p> */}
                  <p className="text-5xl text-[#BE9874]">{checkIn ? (moment(checkIn).isValid() ? moment(checkIn).format('D') : "Invalid Date") : ""}</p>

                  <div className="flex flex-col items-center">
                    <p className="text-white text-xs italic ">{checkIn ? (moment(checkIn).isValid() ? moment(checkIn).format('MMM, YYYY') : "Invalid Date") : ""}</p>
                    <p className="text-xs text-white">{checkIn ? (moment(checkIn).isValid() ? moment(checkIn).format('dddd') : "Invalid Date") : ""}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#151515] flex items-center justify-center py-6">
              <div className="text-black flex flex-col gap-2 items-center justify-center focus:outline-none cursor-pointer">
                <p className="tracking-widest text-sm uppercase text-white">{t("Check Out")}</p>
                <div className="flex flex-col   items-center" style={{ fontFamily: "Gilda Display, serif" }}>
                  <p className="text-5xl text-[#BE9874]">{checkOut ? (moment(checkOut).isValid() ? moment(checkOut).format('D') : "Invalid Date") : ""}</p>

                  <div className="flex flex-col items-center">
                    <p className="text-white text-xs italic ">{checkOut ? (moment(checkOut).isValid() ? moment(checkOut).format('MMM, YYYY') : "Invalid Date") : ""}</p>
                    <p className="text-xs text-white">{checkOut ? (moment(checkOut).isValid() ? moment(checkOut).format('dddd') : "Invalid Date") : ""}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`bg-[#151515] flex items-center justify-center py-6  `}>
              <div className="text-black flex flex-col gap-2 items-center justify-center ">
                <p className="tracking-widest text-sm text-white uppercase">{t("guest")}</p>
                <div className="flex gap-3  items-center">
                  <p className="text-5xl text-[#BE9874]" style={{ fontFamily: "Gilda Display, serif" }}>
                    {guests}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-black flex flex-col gap-2 items-center justify-center bg-[#151515] ">
              <p className="tracking-widest text-sm text-white uppercase">{t("night")}</p>
              <div className="flex gap-3  items-center">
                <p className="text-5xl text-[#BE9874]" style={{ fontFamily: "Gilda Display, serif" }}>
                  {nights}
                </p>
              </div>
            </div>
          </div>
          <div className="flex  items-center mt-2">
            <p className="text-white font-medium text-4xl tracking-wide" style={{ fontFamily: "Gilda Display, serif" }}>
              {totalPrice}/
            </p>
            <p className="text-white  text-xl tracking-widest capitalize" style={{ fontFamily: "Gilda Display, serif" }}>
              {" "}
              {t("total")}
            </p>
          </div>
        </div>
      </div>
      <p className="px-3 mt-4 text-xs text-center tracking-widest uppercase font-semibold">
        {t("INCLUDED  15 % VAT ALREADY APPLIED")}
      </p>
    </div>
  );
};

export default BookingDate;
