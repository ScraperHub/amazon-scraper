// Example: Scrape Amazon Product Details

const { CrawlingAPI } = require('crawlbase');

// Initialize API
const api = new CrawlingAPI({ token: 'YOUR_CRAWLBASE_TOKEN' });

/**
 * Scrape detailed product information
 */
async function scrapeProductDetails(asin) {
  const url = `https://www.amazon.com/dp/${asin}`;
  
  console.log(`Scraping product: ${asin}`);
  
  try {
    const response = await api.get(url, {
      scraper: 'amazon-product-scraper',
      format: 'json',
      ajax_wait: true  // Wait for dynamic content
    });
    
    const product = JSON.parse(response.body);
    
    // Display product information
    console.log('\n=== Product Information ===');
    console.log(`ASIN: ${product.asin}`);
    console.log(`Title: ${product.title}`);
    console.log(`Brand: ${product.brand || 'N/A'}`);
    console.log('\n=== Pricing ===');
    console.log(`Price: ${product.price.symbol}${product.price.value}`);
    console.log(`Currency: ${product.price.currency}`);
    console.log(`Availability: ${product.availability}`);
    
    console.log('\n=== Ratings & Reviews ===');
    console.log(`Rating: ${product.rating}/5`);
    console.log(`Total Reviews: ${product.reviews_count}`);
    
    if (product.seller) {
      console.log('\n=== Seller Information ===');
      console.log(`Seller: ${product.seller.name}`);
      console.log(`Seller Rating: ${product.seller.rating}%`);
      console.log(`Seller Reviews: ${product.seller.rating_count}`);
    }
    
    if (product.features && product.features.length > 0) {
      console.log('\n=== Key Features ===');
      product.features.forEach((feature, index) => {
        console.log(`${index + 1}. ${feature}`);
      });
    }
    
    console.log('\n=== Images ===');
    console.log(`Total images: ${product.images?.length || 0}`);
    
    // Save to file
    const fs = require('fs');
    const filename = `product_${asin}_${Date.now()}.json`;
    fs.writeFileSync(filename, JSON.stringify(product, null, 2));
    console.log(`\n✓ Data saved to ${filename}`);
    
    return product;
    
  } catch (error) {
    console.error('Error scraping product:', error.message);
    throw error;
  }
}

// Run example
if (require.main === module) {
  const asin = process.argv[2] || 'B08N5WRWNW';
  
  scrapeProductDetails(asin)
    .then(() => console.log('\n✓ Scraping completed successfully!'))
    .catch(() => console.error('\n✗ Scraping failed'));
}

module.exports = { scrapeProductDetails };
