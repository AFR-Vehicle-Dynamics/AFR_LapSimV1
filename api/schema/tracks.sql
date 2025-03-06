-- Table: tracks
-- This tables stores track names for various pages on the simulator. There's no need to run this file, it's just for reference

-- Create the table
CREATE TABLE IF NOT EXISTS track (
    id SERIAL PRIMARY KEY, -- Auto-incrementing primary key
    track_name VARCHAR(256) NOT NULL,
    format VARCHAR(256),
    country VARCHAR(256),
    city VARCHAR(256),
    track_type VARCHAR(256),
    config VARCHAR(256),
    direction VARCHAR(256),
    mirror BOOLEAN,
    export_freq FLOAT -- in hertz
);
