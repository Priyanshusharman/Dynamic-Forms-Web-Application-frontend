import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css'; // Import CSS file

const Home = () => {
    const handleRefresh = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/forms/refresh');
            if (response.status === 200) {
                alert('Data refreshed and sent to Google Sheets successfully');
            } else {
                alert('Failed to refresh data');
            }
        } catch (error) {
            console.error('Error refreshing data:', error);
            alert('Error refreshing data');
        }
    };

    return (
        <div className="container">
            <h1>Select a Form</h1>
            <div className="card">
                <Link to="/form/A" >Form A</Link>
            </div>
            <div className="card">
                <Link to="/form/B">Form B</Link>
            </div>
            <button className="refresh-button" onClick={handleRefresh}>Refresh</button>
        </div>
    );
};

export default Home;
