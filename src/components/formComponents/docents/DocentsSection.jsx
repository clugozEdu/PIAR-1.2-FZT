import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Alert, AlertTitle } from "@mui/material";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DocentsTablePlanning from "./TablePlanning";
import DocentTableVisit from "./TableVisit";
import { typeIntervention } from "../../../utils/Variables";

const SectionDocents = () => {
  const { values } = useFormikContext();
  const { schools, error } = useSelector((state) => state.schoolData);
  const [rows, setRows] = useState([]);
  const [registerType, setRegisterType] = useState("");
  const location = useLocation();

  useEffect(() => {
    // get typeRegister
    const dataIntervention = typeIntervention.filter(
      (type) => type.keyPath === location.pathname
    );

    setRegisterType(dataIntervention[0].typeRegister);
  }, [location]);

  // Set docent for school selected
  useEffect(() => {
    if (schools.length > 0) {
      let docents = [];

      values.idLocation.forEach((idSchool) => {
        schools
          .filter((school) => school.id_school === idSchool)
          .forEach((school) => {
            docents = [...docents, ...school.docents];
          });
      });
      setRows(docents);
    } else {
      setRows([]);
    }
  }, [values.idLocation, schools]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" flexDirection={"column"}>
          <Typography
            variant="h5"
            component="h5"
            gutterBottom
            fontWeight={"bold"}
          >
            {registerType == "Planning"
              ? "Docentes a Planificar"
              : "Resultados de los Docentes"}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {rows.length > 0 ? (
          registerType == "Planning" ? (
            <DocentsTablePlanning data={rows} />
          ) : (
            <DocentTableVisit data={rows} />
          )
        ) : (
          <Alert severity="warning">
            <AlertTitle>Advertencia</AlertTitle>
            Escuela sin seleccionar o sin docentes.
          </Alert>
        )}
      </Grid>
    </Grid>
  );
};

export default SectionDocents;
