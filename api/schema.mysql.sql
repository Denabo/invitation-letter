-- MySQL schema for the PHP RSVP endpoint.
-- Run this once in the MySQL database provided by your hosting.

CREATE TABLE IF NOT EXISTS rsvp_submissions (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    guest_name VARCHAR(100) NOT NULL,
    attendance ENUM('ATTENDING', 'NOT_ATTENDING', 'MAYBE') NOT NULL DEFAULT 'MAYBE',
    with_partner TINYINT(1) NOT NULL DEFAULT 0,
    partner_name VARCHAR(100) NULL,
    with_kids TINYINT(1) NOT NULL DEFAULT 0,
    children JSON NOT NULL,
    has_car TINYINT(1) NOT NULL DEFAULT 0,
    has_free_seats TINYINT(1) NOT NULL DEFAULT 0,
    free_seats_count TINYINT UNSIGNED NULL,
    comment TEXT NULL,
    message TEXT NULL,
    raw_payload JSON NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT unique_rsvp_guest_name UNIQUE (guest_name),
    INDEX idx_rsvp_submissions_created_at (created_at),
    INDEX idx_rsvp_submissions_attendance (attendance)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
