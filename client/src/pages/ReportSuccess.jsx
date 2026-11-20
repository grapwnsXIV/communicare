function ReportSuccess({ report, onHome }) {
    if (!report) {
        return (
            <section className="success-screen">
                <h1>Report Unavailable</h1>
                <p>Saved report information could not be displayed.</p>

                <button
                    type="button"
                    className="primary-button"
                    onClick={onHome}>
                        Return Home
                    </button>
            </section>
        );
    }

    const submittedAt = report.createdAt ? new Date(report.createdAt).toLocaleString() : 'Not available';

    return (
        <section className="success-screen">
      <div className="success-icon" aria-hidden="true">
        ✓
      </div>

      <h1>Report Submitted!</h1>
      <p>Your symptom report has been saved.</p>

      <div className="report-summary">
        <h2>Saved Report</h2>

        <dl>
          <dt>Report ID</dt>
          <dd>#{report.id}</dd>

          <dt>Body Part</dt>
          <dd>{report.bodyPart}</dd>

          <dt>Symptom</dt>
          <dd>{report.symptomType}</dd>

          <dt>Severity</dt>
          <dd>{report.severity}</dd>

          <dt>Status</dt>
          <dd>{report.status || 'pending'}</dd>

          <dt>Submitted</dt>
          <dd>{submittedAt}</dd>
        </dl>
      </div>

      <button
        type="button"
        className="primary-button"
        onClick={onHome}
      >
        Return Home
      </button>
    </section>
    );
}

export default ReportSuccess;