import { useState } from "react";

const ImageField = () => {
     // Initialize state with a single input field
  const [inputFields, setInputFields] = useState(['']);

  // Function to handle adding a new input field
  const addField = () => {
    setInputFields([...inputFields, '']); // Add a new empty string to represent the new input field
  };

  // Function to update the value of an existing input field
  const handleChange = (index, event) => {
    const values = [...inputFields];
    values[index] = event.target.value;
    setInputFields(values);
  };
  console.log(inputFields);
  
  return (
    <div>
      <div className="mb-4.5">
        <div className="flex justify-between items-center">
          <label className="mb-2.5 block text-black dark:text-white">
            Image URL <span className="text-meta-1">*</span>
          </label>
          {/* Add Field label acts as a button to add a new input field */}
          <label
            onClick={addField}
            className="mb-2.5 block text-black dark:text-white cursor-pointer bg-gray-200 dark:bg-primary p-2 text-xs"
          >
            Add Field
          </label>
        </div>
        {/* Map through the inputFields array to render an input for each field */}
        {inputFields.map((inputField, index) => (
          <input
            key={index}
            type="text"
            placeholder="Enter your image url"
            value={inputField}
            onChange={(e) => handleChange(index, e)}
            className="w-full mb-2.5 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        ))}
      </div>
    </div>
  )
}

export default ImageField