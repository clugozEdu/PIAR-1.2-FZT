import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { Grid, Typography, Box } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import PropTypes from "prop-types";
import { optionsObjectives } from "../../../utils/Variables";
import CheckboxGroupFormField from "../../shares/CheckboxGroupFormField";

const SectionObjectives = () => {
  const { values } = useFormikContext();
  const [valuesObjectives, setValuesObjectives] = useState([]);

  useEffect(() => {
    if (values.typeOfRegister) {
      const filteredObjectives = optionsObjectives.filter(
        (objective) => objective.id_intervention === values.typeOfRegister
      );
      setValuesObjectives(filteredObjectives);
    }
  }, [values.typeOfRegister]);

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
            {values.typeOfRegister === 1
              ? "Propósito del acompañamiento pedagógico"
              : "Propósitos del taller de formación"}
          </Typography>
        </Box>
      </Grid>

      <CheckboxGroupFormField
        catalog={valuesObjectives}
        fatherValue={values.programType.toString()}
        optionValue="option"
        menuValue="name"
        name="objectives"
        label="Objetivos"
        xs={12}
        sm={12}
        md={12}
        lg={12}
        values={values.objectives} // Pasar los valores actuales de objectives
      />
    </Grid>
  );
};

export default SectionObjectives;
