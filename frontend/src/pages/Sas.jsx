import { useState } from "react";

const Prediction = () => {
  const [symptoms, setSymptoms] = useState(["", "", "", "", ""]);

  const handleChange = (index, value) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = value;
    setSymptoms(newSymptoms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Predicting disease for:", symptoms);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <div>
        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
          Disease Prediction Based on Symptoms
        </h2>
        <form onSubmit={handleSubmit}>
          {symptoms.map((symptom, index) => (
            <div key={index} style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
              <label style={{ marginRight: "8px", minWidth: "100px" }}>{`Symptom ${index + 1}:`}</label>
              <input
                type="text"
                value={symptom}
                onChange={(e) => handleChange(index, e.target.value)}
                style={{
                  padding: "5px",
                  border: "1px solid black",
                  borderRadius: "4px",
                  flex: 1
                }}
              />
            </div>
          ))}
          <button
            type="submit"
            style={{
              marginTop: "10px",
              padding: "8px 15px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Predict
          </button>
        </form>
      </div>
    </div>
  );
};

export default Prediction;
