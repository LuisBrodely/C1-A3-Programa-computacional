import React, { useState, ChangeEvent } from "react";

interface Validacion {
  caracter: string;
  valido: boolean;
}

function ValidarCadena(): JSX.Element {
  const [cadena, setCadena] = useState<string>("");
  const [mensaje, setMensaje] = useState<JSX.Element[]>([]);

  const validarCadena = (cadena: string): Validacion[] => {
    const validaciones: Validacion[] = [];

    // Función para agregar un mensaje de validación
    const agregarValidacion = (caracter: string, valido: boolean) => {
      validaciones.push({
        caracter,
        valido,
      });
    };

    // Verificar la longitud de la cadena
    if (cadena.length !== 9) {
      agregarValidacion(cadena[0], false);
      return validaciones;
    }

    // Verificar el primer carácter
    if (cadena[0] !== "v" && cadena[0] !== "w") {
      agregarValidacion(cadena[0], false);
      return validaciones;
    } else {
      agregarValidacion(cadena[0], true);
    }

    // Verificar el segundo carácter basado en el primer carácter
    if (
      (cadena[0] === "v" && (cadena[1] < "u" || cadena[1] > "z")) ||
      (cadena[0] === "w" && (cadena[1] < "a" || cadena[1] > "x"))
    ) {
      agregarValidacion(cadena[1], false);
      return validaciones;
    } else {
      agregarValidacion(cadena[1], true);
    }

    // Verificar el tercer carácter
    if (cadena[2] !== "-") {
      agregarValidacion(cadena[2], false);
      return validaciones;
    } else {
      agregarValidacion(cadena[2], true);
    }

    // Verificar los siguientes 4 caracteres
    const numero = Number(cadena.substring(3, 7));
    if (isNaN(numero) || numero < 1 || numero > 9999 || numero === 0) {
      // Agregar cada uno de los caracteres como válidos
      for (let i = 3; i < 7; i++) {
        agregarValidacion(cadena[i], i === 6 ? false : true);
      }
      return validaciones;
    } else {
      // Agregar cada uno de los caracteres como válidos
      for (let i = 3; i < 7; i++) {
        agregarValidacion(cadena[i], true);
      }
    }

    // Verificar el octavo carácter
    if (cadena[7] !== "-") {
      agregarValidacion(cadena[7], false);
      return validaciones;
    } else {
      agregarValidacion(cadena[7], true);
    }

    // Verificar el noveno carácter
    if (cadena[8] < "a" || cadena[8] > "z") {
      agregarValidacion(cadena[8], false);
      return validaciones;
    } else {
      agregarValidacion(cadena[8], true);
    }

    return validaciones;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputCadena = event.target.value;
    setCadena(inputCadena);
  };

  const handleValidar = () => {
    const validaciones = validarCadena(cadena);

    // Mostrar las validaciones en forma de lista
    const listaValidaciones = validaciones.map((validacion, index) => {
      let etiqueta = "";
      switch (index) {
        case 0:
          etiqueta = cadena[0] === "v" ? "Q1" : "Q10";
          break;
        case 1:
          etiqueta = `Q2`;
          break;
        case 2:
          etiqueta = "Q3";
          break;
        case 3:
          etiqueta = cadena[3] === "0" ? "Q4" : "Q11";
          break;
        case 4:
          etiqueta = cadena[4] === "0" ? "Q5" : "Q12";
          break;
        case 5:
          etiqueta = cadena[5] === "0" ? "Q6" : "Q13";
          break;
        case 6:
          etiqueta = `Q7`;
          break;
        case 7:
          etiqueta = "Q8";
          break;
        case 8:
          etiqueta = "Q9";
          break;
        default:
          etiqueta = "";
      }

      return (
        <div className="container--block" key={index}>
          <h2 className="container--text">{validacion.caracter}</h2>

          <div className={`block ${validacion.valido ? "verde" : "rojo"}`}>
            <h1 style={{ fontSize: "24px" }}>{etiqueta}</h1>
          </div>
        </div>
      );
    });

    setMensaje([
      <div className="container--block" key={-1}>
        <div className={`block verde`}>
          <h1 style={{ fontSize: "24px" }}>Q0</h1>
        </div>
      </div>,
      ...listaValidaciones,
    ]);
  };

  return (
    <div>
      <label>Ingresa la cadena:</label>
      <input type="text" value={cadena} onChange={handleChange} />
      <button onClick={handleValidar}>Validar</button>
      {mensaje && <div className="container">{mensaje}</div>}
    </div>
  );
}

export default ValidarCadena;