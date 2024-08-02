import axios from 'axios';

export default async function handler(req, res) {
  const { destination } = req.body;
  const OPENTRIPMAP_API_KEY = process.env.OPENTRIPMAP_API_KEY;

  console.log('OpenTripMap API Key:', OPENTRIPMAP_API_KEY);

  if (!OPENTRIPMAP_API_KEY) {
    return res.status(500).json({ error: 'Missing OpenTripMap API key' });
  }

  try {
    const response = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/geoname?name=${destination}&apikey=${OPENTRIPMAP_API_KEY}`
    );
    const { lat, lon } = response.data;

    const placesResponse = await axios.get(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&rate=3&apikey=${OPENTRIPMAP_API_KEY}`
    );

    const places = placesResponse.data.features.map(feature => ({
      name: feature.properties.name,
      kinds: feature.properties.kinds,
      distance: feature.properties.dist,
    }));

    res.status(200).json({ places });
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    res.status(500).json({ error: 'Failed to fetch tourism data' });
  }
}
