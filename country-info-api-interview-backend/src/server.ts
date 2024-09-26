import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint: Get Available Countries
app.get('/api/countries', async (req, res) => {
  try {
    const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching available countries:', error);
    res.status(500).json({ error: 'Failed to fetch available countries' });
  }
});

// Endpoint: Get Country Info
app.get('/api/country/:countryCode', async (req, res) => {
  const { countryCode } = req.params;

  try {
    // Fetch border countries
    const borderResponse = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
    const borderCountries = borderResponse.data.borders;

    // Fetch populatio data
    const populationResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/population', {
      country: borderResponse.data.commonName
    });
    const populationData = populationResponse.data.data.populationCounts;

    // Fetch flag URL
    const flagResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', {
      country: borderResponse.data.commonName
    });
    const flagUrl = flagResponse.data.data.flag;

    res.json({
      borderCountries,
      populationData,
      flagUrl
    });
  } catch (error) {
    console.error('Error fetching country info:', error);
    res.status(500).json({ error: 'Failed to fetch country info' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
