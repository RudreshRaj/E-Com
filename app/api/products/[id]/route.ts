import { NextResponse } from 'next/server';
import https from 'https';

// This interface should be consistent with the one in your search API
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
 * API route to get a single product by its ID.
 * Accessible at GET /api/products/[id]?index=...
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
  if (!process.env.ES_HOST || !process.env.ES_TOKEN) {
    console.error("Server configuration error: Missing ES_HOST or ES_TOKEN.");
    return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const index = searchParams.get('index');
    const productId = params.id;

    console.log(`--- Fetching product with ID: "${productId}" from index: "${index}" ---`);

    if (!index) {
      return NextResponse.json({ message: 'Index is required' }, { status: 400 });
    }

    // A MORE ROBUST QUERY: This uses a 'bool' query to try matching the ID
    // against both the exact '.keyword' field and the standard text field.
    // This handles cases where the field mapping might be different than expected.
    const postData = JSON.stringify({
      _source: {
        excludes: ["vector_embedding"] 
      },
      query: {
        bool: {
          should: [
            { term: { "article_id.keyword": productId } },
            { match: { "article_id": productId } }
          ],
          minimum_should_match: 1
        }
      }
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

    const hit = elasticsearchResponse.hits?.hits?.[0];

    if (!hit) {
        console.warn(`Product with ID "${productId}" not found in Elasticsearch.`);
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    const _source = hit._source;
    const formattedProduct: FormattedProduct = {
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

    return NextResponse.json({
        message: 'Product retrieved successfully',
        data: formattedProduct,
    });

  } catch (error) {
    console.error('Critical Error in /api/products/[id]:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ message: 'An internal server error occurred.', error: message }, { status: 500 });
  }
}
