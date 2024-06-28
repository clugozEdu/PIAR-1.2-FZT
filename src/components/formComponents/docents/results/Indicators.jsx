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
  AlertTitle,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

const propTypes = {
  currentDocent: PropTypes.object.isRequired,
  setOpen: PropTypes.func.isRequired,
};

const IndicatorsTable = ({ currentDocent, setOpen }) => {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const { values, setFieldValue } = useFormikContext();

  const getInitialIndicators = (docent) => {
    const foundDocent = values.tableDocents.find((d) => d.id === docent.id);
    return foundDocent ? foundDocent.indicators : [];
  };

  // useEffect to initData
  useEffect(() => {
    setInitialData(getInitialIndicators(currentDocent));
  }, [currentDocent, values.tableDocents]);

  // effect to get initData or not
  useEffect(() => {
    setData(
      initialData.length > 0
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

  // handle to change status to click
  const handleStatusClick = (id, color) => {
    const newData = data.map((row) =>
      row.id === id
        ? { ...row, status: row.status === color ? "" : color }
        : row
    );
    setData(newData);
  };

  // render to status cell
  const renderStatusCell = (id, currentStatus, color) => {
    return (
      <TableCell
        align="center"
        onClick={() => handleStatusClick(id, color)}
        style={{
          cursor: "pointer",
          width: "40px",
          height: "40px",
          backgroundColor:
            currentStatus === color
              ? color === "rojo"
                ? "#f44336"
                : color === "amarillo"
                ? "#f2df37"
                : "#4caf50"
              : "",
          border: "1px solid",
          borderColor: currentStatus === color ? "transparent" : "#ddd",
        }}
      >
        {currentStatus === color && <CheckIcon style={{ color: "white" }} />}
      </TableCell>
    );
  };

  // handle save indicators for docent in formik values
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

      setOpen(false);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <Grid container spacing={2}>
      {showAlert && (
        <Grid item xs={12}>
          <Alert
            severity="error"
            onClose={() => setShowAlert(false)}
            sx={{
              borderRadius: 20,
              mt: 1,
            }}
          >
            <AlertTitle>Error</AlertTitle>
            Todos los indicadores deben tener un estado seleccionado.
          </Alert>
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography variant="body1" align="center">
          Haga clic en las celdas de la columna Verde, Amarillo o Rojo para
          establecer el estado.
        </Typography>
      </Grid>
      <Grid item xs={12}>
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
                    N
                  </Typography>
                </TableCell>
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
                  <TableCell>
                    <Typography>{row.id}</Typography>
                  </TableCell>
                  <TableCell>
                    {row.indicator}: {row.description}
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
      <Grid item xs={12}>
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
        <Stack direction="row" spacing={2} justifyContent="flex-end">
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
        </Stack>
      </Grid>
    </Grid>
  );
};

IndicatorsTable.propTypes = propTypes;

export default IndicatorsTable;
