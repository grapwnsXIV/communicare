function ClinicianLogin({ onPreviewReports }) {
  return (
    <section className="login-screen">
      <h1>Clinician Portal</h1>
      <p>
        Sign-in isn’t connected in this prototype. The preview uses fictional reports.
      </p>
      <button
        type="button"
        className="primary-button"
        onClick={onPreviewReports}
      >
        Preview Sample Reports
      </button>
    </section>
  );
}

export default ClinicianLogin;