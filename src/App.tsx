// src/App.tsx
import React, { useState } from 'react';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import GalleryPage from './components/pages/GalleryPage';
import AktivityPage from './components/pages/AktivityPage';
import CenikPage from './components/pages/CenikPage';
import RecenzePage from './components/pages/RecenzePage';
import KontaktPage from './components/pages/KontaktPage';
import BookingPage from './components/pages/BookingPage';
import AdminApp from './components/AdminApp';
import InitializeApp from './components/InitializeApp';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'about':
        return <AboutPage navigate={navigate} />;
      case 'gallery':
        return <GalleryPage navigate={navigate} />;
      case 'aktivity':
        return <AktivityPage navigate={navigate} />;
      case 'cenik':
        return <CenikPage navigate={navigate} />;
      case 'recenze':
        return <RecenzePage navigate={navigate} />;
      case 'kontakt':
        return <KontaktPage navigate={navigate} />;
      case 'booking':
        return <BookingPage navigate={navigate} />;
      case 'admin':
        return <AdminApp />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <InitializeApp>
      <div className="min-h-screen">{renderPage()}</div>
    </InitializeApp>
  );
};

export default App;