import React, { useState } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Results from './components/Results';
import Popup from './components/Popup';

function App() {
    const apiurl = 'api-url+key';

    const [state, setState] = useState({
       search: '',
       results: [],
       selected: {}
    });

    const search = (e) => {
        if (e.key === 'Enter') {
            axios(apiurl + '&s=' + state.search).then(({ data }) => {
                let results = data.Search;

                setState(prevState => {
                    return { ...prevState, results: results }
                });
            });
        }
    }

    const handleInput = (e) => {
        let search = e.target.value;

        setState((prevState) => {
            return { ...prevState, search: search }
        });
    }

    const openPopup = (id) => {
        axios(apiurl + '&i=' + id).then(({ data }) => {
            let result = data;

            setState((prevState) => {
                return { ...prevState, selected: result }
            });
        });
    }

    const closePopup = () => {
        setState((prevState) => {
            return { ...prevState, selected: {} }
        });
    }

    return (
    <div className='App'>
      <header>
        <h1>Movie Searcher</h1>
      </header>
      <main>
          <Search handleInput={handleInput} search={search} />
          <Results results={state.results} openPopup={openPopup}/>
          {(typeof state.selected.Title != 'undefined') ?
              <Popup selected={state.selected} closePopup={closePopup} /> :
              false
          }
      </main>
    </div>
  );
}

export default App;
