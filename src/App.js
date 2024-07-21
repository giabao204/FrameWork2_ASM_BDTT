import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientApp from './client/ClientApp';
import AdminApp from './admin/AdminApp';

const App = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route path="/*" element={<ClientApp />} />
    </Routes>
  );
};

export default App;
