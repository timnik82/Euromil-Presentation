/*
  # Lottery Presentation Database Schema

  ## Overview
  This migration creates tables for tracking user interactions with the lottery probability presentation app.

  ## New Tables
  
  ### `sessions`
  Tracks unique user sessions through the presentation
  - `id` (uuid, primary key) - Unique session identifier
  - `started_at` (timestamptz) - When the session began
  - `last_active_at` (timestamptz) - Last activity timestamp
  - `completed` (boolean) - Whether user completed all slides
  - `sound_enabled` (boolean) - User's sound preference
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### `slide_progress`
  Tracks which slides have been viewed in each session
  - `id` (uuid, primary key) - Unique record identifier
  - `session_id` (uuid, foreign key) - Reference to sessions table
  - `slide_number` (integer) - Slide index (0-7)
  - `viewed_at` (timestamptz) - When slide was first viewed
  - `time_spent_seconds` (integer) - Time spent on this slide
  - `created_at` (timestamptz) - Record creation timestamp
  
  ### `experiment_results`
  Stores user inputs and calculations from Slide 7 (Time Experiment)
  - `id` (uuid, primary key) - Unique record identifier
  - `session_id` (uuid, foreign key) - Reference to sessions table
  - `user_age` (integer) - Age input by user (5-15)
  - `years_needed` (integer) - Calculated years needed to win
  - `generations_needed` (integer) - Calculated generations needed
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - RLS enabled on all tables
  - Public read/write access for anonymous users (educational app, no sensitive data)
*/

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz DEFAULT now(),
  last_active_at timestamptz DEFAULT now(),
  completed boolean DEFAULT false,
  sound_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create slide_progress table
CREATE TABLE IF NOT EXISTS slide_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  slide_number integer NOT NULL CHECK (slide_number >= 0 AND slide_number <= 7),
  viewed_at timestamptz DEFAULT now(),
  time_spent_seconds integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(session_id, slide_number)
);

-- Create experiment_results table
CREATE TABLE IF NOT EXISTS experiment_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  user_age integer NOT NULL CHECK (user_age >= 5 AND user_age <= 15),
  years_needed integer NOT NULL,
  generations_needed integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_slide_progress_session_id ON slide_progress(session_id);
CREATE INDEX IF NOT EXISTS idx_experiment_results_session_id ON experiment_results(session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_completed ON sessions(completed);
CREATE INDEX IF NOT EXISTS idx_sessions_started_at ON sessions(started_at);

-- Enable Row Level Security
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE slide_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiment_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (educational app with no sensitive data)
-- Sessions policies
CREATE POLICY "Anyone can create sessions"
  ON sessions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view sessions"
  ON sessions FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update sessions"
  ON sessions FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Slide progress policies
CREATE POLICY "Anyone can create slide progress"
  ON slide_progress FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view slide progress"
  ON slide_progress FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can update slide progress"
  ON slide_progress FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Experiment results policies
CREATE POLICY "Anyone can create experiment results"
  ON experiment_results FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view experiment results"
  ON experiment_results FOR SELECT
  TO anon
  USING (true);