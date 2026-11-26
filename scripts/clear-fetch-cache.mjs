import { rm } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Every page's content is fetched from Tina's GraphQL endpoint at build time.
 * Next caches those responses in .next/cache/fetch-cache, keyed on the request,
 * and the request for a given page never changes -- only the content behind it
 * does. On a host that keeps the build cache between deploys, which Vercel
 * does, that means a content-only commit can deploy the previous content.
 *
 * Dropping just this one directory fixes it. The Turbopack module cache beside
 * it is untouched, so builds stay fast.
 */
const target = join(process.cwd(), '.next', 'cache', 'fetch-cache');

await rm(target, { recursive: true, force: true });
