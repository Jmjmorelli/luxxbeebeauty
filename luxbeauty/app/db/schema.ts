import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const appointmentsTable = sqliteTable('appointments', {
    id: text('id').primaryKey(),
    customer_name: text('customer_name').notNull(),
    customer_phone: text('customer_phone').notNull(),
    customer_email: text('customer_email'),
    service_names: text('service_names').notNull(),
    start_at: integer('start_at').notNull(),
    end_at: integer('end_at').notNull(),
    status: text('status').notNull().default('confirmed'),
    created_at: integer('created_at').default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});


export type InsertAppointment = typeof appointmentsTable.$inferInsert;
export type SelectAppointment = typeof appointmentsTable.$inferSelect;






// export const postsTable = sqliteTable('posts', {
//   id: integer('id').primaryKey(),
//   title: text('title').notNull(),
//   content: text('content').notNull(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   createdAt: text('created_at')
//     .default(sql`(CURRENT_TIMESTAMP)`)
//     .notNull(),
//   updatedAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
// });

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
