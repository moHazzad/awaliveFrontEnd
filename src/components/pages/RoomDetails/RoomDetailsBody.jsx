import RoomImageSlider from "./RoomImageSlider";
import arroundImage from "../../../assets/serviceImage1.jpeg";
import arroundImage2 from "../../../assets/serviceImage2.jpeg";
import arroundImage3 from "../../../assets/serviceImage3.jpeg";
import RoomDate from "./RoomDate";

const RoomDetailsBody = ({ singleRoomDetails }) => {
    console.log("details", singleRoomDetails);
  const { RoomService, description, RoomLogs,  } = singleRoomDetails;

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-5 py-5">
        <div className="md:w-2/3">
          <RoomImageSlider singleRoomDetails={singleRoomDetails} />

          {/* Facilities   */}
          <div>
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center text-center text-sm md:text-lg py-2 md:py-5 px-2">
              {RoomService?.map((service, index) => (
                <div className="flex flex-col gap-2 items-center" key={index}>
                  <img className="w-8" src={service.Icon} alt="" />
                  {/* <img > /> */}
                  <p
                    className="text-sm font-medium "
                    style={{ fontFamily: "Gilda Display, serif" }}
                  >
                    {service.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Facilities end  */}
          <hr />
          <p className="py-3 text-sm leading-7">{description}</p>
          <hr />
          <div className="">
            <h2
              className="text-2xl md:text-3xl py-5 md:py-5 "
              style={{ fontFamily: "Gilda Display, serif" }}
            >
              Room Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RoomLogs?.map((service, index) => (
                <div key={index} className="flex gap-2 ">
                  <img className="w-6" src={service.Icon} alt="serviceImage" />
                  <p className="text-sm">{service.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Around hotels start */}
          <div className="py-5">
            <h2
              className="text-2xl md:text-3xl py-3 md:py-5"
              style={{ fontFamily: "Gilda Display, serif" }}
            >
              Around The Hotel
            </h2>
            <div className="flex flex-col md:flex-row gap-2 md:gap-3">
              <div className="relative">
                <img src={arroundImage} alt="" className="" />
                <p
                  className="absolute bottom-4 left-3 text-white"
                  style={{ fontFamily: "Gilda Display, serif" }}
                >
                  Coffee Bar
                </p>
              </div>
              <div className="relative">
                <img src={arroundImage2} alt="" className="" />
                <p
                  className="absolute bottom-4 left-3 text-white"
                  style={{ fontFamily: "Gilda Display, serif" }}
                >
                  Restaurant
                </p>
              </div>
              <div className="relative">
                <img src={arroundImage3} alt="" className="" />
                <p
                  className="absolute bottom-4 left-3 text-white"
                  style={{ fontFamily: "Gilda Display, serif" }}
                >
                  Wellness
                </p>
              </div>
            </div>
          </div>
          {/* Around hotels end */}
        </div>
        <RoomDate singleRoomDetails={singleRoomDetails} />
      </div>
    </>
  );
};

export default RoomDetailsBody;