import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home.js';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import ReviewPage from './pages/ReviewPage';
import ReservationPage from './pages/ReservationPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/reservations" element={<ReservationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
