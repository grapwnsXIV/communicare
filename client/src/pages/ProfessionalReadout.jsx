const sampleReports = [
  {
    id: 1,
    bodyPart: "Head",
    symptomType: "Headache",
    severity: "Severe",
    createdAt: "2026-11-20T09:15:00"
  },
  {
    id: 2,
    bodyPart: "Stomach",
    symptomType: "Cramping",
    severity: "Moderate",
    createdAt: "2026-11-20T09:30:00"
  }
];

function ProfessionalReadout() {
  return (
    <section>
      <h1>Symptom Reports</h1>
      <p>Sample reports for preview. These aren’t saved reports.</p>

      {sampleReports.map((report) => (
        <article key={report.id}>
          <h2>Report #{report.id}</h2>
          <p>Where: {report.bodyPart}</p>
          <p>Symptom: {report.symptomType}</p>
          <p>Severity: {report.severity}</p>
          <p>Submitted: {new Date(report.createdAt).toLocaleString()}</p>
        </article>
      ))}
    </section>
  );
}

export default ProfessionalReadout;