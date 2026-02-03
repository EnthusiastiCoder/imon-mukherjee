import GoogleSearch from 'google-search-results-nodejs';
const search = new GoogleSearch.GoogleSearch(process.env.SERPAPI_KEY);

const SCHOLAR_USER_ID = '3xcXNz0AAAAJ';
let cachedData = null;
let lastFetch = null;

export async function fetchScholarData() {
  return new Promise((resolve, reject) => {
    search.json({
      engine: "google_scholar_author",
      author_id: SCHOLAR_USER_ID,
      hl: "en"
    }, (data) => {
      if (!data) {
        console.error('No data received from SerpApi');
        reject(new Error('No data received from SerpApi'));
        return;
      }

      if (data.error) {
        console.error('SerpApi error:', data.error);
        reject(new Error(data.error));
        return;
      }
      
      if (!data.author) {
        console.error('Invalid response - no author data');
        reject(new Error('Invalid response from SerpApi'));
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
            since2020: data.cited_by?.table?.[0]?.citations?.since_2019 || 0
          },
          hIndex: {
            total: data.cited_by?.table?.[1]?.h_index?.all || 0,
            since2020: data.cited_by?.table?.[1]?.h_index?.since_2019 || 0
          },
          i10Index: {
            total: data.cited_by?.table?.[2]?.i10_index?.all || 0,
            since2020: data.cited_by?.table?.[2]?.i10_index?.since_2019 || 0
          },
          citationsByYear: citationsByYearArray,
          profileUrl: `https://scholar.google.com/citations?user=${SCHOLAR_USER_ID}&hl=en`
        };

        lastFetch = new Date();
        resolve(cachedData);
    });
  });
}

export function getCachedData() {
  return cachedData;
}

export function getLastFetchTime() {
  return lastFetch;
}
