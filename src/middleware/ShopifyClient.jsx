import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { PUBLIC_TOKEN } from '../key';

export const client = createStorefrontApiClient({
  storeDomain: 'x00qwc-pe.myshopify.com',
  apiVersion: '2025-07',
  publicAccessToken: PUBLIC_TOKEN,
});