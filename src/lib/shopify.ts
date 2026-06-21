/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ShopifyProductMap {
  localId: string;
  shopifyProductId: string;
  shopifyVariantId: string;
  price?: number;
  available?: boolean;
  shopifyTitle?: string;
}

const SHOPIFY_DOMAIN = "hsalonuk.myshopify.com";
const STOREFRONT_ACCESS_TOKEN = "65c0a804690c35ca301d8483d2891bf5";

// Map to cache active Shopify variants by local id
let shopifyProductCache: Record<string, ShopifyProductMap> = {};
let isFetchingProducts = false;
let fetchPromise: Promise<Record<string, ShopifyProductMap>> | null = null;

/**
 * Normalizes strings for loose title matching
 */
function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .trim();
}

/**
 * Sends a GraphQL query to the Shopify Storefront API
 */
async function queryStorefront(query: string, variables: any = {}) {
  const url = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API responded with status ${response.status}`);
    }

    const json = await response.json();
    if (json.errors) {
      console.error("Shopify GraphQL Errors:", json.errors);
      throw new Error(json.errors[0]?.message || "Shopify GraphQL error");
    }

    return json.data;
  } catch (err) {
    console.error("Failed to connect to Shopify:", err);
    throw err;
  }
}

/**
 * Fetches all products from the Shopify Catalog and maps them to local project products.
 * This retains the beautiful descriptions and details of the website while connecting real variant IDs and pricing.
 */
export function fetchShopifyProducts(localProducts: any[]): Promise<Record<string, ShopifyProductMap>> {
  if (fetchPromise) {
    return fetchPromise;
  }

  fetchPromise = (async () => {
    try {
      const query = `
        query {
          products(first: 100) {
            edges {
              node {
                id
                title
                handle
                variants(first: 5) {
                  edges {
                    node {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      availableForSale
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const data = await queryStorefront(query);
      const shopifyProducts = data?.products?.edges || [];
      const mapping: Record<string, ShopifyProductMap> = {};

      console.log(`Successfully fetched ${shopifyProducts.length} products from Shopify.`);

      const pairs: Array<{ localId: string; sProd: any; score: number }> = [];

      // Token and synonym scoring matrix
      for (const localProd of localProducts) {
        const localIdNorm = normalizeTitle(localProd.id);
        const localNameNorm = normalizeTitle(localProd.name);

        const localIdTokens = localProd.id.toLowerCase().split("-");
        const localNameTokens = localProd.name.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ");

        for (const edge of shopifyProducts) {
          const sProd = edge.node;
          const sTitleNorm = normalizeTitle(sProd.title);
          const sHandleNorm = normalizeTitle(sProd.handle);

          const sTitleTokens = sProd.title.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ");
          const sHandleTokens = sProd.handle.toLowerCase().split("-");

          let score = 0;

          // 1. Exact matches
          if (localIdNorm === sTitleNorm || localIdNorm === sHandleNorm) {
            score += 150;
          }
          if (localNameNorm === sTitleNorm || localNameNorm === sHandleNorm) {
            score += 150;
          }

          // 2. Token overlap checks
          const allLocalTokens = new Set([...localIdTokens, ...localNameTokens]);
          const allShopifyTokens = new Set([...sTitleTokens, ...sHandleTokens]);
          
          let overlapCount = 0;
          allLocalTokens.forEach(token => {
            if (token && token.length > 2 && allShopifyTokens.has(token)) {
              overlapCount++;
            }
          });
          score += overlapCount * 25;

          // 3. Synonym/Context Helpers
          const textSearchLocal = (localProd.id + " " + localProd.name).toLowerCase();
          const textSearchShopify = (sProd.title + " " + sProd.handle).toLowerCase();

          if (textSearchLocal.includes("nail") && textSearchShopify.includes("nail")) score += 30;
          if (textSearchLocal.includes("serum") && textSearchShopify.includes("serum")) score += 20;
          if (textSearchLocal.includes("mask") && textSearchShopify.includes("mask")) score += 30;
          if (textSearchLocal.includes("skin") && textSearchShopify.includes("skin")) score += 10;
          if (textSearchLocal.includes("oil") && textSearchShopify.includes("oil")) score += 30;
          if (textSearchLocal.includes("comb") && textSearchShopify.includes("comb")) score += 40;
          if (textSearchLocal.includes("comb") && textSearchShopify.includes("sha")) score += 25; // Comb -> Gua Sha helper
          if (textSearchLocal.includes("pouch") && textSearchShopify.includes("hat")) score += 15; // Pouch/Cap -> sauna hat helper
          if (textSearchLocal.includes("cap") && textSearchShopify.includes("hat")) score += 30; // styling cap -> sauna hat matching
          if (textSearchLocal.includes("gym") && textSearchShopify.includes("gym")) score += 50;

          if (score > 0) {
            pairs.push({ localId: localProd.id, sProd, score });
          }
        }
      }

      // Sort pairs by score in descending order
      pairs.sort((a, b) => b.score - a.score);

      const matchedLocalIds = new Set<string>();
      const matchedShopifyIds = new Set<string>();

      for (const pair of pairs) {
        if (!matchedLocalIds.has(pair.localId) && !matchedShopifyIds.has(pair.sProd.id)) {
          const sProd = pair.sProd;
          const firstVariant = sProd.variants?.edges?.[0]?.node;
          if (firstVariant) {
            mapping[pair.localId] = {
              localId: pair.localId,
              shopifyProductId: sProd.id,
              shopifyVariantId: firstVariant.id,
              price: parseFloat(firstVariant.price.amount),
              available: firstVariant.availableForSale,
              shopifyTitle: sProd.title, // Exact title from your Shopify Store
            };
            matchedLocalIds.add(pair.localId);
            matchedShopifyIds.add(sProd.id);
            console.log(`[Shopify Match] Local ID "${pair.localId}" successfully mapped to Shopify Product "${sProd.title}" with price $${firstVariant.price.amount}`);
          }
        }
      }

      shopifyProductCache = mapping;
      return mapping;
    } catch (err) {
      console.warn("Falling back to local fallback data:", err);
      return {};
    }
  })();

  return fetchPromise;
}

/**
 * Returns cached Shopify product mapping if available
 */
export function getShopifyProductCache(): Record<string, ShopifyProductMap> {
  return shopifyProductCache;
}

/**
 * Generates a real checkout session using active Cart API in Shopify Storefront mutations.
 * Redirects the user directly to the Shopify secure checkout.
 */
export async function createShopifyCheckoutRedirect(cartItems: any[], localProducts: any[]): Promise<string> {
  // 1. Ensure we have mapped Shopify products fetched
  const mappings = Object.keys(shopifyProductCache).length > 0
    ? shopifyProductCache
    : await fetchShopifyProducts(localProducts);

  const lines: any[] = [];

  for (const item of cartItems) {
    const map = mappings[item.product.id];
    if (map && map.shopifyVariantId) {
      lines.push({
        merchandiseId: map.shopifyVariantId,
        quantity: item.quantity,
      });
    } else {
      console.warn(`No Shopify variant found for ${item.product.name}. Cart checkout item skipped or checked with fallback.`);
    }
  }

  if (lines.length === 0) {
    // If no products matched Shopify, check if we can do a fallback checkout with dummy or handle mapping,
    // or notify the user that they must match titles.
    throw new Error(
      "To purchase these items, make sure their titles on Shopify match the titles of the items on the website. Please check Shopify setup!"
    );
  }

  // Use the modern cartCreate mutant checkout mechanism
  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: lines,
    },
  };

  const data = await queryStorefront(mutation, variables);
  const checkoutUrl = data?.cartCreate?.cart?.checkoutUrl;
  const userErrors = data?.cartCreate?.userErrors || [];

  if (userErrors.length > 0) {
    throw new Error(userErrors[0].message);
  }

  if (!checkoutUrl) {
    throw new Error("Unable to create checkout session link from Shopify Storefront API.");
  }

  // Save the actual checkout URL to session storage for the OrderSuccess page lookup
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem("shopify_checkout_url", checkoutUrl);
      localStorage.setItem("shopify_checkout_url", checkoutUrl);
    } catch (e) {
      console.warn("Storage write failed:", e);
    }
  }

  // Instead of redirecting to the Shopify checkout URL directly, redirect to the /order-success page on our website
  return `/order-success?checkoutUrl=${encodeURIComponent(checkoutUrl)}`;
}
