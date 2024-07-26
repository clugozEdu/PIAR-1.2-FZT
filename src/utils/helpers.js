export const getErrorMessages = (errores) => {
  if (!errores || typeof errores !== "object") return []; // Verificar si errores es null, undefined o no es un objeto

  let mensajesErrores = [];
  /* eslint-disable-next-line no-unused-vars */
  for (const [key, value] of Object.entries(errores)) {
    if (typeof value === "string") {
      mensajesErrores.push(value);
    } else if (Array.isArray(value)) {
      value.forEach((errorDocente) => {
        if (errorDocente && typeof errorDocente === "object") {
          for (const subValue of Object.values(errorDocente)) {
            if (subValue != null) {
              mensajesErrores.push(subValue);
            }
          }
        }
      });
    } else if (typeof value === "object" && value !== null) {
      for (const subValue of Object.values(value)) {
        if (subValue != null) {
          mensajesErrores.push(subValue);
        }
      }
    }
  }

  return mensajesErrores;
};

// function to get color and name for user
const stringToColor = (string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};
