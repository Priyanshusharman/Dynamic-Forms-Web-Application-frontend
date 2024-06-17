import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles.css'; // Import CSS file

const FormPage = () => {
    const { type } = useParams();
    const [name, setName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        //country codes 
        const countries = [
            { code: 'US', name: 'United States' },
            { code: 'IN', name: 'India' },
            { code: 'CA', name: 'Canada' },
            { code: 'GB', name: 'United Kingdom' },
            { code: 'FR', name: 'France' },
            { code: 'DE', name: 'Germany' },
            { code: 'JP', name: 'Japan' },
            { code: 'AU', name: 'Australia' },
            { code: 'BR', name: 'Brazil' },
            { code: 'MX', name: 'Mexico' }
          ];

        setCountries(countries);

        // Load form data from local storage
        const savedData = JSON.parse(localStorage.getItem(type));
        if (savedData) {
            setName(savedData.name);
            setCountryCode(savedData.countryCode);
            setPhoneNumber(savedData.phoneNumber);
        }
    }, [type]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { type, name, countryCode, phoneNumber };
        try {
            await axios.post('http://localhost:5000/api/forms', formData);
            localStorage.setItem(type, JSON.stringify(formData)); // Save form data to local storage
            alert('Form submitted successfully');
        } catch (error) {
            alert('Error submitting form: ' + error.message);
        }
    };

    return (
        <div className="form-container-top">
            <div className="form-container">
                <h1>{`Form ${type}`}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            pattern="[A-Za-z\s]+"
                        />
                    </div>
                    <div className="form-group">
                        <label>Country Code:</label>
                        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} required>
                            <option value="">Select Country</option>
                            {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            minLength={10}
                            maxLength={10} 
                            pattern="\d+"
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default FormPage;
