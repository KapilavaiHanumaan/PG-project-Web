-- =============================================================================
-- PGTRUST HYDERABAD: PRODUCTION POSTGRESQL DATABASE SCHEMA (V1)
-- =============================================================================

-- 1. Roles & Authority Table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Users Table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    mobile VARCHAR(20),
    role_id INT REFERENCES roles(id),
    avatar_url VARCHAR(500),
    occupation VARCHAR(100),
    reputation_tier VARCHAR(50) DEFAULT 'New Reviewer',
    reputation_xp INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. PG Properties Table
CREATE TABLE pgs (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    locality VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    gender_type VARCHAR(20) NOT NULL, -- 'boys', 'girls', 'co-living'
    min_price INT NOT NULL,
    max_price INT NOT NULL,
    food_included BOOLEAN DEFAULT TRUE,
    rating DOUBLE PRECISION DEFAULT 0.0,
    total_reviews INT DEFAULT 0,
    available_rooms INT DEFAULT 0,
    owner_id BIGINT REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. PG Images Table
CREATE TABLE pg_images (
    id BIGSERIAL PRIMARY KEY,
    pg_id BIGINT REFERENCES pgs(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    is_cover BOOLEAN DEFAULT FALSE
);

-- 5. Amenities Table
CREATE TABLE amenities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50)
);

CREATE TABLE pg_amenities (
    pg_id BIGINT REFERENCES pgs(id) ON DELETE CASCADE,
    amenity_id INT REFERENCES amenities(id) ON DELETE CASCADE,
    PRIMARY KEY (pg_id, amenity_id)
);

-- 6. Reviews Table
CREATE TABLE reviews (
    id BIGSERIAL PRIMARY KEY,
    pg_id BIGINT REFERENCES pgs(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    overall_rating DOUBLE PRECISION NOT NULL,
    room_rating DOUBLE PRECISION,
    food_rating DOUBLE PRECISION,
    cleanliness_rating DOUBLE PRECISION,
    security_rating DOUBLE PRECISION,
    wifi_rating DOUBLE PRECISION,
    staff_rating DOUBLE PRECISION,
    value_rating DOUBLE PRECISION,
    title VARCHAR(200) NOT NULL,
    comment TEXT NOT NULL,
    move_in_date DATE,
    move_out_date DATE,
    stay_duration VARCHAR(50),
    verified_stay BOOLEAN DEFAULT FALSE,
    proof_status VARCHAR(30) DEFAULT 'pending',
    trust_score INT DEFAULT 50,
    helpful_count INT DEFAULT 0,
    unhelpful_count INT DEFAULT 0,
    moderation_status VARCHAR(30) DEFAULT 'approved',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE review_pros (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT REFERENCES reviews(id) ON DELETE CASCADE,
    pro_text VARCHAR(255) NOT NULL
);

CREATE TABLE review_cons (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT REFERENCES reviews(id) ON DELETE CASCADE,
    con_text VARCHAR(255) NOT NULL
);

CREATE TABLE review_media (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT REFERENCES reviews(id) ON DELETE CASCADE,
    media_url VARCHAR(500) NOT NULL,
    media_type VARCHAR(20) DEFAULT 'image'
);

-- 7. Community Review Votes Table
CREATE TABLE review_votes (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT REFERENCES reviews(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    vote_type VARCHAR(20) NOT NULL, -- 'helpful' | 'unhelpful'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(review_id, user_id)
);

-- 8. Verification Documents Table (OCR Proof)
CREATE TABLE verification_documents (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    review_id BIGINT REFERENCES reviews(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500),
    status VARCHAR(30) DEFAULT 'verified',
    ocr_json TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Wallets & Transactions Ledger
CREATE TABLE wallets (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    points_balance INT DEFAULT 0,
    lifetime_earned INT DEFAULT 0,
    lifetime_redeemed INT DEFAULT 0,
    pending_points INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wallet_transactions (
    id BIGSERIAL PRIMARY KEY,
    wallet_id BIGINT REFERENCES wallets(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    points INT NOT NULL,
    is_credit BOOLEAN NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Rewards Catalog & Redemptions
CREATE TABLE rewards (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    provider VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    cost_points INT NOT NULL,
    rupee_value INT NOT NULL,
    image_url VARCHAR(500),
    description TEXT,
    instructions TEXT
);

CREATE TABLE reward_redemptions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    reward_id BIGINT REFERENCES rewards(id),
    coupon_code VARCHAR(50) NOT NULL UNIQUE,
    status VARCHAR(30) DEFAULT 'active',
    rupee_value INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE
);

-- 11. Achievements & User Achievements
CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    xp_reward INT DEFAULT 50,
    icon VARCHAR(50)
);

CREATE TABLE user_achievements (
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    achievement_id INT REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, achievement_id)
);

-- 12. Referrals Table
CREATE TABLE referrals (
    id BIGSERIAL PRIMARY KEY,
    referrer_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    referred_email VARCHAR(150) NOT NULL,
    status VARCHAR(30) DEFAULT 'invite_sent',
    bonus_points INT DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Notifications & Audit Logs
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    actor_id BIGINT,
    target_resource VARCHAR(100),
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =============================================================================
-- PERFORMANCE INDEXES
-- =============================================================================
CREATE INDEX idx_pgs_locality ON pgs(locality);
CREATE INDEX idx_pgs_gender_type ON pgs(gender_type);
CREATE INDEX idx_pgs_min_price ON pgs(min_price);
CREATE INDEX idx_reviews_pg_id ON reviews(pg_id);
CREATE INDEX idx_reviews_trust_score ON reviews(trust_score DESC);
CREATE INDEX idx_wallet_tx_wallet_id ON wallet_transactions(wallet_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id, is_read);
