const symptoms = [
    { value: 'aching', label: 'Aching' },
    { value: 'burning', label: 'Burning' },
    { value: 'cramping', label: 'Cramping' },
    { value: 'fatigue', label: 'Fatigue' },
    { value: 'sharp_pain', label: 'Sharp Pain' },
    { value: 'headache', label: 'Headache' },
    { value: 'pressure', label: 'Pressure' },
    { value: 'tingling', label: 'Tingling' },
    { value: 'rash', label: 'Rash' },
    { value: 'shortness_of_breath', label: 'Shortness of Breath' },
    { value: 'swelling', label: 'Swelling' },
    { value: 'numbness', label: 'Numbness' }
];

function SymptomSelector({ selected, onSelect, onNext, onBack }) {
    return (
        <selection className="selection-section">
            <h1>What?</h1>
            <div className="selection-grid">
                {symptoms.map((symptom) => (
                    <button
                        key={symptom.value}
                        type="button"
                        className={ selected === symptom.value ? 'selection-button selected' : 'selection-button' 
                        }
                        aria-pressed={selected === symptom.value}
                        onClick={() => onSelect(symptom.value)}
                    >
                        {symptom.label}
                    </button>
                ))}
            </div>

            <div className="step-actions">
                <button
                    type="button"
                    className="secondary-button"
                    onClick={onBack}
                >
                    Back
                </button>

                <button
                    type="button"
                    className="primary-button"
                    disabled={!selected}
                    onClick={onNext}
                >
                    Continue
                </button>
            </div>
        </selection>
    );
}
export default SymptomSelector;
