import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home.js';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import ReviewPage from './pages/ReviewPage';
import ReservationPage from './pages/ReservationPage';
import TransferData from './components/TransferData.js'; // TransferData 컴포넌트 추가

function App() {
  return (
    <Router>
      {/* TransferData를 앱 로드 시 한 번 실행되도록 배치 */}
      <TransferData />
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
