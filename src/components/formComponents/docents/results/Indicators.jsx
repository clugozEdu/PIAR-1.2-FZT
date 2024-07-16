import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

const propTypes = {
  currentDocent: PropTypes.object.isRequired,
};

const IndicatorsTable = ({ currentDocent }) => {
  const [data, setData] = useState([]);
  const [indicatorsExist, setIndicatorsExist] = useState(false);
  ``;
  const [initialData, setInitialData] = useState([]);
  const [showAlertError, setshowAlertError] = useState(false);
  const [showAlertSave, setshowAlertSave] = useState(false);
  const { values, setFieldValue } = useFormikContext();

  const getInitialIndicators = (docent) => {
    const foundDocent = values.tableDocents.find((d) => d.id === docent.id);
    return foundDocent ? foundDocent.indicators : [];
  };

  useEffect(() => {
    setInitialData(getInitialIndicators(currentDocent));
  }, [currentDocent, values.tableDocents]);

  useEffect(() => {
    setIndicatorsExist(!initialData?.length > 0);
    setshowAlertSave(initialData?.length > 0);

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

  const handleStatusClick = (id, color) => {
    const newData = data.map((row) =>
      row.id === id
        ? { ...row, status: row.status === color ? "" : color }
        : row
    );
    setData(newData);
  };

  const renderStatusCell = (id, currentStatus, color) => {
    const colorMap = {
      rojo: "#f44336",
      amarillo: "#f2df37",
      verde: "#4caf50",
    };

    return (
      <TableCell
        align="center"
        onClick={() => handleStatusClick(id, color)}
        style={{
          cursor: "pointer",
          width: "80px",
          height: "40px",
          backgroundColor: currentStatus === color ? colorMap[color] : "",
          border: "1px solid",
          borderColor: currentStatus === color ? "transparent" : "#ddd",
          padding: 0,
        }}
      >
        {currentStatus === color && <CheckIcon style={{ color: "white" }} />}
      </TableCell>
    );
  };

  const handleSaveIndicators = () => {
    const allSelected = data.every((row) => row.status !== "");

    if (allSelected) {
      let docentExists = values.tableDocents.find(
        (docent) => docent.id === currentDocent.id
      );

      let updatedDocents;

      if (docentExists) {
        updatedDocents = values.tableDocents.map((docent) =>
          docent.id === currentDocent.id
            ? { ...docent, indicators: data }
            : docent
        );
      } else {
        const newDocent = { ...currentDocent, indicators: data };
        updatedDocents = [...values.tableDocents, newDocent];
      }

      setFieldValue("tableDocents", updatedDocents);
      setIndicatorsExist(false);
      setshowAlertSave(true);
      setshowAlertError(false);
    } else {
      setshowAlertError(true);
    }
  };

  const handleRemoveIndicators = () => {
    const updatedDocents = values.tableDocents.map((docent) => {
      if (docent.id === currentDocent.id) {
        /* eslint-disable-next-line no-unused-vars */
        const { indicators, ...docentWithoutIndicators } = docent;
        return docentWithoutIndicators;
      }
      return docent;
    });

    setFieldValue("tableDocents", updatedDocents);
    setIndicatorsExist(true);
    setshowAlertSave(false);
  };

  return (
    <Grid container spacing={2}>
      {showAlertError && (
        <Grid
          item
          xs={12}
          container
          flexDirection={"column"}
          alignContent={"center"}
        >
          <Alert
            severity="error"
            onClose={() => setshowAlertError(false)}
            sx={{
              borderRadius: 20,
            }}
          >
            Todos los indicadores deben tener un estado seleccionado.
          </Alert>
        </Grid>
      )}

      {showAlertSave && (
        <Grid
          item
          xs={12}
          container
          flexDirection={"column"}
          alignContent={"center"}
        >
          <Alert
            severity="success"
            onClose={() => setshowAlertSave(false)}
            sx={{
              borderRadius: 20,
            }}
          >
            Indicadores guardado con éxito.
          </Alert>
        </Grid>
      )}

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
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead
              sx={{
                backgroundColor: "#354656",
              }}
            >
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle1" color="white">
                    Indicador
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1" color="white">
                    Rojo
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1" color="white">
                    Amarillo
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle1" color="white">
                    Verde
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell style={{ width: "50%" }}>
                    <Typography variant="body2" gutterBottom>
                      <strong>{row.indicator}: </strong>
                      {row.description}
                    </Typography>
                  </TableCell>
                  {renderStatusCell(row.id, row.status, "rojo")}
                  {renderStatusCell(row.id, row.status, "amarillo")}
                  {renderStatusCell(row.id, row.status, "verde")}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={8}>
        <Typography color={"red"}>
          <strong>ROJO:</strong> Estos indicadores requieren una atención
          priorizada, por su bajo desempeño en el aula.
        </Typography>
        <Typography color={"#ccbc2f"}>
          <strong>AMARILLO:</strong> Se observan avances, pero con oportunidades
          de mejora.
        </Typography>
        <Typography color={"#4caf50"}>
          <strong>VERDE:</strong> El desempeño de los indicadores es óptimo.
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {indicatorsExist ? (
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveIndicators}
              sx={{
                backgroundColor: "#2e8b57",
                "&:hover": {
                  backgroundColor: "#143e27",
                },
                color: "white",
              }}
            >
              Guardar
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={handleRemoveIndicators}
              sx={{
                backgroundColor: "#f44336",
                "&:hover": {
                  backgroundColor: "#ba000d",
                },
                color: "white",
              }}
            >
              Eliminar
            </Button>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

IndicatorsTable.propTypes = propTypes;

export default IndicatorsTable;
