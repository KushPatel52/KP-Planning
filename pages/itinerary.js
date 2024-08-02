import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Itinerary = () => {
    const router = useRouter();
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItinerary = async () => {
            try {
                const response = await fetch('/api/generate-itinerary', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        destination: router.query.destination,
                        startDate: router.query.startDate,
                        endDate: router.query.endDate,
                        budget: router.query.budget,
                    }),
                });
                const data = await response.json();
                setItinerary(data.itinerary);
            } catch (error) {
                console.error('Error fetching itinerary:', error);
            } finally {
                setLoading(false);
            }
        };

        if (router.query.destination) {
            fetchItinerary();
        }
    }, [router.query]);

    if (loading) {
        return (
            <div
                style={{
                    backgroundImage: "url('/loading-page.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                }}
            >
                <div className="spinner"></div>
                <style jsx>{`
                    .spinner {
                        border: 16px solid rgba(0, 0, 0, 0.1);
                        border-left-color: #000;
                        border-radius: 50%;
                        width: 120px;
                        height: 120px;
                        animation: spin 1.2s linear infinite;
                    }

                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}</style>
                <p>Loading itinerary...</p>
            </div>
        );
    }

    if (!itinerary) {
        return <div>Failed to load itinerary.</div>;
    }

    return (
        <div
            style={{
                backgroundImage: "url('/final-screen.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adding a semi-transparent overlay
                backgroundBlendMode: 'overlay',
                position: 'relative'
            }}
        >
            <h1 style={{ marginBottom: '20px', fontSize: '42px', fontWeight: 'bold' }}>Your Itinerary for {router.query.destination}</h1>
            {itinerary.map((day) => (
                <div
                    key={day.day}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // More transparent
                        borderRadius: '10px',
                        padding: '15px',
                        margin: '10px 0',
                        width: '70%',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', color: 'DarkSeaGreen' }}>{day.day}</h2>
                    <ul style={{ listStyleType: 'circle', padding: '0 20px', margin: '10px 0' }}>
                        {day.places.map((place, index) => (
                            <li key={index} style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'normal', color: 'white' }}>{place}</li>
                        ))}
                    </ul>
                </div>
            ))}
            <button
                onClick={() => router.push('/')}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Similar to form page
                    color: 'DarkSeaGreen',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px',
                    transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
                Plan Another Trip
            </button>
        </div>
    );
};

export default Itinerary;
