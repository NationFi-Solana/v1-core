import { createClient } from '@sanity/client';
export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.DATASET,
  useCdn: true,
  apiVersion: '2023-05-03',
});
