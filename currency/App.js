import React, { useState } from 'react';

const api = {
  key: 'api-key',
  base: 'https://www.amdoren.com/api/currency.php'
}

function App() {
  const [oldCurrency, setOldCurrency] = useState('');
  const [convCurrency, setConvCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [convResult, setConvResult] = useState({});
  const [prevInput, setPrevInput] = useState({});

  const handlePress = () => {
      fetch(`/api/currency.php?api_key=${api.key}&from=${oldCurrency}&to=${convCurrency}&amount=${amount}`)
          .then(res => {
              if (!res.ok) {
                  throw new Error('Network response was not ok');
              }
              return res.json();
          })
          .then(result => {
              setConvResult(result);
              setPrevInput({ old: oldCurrency, conv: convCurrency, amt: amount });
              console.log(result);
          })
          .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
          });
      setOldCurrency('');
      setConvCurrency('');
      setAmount('');
  };

  return (
      <div>
          <header>
              <h1>
                  Currency Converter
              </h1>
          </header>
          <main>
              <div className='search-box'>
                  <input
                      type='text'
                      className='search-input'
                      placeholder='Old Currency ex.USD'
                      value={oldCurrency}
                      onChange={(e) => setOldCurrency(e.target.value)}
                  />
                  <input
                      type='text'
                      className='search-input'
                      placeholder='Converted Currency ex.Eur'
                      value={convCurrency}
                      onChange={(e) => setConvCurrency(e.target.value)}
                  />
                  <input
                      type='text'
                      className='search-input'
                      placeholder='Amount to Convert'
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                  />
              </div>
              <div className='btn-container'>
                  <button className='btn' onClick={handlePress}>Convert</button>
              </div>
              <div className={'results'}>
                  <h4>Conversion:</h4>
                  {(convResult.error === 0) ? (
                      <div>
                          <h3>{prevInput.amt} {prevInput.old} is {convResult.amount} {prevInput.conv}</h3>
                      </div>
                  ) : ((convResult.amount || convResult.error) ? (<h3>An error has occurred</h3>) : (''))}
              </div>
          </main>
      </div>
  );
}

export default App;
