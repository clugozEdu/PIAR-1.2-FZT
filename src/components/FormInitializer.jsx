import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";

const FormikInitializer = ({ children }) => {
  const { advisor } = useSelector((state) => state.advisorData);
  const { setFieldValue, values } = useFormikContext();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const advisorValues = {
      country: advisor.id_country,
      idArea: advisor.id_area,
      idAdvisor: advisor.id_advisor,
      // visitType: advisor.area,
      advisorLogin: advisor,
    };

    setInitialValues((prevValues) => ({
      ...prevValues,
      ...advisorValues,
    }));

    Object.keys(advisorValues).forEach((key) => {
      setFieldValue(key, advisorValues[key]);
    });
  }, [advisor, setFieldValue]);

  useEffect(() => {
    // Check if any essential values have been reset and re-apply initial values if necessary
    if (values.idAdvisor !== initialValues.idAdvisor) {
      Object.keys(initialValues).forEach((key) => {
        setFieldValue(key, initialValues[key]);
      });
    }
  }, [values, initialValues, setFieldValue]);

  return children;
};

export default FormikInitializer;
