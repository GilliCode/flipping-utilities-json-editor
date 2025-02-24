import React, { useState } from 'react';
import BondForm from './BondForm';

// Define the structure of a bond transaction object
interface BondDetails {
  uuid: string; // Unique identifier for the bond
  id: number; // Numeric ID for the bond
  name: string; // Name of the bond
  price: number; // Price of the bond (in the currency unit)
  status: string; // Current status of the bond (e.g., BOUGHT, SOLD)
  conversionCost: number; // Conversion cost for the bond (usually a percentage of price)
}

const BondTransactions: React.FC = () => {
  // Initializing the state to store transactions with an example data
  const [transactions, setTransactions] = useState<BondDetails[]>([
    {
      uuid: "16c65728-6032-4346-bfe8-3d63eacae076",
      id: 13190,
      name: "Old school bond", // Example name of a bond
      price: 13000002, // Example bond price
      status: "BOUGHT", // Initial bond status
      conversionCost: 1300002 // 10% conversion cost of the bond's price
    },
    // More transactions can be added here in the future
  ]);

  // Function to add a new transaction to the state
  const addTransaction = (newTransaction: BondDetails) => {
    setTransactions([...transactions, newTransaction]); // Append the new transaction to the current list
  };

  return (
    <div>
      <h1>Bond Transactions</h1>
      {/* Render the BondForm component to allow users to add new transactions */}
      <BondForm addTransaction={addTransaction} />

      {/* Display the list of transactions in a table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Conversion Cost</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over all transactions and display them in rows */}
          {transactions.map((transaction) => (
            <tr key={transaction.uuid}>
              <td>{transaction.id}</td>
              <td>{transaction.name}</td>
              <td>{transaction.price}</td>
              <td>{transaction.status}</td>
              <td>{transaction.conversionCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BondTransactions;
