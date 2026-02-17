// Example: Scrape Amazon Product Reviews
const { CrawlingAPI } = require('crawlbase'),
  api = new CrawlingAPI({ token: 'CRAWLBASE_JS_TOKEN' }),
  amazonReviewsURL =
    'https://www.amazon.com/Meta-Quest-Pro-Oculus/product-reviews/B09Z7KGTVW/?reviewerType=all_reviews';

async function fetchReviews(url, reviews = []) {
  try {
    const response = await api.get(url, {
      scraper: 'amazon-product-reviews',
    });

    if (response.statusCode === 200) {
      const data = response.json.body;

      console.log(data);
    } else {
      throw new Error(`API request failed with status: ${response.statusCode}`);
    }
  } catch (error) {
    console.error(`API call failed: ${error.message}`);
  }
}

// Call the fetchReviews function to start the scraping process
fetchReviews(amazonReviewsURL);

