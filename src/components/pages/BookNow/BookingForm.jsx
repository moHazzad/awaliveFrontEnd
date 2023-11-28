import  { useContext,  useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { AuthContext } from '../../sharedPages/Context/AuthProvider';

const BookingForm = () => {
    const authInfo = useContext(AuthContext)
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    message: '',
    arrivalTime: '',
    
  });
  const {  setLoading} = authInfo;
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} with value: ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirmButtonClick = () => {
    console.log('Button clicked');
    const errors = {};
  
    // Basic validation for required fields
    Object.keys(formData).forEach((key) => {
      if (
        (key !== 'address' && key !== 'city' && key !== 'message' && key !== 'arrivalTime' )  &&
        (!formData[key] || formData[key].trim() === '')
      ) {
        errors[key] = 'This field is required';
      }
    });
  
    setFormErrors(errors);
  
    console.log('click');
  
    // Log the form data regardless of validation errors
    console.log('Errors:', errors);
    console.log('Form data:', formData);
  
    // If there are no errors, proceed with form submission
    if (Object.keys(errors).length === 0) {
        // Retrieve existing bookingInfo from localStorage
      const existingBookingInfo = JSON.parse(localStorage.getItem('bookingInfo')) || {};

      // Update the existing bookingInfo with form data
      const updatedBookingInfo = {
        ...existingBookingInfo,
        formData,
      };

      // Save the updated bookingInfo back to localStorage
      localStorage.setItem('bookingInfo', JSON.stringify(updatedBookingInfo));

      // Add your logic for form submission here
      console.log('Form no error submitted:', updatedBookingInfo);

      
      navigate('/BookingConfirm');
      setLoading(true)
      
    }
  };
  
  

  return (
    <div className="md:w-2/3" style={{ fontFamily: 'Gilda Display, serif' }}>
      <div>
        <p className="text-xl md:text-2xl pb-3">Add Your Informations :</p>
        <div>
          <form className="flex flex-col gap-5">
            <div className="grid md:grid-cols-2 gap-5">
            <div className='flex flex-col gap-1'>
              <input
                type="text"
                name="firstName"
                placeholder="First Name (Required)"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className={`py-2 px-2 border bg-slate-50 ${formErrors.firstName && 'border-red-500'}`}
              />
              {formErrors.firstName && <p className="text-red-500">{formErrors.firstName}</p>}
              </div>

              <div className='flex flex-col gap-1'>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name (Required)"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className={`py-2 px-2 border bg-slate-50 ${formErrors.lastName && 'border-red-500'}`}
              />
              {formErrors.lastName && <p className="text-red-500">{formErrors.lastName}</p>}
              </div>

              <div className='flex flex-col gap-1'>
              <input
                type="email"
                name="email"
                placeholder="Your Email (Required)"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`py-2 px-2 border bg-slate-50 ${formErrors.email && 'border-red-500'}`}
              />
              {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
              </div>

              <div className='flex flex-col gap-1'>
              <input
                type="tel"
                name="phone"
                placeholder="Phone (Required)"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className={`py-2 px-2 border bg-slate-50 ${formErrors.phone && 'border-red-500'}`}
              />
              {formErrors.phone && <p className="text-red-500">{formErrors.phone}</p>}
              </div>

              <div className='flex flex-col gap-1'>
              <input
                type="text"
                name="address"
                placeholder="address "
                value={formData.address}
                onChange={handleInputChange}
                
                className={`py-2 px-2 border bg-slate-50 ${formErrors.address && 'border-red-500'}`}
              />
              {formErrors.address && <p className="text-red-500">{formErrors.address}</p>}
              </div>

              <div className='flex flex-col gap-1'>
              <input
                type="text"
                name="city"
                placeholder="City "
                value={formData.city}
                onChange={handleInputChange}
                
                className={`py-2 px-2 border bg-slate-50 ${formErrors.city && 'border-red-500'}`}
              />
              {formErrors.city && <p className="text-red-500">{formErrors.city}</p>}
              </div>

              <div className='flex flex-col gap-1'>
              <textarea
                type="text"
                name="message"
                cols={30}
                rows={5}
                placeholder="Message "
                value={formData.message}
                onChange={handleInputChange}
                
                className={`py-2 px-2 border bg-slate-50 ${formErrors.message && 'border-red-500'}`}
              />
              {formErrors.message && <p className="text-red-500">{formErrors.message}</p>}
              </div>
              
              <div className='flex flex-col gap-1'>
              <label htmlFor="time">Arrival</label>
              <input
                type="time"
                id='time'
                name="arrivalTime"
                placeholder="Arrival Time  "
                value={formData.arrivalTime}
                onChange={handleInputChange}                
                className={`py-2 px-2 border bg-slate-50 ${formErrors.arrivalTime && 'border-red-500'}`}
              />
              {formErrors.arrivalTime && <p className="text-red-500">{formErrors.arrivalTime}</p>}
              </div>

              {/* Add similar lines for other fields */}

            </div>
            {/* Add other form fields here */}

            <div>
              <button
                type="button"
                onClick={handleConfirmButtonClick}
                className="bg-[#BE9874] py-2 px-8 text-sm text-white"
              >
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;










// const BookingForm = () => {
//   return (
//     <div className="md:w-2/3" style={{ fontFamily: "Gilda Display, serif" }}>
//           <div>
//             <p className="text-xl md:text-2xl pb-3">Add Your Informations :</p>
//             <div>
//               <form className="flex flex-col gap-5">
//                 <div className="grid md:grid-cols-2 gap-5">
//                   <input type="text" name="firstName" id="" placeholder="First Name (Required)" required className="py-2 px-2 border bg-slate-50" />
//                   <input type="text" name="lastName" id="" placeholder="Last Name (Required)" required className="py-2 px-2 border bg-slate-50" />
//                   <input type="email" name="email" id="" placeholder="Email (Required)" required className="py-2 px-2 border bg-slate-50" />
//                   <input type="tel" name="phone" id="" placeholder="Phone (Required)" required className="py-2 px-2 border bg-slate-50" />
//                   <input type="text" name="address" id="" placeholder="Address" className="py-2 px-2 border bg-slate-50" />
//                   <input type="text" name="city" id="" placeholder="city" className="py-2 px-2 border bg-slate-50" />
                  
//                 </div>
//                 <textarea name="message" id="" cols="30" rows="5" placeholder="Message" className="py-2 px-2 border bg-slate-50 w-full"></textarea>
//                 <div className="flex gap-2">
//                   <label for="time">Arrival</label>
//                  <input type="time" name="time" id="time" placeholder="Arrival" />
//                 </div>
//                 <input type="text" placeholder="Coupon" className="py-2 px-2 border bg-slate-50 w-full"  />
//                 <div>

//                   <button id="confirmButton" className="bg-[#BE9874] py-2 px-8 text-sm text-white">Confirm</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//   )
// }

// export default BookingForm