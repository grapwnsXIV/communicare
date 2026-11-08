function ReportSuccess({ onHome }) {
    return (
        <section className="success-screen">
            <div className="success-icon" aria-hidden="true">
                ✓
            </div>

            <h1>Report Submitted!</h1>
            <p>Your symptom report has been saved.</p>

            <button
                type="button"
                className="primary-button"
                onClick={onHome}>
                    Return Home
                </button>
        </section>
    );
}

export default ReportSuccess;