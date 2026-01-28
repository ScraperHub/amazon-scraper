// Example: Search and Compare Amazon Products

const { CrawlingAPI } = require('crawlbase');

const api = new CrawlingAPI({ token: 'YOUR_CRAWLBASE_TOKEN' });

/**
 * Search for products and compare prices
 */
async function searchAndCompare(query, maxPages = 3) {
  console.log(`Searching for: "${query}"`);
  console.log(`Maximum pages: ${maxPages}\n`);
  
  const allProducts = [];
  
  for (let page = 1; page <= maxPages; page++) {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&page=${page}`;
    
    try {
      const response = await api.get(url, {
        scraper: 'amazon-search-scraper',
        format: 'json'
      });
      
      const data = JSON.parse(response.body);
      
      if (!data.products || data.products.length === 0) {
        console.log(`No more products found at page ${page}`);
        break;
      }
      
      allProducts.push(...data.products);
      console.log(`✓ Page ${page}: ${data.products.length} products found`);
      
    } catch (error) {
      console.error(`✗ Error on page ${page}:`, error.message);
      break;
    }
  }
  
  if (allProducts.length === 0) {
    console.log('No products found!');
    return;
  }
  
  // Filter valid products with prices
  const validProducts = allProducts.filter(p => p.price && p.price.value);
  
  // Price analysis
  const prices = validProducts.map(p => p.price.value);
  const avgPrice = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  
  console.log('\n=== Search Results ===');
  console.log(`Total Products Found: ${allProducts.length}`);
  console.log(`Products with Prices: ${validProducts.length}`);
  
  console.log('\n=== Price Analysis ===');
  console.log(`Average Price: $${avgPrice}`);
  console.log(`Lowest Price: $${minPrice}`);
  console.log(`Highest Price: $${maxPrice}`);
  console.log(`Price Range: $${(maxPrice - minPrice).toFixed(2)}`);
  
  // Top rated products
  const topRated = validProducts
    .filter(p => p.rating)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
  
  console.log('\n=== Top 5 Highest Rated Products ===');
  topRated.forEach((product, index) => {
    console.log(`\n${index + 1}. ${product.title.substring(0, 60)}...`);
    console.log(`   Price: $${product.price.value} | Rating: ${product.rating}/5 (${product.reviews_count || 0} reviews)`);
    console.log(`   ASIN: ${product.asin}`);
  });
  
  // Best value (highest rating per dollar)
  const bestValue = validProducts
    .filter(p => p.rating && p.price.value > 0)
    .map(p => ({
      ...p,
      valueScore: p.rating / p.price.value
    }))
    .sort((a, b) => b.valueScore - a.valueScore)
    .slice(0, 3);
  
  console.log('\n=== Top 3 Best Value Products ===');
  bestValue.forEach((product, index) => {
    console.log(`\n${index + 1}. ${product.title.substring(0, 60)}...`);
    console.log(`   Price: $${product.price.value} | Rating: ${product.rating}/5`);
    console.log(`   Value Score: ${product.valueScore.toFixed(4)}`);
  });
  
  // Save results
  const fs = require('fs');
  const filename = `search_${query.replace(/\s+/g, '_')}_${Date.now()}.json`;
  fs.writeFileSync(filename, JSON.stringify({
    query,
    totalProducts: allProducts.length,
    priceAnalysis: { avgPrice, minPrice, maxPrice },
    products: allProducts
  }, null, 2));
  
  console.log(`\n✓ Full results saved to ${filename}`);
  
  return allProducts;
}

/**
 * Compare specific products by ASINs
 */
async function compareProducts(asins) {
  console.log(`Comparing ${asins.length} products...\n`);
  
  const products = [];
  
  for (const asin of asins) {
    try {
      const response = await api.get(`https://www.amazon.com/dp/${asin}`, {
        scraper: 'amazon-product-scraper',
        format: 'json'
      });
      
      const product = JSON.parse(response.body);
      products.push(product);
      console.log(`✓ Loaded: ${product.title.substring(0, 50)}...`);
      
    } catch (error) {
      console.error(`✗ Failed to load ASIN ${asin}:`, error.message);
    }
  }
  
  console.log('\n=== Product Comparison ===\n');
  
  products.forEach((product, index) => {
    console.log(`Product ${index + 1}: ${product.title.substring(0, 50)}...`);
    console.log(`  Price: $${product.price?.value || 'N/A'}`);
    console.log(`  Rating: ${product.rating || 'N/A'}/5 (${product.reviews_count || 0} reviews)`);
    console.log(`  Availability: ${product.availability || 'Unknown'}`);
    console.log(`  Seller: ${product.seller?.name || 'Unknown'}\n`);
  });
  
  return products;
}

// Run example
if (require.main === module) {
  const query = process.argv[2] || 'laptop';
  const maxPages = parseInt(process.argv[3]) || 3;
  
  searchAndCompare(query, maxPages)
    .then(() => console.log('\n✓ Search completed!'))
    .catch(error => console.error('\n✗ Failed:', error.message));
}

module.exports = { searchAndCompare, compareProducts };
