import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Grid,
  Stack,
} from "@mui/material";
import { useFormikContext } from "formik";
import CheckIcon from "@mui/icons-material/Check";
import PropTypes from "prop-types";
import ButtonForm from "./Buttons"; // Importa tu componente ButtonForm
import AlertComponent from "./Alerts";

const IndicatorTable = ({
  data,
  setData,
  indicatorsExist,
  context,
  currentDocent,
  showDescription = false,
}) => {
  const { values, setFieldValue } = useFormikContext();
  // const [indicatorsExist, setIndicatorsExist] = useState(false);
  const [showAlertError, setshowAlertError] = useState(false);
  const [showAlertSave, setshowAlertSave] = useState(false);

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
      // setIndicatorsExist(false);
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
        const { [context]: _, ...docentWithoutContext } = docent;
        return docentWithoutContext;
      }
      return docent;
    });

    setFieldValue("tableDocents", updatedDocents);
    setshowAlertSave(false);
  };

  const handleStatusClick = (id, color) => {
    const newData = data.map((row) =>
      row.id === id
        ? { ...row, status: row.status === color ? "" : color }
        : row
    );
    setData(newData);
  };

  const renderStatusCell = (id, currentStatus, color, indicatorsExist) => {
    const colorMap = {
      rojo: "#f44336",
      amarillo: "#f2df37",
      verde: "#4caf50",
    };

    const handleClick = () => {
      if (!indicatorsExist) {
        handleStatusClick(id, color);
      }
    };

    return (
      <TableCell
        align="center"
        onClick={handleClick}
        style={{
          cursor: indicatorsExist ? "not-allowed" : "pointer",
          width: "80px",
          height: "40px",
          backgroundColor: currentStatus === color ? colorMap[color] : "",
          border: "1px solid",
          borderColor: currentStatus === color ? "transparent" : "#ddd",
          padding: 0,
          opacity: indicatorsExist ? 0.5 : 1,
        }}
      >
        {currentStatus === color && <CheckIcon style={{ color: "white" }} />}
      </TableCell>
    );
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        paddingBottom: 0,
        paddingTop: 0,
      }}
    >
      <Grid
        item
        xs={12}
        container
        flexDirection={"column"}
        alignContent={"center"}
        marginBottom={2}
      >
        {showAlertSave || !indicatorsExist ? (
          <AlertComponent
            type={"success"}
            message={"Indicadores guardados con éxito"}
          />
        ) : (
          showAlertError && (
            <AlertComponent
              type={"error"}
              message={"Debe de seleccionar todos los indiadores"}
            />
          )
        )}
      </Grid>

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
                <TableCell style={showDescription ? { width: "50%" } : {}}>
                  <Typography variant="body2" gutterBottom>
                    {context === "indicators" ? (
                      <>
                        <strong>{row.indicator}: </strong>
                        {showDescription && row.description}
                      </>
                    ) : (
                      row.indicator
                    )}
                  </Typography>
                </TableCell>
                {renderStatusCell(row.id, row.status, "rojo", !indicatorsExist)}
                {renderStatusCell(
                  row.id,
                  row.status,
                  "amarillo",
                  !indicatorsExist
                )}
                {renderStatusCell(
                  row.id,
                  row.status,
                  "verde",
                  !indicatorsExist
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item xs={12} marginTop={2}>
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {indicatorsExist ? (
            <ButtonForm context="saved" handler={handleSaveIndicators} />
          ) : (
            <ButtonForm context="deleted" handler={handleRemoveIndicators} />
          )}
        </Stack>
      </Grid>
    </Grid>
  );
};

IndicatorTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      indicator: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  setData: PropTypes.func.isRequired,
  indicatorsExist: PropTypes.bool.isRequired,
  context: PropTypes.string.isRequired,
  currentDocent: PropTypes.object.isRequired,
  showDescription: PropTypes.bool,
};

export default IndicatorTable;
