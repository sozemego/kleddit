ALTER TABLE public.submissions DROP CONSTRAINT IF EXISTS submissions_author_id_fkey;
ALTER TABLE public.submissions DROP CONSTRAINT IF EXISTS submissions_subkleddit_subkleddit_id_fkey;
DROP TABLE public.submissions;
DROP TABLE public.users;
DROP TABLE public.subkleddits;
DROP TABLE public.subkleddit_subscriptions;

create table users
(
  user_id varchar(255) NOT NULL PRIMARY KEY,
  created_at timestamp,
  nuked boolean,
  password_hash varchar(255) NOT NULL,
  username varchar(50) NOT NULL UNIQUE
);

create table subkleddit_subscriptions
(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  subkleddit_name varchar(255),
  user_id varchar(255),
  UNIQUE (subkleddit_name, user_id)
);

create table subkleddits
(
  subkleddit_id varchar(255) NOT NULL PRIMARY KEY,
  name varchar(255) UNIQUE
);

create table submissions
(
  submission_id varchar(255) NOT NULL PRIMARY KEY,
  content varchar(10000),
  created_at timestamp,
  title varchar(100),
  author_id varchar(255) references users (user_id),
  subkleddit_subkleddit_id varchar(255) references subkleddits (subkleddit_id)
);

INSERT INTO subkleddits (subkleddit_id, name) VALUES
  (gen_random_uuid(), 'General'),
  (gen_random_uuid(), 'Casual'),
  (gen_random_uuid(), 'News'),
  (gen_random_uuid(), 'Porn'),
  (gen_random_uuid(), 'Pictures'),
  (gen_random_uuid(), 'Videos'),
  (gen_random_uuid(), 'Gifs');

