import { Image } from "antd";
import { useTranslation } from "react-i18next";

const images = [
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/superior-room/2.jpg?updatedAt=1706223679306",
    colSpan: "col-span-2",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/superior-room/1.jpg?updatedAt=1706223679195",
    colSpan: "col-span-2",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/superior-room/2.jpg?updatedAt=1706223679306",
    colSpan: "col-span-2",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/clubRoom/4.jpg?updatedAt=1706223990992",
    colSpan: "col-span-1",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/clubRoom/2.jpg?updatedAt=1706223990971",
    colSpan: "col-span-1",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/clubRoom/3.jpg?updatedAt=1706223990785",
    colSpan: "col-span-1",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/juniorSuits/1.jpg?updatedAt=1706224273214",
    colSpan: "col-span-1",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/juniorSuits/5.jpg?updatedAt=1706224273229",
    colSpan: "col-span-1",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/juniorSuits/4.jpg?updatedAt=1706224273250",
    colSpan: "col-span-1",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/juniorSuits/2.jpg?updatedAt=1706224273152",
    colSpan: "col-span-1",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/juniorSuits/3.jpg?updatedAt=1706224273092",
    colSpan: "col-span-1",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/ExecutiveSuite%20withSpaBath/2.jpg?updatedAt=1706224407176",
    colSpan: "col-span-1",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/ExecutiveSuite%20withSpaBath/1.jpg?updatedAt=1706224407252",
    colSpan: "col-span-1",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/RoyleSuit/1.jpg?updatedAt=1706276882735",
    colSpan: "col-span-1",
  },
  {
    src: "https://ik.imagekit.io/appgas2t34/Awalive%20main%20picture/RoyleSuit/4.jpg?updatedAt=1706276883006",
    colSpan: "col-span-1",
  },
  // Add more images as needed
];

const StayTune = () => {
  const {t} = useTranslation('home')


  return (
    <section className="bg-[#F9F9F9] py-10 md:py-16">
      <div className="container mx-auto text-center ">
        <p className="text-xs">{t('visualJourney')}</p>
        <h2
          className="text-2xl md:text-4xl mt-2"
          style={{ fontFamily: "Gilda Display, serif" }}
        >
          {t('discoverSpaces')}
        </h2>
        <p className="mt-2 md:mt-4 text-xs text-gray-600 px-4 md:px-20">
        {t('galleryDescription')}
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-6 gap-1  mt-10 md:mt-16 px-2" >
        {images.map((image, index) => (
          <div key={index} className={`${image.colSpan} row-span-1 relative`}>
            <Image
              src={image.src}
              alt={`Gallery item ${index}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                overflow:'hidden'
              }}
              preview={true} // Set to true if you want an image preview on click
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StayTune;

