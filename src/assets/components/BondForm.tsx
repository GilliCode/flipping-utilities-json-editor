import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define the structure of the BondFormProps
interface BondFormProps {
  // Function passed from parent component to add a new bond transaction
  addTransaction: (transaction: BondDetails) => void;
}

// Define the structure of the bond details
interface BondDetails {
  uuid: string; // Unique identifier for the bond
  id: number; // Numeric ID for the bond
  name: string; // Name of the bond
  price: number; // Price of the bond
  status: string; // Status of the bond (BOUGHT/SOLD)
  conversionCost: number; // Conversion cost, generally a percentage of price
}

const BondForm: React.FC<BondFormProps> = ({ addTransaction }) => {
  // State to track the details of the bond being added
  const [bondDetails, setBondDetails] = useState<BondDetails>({
    uuid: '', // UUID will be generated upon submission
    id: 13190, // Default ID (could be dynamically set if needed)
    name: 'Old school bond', // Default bond name
    price: 0, // Default price set to 0
    status: '', // Default status empty
    conversionCost: 0, // Default conversion cost set to 0
  });

  // Handle input field changes and update the corresponding value in state
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Extract input name and value
    setBondDetails({
      ...bondDetails, // Spread previous state values
      [name]: value, // Update the specific field (e.g., name, price, etc.)
    });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior (refreshing)

    // Ensure that the price entered is a valid positive number
    if (isNaN(bondDetails.price) || bondDetails.price <= 0) {
      alert('Please provide a valid price.'); // Alert if price is invalid
      return; // Stop form submission if price is invalid
    }

    // Create a new transaction object with a generated UUID (current timestamp)
    const updatedDetails = { ...bondDetails, uuid: new Date().getTime().toString() };

    // Pass the new transaction object back to the parent component
    addTransaction(updatedDetails);

    // Reset the form fields after a successful submission
    setBondDetails({
      uuid: '',
      id: 13190,
      name: 'Old school bond',
      price: 0,
      status: '',
      conversionCost: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Hidden input for bond ID (not editable by the user) */}
      <input type="hidden" name="id" value={bondDetails.id} />

      {/* Input for bond name */}
      <div className="tooltip">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={bondDetails.name}
          onChange={handleChange} // Track changes
          required // This field is required
        />
        <span className="tooltiptext">Enter the name of the bond</span>
      </div>

      {/* Input for bond price */}
      <div className="tooltip">
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={bondDetails.price}
          onChange={handleChange} // Track changes
          required // This field is required
        />
        <span className="tooltiptext">Enter the price (e.g., 100000, 1500)</span>
      </div>

      {/* Input for bond status (BOUGHT/SOLD) */}
      <div className="tooltip">
        <input
          type="text"
          name="status"
          placeholder="Status (BOUGHT/SOLD)"
          value={bondDetails.status}
          onChange={handleChange} // Track changes
          required // This field is required
        />
        <span className="tooltiptext">Enter the status as BOUGHT or SOLD</span>
      </div>

      {/* Input for conversion cost */}
      <div className="tooltip">
        <input
          type="number"
          name="conversionCost"
          placeholder="Conversion Cost"
          value={bondDetails.conversionCost}
          onChange={handleChange} // Track changes
          required // This field is required
        />
        <span className="tooltiptext">Enter the conversion cost</span>
      </div>

      {/* Submit button to add the bond transaction */}
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default BondForm;
