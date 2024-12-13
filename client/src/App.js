import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeDetails from './components/EmployeeDetails';
import ErrorBoundary from './components/ErrorBoundary';
import UpcomingRetirements from './components/UpcomingRetirements';
import Home from './components/home';

function App() {
  return (
    <ErrorBoundary>
    <Router>
      <div className="app-wrapper">
        <NavigationBar />
        
        {/* Main Content */}
        <Container className="main-content">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<EmployeeDirectory />} />
            <Route path="/employees/:type" element={<EmployeeDirectory />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/create" element={<EmployeeCreate />} />
            <Route path="/upcoming-retirements" element={<UpcomingRetirements />} />
          </Routes>
        </Container>
      </div>
    </Router>
    </ErrorBoundary>
  );
}

export default App;