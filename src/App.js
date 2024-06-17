import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import FormPage from './components/FormPage';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/form/:type" element={<FormPage/>} />
            </Routes>

        </Router>
    );
}

export default App;
