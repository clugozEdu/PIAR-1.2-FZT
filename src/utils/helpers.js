import { errorFields } from "./Variables";

// function to get errors to formik
export const getErrorMessages = (errors, touched) => {
  const errorMessages = errorFields.reduce((acc, { keys, message }) => {
    const relevantErrors = keys.filter((key) => errors[key] && touched[key]);
    if (relevantErrors.length) {
      acc[message] = relevantErrors.map((key) => errors[key]);
    }
    return acc;
  }, {});

  return errorMessages;
};

export const checkTableDocents = (idRow, nameArray, keyData, values) => {
  const docent = values.tableDocents.find((d) => d.id === idRow);
  return (
    docent &&
    docent[nameArray] &&
    docent[nameArray].every((data) => data[keyData] !== "")
  );
};
