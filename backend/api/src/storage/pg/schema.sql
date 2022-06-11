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

-- public.review definition

-- Drop table

-- DROP TABLE public.review;

CREATE TABLE public.review (
	rv_no serial4 NOT NULL,
	user_no int4 NOT NULL,
	rv_positive int4 NOT NULL,
	rv_content text NOT NULL,
	rv_user_no int4 NOT NULL,
	created_dt timestamptz NOT NULL DEFAULT now(),
	updated_dt timestamptz NULL,
	state int4 NOT NULL DEFAULT 1,
	CONSTRAINT review_pk PRIMARY KEY (rv_no),
	CONSTRAINT review_fk FOREIGN KEY (user_no) REFERENCES public.users(user_no) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT review_fk_1 FOREIGN KEY (rv_user_no) REFERENCES public.users(user_no) ON DELETE CASCADE ON UPDATE CASCADE
);