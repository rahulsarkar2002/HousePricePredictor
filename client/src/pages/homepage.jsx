import React, { useState, useEffect } from "react";
import axios from "axios";
import "./homepage.css";

function Application() {
  const [sqft, setSqft] = useState(1000);
  const [bhk, setBhk] = useState(2);
  const [bath, setBath] = useState(2);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/get_location_names"
        );
        setLocations(response.data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    };

    fetchLocations();
  }, []);

  const handleAreaChange = (event) => {
    setSqft(parseFloat(event.target.value));
  };

  const handleBhkChange = (event) => {
    setBhk(parseInt(event.target.value));
  };

  const handleBathChange = (event) => {
    setBath(parseInt(event.target.value));
  };

  const handleEstimatePrice = async (event) => {
    event.preventDefault();

    if (!sqft) {
      alert("Please enter a area.");
      return;
    }

    if (!selectedLocation) {
      alert("Please select a location.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append(
        "total_sqft",
        parseFloat(document.getElementById("uiSqft").value)
      );
      formData.append("bhk", bhk);
      formData.append("bath", bath);
      formData.append("location", document.getElementById("uiLocations").value);

      const response = await axios.post(
        "http://127.0.0.1:5000/predict_home_price",
        formData
      );

      setEstimatedPrice(response.data.estimated_price);
      setError(null);
    } catch (error) {
      console.error("Error fetching price:", error);
      setError("Failed to estimate price. Please try again.");
    }
  };

  return (
    <div className="Application">
      <form action="" className="container">
        <div className="heading">
          <h1>House Price Predictor</h1>
        </div>
        <span>Area in sq feet</span>
        <input
          type="number"
          id="uiSqft"
          className="area floatLabel"
          name="Squareft"
          value={sqft}
          required
          onChange={handleAreaChange}
        />
        <span>BHK</span>
        <div className="switch-field">
          <input
            type="radio"
            id="radio-bhk-1"
            name="uiBHK"
            value="1"
            checked={bhk === 1}
            onChange={handleBhkChange}
          />
          <label htmlFor="radio-bhk-1">1</label>
          <input
            type="radio"
            id="radio-bhk-2"
            name="uiBHK"
            value="2"
            checked={bhk === 2}
            onChange={handleBhkChange}
          />
          <label htmlFor="radio-bhk-2">2</label>
          <input
            type="radio"
            id="radio-bhk-3"
            name="uiBHK"
            value="3"
            checked={bhk === 3}
            onChange={handleBhkChange}
          />
          <label htmlFor="radio-bhk-3">3</label>
          <input
            type="radio"
            id="radio-bhk-4"
            name="uiBHK"
            value="4"
            checked={bhk === 4}
            onChange={handleBhkChange}
          />
          <label htmlFor="radio-bhk-4">4</label>
          <input
            type="radio"
            id="radio-bhk-5"
            name="uiBHK"
            value="5"
            checked={bhk === 5}
            onChange={handleBhkChange}
          />
          <label htmlFor="radio-bhk-5">5</label>
        </div>
        <span>Number of bathroom</span>
        <div className="switch-field">
          <input
            type="radio"
            id="radio-bath-1"
            name="uiBathroom"
            value="1"
            checked={bath === 1}
            onChange={handleBathChange}
          />
          <label htmlFor="radio-bath-1">1</label>
          <input
            type="radio"
            id="radio-bath-2"
            name="uiBathroom"
            value="2"
            checked={bath === 2}
            onChange={handleBathChange}
          />
          <label htmlFor="radio-bath-2">2</label>
          <input
            type="radio"
            id="radio-bath-3"
            name="uiBathroom"
            value="3"
            checked={bath === 3}
            onChange={handleBathChange}
          />
          <label htmlFor="radio-bath-3">3</label>
          <input
            type="radio"
            id="radio-bath-4"
            name="uiBathroom"
            value="4"
            checked={bath === 4}
            onChange={handleBathChange}
          />
          <label htmlFor="radio-bath-4">4</label>
          <input
            type="radio"
            id="radio-bath-5"
            name="uiBathroom"
            value="5"
            checked={bath === 5}
            onChange={handleBathChange}
          />
          <label htmlFor="radio-bath-5">5</label>
        </div>
        <span>Location</span>
        <select
          className="location"
          name=""
          id="uiLocations"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          defaultValue={""}
        >
          <option value="" disabled>
            Choose a Location
          </option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
        <div className="button">
          <button onClick={handleEstimatePrice}>Estimate Price</button>
          {estimatedPrice ? (
            <h2>Estimated Price: {estimatedPrice} Lakh</h2>
          ) : error ? (
            <p className="error">{error}</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default Application;
