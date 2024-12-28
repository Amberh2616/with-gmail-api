import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GmailProvider } from './components/GmailProvider';
import { HomePage } from './pages/HomePage';
import { MailPage } from './pages/MailPage';

export function App() {
  return (
    <GmailProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mail/:id" element={<MailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GmailProvider>
  );
}