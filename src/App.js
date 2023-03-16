import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import countries from "country-data";
import CurrencyAPI from '@everapi/currencyapi-js';



function App() {
  const [currencyValue, setCurrencyValue] = useState(0);
  const [country, setCountry] = useState({
    name: "",
    currency: "",
    value : 0,
  });
  const [countryTwo, setCountryTwo] = useState({
    name: "",
    currency: "",
    value : 0,
  });


  function apiCall(base, currency){
    const currencyApi = new CurrencyAPI(process.env.REACT_APP_CURRENCY_API);
    currencyApi.latest({
        base_currency: base,
        currencies: currency
    }).then(response => {
      setCurrencyValue(response.data[currency].value);
    });
    
  }

  
  useEffect(() => {
      if(country.currency !== "" && countryTwo.currency !== "" && (country.value || countryTwo.value)){
        apiCall(country.currency, countryTwo.currency);
      }
  }, [country, countryTwo])

  

  const countryList = countries.countries.all.map((country, index) => (
    <Dropdown.Item key={index}  onClick={()=>{
      setCountry(()=>{
        return{
          name: country.name,
          currency: country.currencies[0],
        }
      });
    }}>
      {country.emoji} {country.name} ({country.currencies[0]})
    </Dropdown.Item>
  ));

  const countryList2 = countries.countries.all.map((country, index) => (
    <Dropdown.Item key={index} onClick={() => {
      setCountryTwo(()=>{
        return{
          name: country.name,
          currency: country.currencies[0],
        }
      });
    }}>
      {country.emoji} {country.name} ({country.currencies[0]})
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
              {country.currency === "" ? "Country" : country.name + " (" + country.currency + ")"}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark" className=" w-50 dropdown-menu">
              {countryList}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            placeholder="0"
            className="text-dark fs-3 text-center fw-bold"
            value={country.value}
            onChange={(e)=>{
              setCountry((prevValue)=>{
                return{
                  name: prevValue.name,
                  currency: prevValue.currency,
                  value: e.target.value,
                }
              })
            }}
          />
        </InputGroup>
        <InputGroup className="my-3">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="dark"
              className="w-50"
            >
              {countryTwo.currency === "" ? "Country" : countryTwo.name + " (" + countryTwo.currency + ")"}
            </Dropdown.Toggle>
            <Dropdown.Menu variant="dark" className=" w-50 dropdown-menu">
              {countryList2}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            aria-label="Example text with button addon"
            aria-describedby="basic-addon1"
            className="text-dark fs-3 text-center fw-bold"
            placeholder="0"
            value={currencyValue ? (country.value * currencyValue).toFixed(2) : 0}
            onChange={(e)=>{
              setCountryTwo((prevValue)=>{
                return{
                  name: prevValue.name,
                  currency: prevValue.currency,
                  value: e.target.value,
                }
              })
            }}
          />
        </InputGroup>
      </div>
    </div>
  );
}

export default App;
