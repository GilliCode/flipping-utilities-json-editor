import ErrorBoundary from './assets/components/ErrorBoundry'; // Correct filename
import BondConverter from './assets/components/BondConverter';
import './App.css';





function App() {
  return (
    <div className="App">
      {/* Render the BondConverter component inside the ErrorBoundary */}
      <ErrorBoundary>
        <BondConverter />
      </ErrorBoundary>
    </div>
  );
}

export default App;
