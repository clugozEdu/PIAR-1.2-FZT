import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import { useFormikContext } from "formik";
import IndicatorsTable from "./results/Indicators";
import ResultDocents from "./results/ResultVisit";
import StrategyDocent from "./results/Strategy";
import EvidencesDocents from "../evidences/EvidencesDocents";
import {
  GoogleDrive,
  DocentAcompa,
  ResultHorizontal,
  DocentStrategy,
  UserPlus,
  UserMinus,
} from "../../../assets/icons/ListIcons";
import IconButtonTable from "../../IconButtonTable";

const propTypes = {
  data: PropTypes.array.isRequired,
};

const DocentTableVisit = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [currentDocent, setCurrentDocent] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const { values, setFieldValue } = useFormikContext();

  const handleOpen = (docent, content) => {
    setCurrentDocent(docent);
    setModalContent(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentDocent(null);
    setModalContent(null);
  };

  const handleAddDocent = (row) => {
    const docent = values.tableDocents.find((d) => d.id === row.id);

    if (!docent) {
      setFieldValue("tableDocents", [...values.tableDocents, row]);
    }
  };

  const handleDeleteDocent = (row) => {
    const updatedDocents = values.tableDocents.filter(
      (docent) => docent.id !== row.id
    );

    setFieldValue("tableDocents", updatedDocents);
  };

  const checkCompletion = (docentId, type) => {
    const docent = values.tableDocents.find((d) => d.id === docentId);
    if (!docent) return false;

    if (type === "results") {
      return docent.results && docent.results.every((ind) => ind.option !== "");
    }

    if (type === "indicators") {
      return (
        docent.indicators && docent.indicators.every((ind) => ind.status !== "")
      );
    }

    if (type === "strategy") {
      return docent.strategy && docent.strategy.length > 0;
    }

    if (type === "evidences") {
      return docent.evidences && docent.evidences.length === 3;
    }

    return false;
  };

  const isDocentAdded = (docentId) => {
    return values.tableDocents.some((d) => d.id === docentId);
  };

  return (
    <TableContainer
      component={Paper}
      style={{ width: "100%", maxHeight: "500px", overflowY: "auto" }}
    >
      <Table size="small" style={{ width: "100%", overflowY: "auto" }}>
        <TableHead
          sx={{
            backgroundColor: "#354656",
          }}
        >
          <TableRow>
            {data.length > 0 &&
              Object.keys(data[0]).map((key, index) => (
                <TableCell key={index}>
                  <Typography variant="h7" color="white">
                    {key}
                  </Typography>
                </TableCell>
              ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((value, idx) => (
                <TableCell key={idx}>{value}</TableCell>
              ))}

              <TableCell>
                <Stack direction="row" spacing={2}>
                  {isDocentAdded(row.id) ? (
                    <Tooltip title={"Eliminar docente"}>
                      <IconButton
                        size="small"
                        sx={{
                          fill: isDocentAdded(row.id) ? "#FF3D3D" : "#c0c0c0",
                        }}
                        onClick={() => handleDeleteDocent(row)}
                        // disabled={!isDocentAdded(row.id)}
                      >
                        <UserMinus />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title={"Agregar docente"}>
                      <IconButton
                        size="small"
                        sx={{
                          fill: isDocentAdded(row.id) ? "#c0c0c0" : "#4a9d9c",
                        }}
                        onClick={() => handleAddDocent(row)}
                        disabled={isDocentAdded(row.id)}
                      >
                        <UserPlus />
                      </IconButton>
                    </Tooltip>
                  )}

                  <IconButtonTable
                    row={row}
                    onClick={handleOpen}
                    handleCheck={() => checkCompletion(row.id, "results")}
                    titleTooltip={"resultados del docente"}
                    disabled={!isDocentAdded(row.id)}
                    context={"results"}
                    iconOne={<ResultHorizontal />}
                  />

                  <IconButtonTable
                    row={row}
                    handleCheck={() => checkCompletion(row.id, "indicators")}
                    disabled={
                      !checkCompletion(row.id, "results") ||
                      !isDocentAdded(row.id)
                    }
                    onClick={handleOpen}
                    titleTooltip={"resultado Acompañamiento"}
                    context="indicators"
                    iconOne={<DocentAcompa />}
                  />

                  <IconButtonTable
                    row={row}
                    handleCheck={() => checkCompletion(row.id, "strategy")}
                    disabled={
                      !checkCompletion(row.id, "indicators") ||
                      !isDocentAdded(row.id)
                    }
                    onClick={handleOpen}
                    titleTooltip={"estrategias Implementadas"}
                    context="strategy"
                    iconOne={<DocentStrategy />}
                  />

                  <IconButtonTable
                    row={row}
                    handleCheck={() => checkCompletion(row.id, "evidences")}
                    onClick={handleOpen}
                    disabled={
                      !checkCompletion(row.id, "strategy") ||
                      !isDocentAdded(row.id)
                    }
                    titleTooltip={"evidencias"}
                    context="evidences"
                    iconOne={<GoogleDrive />}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        maxWidth={"lg"}
        fullWidth={true}
        keepMounted
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle
          id="dialog-title"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: 0,
          }}
        >
          {modalContent === "results" && `Resultados de la visita de: `}
          {modalContent === "indicators" && `Indicadores de la visita de: `}
          {modalContent === "strategy" && `Estrategias de la visita de: `}
          {modalContent === "evidences" && `Evidencias de la visita de: `}
          <strong>{currentDocent?.Nombre}</strong>
        </DialogTitle>
        <DialogContent>
          {currentDocent && modalContent === "results" && (
            <ResultDocents currentDocent={currentDocent} />
          )}
          {currentDocent && modalContent === "indicators" && (
            <IndicatorsTable currentDocent={currentDocent} />
          )}
          {currentDocent && modalContent === "evidences" && (
            <EvidencesDocents
              currentDocent={currentDocent}
              typeEvidences="Pedagogic"
              onClose={handleClose}
            />
          )}

          {currentDocent && modalContent === "strategy" && (
            <StrategyDocent currentDocent={currentDocent} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

DocentTableVisit.propTypes = propTypes;

export default DocentTableVisit;
