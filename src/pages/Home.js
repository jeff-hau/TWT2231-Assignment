  import React, { useEffect, useState } from 'react';
  import '../styles/Home.css';
  import aqiImage from '../assets/AQI.png'; 

  const TOKEN_ID = 'c4dcce1dfc2a285f2625860c4b1a33a99623a655';

  function Home() {
    const [searchResults, setSearchResults] = useState([]);
    const [stationDetails, setStationDetails] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
      const scriptId = 'tomorrow-sdk';
    
      if (document.getElementById(scriptId)) {
        if (window.__TOMORROW__) {
          window.__TOMORROW__.renderWidget();
        }
        return;
      }
    
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js';
      script.async = true;
      script.onload = () => {
        if (window.__TOMORROW__) {
          window.__TOMORROW__.renderWidget();
        }
      };
    
      script.onerror = (error) => {
        console.error('Error loading Tomorrow.io script:', error);
      };
    
      document.body.appendChild(script);
    }, []);
    
    const handleButtonClick = (country) => {
      console.log(country);
      setSelectedCountry(country);
      search(country);
    };

    const search = async (keyword) => {
      try {
        const url = `https://api.waqi.info/v2/search/?token=${TOKEN_ID}&keyword=${keyword}`;
        const response = await fetch(url);
        const result = await response.json();

        if (!result || result.status !== 'ok') {
          throw result.data;
        }

        if (result.data.length === 0) {
          setSearchResults([]);
          setStationDetails(null);
          return;
        }

        setSearchResults(result.data);
        showStation(result.data[0]);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    const showStation = async (station) => {
      try {
        const url = `https://api.waqi.info/feed/@${station.uid}/?token=${TOKEN_ID}`;
        const response = await fetch(url);
        const result = await response.json();

        if (!result || result.status !== 'ok') {
          throw result.data;
        }

        setStationDetails(result.data);
      } catch (error) {
        console.error('Error fetching station details:', error);
      }
    };

    const colorize = (aqi, specie) => {
      specie = specie || 'aqi';
      if (['pm25', 'pm10', 'no2', 'so2', 'co', 'o3', 'aqi'].indexOf(specie) < 0) {
        return aqi;
      }

      const spectrum = [
        { a: 0, b: '#cccccc', f: '#ffffff' },
        { a: 50, b: '#009966', f: '#ffffff' },
        { a: 100, b: '#ffde33', f: '#000000' },
        { a: 150, b: '#ff9933', f: '#000000' },
        { a: 200, b: '#cc0033', f: '#ffffff' },
        { a: 300, b: '#660099', f: '#ffffff' },
        { a: 500, b: '#7e0023', f: '#ffffff' },
      ];

      let i = 0;
      for (i = 0; i < spectrum.length - 2; i++) {
        if (aqi === '-' || aqi <= spectrum[i].a) break;
      }

      return (
        <div
          style={{
            fontSize: '120%',
            minWidth: '30px',
            textAlign: 'center',
            backgroundColor: spectrum[i].b,
            color: spectrum[i].f,
          }}
        >
          {aqi}
        </div>
      );
    };

    return (
      <div className="home">
        <div className="tomorrow-container">
          <div
            className="tomorrow"
            data-location-id=""
            data-language="EN"
            data-unit-system="METRIC"
            data-skin="light"
            data-widget-type="aqiPollutant"
            style={{ paddingBottom: '22px', position: 'relative' }}
          >
            <a
              href="https://www.tomorrow.io/weather-api/"
              rel="nofollow noopener noreferrer"
              target="_blank"
              style={{
                position: 'absolute',
                bottom: 0,
                transform: 'translateX(-50%)',
                left: '50%',
              }}
            >
              <img
                alt="Powered by the Tomorrow.io Weather API"
                src="https://weather-website-client.tomorrow.io/img/powered-by.svg"
                width="250"
                height="18"
              />
            </a>
          </div>
        </div>
        <img src={aqiImage} alt="AQI Information" className="aqi-image" />
        <div className="country-selector">
          <h2>Southeast Asia Country</h2>
          <div className="buttons">
            {[
              'Brunei Darussalam',
              'Cambodia',
              'Timor-Leste',
              'Indonesia',
              'Laos',
              'Malaysia',
              'Myanmar',
              'Philippines',
              'Singapore',
              'Thailand',
              'Vietnam',
            ].map((country) => (
              <button key={country} onClick={() => handleButtonClick(country)}>
                {country}
              </button>
            ))}
          </div>
        </div>
        <div id="output" className="output">
          <div className="column-container">
            <div className="column">
              <h2>{selectedCountry && `${selectedCountry} Cities Result`}</h2>
              {searchResults.length === 0 && <p>Sorry, there is no result for your query!</p>}
              {searchResults.length > 0 && (
                <table className="result">
                  <thead>
                    <tr>
                      <th>Cities</th>
                      <th>Air Quality</th>
                      <th>Last Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((station, index) => (
                      <tr key={station.uid} onClick={() => showStation(station)}>
                        <td>{station.station.name}</td>
                        <td>{colorize(station.aqi)}</td>
                        <td>{station.time.stime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <p>Click on any of the stations to see the detailed AQI</p>
            </div>
          </div>
          <div className="column-container">
            <div className="column">
              <h2>Pollutants &amp; Weather conditions:</h2>
              {stationDetails ? (
                <>
                  <div>
                    Station: {stationDetails.city.name} on {stationDetails.time.s}
                  </div>
                  <table className="result">
                    <tbody>
                      {Object.entries(stationDetails.iaqi).map(([specie, data]) => (
                        <tr key={specie}>
                          <td>{specie}</td>
                          <td>{colorize(data.v, specie)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              ) : (
                <p>No station details available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Home;
