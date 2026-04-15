CREATE TYPE gender_type AS ENUM ('FEMALE', 'MALE', 'OTHER');
CREATE TYPE preference_sexual_type AS ENUM ('FEMALE', 'MALE', 'BOTH');

-- users table
CREATE TABLE IF NOT EXISTS users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(20) UNIQUE NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
	is_email_verified BOOLEAN DEFAULT FALSE,
	password_hash TEXT NOT NULL,
	firstname VARCHAR(50),
	lastname VARCHAR(50),
	bio	TEXT,

	gender gender_type,
	preference_sexual preference_sexual_type,
	
	latitude DOUBLE PRECISION,
	longitude DOUBLE PRECISION,
	
	fame_rating INT DEFAULT 0,

	profile_picture TEXT,

	last_login TIMESTAMP,
	
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW()
);

-- user_photo
CREATE TABLE IF NOT EXISTS user_photo (
	id SERIAL PRIMARY KEY,
	user_id INT REFERENCES users(id) ON DELETE CASCADE,
	img_url TEXT NOT NULL,
	is_profile BOOLEAN DEFAULT FALSE,
	created_at TIMESTAMP DEFAULT NOW()
);

-- email_verifications
CREATE TABLE IF NOT EXISTS email_verifications (
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	token TEXT UNIQUE NOT NULL,
	expires_at TIMESTAMP NOT NULL,
	created_at TIMESTAMP DEFAULT NOW()
);

-- updated_at timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
	NEW.updated_at = NOW();
	RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- trigger
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();