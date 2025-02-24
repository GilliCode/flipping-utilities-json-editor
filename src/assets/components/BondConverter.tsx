import React, { useState, ChangeEvent } from 'react';
import { Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, MenuItem, Select, InputLabel, FormControl, Snackbar } from '@mui/material';
import Image from '../../assets/images/OSRS_Bond.png'; // Importing the image for display

// Define the interface for Bond Transactions (for TypeScript type safety)
interface BondTransaction {
  uuid: string;
  id: number;
  p: number; // price
  st: string; // status (BOUGHT or SOLD)
  conversionCost?: number; // Optional conversion cost for transactions
  tradeStartedAt: number; // Timestamp when the trade started
}

// Define the structure of the raw JSON file that will be uploaded
interface RawJson {
  accumulatedSessionTimeMillis: number;
  lastModifiedAt: number;
  lastStores: any;
  lastStoreId: number;
  recipeInputGroups: any;
  sessionStartTime: number;
  slotTimers: any;
  trades: BondFile[]; // Array of trades
}

// Define the structure of each trade file in the raw JSON data
interface BondFile {
  id: number;
  name: string;
  tGL: number;
  h: {
    sO: BondTransaction[]; // Array of transactions for the bond
  };
}

const BondConverter: React.FC = () => {
  // State variables
  const [rawJson, setRawJson] = useState<RawJson | null>(null); // To store the parsed JSON file
  const [originalFileName, setOriginalFileName] = useState<string | null>(null); // To store the uploaded file name
  const [statusMessage, setStatusMessage] = useState<string>(''); // To show status messages
  const [dateFormat, setDateFormat] = useState<string>('MM/DD/YYYY'); // To track selected date format (MM/DD/YYYY or DD/MM/YYYY)
  const [converted, setConverted] = useState<boolean>(false); // To track if the JSON data has been converted
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false); // For Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState<string>(''); // For Snackbar message

  // Close the Snackbar after it is shown for a while
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Handle file upload and parse the uploaded JSON file
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      setOriginalFileName(file.name); // Save the uploaded file's name
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          // Parse the file contents to JSON
          const json: RawJson = JSON.parse(event.target?.result as string);
          console.log('Parsed JSON:', json);

          // Check if trades exist in the JSON and if the structure is valid
          if (!json.trades || !Array.isArray(json.trades)) {
            throw new Error('JSON file does not contain expected structure');
          }

          // Filter out Bond data for ID 13190 (assuming it refers to the specific bond data)
          const bondData = json.trades.find(trade => trade.id === 13190);
          if (!bondData || !bondData.h || !Array.isArray(bondData.h.sO)) {
            throw new Error('JSON file does not contain Old School Bonds data');
          }

          console.log('Filtered Bond Transactions:', bondData.h.sO);

          // Update state with the parsed JSON
          setRawJson(json);
          setConverted(false);
          setStatusMessage('File successfully imported.'); // Success message
        } catch (error) {
          // Handle errors
          setStatusMessage('Invalid JSON file.');
          console.error('Error parsing JSON:', error);
        }
      };
      reader.onerror = (error) => {
        // Handle file read errors
        setStatusMessage('Error reading file.');
        console.error('Error reading file:', error);
      };
      reader.readAsText(file); // Read file content as text
    }
  };

  // Calculate conversion cost based on the trade price
  const calculateConversionCost = () => {
    if (!rawJson) {
      setSnackbarMessage('Please choose a file first.'); // Prompt the user if no file is loaded
      setSnackbarOpen(true);
      return;
    }

    const bondData = rawJson.trades.find(trade => trade.id === 13190);
    if (!bondData) return;

    // Iterate over each bond transaction and apply conversion cost if the status is 'BOUGHT'
    const updatedTransactions = bondData.h.sO.map(t => {
      if (t.st === 'BOUGHT') {
        t.conversionCost = t.p * 0.10; // Apply 10% conversion cost for purchases
      }
      return t;
    });

    console.log('Conversion cost calculated:', updatedTransactions);

    // Update state with the updated transactions
    setRawJson({ ...rawJson, trades: rawJson.trades.map(trade => trade.id === 13190 ? { ...trade, h: { sO: updatedTransactions } } : trade) });
    setConverted(true); // Mark the data as converted
    setStatusMessage('Conversion cost calculated and applied.'); // Success message
  };

  // Handle the export of the converted data as a JSON file
  const handleDownload = () => {
    if (!converted) {
      setSnackbarMessage('Please convert or import the JSON first.'); // Prompt if the data is not converted yet, or imported
      setSnackbarOpen(true);
      return;
    }
    if (!rawJson || !originalFileName) return;

    // Convert the JSON to a string and trigger the download
    const jsonStr = JSON.stringify(rawJson, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = originalFileName; // Use the original filename for the export
    link.click(); // Trigger the download
    setStatusMessage('File successfully downloaded.'); // Success message
  };

  // Format the date to either MM/DD/YYYY or DD/MM/YYYY
  const formatDate = (date: number) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = d.getFullYear();
    return dateFormat === 'MM/DD/YYYY' ? `${month}/${day}/${year}` : `${day}/${month}/${year}`;
  };

  return (
    <Container>
      {/* Header section with Bond image and title */}
      <Stack direction="row" alignItems="center" spacing={2} className="mb-4">
        <Box>
          <img src={Image} alt="OSRS Bond" style={{ width: '50px', height: '50px' }} />
        </Box>
        <Box>
          <Typography variant="h3">Bond Converter</Typography>
        </Box>
      </Stack>


      {/* Date Format Selector */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1,
          width: '120px', // Keep a small width
        }}
      >
        <InputLabel
          id="date-format-label"
          style={{ color: '#fff', marginBottom: '5px', fontSize: '10px' }}
        >
          Date Format
        </InputLabel>

        <FormControl
          size="small"
          sx={{
            backgroundColor: '#fff', // White background for a clean look
            borderRadius: '4px',
            border: '1px solid #ddd', // Subtle border for the dropdown
          }}
        >
          <Select
            labelId="date-format-label"
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
            displayEmpty
            sx={{
              fontSize: '8px',
              height: '20px',
              padding: '5px',
              borderRadius: '4px',
              '& .MuiSelect-select': {
                paddingLeft: '10px',
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 250, // Limit menu height for neatness
                },
              },
            }}
          >
            <MenuItem value="MM/DD/YYYY" sx={{ fontSize: '8px' }}>
              MM/DD/YYYY
            </MenuItem>
            <MenuItem value="DD/MM/YYYY" sx={{ fontSize: '8px' }}>
              DD/MM/YYYY
            </MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* File Upload and Export Buttons */}
      <Stack direction="row" spacing={2} className="mb-3" mt={3} justifyContent="space-between">
        <Button
          component="label"
          style={{
            cursor: 'pointer',
            backgroundColor: 'green',
            color: '#fff',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #000',
            width: '150px', // Set fixed width to make it the same as the other button
          }}
          fullWidth
        >
          Import File
          <input type="file" accept=".json" onChange={handleFileUpload} hidden />
        </Button>

        <Button
          style={{
            backgroundColor: 'green',
            width: '150px', // Set fixed width to match the other button
          }}
          onClick={handleDownload}
          variant="contained"
          color="success"
        >
          Export File
        </Button>
      </Stack>

      {/* Display the bond transactions */}
      {rawJson && (
        <div className="bond-details">
          <Typography variant="h4" marginTop={4}>
            Transactions
          </Typography>
          <Typography>
            Quantity Bought:{' '}
            {rawJson.trades.find((trade) => trade.id === 13190)?.h.sO.filter((t) => t.st === 'BOUGHT').length}
          </Typography>
          <Typography>
            Quantity Sold:{' '}
            {rawJson.trades.find((trade) => trade.id === 13190)?.h.sO.filter((t) => t.st === 'SOLD').length}
          </Typography>

          {/* Conversion Button */}
          <Stack spacing={2} className="mb-3" mt={3} alignItems="center" justifyContent="center" width="100%" height="10vh">
            <Button onClick={calculateConversionCost} variant="contained" color="primary">
              Convert
            </Button>
          </Stack>

    {/* Status Message Display */}
      {statusMessage && (
        <Typography variant="body1" color="white" marginBottom={2}>
          {statusMessage}
        </Typography>
      )}

          {/* Table for displaying transactions */}
          <Box mb={3}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Conversion Cost</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rawJson.trades
                    .find((trade) => trade.id === 13190)
                    ?.h.sO.map((transaction) => (
                      <TableRow key={transaction.uuid}>
                        <TableCell>{formatDate(transaction.tradeStartedAt)}</TableCell>
                        <TableCell>{transaction.p}</TableCell>
                        <TableCell>{transaction.conversionCost || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </div>
      )}

      {/* Snackbar to show alerts */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} />
    </Container>
  );
};

export default BondConverter;