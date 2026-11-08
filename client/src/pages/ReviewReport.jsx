function ReviewReport({ report, onBack, onSubmit, isSubmitting }) {
    const bodyPartLabels = {
        head: 'Head',
        chest: 'Chest',
        abdomen: 'Stomach',
        arm: 'Arms',
        leg: 'Legs',
        back: 'Back',
        feet: 'Feet',
        hand: 'Hands',
        neck: 'Neck',
        shoulders: 'Shoulders',
        hips: 'Hips',
        all_over: 'All Over'

    };

    const symptomLabels = {
        aching: 'Aching',
        burning: 'Burning',
        cramping: 'Cramping',
        fatigue: 'Fatigue',
        sharp_pain: 'Sharp Pain',
        headache: 'Headache',
        pressure: 'Pressure',
        tingling: 'Tingling',
        rash: 'Rash',
        shortness_of_breath: 'Shortness of Breath',
        swelling: 'Swelling',
        numbness: 'Numbness'
    };

    return (
        <section className="review-screen">
            <h1>Review Your Report</h1>
            
            <div className="review-card">
                <div className="review-row">
                    <strong>Where?</strong>
                    <span>{bodyPartLabels[report.bodyPart]}</span>
                </div>

                <div className="review-row">
                    <strong>What?</strong>
                    <span>{symptomLabels[report.symptomType]}</span>
                </div>

                <div className="review-row">
                    <strong>How Bad?</strong>
                    <span>
                        {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                    </span>
                </div>
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
                        onClick={onSubmit}
                        disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit Report'}
                        </button>
            </div>
        </section>
    );
}

export default ReviewReport;