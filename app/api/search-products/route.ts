import { NextResponse } from 'next/server';
import https from 'https';

// This interface should be consistent with the one in your frontend
interface FormattedProduct {
  id: string;
  name: string;
  brand: string;
  price: string;
  description: string;
  department: string;
  category: string;
  imageUrl: string;
  lastUpdated: string;
  rating: {
    rate: number;
    count: number;
  };
}

/**
 * API route to search, filter, and paginate products.
 * Accessible at GET /api/search-products?index=...&search=...&page=...&category=...&sortBy=...
 */
export async function GET(req: Request) {
  if (!process.env.ES_HOST || !process.env.ES_TOKEN) {
    console.error("Server configuration error: Missing ES_HOST or ES_TOKEN.");
    return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const index = searchParams.get('index');
    const searchQuery = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sortBy');

    console.log(`--- Searching products in index: "${index}" ---`);
    console.log(`Query: "${searchQuery}", Page: ${page}, Category: "${category}", SortBy: "${sortBy}"`);

    if (!index) {
      return NextResponse.json({ message: 'Index is required' }, { status: 400 });
    }

    const pageSize = 10;
    const from = (page - 1) * pageSize;

    // --- Build the Elasticsearch Query ---
    let esQuery: any = {
      bool: {
        must: [],
        filter: [],
      },
    };

    // Match search query
    if (searchQuery) {
      esQuery.bool.must.push({
        multi_match: {
          query: searchQuery,
          fields: ["product_name^3", "description", "category", "brand_name"],
          fuzziness: "AUTO",
        },
      });
    } else {
      esQuery.bool.must.push({ match_all: {} });
    }

    // Filter by category
    if (category) {
      esQuery.bool.filter.push({
        term: { "category.keyword": category },
      });
    }

    // --- Build the Sort Clause ---
    let sortClause: any[] = [];
    if (sortBy === 'newest') {
      sortClause.push({ date_updated: { order: "desc" } });
    } else {
      // Default to sorting by relevance (_score)
      sortClause.push({ _score: { order: "desc" } });
    }

    const postData = JSON.stringify({
      _source: {
        excludes: ["vector_embedding"]
      },
      query: esQuery,
      from: from,
      size: pageSize,
      sort: sortClause,
    });

    console.log("Sending Elasticsearch Query:", postData);

    const options: https.RequestOptions = {
      hostname: process.env.ES_HOST,
      port: 443,
      path: `/elasticsearch/${encodeURIComponent(index)}/_search`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Basic ${process.env.ES_TOKEN}` },
    };

    const elasticsearchResponse = await new Promise<any>((resolve, reject) => {
        const request = https.request(options, (response) => {
            let data = '';
            response.on('data', (chunk) => { data += chunk; });
            response.on('end', () => {
              try {
                if (response.statusCode && (response.statusCode < 200 || response.statusCode >= 300)) {
                  return reject(new Error(`Elasticsearch responded with status ${response.statusCode}: ${data}`));
                }
                resolve(JSON.parse(data));
              } catch (error) { reject(new Error('Failed to parse Elasticsearch response JSON.')); }
            });
          });
          request.on('error', (err) => reject(new Error(`API call failed: ${err.message}`)));
          request.write(postData);
          request.end();
    });

    const hits = elasticsearchResponse.hits?.hits || [];
    const total = elasticsearchResponse.hits?.total?.value || 0;

    const formattedProducts: FormattedProduct[] = hits.map((hit: any) => {
        const _source = hit._source;
        return {
            id: _source.article_id || '',
            name: _source.product_name || '',
            brand: _source.brand_name || '',
            price: _source.price ? String(_source.price) : '0.00',
            description: _source.detailed_description || '',
            department: _source.department || '',
            category: _source.category || '',
            imageUrl: _source.image_url || '',
            lastUpdated: _source.date_updated || '',
            rating: { rate: 4.5, count: 120 } // Dummy rating
        };
    });

    return NextResponse.json({
        message: 'Products retrieved successfully',
        data: {
            items: formattedProducts,
            currentPage: page,
            totalPages: Math.ceil(total / pageSize),
            totalResults: total,
        },
    });

  } catch (error) {
    console.error('Critical Error in /api/search-products:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ message: 'An internal server error occurred.', error: message }, { status: 500 });
  }
}