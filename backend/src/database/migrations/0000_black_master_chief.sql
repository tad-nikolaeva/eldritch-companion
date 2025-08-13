CREATE TABLE IF NOT EXISTS "characters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"occupation" varchar(100),
	"age" integer,
	"description" text,
	"backstory" text,
	"strength" integer DEFAULT 0,
	"constitution" integer DEFAULT 0,
	"power" integer DEFAULT 0,
	"dexterity" integer DEFAULT 0,
	"appearance" integer DEFAULT 0,
	"size" integer DEFAULT 0,
	"intelligence" integer DEFAULT 0,
	"education" integer DEFAULT 0,
	"hit_points" integer DEFAULT 0,
	"sanity" integer DEFAULT 0,
	"magic_points" integer DEFAULT 0,
	"luck" integer DEFAULT 0,
	"skills" jsonb DEFAULT '[]'::jsonb,
	"equipment" jsonb DEFAULT '[]'::jsonb,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"username" varchar(50) NOT NULL,
	"password_hash" text NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"avatar" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"role" varchar(20) DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"keeper_id" uuid NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"scenario" varchar(200),
	"participants" jsonb DEFAULT '[]'::jsonb,
	"current_scene" text,
	"notes" text,
	"handouts" jsonb DEFAULT '[]'::jsonb,
	"status" varchar(20) DEFAULT 'planning' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_keeper_id_users_id_fk" FOREIGN KEY ("keeper_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
