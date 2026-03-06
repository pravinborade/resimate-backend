CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    name TEXT NOT NULL,

    mobile VARCHAR(15) UNIQUE,

    email VARCHAR(255) UNIQUE,

    password_hash TEXT,

    role_id UUID NOT NULL REFERENCES roles(role_id) ON DELETE RESTRICT,

    status user_status_enum DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);