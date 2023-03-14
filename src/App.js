import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import countries from "country-data";

function App() {
  const [country, setCountry] = useState("");
  const [countryTwo, setCountryTwo] = useState("")

  const countryList = countries.countries.all.map((country, index) => (
    <Dropdown.Item key={index}  onClick={()=>{
      setCountry(country.name);
    }}>
      {country.emoji} {country.name}
    </Dropdown.Item>
  ));

  const countryList2 = countries.countries.all.map((country, index) => (
    <Dropdown.Item key={index} onClick={() => {
      setCountryTwo(country.name);
    }}>
      {country.emoji} {country.name}
    </Dropdown.Item>
  ));


  return (
    <div className="input-area">
      <div className="content-area">
        <InputGroup className="my-3">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="dark"
              className="w-50"
            >
              {country === "" ? "Country" : country}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark" className=" w-50 dropdown-menu">
              {countryList}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <InputGroup className="my-3">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="dark"
              className="w-50"
            >
            {countryTwo === "" ? "Country" : countryTwo}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark" className=" w-50 dropdown-menu">
              {countryList2}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </div>
    </div>
  );
}

export default App;
