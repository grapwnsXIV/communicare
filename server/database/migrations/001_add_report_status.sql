-- migration 001: add report status tracking. Apply once to an existing Communicare db.
ALTER TABLE symptom_reports
ADD COLUMN status
ENUM('pending', 'reviewed', 'resolved')
NOT NULL DEFAULT 'pending';
