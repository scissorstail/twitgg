-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	user_no serial4 NOT NULL,
	user_id varchar NULL,
	user_pw varchar NULL,
	user_name varchar NULL,
	user_provider varchar NULL,
	user_provider_info jsonb NOT NULL DEFAULT '{}'::jsonb,
	created_dt timestamptz NOT NULL DEFAULT now(),
	updated_dt timestamptz NULL,
	state int4 NULL,
	CONSTRAINT users_pk PRIMARY KEY (user_no)
);