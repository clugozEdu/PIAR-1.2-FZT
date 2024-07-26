import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import { Typography, Grid } from "@mui/material";
import IndicatorTable from "../../layout/IndicatorsTable";

const propTypes = {
  currentDocent: PropTypes.object.isRequired,
  context: PropTypes.string.isRequired,
};

const IndicatorsSection = ({ currentDocent, context }) => {
  const [data, setData] = useState([]);
  const [indicatorsExist, setIndicatorsExist] = useState(false);
  const [initialData, setInitialData] = useState([]);
  const { values } = useFormikContext();

  const getInitialIndicators = (docent) => {
    const foundDocent = values.tableDocents.find((d) => d.id === docent.id);
    return foundDocent ? foundDocent.indicators : [];
  };

  useEffect(() => {
    setInitialData(getInitialIndicators(currentDocent));
  }, [currentDocent, values.tableDocents]);

  useEffect(() => {
    setIndicatorsExist(!initialData?.length > 0);

    setData(
      initialData?.length > 0
        ? initialData
        : [
            {
              id: 1,
              indicator: "Selección de tecnología",
              description:
                "Las aplicaciones seleccionadas por el docente son adecuadas para desarrollar las competencias establecidas en el plan de clases",
              status: "",
            },
            {
              id: 2,
              indicator: "Dominio Tecnológico del Docente",
              description:
                "Se observa que el docente posee un dominio apropiado de las distintas funciones de la aplicación seleccionada",
              status: "",
            },
            {
              id: 3,
              indicator: "Dominio Tecnológico de los Estudiantes",
              description:
                "Se observa que los estudiantes posee un dominio apropiado de las distintas funciones de la aplicación seleccionada",
              status: "",
            },
            {
              id: 4,
              indicator: "Uso pedagógico",
              description:
                "Se observa que la integración de la tecnología facilita el proceso de aprendizaje y comprensión de contenidos",
              status: "",
            },
            {
              id: 5,
              indicator: "Motivación",
              description:
                "Los estudiantes están motivados a emplear de forma activa la tecnología en el aprendizaje",
              status: "",
            },
            {
              id: 6,
              indicator: "Actitud",
              description:
                "Hay un clima de trabajo cordial y de intercambio entre docentes y alumnos",
              status: "",
            },
            {
              id: 7,
              indicator: "Evidencia",
              description:
                "Existe evidencia de que alumnos y docentes hacen uso de forma sostenida y permanente de la tecnología",
              status: "",
            },
          ]
    );
  }, [initialData]);

  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        sx={{
          paddingBottom: 0,
        }}
      >
        <Typography
          variant="body1"
          align="center"
          sx={{
            paddingBottom: 0,
          }}
        >
          Haga clic en las celdas de la columna Verde, Amarillo o Rojo para
          establecer el estado.
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          paddingBottom: 0,
          paddingTop: 0,
        }}
      >
        <IndicatorTable
          data={data}
          setData={setData}
          indicatorsExist={indicatorsExist}
          context={context}
          currentDocent={currentDocent}
          showDescription={true}
        />
      </Grid>
    </Grid>
  );
};

IndicatorsSection.propTypes = propTypes;

export default IndicatorsSection;
