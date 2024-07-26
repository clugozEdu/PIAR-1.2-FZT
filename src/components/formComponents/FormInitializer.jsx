import { useEffect } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";

const FormikInitializer = ({ children }) => {
  const { advisor } = useSelector((state) => state.advisorData);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    const advisorValues = {
      country: advisor.id_country,
      idArea: advisor.id_area,
      idAdvisor: [advisor.id_advisor],
      // visitType: advisor.area,
      advisorLogin: advisor,
    };

    Object.keys(advisorValues).forEach((key) => {
      setFieldValue(key, advisorValues[key]);
    });
  }, [advisor, setFieldValue]);

  return children;
};

export default FormikInitializer;
