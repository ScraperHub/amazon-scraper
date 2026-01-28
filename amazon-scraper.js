// Amazon Scraper - Main Example
// This example demonstrates how to scrape various types of Amazon data

const { CrawlingAPI } = require('crawlbase');

// Initialize API with your token
const api = new CrawlingAPI({ token: 'YOUR_CRAWLBASE_TOKEN' });

/**
 * Scrape Amazon product details
 * @param {string} asin - Amazon product ASIN
 * @param {string} domain - Amazon domain (default: com)
 */
async function scrapeProduct(asin, domain = 'com') {
  const url = `https://www.amazon.${domain}/dp/${asin}`;
  
  try {
    const response = await api.get(url, {
      scraper: 'amazon-product-scraper',
      format: 'json'
    });
    
    const product = JSON.parse(response.body);
    
    console.log('Product scraped successfully!');
    console.log('Title:', product.title);
    console.log('Price:', product.price);
    console.log('Rating:', product.rating);
    console.log('Reviews:', product.reviews_count);
    
    return product;
  } catch (error) {
    console.error('Error scraping product:', error);
    throw error;
  }
}

/**
 * Scrape Amazon product reviews
 * @param {string} asin - Amazon product ASIN
 * @param {number} maxPages - Maximum pages to scrape (default: 5)
 */
async function scrapeReviews(asin, maxPages = 5) {
  const reviews = [];
  
  for (let page = 1; page <= maxPages; page++) {
    const url = `https://www.amazon.com/product-reviews/${asin}?pageNumber=${page}`;
    
    try {
      const response = await api.get(url, {
        scraper: 'amazon-reviews-scraper',
        format: 'json'
      });
      
      const pageReviews = JSON.parse(response.body);
      reviews.push(...pageReviews.reviews);
      
      console.log(`Scraped page ${page}/${maxPages} - ${pageReviews.reviews.length} reviews`);
      
    } catch (error) {
      console.error(`Error scraping reviews page ${page}:`, error);
      break;
    }
  }
  
  return reviews;
}

/**
 * Search Amazon products
 * @param {string} query - Search query
 * @param {number} maxPages - Maximum pages to scrape (default: 3)
 */
async function searchProducts(query, maxPages = 3) {
  const products = [];
  
  for (let page = 1; page <= maxPages; page++) {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&page=${page}`;
    
    try {
      const response = await api.get(url, {
        scraper: 'amazon-search-scraper',
        format: 'json'
      });
      
      const results = JSON.parse(response.body);
      products.push(...results.products);
      
      console.log(`Scraped search page ${page}/${maxPages} - ${results.products.length} products`);
      
    } catch (error) {
      console.error(`Error scraping search page ${page}:`, error);
      break;
    }
  }
  
  return products;
}

/**
 * Scrape Amazon best sellers
 * @param {string} category - Category URL or ID
 */
async function scrapeBestSellers(category) {
  const url = `https://www.amazon.com/Best-Sellers-${category}`;
  
  try {
    const response = await api.get(url, {
      scraper: 'amazon-bestsellers-scraper',
      format: 'json'
    });
    
    const bestSellers = JSON.parse(response.body);
    
    console.log(`Scraped ${bestSellers.products.length} best sellers`);
    
    return bestSellers;
  } catch (error) {
    console.error('Error scraping best sellers:', error);
    throw error;
  }
}

/**
 * Monitor price changes for a product
 * @param {string} asin - Amazon product ASIN
 * @param {number} intervalHours - Check interval in hours (default: 24)
 */
async function monitorPrice(asin, intervalHours = 24) {
  const priceHistory = [];
  
  console.log(`Starting price monitoring for ASIN: ${asin}`);
  console.log(`Checking every ${intervalHours} hours`);
  
  const checkPrice = async () => {
    try {
      const product = await scrapeProduct(asin);
      const priceData = {
        timestamp: new Date().toISOString(),
        price: product.price.value,
        availability: product.availability
      };
      
      priceHistory.push(priceData);
      
      console.log(`Price check: $${priceData.price} - ${priceData.availability}`);
      
      if (priceHistory.length > 1) {
        const previousPrice = priceHistory[priceHistory.length - 2].price;
        const priceChange = priceData.price - previousPrice;
        
        if (priceChange !== 0) {
          console.log(`⚠️ Price changed: ${priceChange > 0 ? '+' : ''}$${priceChange.toFixed(2)}`);
        }
      }
      
    } catch (error) {
      console.error('Error checking price:', error);
    }
  };
  
  // Initial check
  await checkPrice();
  
  // Set up interval
  const intervalMs = intervalHours * 60 * 60 * 1000;
  setInterval(checkPrice, intervalMs);
  
  return priceHistory;
}

// Example usage
if (require.main === module) {
  // Example: Scrape a product
  const exampleASIN = 'B08N5WRWNW';
  
  scrapeProduct(exampleASIN)
    .then(product => {
      console.log('\n✓ Product data retrieved successfully!');
    })
    .catch(error => {
      console.error('\n✗ Failed to scrape product');
    });
}

module.exports = {
  scrapeProduct,
  scrapeReviews,
  searchProducts,
  scrapeBestSellers,
  monitorPrice
};
