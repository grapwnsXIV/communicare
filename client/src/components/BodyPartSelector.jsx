import bodyOutline from '../assets/bodyOutline.svg?url';

const bodyParts = [
    { value: 'head', label: 'Head' },
    { value: 'chest', label: 'Chest' },
    { value: 'stomach', label: 'Stomach' },
    { value: 'arms', label: 'Arms' },
    { value: 'legs', label: 'Legs' },
    { value: 'back', label: 'Back' },
    { value: 'feet', label: 'Feet' },
    { value: 'hands', label: 'Hands' },
    { value: 'neck', label: 'Neck' },
    { value: 'shoulders', label: 'Shoulders'},
    { value: 'hips', label: 'Hips' },
    { value: 'all_over', label: 'All Over' }
];

function BodyPartSelector({ selected, onSelect, onNext}) {
    return (
        <section className="selection-section">
            <h1>Where?</h1>

            <div className="selection-grid">
                <img src={bodyOutline} alt="Body Outline for Reporting Patient's Area of Pain" width="600" height="600" />
                {/*
                {bodyParts.map((part) => (
                    <button
                        key={part.value}
                        type="button"
                        className={ selected === part.value ? 'selection-button selected' : 'selection-button' 
                        }
                        aria-pressed={selected === part.value}
                        onClick={() => onSelect(part.value)}
                    >
                        {part.label}
                    </button>
                ))}
               */ }
            </div>

            <button
                type="button"
                className="primary-button"
                disabled={!selected}
                onClick={onNext}
            >
                Continue
            </button>
        </section>
    );
}

export default BodyPartSelector;