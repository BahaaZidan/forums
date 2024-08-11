import { dev } from '$app/environment';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';
import * as schema from './schema';

if (!dev && !env.DATABASE_AUTH_TOKEN) throw new Error('DATABASE_AUTH_TOKEN is not set');

export async function createDB(hostname?: string) {
	const url = env.DATABASE_URL;
	const client = createClient({ url, authToken: env.DATABASE_AUTH_TOKEN });
	const db = drizzle(client, { schema });
	return db;
}
