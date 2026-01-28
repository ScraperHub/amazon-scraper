// Example: Scrape Amazon Product Reviews

const { CrawlingAPI } = require('crawlbase');

const api = new CrawlingAPI({ token: 'YOUR_CRAWLBASE_TOKEN' });

/**
 * Scrape and analyze product reviews
 */
async function scrapeAndAnalyzeReviews(asin, maxPages = 5) {
  console.log(`Scraping reviews for ASIN: ${asin}`);
  console.log(`Maximum pages: ${maxPages}\n`);
  
  const allReviews = [];
  let stats = {
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    verifiedPurchases: 0,
    totalHelpfulVotes: 0
  };
  
  for (let page = 1; page <= maxPages; page++) {
    const url = `https://www.amazon.com/product-reviews/${asin}?pageNumber=${page}`;
    
    try {
      const response = await api.get(url, {
        scraper: 'amazon-reviews-scraper',
        format: 'json'
      });
      
      const data = JSON.parse(response.body);
      
      if (!data.reviews || data.reviews.length === 0) {
        console.log(`No more reviews found at page ${page}`);
        break;
      }
      
      allReviews.push(...data.reviews);
      
      // Update statistics
      data.reviews.forEach(review => {
        stats.totalReviews++;
        stats.ratingDistribution[review.rating]++;
        if (review.verified_purchase) stats.verifiedPurchases++;
        if (review.helpful_votes) stats.totalHelpfulVotes += review.helpful_votes;
      });
      
      console.log(`✓ Page ${page}: ${data.reviews.length} reviews scraped`);
      
    } catch (error) {
      console.error(`✗ Error on page ${page}:`, error.message);
      break;
    }
  }
  
  // Calculate average rating
  let totalRatingSum = 0;
  for (let rating = 1; rating <= 5; rating++) {
    totalRatingSum += rating * stats.ratingDistribution[rating];
  }
  stats.averageRating = (totalRatingSum / stats.totalReviews).toFixed(2);
  
  // Display statistics
  console.log('\n=== Review Statistics ===');
  console.log(`Total Reviews Scraped: ${stats.totalReviews}`);
  console.log(`Average Rating: ${stats.averageRating}/5`);
  console.log(`Verified Purchases: ${stats.verifiedPurchases} (${(stats.verifiedPurchases/stats.totalReviews*100).toFixed(1)}%)`);
  console.log(`Total Helpful Votes: ${stats.totalHelpfulVotes}`);
  
  console.log('\n=== Rating Distribution ===');
  for (let rating = 5; rating >= 1; rating--) {
    const count = stats.ratingDistribution[rating];
    const percentage = (count / stats.totalReviews * 100).toFixed(1);
    const bar = '█'.repeat(Math.round(percentage / 2));
    console.log(`${rating} ★: ${bar} ${count} (${percentage}%)`);
  }
  
  // Find most helpful reviews
  const topReviews = allReviews
    .sort((a, b) => (b.helpful_votes || 0) - (a.helpful_votes || 0))
    .slice(0, 3);
  
  console.log('\n=== Top 3 Most Helpful Reviews ===');
  topReviews.forEach((review, index) => {
    console.log(`\n${index + 1}. ${review.title}`);
    console.log(`   Rating: ${review.rating}/5 | Helpful: ${review.helpful_votes || 0} votes`);
    console.log(`   "${review.text.substring(0, 100)}..."`);
  });
  
  // Save to file
  const fs = require('fs');
  const filename = `reviews_${asin}_${Date.now()}.json`;
  fs.writeFileSync(filename, JSON.stringify({
    asin,
    stats,
    reviews: allReviews
  }, null, 2));
  
  console.log(`\n✓ Full data saved to ${filename}`);
  
  return { stats, reviews: allReviews };
}

// Run example
if (require.main === module) {
  const asin = process.argv[2] || 'B08N5WRWNW';
  const maxPages = parseInt(process.argv[3]) || 5;
  
  scrapeAndAnalyzeReviews(asin, maxPages)
    .then(() => console.log('\n✓ Review analysis completed!'))
    .catch(error => console.error('\n✗ Failed:', error.message));
}

module.exports = { scrapeAndAnalyzeReviews };
