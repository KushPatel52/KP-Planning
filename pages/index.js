import { useRouter } from 'next/router';
import Image from 'next/image';

const Home = () => {
    const router = useRouter();

    const navigateToForm = () => {
        router.push('/trip-form');
    };

    return (
        <div
            style={{
                backgroundImage: "url('/trip-background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
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
            <div style={{ marginTop: '100px' }}>
                <h1 style={{ fontSize: '84px', marginBottom: '10px', color: 'white', fontWeight: 'bold' }}>Welcome to KP-Planning</h1>
                <p className="typing-effect" style={{ fontSize: '20px', marginBottom: '30px', color: 'white', fontWeight: 'semibold' }}>Plan your dream vacation with ease</p>
            </div>
            <div style={{ marginBottom: '950px' }}>
                <button
                    onClick={navigateToForm}
                    style={{
                        padding: '25px 50px',
                        fontSize: '18px',
                        backgroundColor: '#a9a9a9', // Neutral grey
                        color: 'white',
                        border: 'none',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = 'black'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#a9a9a9'}
                >
                    Start Planning
                </button>
            </div>
            <footer style={{ position: 'absolute', bottom: '10px', right: '10px', color: 'white', fontSize: '12px' }}>
                Copyright © 2024 Kush Patel. All Rights Reserved.
            </footer>
            <style jsx>{`
                .typing-effect {
                    overflow: hidden;
                    border-right: .15em solid white;
                    white-space: nowrap;
                    margin: 0 auto;
                    animation: typing 4s steps(30, end) 1s infinite, blink-caret .75s step-end infinite;
                }

                @keyframes typing {
                    0% { width: 0 }
                    50% { width: 30ch }
                    100% { width: 0 }
                }

                @keyframes blink-caret {
                    from, to { border-color: transparent }
                    50% { border-color: white; }
                }
            `}</style>
        </div>
    );
};

export default Home;
