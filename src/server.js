import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/wordle', async (req, res) => {
  try {
    const response = await fetch('https://wordle-api.vercel.app/api/wordle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Wordle API:', error);
    res.status(500).json({ message: 'Error fetching data from Wordle API' });
  }
});

app.get('/', (req, res) => {
  res.send('CORS is enabled for all origins!');
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
