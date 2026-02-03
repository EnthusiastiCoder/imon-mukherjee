import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { fetchScholarData, getCachedData } from './scholarService.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/scholar', async (req, res) => {
  try {
    const cachedData = getCachedData();
    if (cachedData) {
      return res.json(cachedData);
    }
    
    const data = await fetchScholarData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scholar data' });
  }
});

async function initializeData() {
  try {
    await fetchScholarData();
  } catch (error) {
    console.error('Failed to fetch initial scholar data:', error);
  }
}

cron.schedule('0 0 * * *', async () => {
  try {
    await fetchScholarData();
  } catch (error) {
    console.error('Failed to update scholar data:', error);
  }
});

initializeData();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
