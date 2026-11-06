import { useState } from 'react';

import Navigation from './components/Navigation';
import Home from './pages/Home';
import BodyPartSelector from './components/BodyPartSelector';
import SymptomSelector from './components/SymptomSelector';
import SeveritySelector from './components/SeveritySelector';
import ReviewReport from './pages/ReviewReport';

import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const [bodyPart, setBodyPart] = useState('');
  const [symptomType, setSymptomType] = useState('');
  const [severity, setSeverity] = useState('');

  function goHome() {
    setCurrentPage('home');
  }

  function startReport() {
    setBodyPart('');
    setSymptomType('');
    setSeverity('');
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
      setCurrentPage('review')
    }
  }

  return (
    <>
      <Navigation onHome={goHome} />

      <main className="app-content">
        {currentPage === 'home' && (
          <Home onStart={startReport} />
        )}

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
          <ReviewReport
            report={{ bodyPart, symptomType, severity }}
            onBack={() => setCurrentPage('severity')}
            onSubmit={() => {
              console.log('Report submitted:', {
                bodyPart,
                symptomType,
                severity
              });
            }}
        />
      )}
      </main>
    </>
  );
}

export default App;