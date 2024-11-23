// function get errors form form
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

// function to callback stringColor for return avatar user and color
export const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
};

export const getSeriesData = (data, keyUnique, keyReturnTypeChart) => {
  const dataSeries = {};

  data.forEach((visit) => {
    const dataUnique = visit[keyUnique];

    if (!dataSeries[dataUnique]) {
      dataSeries[dataUnique] = 0;
    }

    dataSeries[dataUnique]++;
  });

  return Object.entries(dataSeries).map(([label, value], id) => ({
    id: id,
    [keyReturnTypeChart]: value,
    label: label,
  }));
};

export const getTotalUsers = (data) => {
  const users = {};

  data.forEach((visit) => {
    visit.users.forEach((user) => {
      const userUnique = user.user_id;

      if (!users[userUnique]) {
        users[userUnique] = user.user_name; // Agrega el usuario al objeto users
      }
    });
  });

  return Object.entries(users);
};
