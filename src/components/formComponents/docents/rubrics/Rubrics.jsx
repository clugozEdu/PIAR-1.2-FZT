import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Alert,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormikContext } from "formik";

const RubricTable = ({ indicators, context, currentDocent }) => {
  const [data, setData] = useState([]);
  const [indicatorsExist, setIndicatorsExist] = useState(false);
  const [initialData, setInitialData] = useState([]);
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertSave, setShowAlertSave] = useState(false);
  const { values, setFieldValue } = useFormikContext();

  const getInitialRubric = (docent) => {
    const foundDocent = values.tableDocents.find((d) => d.id === docent.id);
    return foundDocent ? foundDocent[context] : [];
  };

  useEffect(() => {
    setInitialData(getInitialRubric(currentDocent));
  }, [currentDocent, values.tableDocents]);

  useEffect(() => {
    const hasInitialData = initialData?.length > 0;
    setIndicatorsExist(!hasInitialData);
    setShowAlertSave(hasInitialData);
    setData(hasInitialData ? initialData : indicators);
  }, [initialData, indicators]);

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
            ? { ...docent, [context]: data }
            : docent
        );
      } else {
        const newDocent = { ...currentDocent, [context]: data };
        updatedDocents = [...values.tableDocents, newDocent];
      }

      setFieldValue("tableDocents", updatedDocents);
      setIndicatorsExist(false);
      setShowAlertSave(true);
      setShowAlertError(false);
    } else {
      setShowAlertError(true);
    }
  };

  const handleRemoveIndicators = () => {
    const updatedDocents = values.tableDocents.map((docent) => {
      if (docent.id === currentDocent.id) {
        /* eslint-disable-next-line no-unused-vars */
        const { [context]: removedIndicators, ...docentWithoutIndicators } =
          docent;
        return docentWithoutIndicators;
      }
      return docent;
    });

    setFieldValue("tableDocents", updatedDocents);
    setIndicatorsExist(true);
    setShowAlertSave(false);
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
          <Alert severity="error" onClose={() => setShowAlertError(false)}>
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
          <Alert severity="success" onClose={() => setShowAlertSave(false)}>
            Indicadores guardados con éxito.
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
          <Table size="small">
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
                  <TableCell>{row.indicator}</TableCell>
                  {renderStatusCell(row.id, row.status, "rojo")}
                  {renderStatusCell(row.id, row.status, "amarillo")}
                  {renderStatusCell(row.id, row.status, "verde")}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid item xs={12} marginTop={2}>
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
    </Grid>
  );
};

RubricTable.propTypes = {
  indicators: PropTypes.array.isRequired,
  context: PropTypes.oneOf(["saber", "saberHacer", "saberSer"]).isRequired,
  currentDocent: PropTypes.object.isRequired,
};

export default RubricTable;
