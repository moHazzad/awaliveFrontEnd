/* eslint-disable react/prop-types */
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from "react-lazy-load-image-component";

const NewBookedRoom = ({ newBookings, showModal, localizeNumber }) => {
    const {t} = useTranslation('booking')
  return (
    <section className=" bg-slate-100 py-10">
      <div className="md:max-w-5xl mx-auto ">
        <h1 className="mb-4  text-xl font-semibold" style={{ fontFamily: "Gilda Display, serif" }}>{t("New Booking")}</h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 ">
          {newBookings &&  newBookings.length > 0 ? (
            newBookings.map((room) => (
              // <Space  >
              <div key={room._id} type="primary" onClick={() => showModal(room)}>
                <div className="bg-white py-5 px-5  cursor-pointer ">
                  <div className="flex justify-between items-center pb-2 px-2 ">
                    <p className="font-semibold text-sm">{t('Complete payment in')} </p>
                    <p className="text-end font-semibold text-sm text-red-400">{t("from")}</p>
                  </div>
                  <div className=" px-4 py-2 border">
                    <div className="py-4 flex flex-col md:flex-row gap-4 border-b-[1px]">
                      <div>
                        {room.roomId.images && room.roomId.images.length > 0 && (
                          <LazyLoadImage
                            className=" md:w-44 md:h-28 object-cover    relative"
                            src={room.roomId.images[0]}
                            alt={`awalive $room.roomId.images[0]}`}
                            effect="blur"
                            placeholderSrc={""}
                          />
                        )}
                        {/* <img className="w-32 h-32" src="" alt="" /> */}
                      </div>
                      <div>
                        <h1 className="font-semibold text-sm">{room.roomId.title}</h1>
                        <h2 className="font-semibold text-sm text-gray-400">{room.roomId.subTitle?.roomOne}</h2>
                        <div className="grid grid-cols-2 gap-1 py-4  text-sm ">
                          <p> {localizeNumber(room.night)} {t('night')}</p>
                          <p>{localizeNumber(room.numberOfGuests)} {t('guest')}</p>
                          <p className="font-semibold">{room.bookingStatus}</p>
                          <p>{t('total')} : {localizeNumber(room.totalWithTax)} {t('SAR')}</p>
                        </div>
                      </div>
                    </div>
                    {/* <Modal isOpen={isModalOpen} onClose={closeModal} booking={room} /> */}
                    <div className="flex justify-between items-center pt-2 ">
                      <div className="font-semibold ">
                        <p className="text-xs">{t('from')}</p>
                        <p className="text-sm">{dayjs(room.checkIn).format("MMM D, YYYY")}</p>
                      </div>
                      <div>
                        <p className="w-3 h-3 rounded-full bg-[#BE9874]"></p>
                      </div>
                      <div className="font-semibold ">
                        <p className="text-xs">{t('to')} </p>
                        <p className="text-sm">{dayjs(room.checkOut).format("MMM D, YYYY")}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <ModalDetails open={open} handleOk={handleOk} handleCancel={handleCancel} room={room}  /> */}
              </div>
              // </Space>
            ))
          ) : (
            <p className=" text-gray-400">No Room Booked Yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewBookedRoom;
