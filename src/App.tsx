import React, { useState } from "react";
const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [characters, setCharacters] = useState<string[]>([]);
  const [numberValid, setNumberValid] = useState<boolean>(false);
  const [invalidCharacterDetected, setInvalidCharacterDetected] =
    useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const validChars: string[] = [];

    let previousValid = true;
    let invalidCharacterFound = false;

    for (let i = 0; i < input.length; i++) {
      const char = input[i];

      if (isValidCharacter(char, i, previousValid)) {
        validChars.push(char);
        previousValid = true;
      } else {
        if (!invalidCharacterFound) {
          invalidCharacterFound = true;
          validChars.push(char);
        }
        previousValid = false;
      }
    }

    setInputValue(input);
    setCharacters(validChars);
    setInvalidCharacterDetected(invalidCharacterFound);
  };

  const isValidCharacter = (
    char: string,
    position: number,
    previousValid: boolean
  ): boolean => {
    if (position === 0 && previousValid) {
      return /^[vw]$/.test(char);
    }

    if (position === 1 && previousValid) {
      if (inputValue[0] === "v") {
        return /^[u-z]$/.test(char);
      } else if (inputValue[0] === "w") {
        return /^[a-x]$/.test(char);
      }
    }

    if (position === 2 && previousValid) {
      return /^[-]$/.test(char);
    }

    if (position === 3 && previousValid) {
      if (char === "0") {
        setNumberValid(false);
        return /^[0]$/.test(char);
      } else {
        setNumberValid(true);
        return /^[1-9]$/.test(char);
      }
    }

    if (position === 4 && previousValid) {
      if (char === "0") {
        setNumberValid(false);
        return /^[0]$/.test(char);
      } else {
        setNumberValid(true);
        return /^[1-9]$/.test(char);
      }
    }

    if (position === 5 && previousValid) {
      if (char === "0") {
        setNumberValid(false);
        return /^[0]$/.test(char);
      } else {
        setNumberValid(true);
        return /^[1-9]$/.test(char);
      }
    }

    if (position === 6 && previousValid) {
      if (numberValid) {
        return /^[0-9]$/.test(char);
      } else {
        return /^[1-9]$/.test(char);
      }
    }

    if (position === 7 && previousValid) {
      return /^[-]$/.test(char);
    }

    if (position === 8 && previousValid) {
      return /^[a-z]$/.test(char);
    }

    return false;
  };

  return (
    <div>
      <h1>Validador de Cadenas</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <div>
        {characters.length > 0 && (
          <div className="container">
            Characteres:{" "}
            <p>
              <div className="container">
                <p className="circle">Q0</p>
              </div>
            </p>
            {characters.map((character, index) => (
              <p key={index}>
                {character === "v" && index === 0 ? (
                  <div className="container">
                    <h1>{character}</h1> <p className="circle">Q1</p>
                  </div>
                ) : character === "w" && index === 0 ? (
                  <div className="container">
                    <h1>{character}</h1> <p className="circle">Q10</p>
                  </div>
                ) : /[a-zA-Z]/.test(character) && index === 1 ? (
                  <div className="container">
                    <h1>{character}</h1> <p className="circle">Q2</p>
                  </div>
                ) : character === "-" && index === 2 ? (
                  <div className="container">
                    <h1>{character}</h1> <p className="circle">Q3</p>
                  </div>
                ) : character === "0" && index === 3 ? (
                  <div className="container">
                    <h1>{character}</h1> <p className="circle">Q4</p>
                  </div>
                ) : /[1-9]/.test(character) && index === 3 ? (
                  <div className="container">
                    <h1>{character}</h1> <p className="circle">Q11</p>
                  </div>
                ) : character === "0" && index === 4 ? (
                  <div className="container">
                    <h1>{character}</h1> <p className="circle">Q5</p>
                  </div>
                ) : /[1-9]/.test(character) && index === 4 ? (
                  <div className="container">
                    <h1>{character}</h1> <p className="circle">Q12</p>
                  </div>
                ) : character === "0" && index === 5 ? (
                  <div className="container">
                    <h1>{character}</h1> <p className="circle">Q6</p>
                  </div>
                ) : /[1-9]/.test(character) && index === 5 ? (
                  <div className="container">
                    <h1>{character}</h1> <p className="circle">Q13</p>
                  </div>
                ) : /[0-9]/.test(character) && index === 6 ? (
                  <div className="container">
                    <h1>{character}</h1> <p className="circle">Q7</p>
                  </div>
                ) : character === "-" && index === 7 ? (
                  <div className="container">
                    <h1>{character}</h1> <p className="circle">Q8</p>
                  </div>
                ) : /[a-zA-Z]/.test(character) && index === 8 ? (
                  <div className="container">
                    <h1>{character}</h1> <p className="circle">Q9</p>
                  </div>
                ) : (
                  <div className="container">
                    <h1>{character}</h1>
                  </div>
                )}
              </p>
            ))}
          </div>
        )}
      </div>
      {invalidCharacterDetected && <p>Carácter inválido detectado.</p>}
    </div>
  );
};

export default App;
