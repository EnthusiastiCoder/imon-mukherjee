import GoogleSearch from 'google-search-results-nodejs';

const search = new GoogleSearch.GoogleSearch(process.env.SERPAPI_KEY);
const SCHOLAR_USER_ID = '3xcXNz0AAAAJ';

let cachedData = null;
let lastFetch = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Google Scholar's "since" column is relative to the current year, so SerpAPI
// returns the key as since_<year> and that year moves. It was since_2019 when
// this was written and is not any more, which is why every "since" figure came
// back as 0. Read whichever since_* key the payload actually carries rather than
// naming one, so this does not silently zero out again each January.
function sinceRecent(row) {
  if (!row) return 0;
  const key = Object.keys(row).find((k) => /^since_\d{4}$/.test(k));
  return (key && row[key]) || 0;
}

async function fetchScholarData() {
  return new Promise((resolve, reject) => {
    search.json({
      engine: "google_scholar_author",
      author_id: SCHOLAR_USER_ID,
      hl: "en"
    }, (data) => {
      if (!data || data.error || !data.author) {
        reject(new Error('Failed to fetch scholar data'));
        return;
      }

      const citationsByYear = {};
      if (data.cited_by?.graph) {
        data.cited_by.graph.forEach(item => {
          citationsByYear[item.year] = item.citations;
        });
      }

      const sortedYears = Object.keys(citationsByYear).sort();
      const citationsByYearArray = sortedYears
        .slice(-8)
        .map(year => ({
          year: parseInt(year),
          count: citationsByYear[year]
        }));

      cachedData = {
        citations: {
          total: data.cited_by?.table?.[0]?.citations?.all || 0,
          sinceRecent: sinceRecent(data.cited_by?.table?.[0]?.citations)
        },
        hIndex: {
          total: data.cited_by?.table?.[1]?.h_index?.all || 0,
          sinceRecent: sinceRecent(data.cited_by?.table?.[1]?.h_index)
        },
        i10Index: {
          total: data.cited_by?.table?.[2]?.i10_index?.all || 0,
          sinceRecent: sinceRecent(data.cited_by?.table?.[2]?.i10_index)
        },
        citationsByYear: citationsByYearArray,
        profileUrl: `https://scholar.google.com/citations?user=${SCHOLAR_USER_ID}&hl=en`
      };

      lastFetch = new Date();
      resolve(cachedData);
    });
  });
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  
  try {
    const now = new Date();
    if (cachedData && lastFetch && (now - lastFetch) < CACHE_DURATION) {
      return res.status(200).json(cachedData);
    }
    
    const data = await fetchScholarData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scholar data' });
  }
}
