import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home.js';
import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import ReviewPage from './pages/ReviewPage';
import WriteReviewPage from './pages/WriteReviewPage';
import ReservationPage from './pages/ReservationPage';
<<<<<<< HEAD
import TransferData from './components/TransferData.js'; // TransferData 컴포넌트 추가
=======
import MakeReservationPage from './pages/MakeReservationPage';
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> 7fbc123330835419ebdfc79a7ec07258c0af619f

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
        <Route path="/write-review" element={<WriteReviewPage />} />
        <Route path="/reservations" element={<ReservationPage />} />
        <Route path="/make-reservation" element={<MakeReservationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
