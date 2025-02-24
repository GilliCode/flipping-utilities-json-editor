# Flipping Utilities JSON Editor

A user-friendly JSON editor for Flipping Utilities in Old School RuneScape (OSRS), built with React and TypeScript. This project aims to provide an intuitive interface for editing JSON files related to the OSRS flipping utilities, specifically focusing on adding the cost conversion to bonds. It helps users manage their trading data and calculate costs effectively.

## Features
- **Intuitive JSON editing interface**: Easily edit JSON files for OSRS flipping data.
- **Seamless cost conversion to bonds calculation**: Calculate conversion costs for bonds effortlessly.
- **User-friendly design**: Easy-to-use UI with tooltips and clear inputs.
- **Transactions Management**: Add, view, and manage bond transaction records.
- **React & TypeScript**: Modern React application built using TypeScript for type safety and maintainability.

## Usage
Running the Application Locally
1. Clone the repository:
'git clone https://github.com/GilliCode/flipping-utilities-json-editor.git'
'cd flipping-utilities-json-editor'

2. Install dependencies: 'npm install'

3. Run the application in development mode: 'npm run dev'

4. Open the application: Click the link provided in the terminal to view the application in your browser.

Editing JSON Data
1. Upload a JSON File:
Click on the "Choose File" button to upload your JSON file.

2. Edit Bond Transactions:
Use the form to add or edit bond transaction details, including bond name, price, status (BOUGHT/SOLD), and conversion cost.

3. Calculate Conversion Costs:
Click the "Convert" button to calculate the conversion costs for the bonds. The conversion cost is calculated as a percentage of the bond price.

Export Edited JSON:
4. Once you have made the necessary edits and calculations, click the "Export" button to download the updated JSON file.

Tooltips
Tooltips are provided to guide users in entering valid data in the bond form, making the application more user-friendly.

## Components Breakdown
App.tsx
The root component of the application which renders the BondConverter component.

Responsibilities:

Render the main component (BondConverter).

Manage the structure and UI for the whole app.

BondTransactions.tsx
This component manages the state of bond transactions. It displays a table of bond transactions and provides a form for adding new transactions.

Responsibilities:

Transaction Table: Displays ID, Name, Price, Status, and Conversion Cost.

Adding Transactions: Uses the addTransaction function to add new bond transaction data to the list.

BondForm.tsx
This component provides a form for adding bond transaction data, including name, price, status, and conversion cost.

Responsibilities:

Form Handling: Manages inputs for bond name, price, status (BOUGHT/SOLD), and conversion cost.

Validation: Validates input data before submitting.

BondConverter.tsx
This component acts as the main logic behind converting bond prices and calculating conversion costs.

Responsibilities:

Price Conversion: Handles the bond price conversion to a more user-friendly format.

## Folder Structure
│
├── src/
│   ├── assets/
│   │   └── components/
│   │       ├── BondForm.tsx       # Form to add bond transaction
│   │       ├── BondTransactions.tsx # Manages the bond transaction table
│   │       └── BondConverter.tsx   # Main logic for bond price conversion
│   │
│   ├── App.tsx                    # Main entry point of the app
│   ├── App.css                    # Styles for the app
│   └── index.tsx                  # React DOM entry point
│
├── package.json                   # Project dependencies and configuration
├── tsconfig.json                  # TypeScript configuration
├── README.md                      # Project documentation
└── LICENSE                        # Project license (MIT)


### Key Points Updated:
1. **Components Breakdown**: I added detailed descriptions of the core components (`App.tsx`, `BondTransactions.tsx`, `BondForm.tsx`, and `BondConverter.tsx`).
2. **How to Use the App**: I described how users can run the app locally and use the form to manage bond transactions.
3. **Folder Structure**: This explains how the project is organized and where the core components reside.
4. **Tooltips**: Explained the use of tooltips in the UI, which guide users through data entry.

