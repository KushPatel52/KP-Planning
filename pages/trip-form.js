import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function TripForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        budget: 'Mobility Impairment'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData); // Log the form data
        try {
            const response = await axios.post('/api/generate-itinerary', formData);
            console.log('API response:', response.data); // Log the API response
            router.push({
                pathname: '/itinerary',
                query: { ...formData }
            });
        } catch (error) {
            console.error('Error fetching itinerary:', error); // Log any errors
        }
    };

    return (
        <div
            style={{
                backgroundImage: "url('/new-background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adding a semi-transparent overlay
                backgroundBlendMode: 'overlay',
                position: 'relative'
            }}
        >
            <header style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', alignItems: 'center' }}>
                <Image src="/logo.png" alt="Logo" width={50} height={50} />
                <h1 style={{ marginLeft: '10px', fontSize: '24px', fontWeight: 'bold' }}>KP-Planning</h1>
            </header>
            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // More transparent
                padding: '20px',
                borderRadius: '10px',
                maxWidth: '600px',
                width: '100%',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(10px)'
            }}>
                <h2 style={{ marginBottom: '20px', color: 'DarkSeaGreen', fontSize: '32px', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: '700' }}>Plan Your Trip</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'DarkSeaGreen', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 'bold', fontSize: '18px' }}>Destination</label>
                        <input
                            type="text"
                            name="destination"
                            value={formData.destination}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                fontSize: '16px',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Similar to form color
                                color: 'DarkSeaGreen'
                            }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'DarkSeaGreen', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 'bold', fontSize: '18px' }}>Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                fontSize: '16px',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Similar to form color
                                color: 'white'
                            }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'DarkSeaGreen', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 'bold', fontSize: '18px' }}>End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                fontSize: '16px',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Similar to form color
                                color: 'white'
                            }}
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: 'DarkSeaGreen', fontFamily: 'Helvetica, Arial, sans-serif', fontWeight: 'bold', fontSize: '18px' }}>Disability Type</label>
                        <select
                            name="Disability Type"
                            value={formData.budget}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '5px',
                                border: 'none',
                                fontSize: '16px',
                                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Similar to form color
                                color: 'DarkSeaGreen'
                            }}
                        >
                            <option value="Mobility Impairment" style={{ color: 'black' }}>Mobility Impairment</option>
                            <option value="Visual Impairment" style={{ color: 'black' }}>Visual Impairment</option>
                            <option value="Hearing Impairment" style={{ color: 'black' }}>Hearing Impairment</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Similar to form color
                            color: 'DarkSeaGreen',
                            fontSize: '16px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'}
                        onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
