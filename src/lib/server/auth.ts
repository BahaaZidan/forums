import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';

import { sessionTable, userTable, type DatabaseUser } from './db/schema';
import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { createDB } from './db';

export function createLucia(db: Awaited<ReturnType<typeof createDB>>) {
	// TODO: write a custom adapter if lucia don't fix it
	// @ts-expect-error lucia's drizzle adapter has the wrong types
	const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

	const lucia = new Lucia(adapter, {
		sessionCookie: {
			attributes: {
				secure: !dev
			}
		},
		getUserAttributes: (attributes) => {
			return {
				username: attributes.username
			};
		}
	});

	return lucia;
}

declare module 'lucia' {
	interface Register {
		Lucia: ReturnType<typeof createLucia>;
		DatabaseUserAttributes: Omit<DatabaseUser, 'id'>;
	}
}
