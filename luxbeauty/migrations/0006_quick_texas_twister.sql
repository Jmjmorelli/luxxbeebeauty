CREATE TABLE `appointments` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_name` text NOT NULL,
	`customer_phone` text NOT NULL,
	`customer_email` text NOT NULL,
	`service_names` text NOT NULL,
	`booking_date` text,
	`start_at` integer NOT NULL,
	`end_at` integer NOT NULL,
	`status` text DEFAULT 'confirmed' NOT NULL,
	`appointment_notes` text,
	`customer_notes` text,
	`created_at` integer DEFAULT (strftime('%s', 'now') * 1000) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `userConsent` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`phone_number` text NOT NULL,
	`consent_version` text NOT NULL,
	`signed_at` integer DEFAULT (strftime('%s', 'now')* 1000) NOT NULL,
	`typed_signature` text NOT NULL,
	`agreed` integer DEFAULT false NOT NULL,
	`ip_address` text NOT NULL,
	`pdf_path` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `userConsent_email_unique` ON `userConsent` (`email`);