import { useState } from "react";

function SymptomForm() {
    const [bodyPart, setBodyPart] = useState("");
    const [symptomType, setSymptomType] = useState("");
    const [severity, setSeverity] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const report = {
            bodyPart,
            symptomType,
            severity
        };

        console.log('Symptom report:', report);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Report a Symptom</h2>

            <label htmlFor = "bodyPart">Where?</label>
            <select
                id="bodyPart"
                value={bodyPart}
                onChange={(event) => setBodyPart(event.target.value)}
                >
                    <option value="">Select a body part</option>
                    <option value="head">Head</option>
                    <option value="chest">Chest</option>
                    <option value="stomach">Stomach</option>
                    <option value="arm">Arm</option>
                    <option value="leg">Leg</option>
                    <option value="back">Back</option>
                    <option value="other">Other</option>
            </select>

            <label htmlFor="symptomType">What?</label>
            <select
                id="symptomType"
                value={symptomType}
                onChange={(event) => setSymptomType(event.target.value)}
                required
            >
                <option value="">Select a symptom type</option>
                <option value="sharp_pain">Sharp Pain</option>
                <option value="aching">Aching</option>
                <option value="burning">Burning</option>
                <option value="tingling">Tingling</option>
                <option value="numbness">Numbness</option>
                <option value="swelling">Swelling</option>
                <option value="bruising">Bruising</option>
                <option value="other">Other</option>
            </select>

            <label htmlFor="severity">How?</label>
            <select
                id="severity"
                value={severity}
                onChange={(event) => setSeverity(event.target.value)}
                required
            >
                <option value="">Select severity</option>
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
            </select>

            <button type="submit">Submit</button>
        </form>
        
    );
}
export default SymptomForm;