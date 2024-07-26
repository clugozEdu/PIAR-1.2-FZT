import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import SelectFormField from "../../shares/SelectFormField";
import DateFormField from "../../shares/DateFormField";
import TimeFormField from "../../shares/TimeFormField";
import AutoCompleteFormField from "../../shares/AutoCompleteField";
import { typeProgram, modalityVisit } from "../../../utils/Variables";
import ShareVisit from "../layout/ShareVisit";
import AlertComponent from "../layout/Alerts";

const GeneralsSection = () => {
  // advisor shared
  const { advisors, isLoading } = useSelector((state) => state.advisorsShared);
  const { values, setFieldValue } = useFormikContext();
  const [filterAdvisor, setFilterAdvisor] = useState([]);

  useEffect(() => {
    if (advisors.length > 0) {
      let areaLogin = values.advisorLogin.area;
      setFilterAdvisor(advisors?.filter((a) => a.area === areaLogin));
    } else {
      setFilterAdvisor([]);
    }
  }, [advisors, values.advisorLogin.area]);

  const loggedInAdvisorId = values.advisorLogin.id_advisor;

  const handlerDeleteTag = () => {
    // Remove advisorAttend from each docente
    const updatedDocents = values.tableDocents.map((docente) => {
      /* eslint-disable-next-line no-unused-vars */
      const { advisorAttend, ...rest } = docente;
      return rest;
    });

    setFieldValue("tableDocents", updatedDocents);
  };

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
          <ShareVisit />
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

      {filterAdvisor.length > 0 ? (
        <AutoCompleteFormField
          name="idAdvisor"
          label="Asesor a compartir"
          options={filterAdvisor}
          getOptionLabel={(option) => option.name}
          getOptionSelectedValue={(option) => option.id_advisor}
          getOptionDisabled={(option) =>
            option.id_advisor === loggedInAdvisorId
          }
          xs={4}
          sm={4}
          md={4}
          lg={4}
          maxSelections={2}
          onDeleteTag={handlerDeleteTag} // Pass handlerTest as onDeleteTag
        />
      ) : isLoading ? (
        <Grid item xs={4} sm={4} md={4} lg={4}>
          <AlertComponent type={"info"} message={"Cargando asesores"} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default GeneralsSection;
