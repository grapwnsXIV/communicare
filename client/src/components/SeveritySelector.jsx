const severityLevels = [
    { value: 'mild', label: 'Mild' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'severe', label: 'Severe' }
];

function SeveritySelector({
    selected,
    onSelect,
    onNext,
    onBack
}) {
    return (
        <section className="selection-screen">
            <h1>How Bad?</h1>
            
            <div className="selection-grid">
                {severityLevels.map((level) => (
                    <button
                        key={level.value}
                        type="button"
                        className={
                            selected === level.value ? 'selection-button selected' : 'selection-button'
                        }
                        aria-pressed={selected === level.value}
                        onClick={() => onSelect(level.value)}>
                            {level.label}
                        </button>
                        
                ))}
            </div>

            <div className="step-actions">
                <button
                    type="button"
                    className="secondary-button"
                    onClick={onBack}>
                        Back
                    </button>
                    <button
                        type="button"
                        className="primary-button"
                        disabled={!selected}
                        onClick={onNext}>
                            Continue
                    </button>
            </div>
        </section>
    )
}

export default SeveritySelector;