-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	user_no serial4 NOT NULL,
	user_id varchar NOT NULL,
	user_pw varchar NOT NULL,
	user_name varchar NOT NULL,
	user_nick varchar NOT NULL,
	user_provider varchar NOT NULL,
	user_provider_info jsonb NOT NULL DEFAULT '{}'::jsonb,
	created_dt timestamptz NOT NULL DEFAULT now(),
	updated_dt timestamptz NULL,
	state int4 NOT NULL DEFAULT 1,
	CONSTRAINT users_pk PRIMARY KEY (user_no),
	CONSTRAINT users_un UNIQUE (user_id),
	CONSTRAINT users_un_1 UNIQUE (user_name)
);