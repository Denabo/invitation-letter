-- =============================================================================
-- Align existing RSVP tables with the current application schema
-- =============================================================================
-- Run this migration if the API fails with errors such as:
--   column "comment" of relation "rsvp_submissions" does not exist
-- It is safe to run more than once because every column/index addition is
-- guarded with IF NOT EXISTS.
-- =============================================================================

ALTER TABLE rsvp_submissions
  ADD COLUMN IF NOT EXISTS attendance VARCHAR(20) NOT NULL DEFAULT 'MAYBE',
  ADD COLUMN IF NOT EXISTS with_partner BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS partner_name VARCHAR(100),
  ADD COLUMN IF NOT EXISTS with_kids BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS children JSONB NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS has_car BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS has_free_seats BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS free_seats_count INTEGER,
  ADD COLUMN IF NOT EXISTS comment TEXT,
  ADD COLUMN IF NOT EXISTS message TEXT,
  ADD COLUMN IF NOT EXISTS raw_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'rsvp_submissions_attendance_check'
      AND conrelid = 'rsvp_submissions'::regclass
  ) THEN
    ALTER TABLE rsvp_submissions
      ADD CONSTRAINT rsvp_submissions_attendance_check
      CHECK (attendance IN ('ATTENDING', 'NOT_ATTENDING', 'MAYBE'));
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'rsvp_submissions_free_seats_count_check'
      AND conrelid = 'rsvp_submissions'::regclass
  ) THEN
    ALTER TABLE rsvp_submissions
      ADD CONSTRAINT rsvp_submissions_free_seats_count_check
      CHECK (free_seats_count IS NULL OR free_seats_count >= 0);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_rsvp_submissions_created_at
  ON rsvp_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_rsvp_submissions_attendance
  ON rsvp_submissions(attendance);
