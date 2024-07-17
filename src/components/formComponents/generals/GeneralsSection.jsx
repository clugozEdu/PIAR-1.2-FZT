import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useFormikContext } from "formik";
// import { useSelector } from "react-redux";
import SelectFormField from "../../shares/SelectFormField";
import DateFormField from "../../shares/DateFormField";
import TimeFormField from "../../shares/TimeFormField";
import { typeProgram, modalityVisit } from "../../../utils/Variables";

const GeneralsSection = () => {
  const { values } = useFormikContext();

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
            Información General de la Visita
          </Typography>
        </Box>
      </Grid>

      <SelectFormField
        name="programType"
        label="Tipo de Programa"
        catalog={typeProgram || []}
        menuItemValue="name"
        optionValue="name"
        value={values.programType || ""}
        xs={12}
        sm={12}
        md={4}
        lg={4}
      />

      <SelectFormField
        name="modality"
        label="Modalidad de la visita"
        catalog={modalityVisit || []}
        menuItemValue="name"
        optionValue="name"
        value={values.modality || ""}
        xs={12}
        sm={12}
        md={4}
        lg={4}
      />

      <DateFormField
        name="date"
        label="Fecha de la visita"
        xs={12}
        sm={12}
        md={4}
        lg={4}
      />

      <TimeFormField
        name="entryTime"
        label="Hora de Entrada"
        xs={12}
        sm={12}
        md={4}
        lg={4}
      />

      <TimeFormField
        name="departureTime"
        label="Hora de Salida"
        xs={12}
        sm={12}
        md={4}
        lg={4}
      />
    </Grid>
  );
};

export default GeneralsSection;
