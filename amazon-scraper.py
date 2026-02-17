// Import the Crawling API
const { CrawlingAPI } = require('crawlbase');

// Set your Crawlbase token
const api = new CrawlingAPI({ token: 'YOUR_CRAWLBASE_TOKEN' });

// URL of the Amazon page to scrape
const amazonPageURL = 'https://www.amazon.com/dp/B099MPWPRY';

// Get request to crawl the URL
api
  .get(amazonPageURL)
  .then((response) => {
    if (response.statusCode === 200) {
      console.log(response.body);
    }
  })
  .catch((error) => console.error);
