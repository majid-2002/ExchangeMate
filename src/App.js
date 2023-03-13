import React, { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [country, setCountry] = useState("");

  const selectCountry = (val) => {
    setCountry(val);
  };

  return (
    <div className="input-area">
    <div className="content-area">
      <CountryDropdown
        value={country}
        onChange={selectCountry}
        classes="btn-primary btn mt-4"
      />
    </div>
    </div>
  );
}

export default App;
