import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from './db';
import { sessionTable, userTable, type DatabaseUser } from './db/schema';
import { Lucia } from 'lucia';
import { dev } from '$app/environment';

// @ts-expect-error lucia's drizzle adapter has the wrong types
export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
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

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<DatabaseUser, 'id'>;
	}
}
