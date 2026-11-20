-- Communicare development seed data
-- Fictional reports for testing only.

USE communicare;

INSERT INTO symptom_reports
    (body_part, symptom_type, severity, status)
SELECT 'head', 'headache', 'moderate', 'pending'
WHERE NOT EXISTS (
    SELECT 1 FROM symptom_reports
    WHERE body_part = 'head'
      AND symptom_type = 'headache'
      AND severity = 'moderate'
      AND status = 'pending'
);

INSERT INTO symptom_reports
    (body_part, symptom_type, severity, status)
SELECT 'stomach', 'cramping', 'severe', 'reviewed'
WHERE NOT EXISTS (
    SELECT 1 FROM symptom_reports
    WHERE body_part = 'stomach'
      AND symptom_type = 'cramping'
      AND severity = 'severe'
      AND status = 'reviewed'
);

INSERT INTO symptom_reports
    (body_part, symptom_type, severity, status)
SELECT 'arm', 'numbness', 'mild', 'pending'
WHERE NOT EXISTS (
    SELECT 1 FROM symptom_reports
    WHERE body_part = 'arm'
      AND symptom_type = 'numbness'
      AND severity = 'mild'
      AND status = 'pending'
);