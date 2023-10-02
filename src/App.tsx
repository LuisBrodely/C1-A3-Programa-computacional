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
          <p className="container">
            Characteres:{" "}
            {characters.map((character, index) => (
              <h2 key={index} className="circle">
                {   character === "v" && index === 0
                  ? character + " - Q1"
                  : character === "w" && index === 0
                  ? character + " - Q10"
                  : /[a-zA-Z]/.test(character) && index === 1
                  ? character + " - Q2"
                  : character === '-' && index === 2
                  ? character + " - Q3"
                  : character === "0" && index === 3
                  ? character + " - Q4"
                  : /[1-9]/.test(character) && index === 3
                  ? character + " - Q11"
                  : character === "0" && index === 4
                  ? character + " - Q5"
                  : /[1-9]/.test(character) && index === 4
                  ? character + " - Q12"
                  : character === "0" && index === 5
                  ? character + " - Q6"
                  : /[1-9]/.test(character) && index === 5
                  ? character + " - Q13"
                  : /[0-9]/.test(character) && index === 6
                  ? character + " - Q7"
                  : character === '-' && index === 7
                  ? character + " - Q8"
                  : /[a-zA-Z]/.test(character) && index === 8 ? character + ' - Q9 ' : character}
              </h2>
            ))}
          </p>
        )}
      </div>
      {invalidCharacterDetected && <p>Carácter inválido detectado.</p>}
    </div>
  );
};

export default App;
