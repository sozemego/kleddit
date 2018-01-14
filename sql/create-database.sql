ALTER TABLE IF EXISTS public.submission_replies DROP CONSTRAINT IF EXISTS  submission_replies_submission_id_fkey;
ALTER TABLE IF EXISTS public.submission_replies DROP CONSTRAINT IF EXISTS  submission_replies_author_id_fkey;
ALTER TABLE IF EXISTS public.submission_reactions DROP CONSTRAINT IF EXISTS  submission_reactions_submission_id_fkey;
ALTER TABLE IF EXISTS public.submission_reactions DROP CONSTRAINT IF EXISTS  submission_reactions_user_id_fkey;
ALTER TABLE IF EXISTS public.submissions DROP CONSTRAINT IF EXISTS  submissions_author_id_fkey;
ALTER TABLE IF EXISTS public.submissions DROP CONSTRAINT IF EXISTS  submissions_subkleddit_subkleddit_id_fkey;
DROP TABLE IF EXISTS  public.submission_replies;
DROP TABLE IF EXISTS  public.submission_reactions;
DROP TABLE IF EXISTS  public.submissions;
DROP TABLE IF EXISTS  public.users;
DROP TABLE IF EXISTS  public.subkleddits;
DROP TABLE IF EXISTS  public.subkleddit_subscriptions;

-- CREATE TYPE submission_type AS ENUM('TEXT', 'LINK');
-- CREATE TYPE submission_reaction_type AS ENUM('LIKE', 'LAUGH', 'LOVE', 'DISLIKE', 'HATE');

CREATE TABLE users
(
  user_id uuid NOT NULL PRIMARY KEY,
  created_at timestamp NOT NULL,
  nuked boolean DEFAULT FALSE NOT NULL,
  password_hash varchar(255) NOT NULL,
  username varchar(50) NOT NULL UNIQUE
);

CREATE TABLE subkleddit_subscriptions
(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  subkleddit_name varchar(255) NOT NULL,
  user_id uuid NOT NULL,
  UNIQUE (subkleddit_name, user_id)
);

CREATE TABLE subkleddits
(
  subkleddit_id uuid NOT NULL PRIMARY KEY,
  name varchar(255) UNIQUE NOT NULL
);

CREATE TABLE submissions
(
  submission_id uuid NOT NULL PRIMARY KEY,
  content varchar(10000) NOT NULL,
  created_at timestamp NOT NULL,
  title varchar(100) NOT NULL,
  author_id uuid references users (user_id) NOT NULL,
  subkleddit_subkleddit_id uuid references subkleddits (subkleddit_id) NOT NULL
);

INSERT INTO subkleddits (subkleddit_id, name) VALUES
  (gen_random_uuid(), 'General'),
  (gen_random_uuid(), 'Casual'),
  (gen_random_uuid(), 'News'),
  (gen_random_uuid(), 'Porn'),
  (gen_random_uuid(), 'Pictures'),
  (gen_random_uuid(), 'Videos'),
  (gen_random_uuid(), 'Gifs');

CREATE TABLE submission_replies
(
  reply_id uuid NOT NULL PRIMARY KEY,
  submission_id uuid REFERENCES submissions (submission_id),
  author_id uuid REFERENCES users (user_id),
  created_at TIMESTAMP NOT NULL,
  content VARCHAR(10000) NOT NULL,
  nuked BOOLEAN DEFAULT FALSE NOT NULL
);

CREATE TABLE submission_reactions
(
  submission_reaction_id uuid NOT NULL PRIMARY KEY,
  submission_id uuid NOT NULL REFERENCES submissions(submission_id),
  user_id uuid NOT NULL REFERENCES users(user_id),
  reaction_type submission_reaction_type NOT NULL,
  UNIQUE (submission_id, user_id, reaction_type)
)