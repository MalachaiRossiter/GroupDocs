import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login';
import SignUp from './components/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import UserDocuments from './components/UserDocuments';
import CreateDocument from './components/CreateDocument';
import UpdateDocument from './components/UpdateDocument';

function App() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios.post('http://localhost:8000/api/user/loginCheck', {}, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          setLoggedIn(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/signUp" element={<SignUp loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/document/edit/:id" element={<ProtectedRoute loggedIn={loggedIn}><UpdateDocument /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute loggedIn={loggedIn}><UserDocuments loggedIn={loggedIn} setLoggedIn={setLoggedIn} /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute loggedIn={loggedIn}><CreateDocument /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;