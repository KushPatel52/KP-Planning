import axios from 'axios';

const handler = async (req, res) => {
    const { destination, startDate, endDate, budget } = req.body;
    const numDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
    const maxPlacesPerDay = 5;

    try {
        // Fetch coordinates for the destination
        const geocodeResponse = await axios.get(`https://api.opentripmap.com/0.1/en/places/geoname`, {
            params: {
                name: destination,
                apikey: process.env.OPENTRIPMAP_API_KEY
            }
        });

        if (!geocodeResponse.data.lat || !geocodeResponse.data.lon) {
            throw new Error('Could not fetch coordinates for the destination');
        }

        const { lat, lon } = geocodeResponse.data;

        // Fetch places of interest based on coordinates
        const response = await axios.get('https://api.opentripmap.com/0.1/en/places/radius', {
            params: {
                radius: 5000,
                lon,
                lat,
                rate: 2,
                format: 'json',
                apikey: process.env.OPENTRIPMAP_API_KEY
            }
        });

        const places = response.data;
        const itinerary = [];

        for (let i = 0; i < numDays; i++) {
            itinerary.push({ day: `Day ${i + 1}`, places: [] });
        }

        places.forEach((place, index) => {
            const dayIndex = index % numDays;
            if (itinerary[dayIndex].places.length < maxPlacesPerDay) {
                itinerary[dayIndex].places.push(place.name);
            }
        });

        res.status(200).json({ itinerary });
    } catch (error) {
        console.error('Error generating itinerary:', error.message);
        res.status(500).json({ error: 'Failed to generate itinerary' });
    }
};

export default handler;
