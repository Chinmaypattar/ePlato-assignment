import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Page/Login';
import Home from './Page/Home'
import { ContextApp } from './utils/Context';

const ProtectedRoute = ({ element,isAuntenticated }) => {
  return isAuntenticated ? element : <Navigate to="/" />;
};

const App = () => {
  const { isAuntenticated } = useContext(ContextApp);
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login />} />

        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/home" element={<ProtectedRoute element={<Home />} isAuntenticated={isAuntenticated}/>} />

      </Routes>
    </Router>
  );
};

export default App;
