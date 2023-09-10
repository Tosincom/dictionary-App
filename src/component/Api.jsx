import React, { useState} from "react";
import axios from "axios";
import "../App"
function Dictionary() {
  const [word, setWord] = useState("");
  const [definitions, setDefinitions] = useState("");
  
   
  const handleInputChange = (event) => {
    setWord(event.target.value);
  };
  const handleClick = () => {
    if (word) {
        const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en";
  
      

      axios
        .get(`${apiUrl}/${word}`)
        .then((response) => {
          if (response.status === 200) {
            const definitions =response.data[0].meanings[0].definitions[0].definition;
            setDefinitions(definitions);
          } else {
            console.error(
              `Error: Unable to retrieve data. Status code: ${response.status}`
            );
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  return (
    <div>
      <h1 className="heading">Dictionary Definitions</h1>
      <input
      className="input"
        type="text"
        placeholder="Enter a word"
        value={word}
        onChange={handleInputChange}
      />
      <button onClick={handleClick} className="button">search</button>
      <p className="words"> Definition : {definitions}</p>
    </div>
  );
  
}

export default Dictionary;
