import { sql } from 'drizzle-orm';
// import { boolean } from 'drizzle-orm/gel-core';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const appointmentsTable = sqliteTable('appointments', {
    id: text('id').primaryKey(),
    customer_name: text('customer_name').notNull(),
    customer_phone: text('customer_phone').notNull(),
    customer_email: text('customer_email').notNull(),
    service_names: text('service_names').notNull(),
    booking_date: text('booking_date'),
    start_at: text('start_at').notNull(),
    end_at: text('end_at').notNull(),
    status: text('status').notNull().default('confirmed'),
    appointment_notes: text('appointment_notes'),
    customer_notes: text('customer_notes'),
    created_at: integer('created_at').default(sql`(strftime('%s', 'now') * 1000)`).notNull(),
});


export const consentTable = sqliteTable('userConsent', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name').notNull(), 
    phone_number: text('phone_number').notNull(),
    consent_version: text('consent_version').notNull(),
    signed_at: integer('signed_at').default(sql`(strftime('%s', 'now')* 1000)`).notNull(),
    typed_signature: text('typed_signature').notNull(),
    agreed: integer('agreed', {mode: 'boolean'}).notNull().default(false),
    ip_address: text('ip_address').notNull(),
    pdf_path: text('pdf_path').notNull(),
    // consentFormSigned: integer('consentFormSigned', {mode: 'boolean'}).notNull().default(false),
})

export type InsertAppointment = typeof appointmentsTable.$inferInsert;
export type SelectAppointment = typeof appointmentsTable.$inferSelect;

export type InsertUserConsent = typeof consentTable.$inferInsert;
export type SelectUserConsent= typeof consentTable.$inferSelect;
