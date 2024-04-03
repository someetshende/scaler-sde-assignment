

// components
import NavBar from './components/NavBar.jsx';
import DashBoard from './components/DashBoard.jsx';
import AllBookings from './components/AllBookings.jsx';
import AllRooms from './components/AllRooms.jsx';
import EditBooking from './components/EditUser.jsx';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<DashBoard />} />
        <Route path='/allrooms' element={<AllRooms />} />
        <Route path='/allbookings' element={<AllBookings />} />
        <Route path='/edit/:id' element={<EditBooking />} />
      </ Routes>
    </BrowserRouter>
  );
}

export default App;
