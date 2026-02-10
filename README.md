<a href="https://crawlbase.com/signup?utm_source=github&utm_medium=readme&utm_campaign=crawling_api_banner" target="_blank">
  <img src="https://github.com/user-attachments/assets/afa4f6e7-25fb-442c-af2f-b4ddcfd62ab2" 
       alt="crawling-api-cta" 
       style="max-width: 100%; border: 0;">
</a>

# Amazon Scraper

Scrape millions of Amazon pages effortlessly. Extract product information, prices, reviews, seller data, and more with Crawlbase's powerful Amazon scraping solution.

[![Trusted by 70,000+ users](https://img.shields.io/badge/Trusted%20by-70%2C000%2B%20users-blue)](https://crawlbase.com)

## 🚀 Features

### Core Scraping Capabilities
- **Amazon Prices** - Extract current and historical pricing data
- **Amazon Best Sellers** - Track trending and top-selling products
- **Amazon Seller's Information** - Get detailed seller profiles and metrics
- **Amazon Reviews** - Scrape customer reviews with ratings and dates
- **Amazon Product Description** - Extract full product details and specifications
- **Amazon That Ads** - Capture sponsored product information

### Advanced Features
- **Small, simple & quick** - Easy setup with minimal configuration
- **Average data error: 0.01%** - Industry-leading accuracy
- **100% CAPTCHA bypass** - Automatic CAPTCHA solving
- **Override rate by proxy** - Built-in proxy rotation
- **Global access** - Worldwide scraping without restrictions
- **Fresh dynamic updates** - Real-time data extraction

## 🏢 Trusted By

- Shopify
- Oracle
- Pinterest
- WeWork
- And 70,000+ other companies

## 💡 Why Choose Crawlbase Amazon Scraper?

### Best Solution to Scrape Millions of Amazon Pages

Crawlbase is the most reliable and efficient solution for large-scale Amazon data extraction. Our infrastructure handles:
- Millions of requests per day
- Automatic retries and error handling
- Data validation and quality checks

### Easy to Use, Even with Limited English Knowledge

Our API is designed for simplicity - no complex setup or technical jargon. Get started in minutes with straightforward documentation and examples.

### Overview of Crawlbase's Amazon Scraper

**Easy to use, even with limited English knowledge**
Simple API endpoints and clear documentation make integration effortless for developers worldwide.

**Highly scalable with using our worldwide proxies**
Access Amazon sites globally with our distributed proxy network spanning multiple countries.

**Automated execution using the Auto-adjust Job delivery**
Smart scheduling automatically adjusts crawling speed based on your needs and site conditions.

**Protect your Crawler from getting blocked with our retry and CAPTCHA**
Advanced anti-detection mechanisms keep your scrapers running smoothly without interruptions.

**Export data in various file types such as HTML and JSON**
Flexible data export options integrate seamlessly with your existing workflows and tools.

**Fetch dynamically high-quality Javascript data**
Execute JavaScript and wait for dynamic content to load before extraction.

## 📊 Live Amazon Scraper Demo

```json
{
  "product": {
    "asin": "B08N5WRWNW",
    "title": "Example Product Title",
    "price": {
      "value": 29.99,
      "currency": "USD",
      "symbol": "$"
    },
    "rating": 4.5,
    "reviews_count": 1234,
    "availability": "In Stock",
    "seller": {
      "name": "Amazon.com",
      "rating": 98,
      "rating_count": 5000
    },
    "images": [
      "https://example.com/image1.jpg",
      "https://example.com/image2.jpg"
    ],
    "features": [
      "Feature 1",
      "Feature 2"
    ],
    "description": "Full product description..."
  }
}
```

## 🚦 Getting Started

### Prerequisites
- Crawlbase account (sign up at [crawlbase.com](https://crawlbase.com/signup?signup=blog&utm_source=github))
- API token from your Crawlbase dashboard

### Installation

```bash
npm install crawlbase
```

### Quick Start

```javascript
const { CrawlingAPI } = require('crawlbase');

const api = new CrawlingAPI({ token: 'YOUR_TOKEN' });

// Scrape an Amazon product page
api.get('https://www.amazon.com/dp/PRODUCT_ASIN', {
  scraper: 'amazon-product-scraper'
})
.then(response => {
  const productData = JSON.parse(response.body);
  console.log(productData);
})
.catch(error => {
  console.error(error);
});
```

## 📋 Use Cases

- **Price Monitoring** - Track competitor prices and market trends
- **Product Research** - Analyze product catalogs and specifications
- **Review Analysis** - Gather customer feedback and sentiment
- **Market Intelligence** - Study best sellers and emerging trends
- **Inventory Tracking** - Monitor stock levels and availability
- **Seller Analysis** - Research competitor seller performance
- **Dynamic Pricing** - Implement competitive pricing strategies

## 🛠️ API Reference

### Scraper Types

| Scraper | Description |
|---------|-------------|
| `amazon-product-scraper` | Extract product details, prices, and specifications |
| `amazon-reviews-scraper` | Scrape customer reviews and ratings |
| `amazon-search-scraper` | Search results and product listings |
| `amazon-bestsellers-scraper` | Best seller rankings and trends |
| `amazon-seller-scraper` | Seller information and metrics |

### Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `url` | string | Amazon URL to scrape | Required |
| `scraper` | string | Scraper type | Required |
| `country` | string | Amazon country domain (com, co.uk, de, etc.) | com |
| `format` | string | Output format (json, html) | json |
| `page_wait` | integer | Wait time in milliseconds | 0 |

### Example Requests

#### Scrape Product Details
```javascript
const response = await api.get('https://www.amazon.com/dp/B08N5WRWNW', {
  scraper: 'amazon-product-scraper',
  format: 'json'
});
```

#### Scrape Product Reviews
```javascript
const response = await api.get('https://www.amazon.com/product-reviews/B08N5WRWNW', {
  scraper: 'amazon-reviews-scraper',
  format: 'json'
});
```

#### Search Products
```javascript
const response = await api.get('https://www.amazon.com/s?k=laptop', {
  scraper: 'amazon-search-scraper',
  format: 'json'
});
```

## 🌍 All-in-One Solution for Scraping Amazon Data

### Global Coverage
Use our Crawlbase API to get the best of the web - scrape data from any country's Amazon site without restrictions. Access Amazon.com, Amazon.co.uk, Amazon.de, Amazon.jp, and 195+ other regions.

### Comprehensive Data Extraction
- Product information (titles, descriptions, specifications)
- Pricing data (current prices, discounts, deals)
- Customer reviews and ratings
- Seller information and metrics
- Stock availability and inventory status
- Product images and media
- Search results and rankings
- Best seller lists and categories

### Multiple Export Formats
Export your scraped data in various formats:
- **JSON** - Perfect for API integrations
- **HTML** - Visual inspection and archiving

## 🔒 Compliance & Ethics

We prioritize ethical scraping:
- Respect robots.txt and terms of service
- Implement rate limiting to avoid server overload
- Only scrape publicly available data
- Provide GDPR-compliant data handling
- Support for proper attribution

## 📈 Pricing

Visit [crawlbase.com/pricing](https://crawlbase.com/pricing) for current pricing plans.

## 📚 Documentation

- [API Documentation](https://crawlbase.com/docs)
- [Amazon Scraper Page](https://crawlbase.com/amazon-scraper)
- [Code Examples](https://crawlbase.com/docs/crawling-api/scrapers/#amazon)
- [Video Tutorials](https://www.youtube.com/@CrawlbaseChannel)

## 🤝 Support

- **Email**: support@crawlbase.com
- **Live Chat**: Available on our website
- **Status Page**: [status.crawlbase.com](https://status.crawlbase.com)

## 📝 Frequently Asked Questions

### Is it legal to scrape Amazon?
Scraping publicly available data is generally legal. Always ensure compliance with local laws, Amazon's terms of service, and applicable regulations. We recommend consulting legal counsel for specific use cases.

### Do you have changing factors for HTTP protocol/code like?
Yes, our system automatically handles HTTP protocols, headers, and user agents to ensure successful scraping without detection.

### What are the benefits of using an Amazon scraper?
Benefits include automated data collection, competitive intelligence, price monitoring, market research, and time savings compared to manual data gathering.

### Do I need coding skills to use an Amazon scraper?
No, our API is designed to be simple and straightforward. Basic programming knowledge helps, but our examples and documentation make it accessible to beginners.

### If I use this API, can somebody access my data I get scrapped/crawled using the Crawlbase API?
No, your data is private and secure. Only you have access to the data you scrape through your account.

### Can I use Amazon scraper parameters when checking my inputs to the API?
Yes, our API supports various parameters to customize your scraping requests. See the API Reference section for details.

### What are the pros and cons regarding the API calls?
**Pros**: Reliable, scalable, automatic CAPTCHA handling, global proxy network, high accuracy
**Cons**: API calls are metered based on your plan, some rate limiting applies

### Are we planning to release or throw or pages per day, may vary date free if 20 minutes per scraper may not be enough for me?
Our flexible plans scale with your needs. Contact us for custom enterprise solutions if you need higher limits.

## 💻 Code Examples

### Python Example
```python
from crawlbase import CrawlingAPI

api = CrawlingAPI({'token': 'YOUR_TOKEN'})

# Scrape product
response = api.get('https://www.amazon.com/dp/B08N5WRWNW', {
    'scraper': 'amazon-product-scraper'
})

print(response['body'])
```

### PHP Example
```php
<?php
require 'vendor/autoload.php';

use Crawlbase\API as CrawlingAPI;

$api = new CrawlingAPI(['token' => 'YOUR_TOKEN']);

$response = $api->get('https://www.amazon.com/dp/B08N5WRWNW', [
    'scraper' => 'amazon-product-scraper'
]);

echo $response->body;
?>
```

### Ruby Example
```ruby
require 'crawlbase'

api = Crawlbase::API.new(token: 'YOUR_TOKEN')

response = api.get('https://www.amazon.com/dp/B08N5WRWNW', {
  scraper: 'amazon-product-scraper'
})

puts response['body']
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ by the Crawlbase team
- Serving 70,000+ satisfied customers worldwide
- Processing 4TB of data monthly across 195 countries

## 🔗 Links

- [Website](https://crawlbase.com)
- [Amazon Scraper Page](https://crawlbase.com/amazon-scraper)
- [Blog](https://crawlbase.com/blog)

---

**Start crawling the web today!** [Get started now](https://crawlbase.com/amazon-scraper) and extract valuable Amazon data at scale.
