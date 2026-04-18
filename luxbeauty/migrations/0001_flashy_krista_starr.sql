CREATE TABLE `userConsent` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL,
	`phone_number` text NOT NULL,
	`consent_version` text NOT NULL,
	`signed_at` integer DEFAULT (strftime('%s', 'now')* 1000) NOT NULL,
	`typed_signature` text NOT NULL,
	`agreed` integer DEFAULT true NOT NULL,
	`ip_address` text NOT NULL,
	`pdf_path` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `userConsent_email_unique` ON `userConsent` (`email`);--> statement-breakpoint
DROP INDEX "appointments_customer_email_unique";--> statement-breakpoint
DROP INDEX "userConsent_email_unique";--> statement-breakpoint
ALTER TABLE `appointments` ALTER COLUMN "customer_email" TO "customer_email" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `appointments_customer_email_unique` ON `appointments` (`customer_email`);