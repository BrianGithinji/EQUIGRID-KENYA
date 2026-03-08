-- EquiGrid Kenya Database Schema

CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE households (
    id VARCHAR(50) PRIMARY KEY,
    account_number VARCHAR(50) UNIQUE,
    county VARCHAR(100) NOT NULL,
    constituency VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    household_income DECIMAL(10, 2) NOT NULL,
    electricity_cost DECIMAL(10, 2) NOT NULL,
    consumption DECIMAL(10, 2) NOT NULL,
    household_size INTEGER,
    epi DECIMAL(5, 2) NOT NULL,
    epi_category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_households_county ON households(county);
CREATE INDEX idx_households_epi ON households(epi);

CREATE TABLE region_stats (
    id SERIAL PRIMARY KEY,
    county VARCHAR(100) UNIQUE NOT NULL,
    total_households INTEGER NOT NULL,
    avg_epi DECIMAL(5, 2) NOT NULL,
    affordable_count INTEGER DEFAULT 0,
    moderate_count INTEGER DEFAULT 0,
    poverty_count INTEGER DEFAULT 0,
    severe_poverty_count INTEGER DEFAULT 0,
    avg_income DECIMAL(10, 2),
    avg_consumption DECIMAL(10, 2),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE county_boundaries (
    id SERIAL PRIMARY KEY,
    county VARCHAR(100) UNIQUE NOT NULL,
    geom GEOMETRY(MultiPolygon, 4326),
    population INTEGER,
    area_sqkm DECIMAL(10, 2)
);

CREATE INDEX idx_county_boundaries_geom ON county_boundaries USING GIST(geom);

CREATE TABLE tariff_structures (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    threshold INTEGER NOT NULL,
    rate DECIMAL(10, 2) NOT NULL,
    fixed_charge DECIMAL(10, 2) NOT NULL,
    effective_date DATE NOT NULL,
    source VARCHAR(50) DEFAULT 'EPRA'
);

CREATE TABLE sync_log (
    id SERIAL PRIMARY KEY,
    source VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    records_synced INTEGER,
    error_message TEXT,
    started_at TIMESTAMP NOT NULL,
    completed_at TIMESTAMP
);
