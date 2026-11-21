
import { useState } from 'react';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import BodyPartSelector from './components/BodyPartSelector';
import SymptomSelector from './components/SymptomSelector';
import SeveritySelector from './components/SeveritySelector';
import ReviewReport from './pages/ReviewReport';
import ReportSuccess from './pages/ReportSuccess';
import ProfessionalReadout from './pages/ProfessionalReadout';
import ClinicianLogin from './pages/ClinicianLogin';

import { submitSymptomReport } from './services/api';

import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const [bodyPart, setBodyPart] = useState('');
  const [symptomType, setSymptomType] = useState('');
  const [severity, setSeverity] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function goHome() {
    if (isSubmitting) return;

    setCurrentPage('home');
  }

  function startReport() {
    setBodyPart('');
    setSymptomType('');
    setSeverity('');
    setSubmitError('');
    setCurrentPage('where');
  }

  function continueFromWhere() {
    if (bodyPart) {
      setCurrentPage('what');
    }
  }

  function continueFromWhat() {
    if (symptomType) {
      setCurrentPage('severity');
    }
  }

  function continueFromSeverity() {
    if (severity) {
      setCurrentPage('review');
    }
  }

  // Submit the finished report to Express.
  async function handleSubmitReport() {
    if (!bodyPart || !symptomType || !severity || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const report = {
        bodyPart,
        symptomType,
        severity
      };

      const result = await submitSymptomReport(report);

      console.log('Saved report:', result);

      setCurrentPage('success');
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to submit report'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Navigation onHome={goHome} 
        onClinicianPortal={() => setCurrentPage('clinician-login')}
      />

      <main className="app-content">
        {currentPage === 'home' && (
        <Home
          onStart={startReport}
          onOpenReadout={() => setCurrentPage('readout')}
        />
        )}

        {currentPage === 'clinician-login' && (
          <ClinicianLogin
            onPreviewReports={() => setCurrentPage('readout')}
          />
        )}
        {currentPage === 'readout' && <ProfessionalReadout />}

        {currentPage === 'where' && (
          <BodyPartSelector
            selected={bodyPart}
            onSelect={setBodyPart}
            onNext={continueFromWhere}
          />
        )}

        {currentPage === 'what' && (
          <SymptomSelector
            selected={symptomType}
            onSelect={setSymptomType}
            onNext={continueFromWhat}
            onBack={() => setCurrentPage('where')}
          />
        )}

        {currentPage === 'severity' && (
          <SeveritySelector
            selected={severity}
            onSelect={setSeverity}
            onNext={continueFromSeverity}
            onBack={() => setCurrentPage('what')}
          />
        )}

        {currentPage === 'review' && (
          <>
            <ReviewReport
              report={{ bodyPart, symptomType, severity }}
              onBack={() => setCurrentPage('severity')}
              onSubmit={handleSubmitReport}
              isSubmitting={isSubmitting}
            />

            {submitError && (
              <p role="alert" className="submit-error">
                {submitError}
              </p>
            )}
          </>
        )}

        {currentPage === 'success' && (
          <ReportSuccess onHome={goHome} />
        )}
      </main>
    </>
  );
}

export default App;