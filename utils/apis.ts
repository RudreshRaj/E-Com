// This file centralizes all functions that fetch data from YOUR backend APIs.

export interface Product {
    id: string;
    name: string;
    brand: string;
    price: string;
    description: string;
    department: string;
    category: string;
    imageUrl: string;
    lastUpdated: string;
    // Add the rating property to match the API response
    rating: {
        rate: number;
        count: number;
    };
}

export interface ProductListResult {
    items: Product[];
    currentPage: number;
    totalPages: number;
    totalResults: number;
}

interface SearchParams {
    index: string;
    search?: string;
    page?: number;
    category?: string;
    sortBy?: 'relevance' | 'newest';
}

/**
 * The CORE function to search, filter, and paginate products by calling your API.
 * This function now builds the absolute URL to work on the server.
 */
export async function fetchProducts(params: SearchParams): Promise<ProductListResult> {
    // Construct the full, absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const apiUrl = new URL('/api/search-products', baseUrl);

    apiUrl.searchParams.set('index', params.index);
    if (params.search) apiUrl.searchParams.set('search', params.search);
    if (params.page) apiUrl.searchParams.set('page', String(params.page));
    if (params.category) apiUrl.searchParams.set('category', params.category);
    if (params.sortBy) apiUrl.searchParams.set('sortBy', params.sortBy);

    const res = await fetch(apiUrl.toString());

    if (!res.ok) {
        const errorData = await res.json();
        // Pass the detailed server error message to the client for better debugging
        const serverErrorMessage = errorData.error || errorData.message;
        throw new Error(serverErrorMessage || 'Failed to fetch products from API.');
    }

    const result = await res.json();
    return result.data;
}

/**
 * Gets a single product by its ID.
 * NOTE: This requires you to have the /api/products/[id]/route.ts endpoint.
 */
export async function getProductById(id: string, indexName: string): Promise<Product> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const apiUrl = new URL(`/api/products/${id}`, baseUrl);
    apiUrl.searchParams.set('index', indexName);

    const res = await fetch(apiUrl.toString());

    if (!res.ok) {
        if (res.status === 404) throw new Error('Product not found.');
        const errorData = await res.json();
        const serverErrorMessage = errorData.error || errorData.message;
        throw new Error(serverErrorMessage || 'Failed to fetch product details.');
    }
    const result = await res.json();
    return result.data;
}


// --- Functions to replace the old "fakestoreapi" calls ---

/**
 * Gets a list of product categories. 
 * This is a dummy implementation. You should create a real API endpoint for this.
 */
export async function getCategoryList(): Promise<{ props: { data: string[] } }> {
    console.warn("getCategoryList is using dummy data. Create a real API endpoint for it.");
    const dummyCategories = ["Electronics", "Jewelery", "Men's Clothing", "Women's Clothing"];
    return Promise.resolve({ props: { data: dummyCategories } });
}

/**
 * Gets the first page of all products from your Elasticsearch index.
 */
export async function getFullProductList(indexName: string): Promise<{ props: { data: Product[] } }> {
    const productData = await fetchProducts({ index: indexName, page: 1 });
    return { props: { data: productData.items } };
}

/**
 * Gets a list of the newest products (up to 10) from your Elasticsearch index.
 */
export async function getNewProductList(indexName: string): Promise<{ props: { data: Product[] } }> {
    const productData = await fetchProducts({ index: indexName, sortBy: 'newest' });
    return { props: { data: productData.items } };
}

/**
 * Gets a list of products filtered by a specific category from your Elasticsearch index.
 */
export async function getCategoryProductList(category: string, indexName: string): Promise<{ props: { data: Product[] } }> {
    const productData = await fetchProducts({ index: indexName, category: category });
    return { props: { data: productData.items } };
}

