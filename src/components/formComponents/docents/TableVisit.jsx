import React, { useEffect, useState } from "react";
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
  Alert,
  Grid,
} from "@mui/material";
import { useFormikContext } from "formik";
import IndicatorsTable from "./results/Indicators";
import ResultDocents from "./results/ResultVisit";
import StrategyDocent from "./results/Strategy";
import EvidencesDocents from "../evidences/EvidencesDocents";
import RubricTable from "./rubrics/Rubrics";
import { resultFormation } from "../../../utils/Variables";
import {
  GoogleDrive,
  DocentAcompa,
  ResultHorizontal,
  DocentStrategy,
  UserPlus,
  UserMinus,
  BrainUser,
  ToolsUser,
  CardUser,
} from "../../../assets/icons/ListIcons";
import IconButtonTable from "../../IconButtonTable";

const propTypes = {
  data: PropTypes.array.isRequired,
};

const DocentTableVisit = ({ data }) => {
  const [typeVisit, setTypeVisit] = useState("");
  const [typeTaller, setTypeTaller] = useState([]);
  const [saber, setSaber] = useState([]);
  const [saberHacer, setSaberHacer] = useState([]);
  const [saberSer, setSaberSer] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentDocent, setCurrentDocent] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    setTypeVisit(values.typeOfRegister);
  }, [values.typeOfRegister]);

  useEffect(() => {
    if (typeVisit === "Taller de formación") {
      setTypeTaller(
        values.objectives.map((o) => ({
          description: o.description,
          option: o.option,
        }))
      );
    }
  }, [values.objectives]);

  useEffect(() => {
    if (typeTaller.length > 0) {
      const newSaber = [];
      const newSaberHacer = [];
      const newSaberSer = [];

      typeTaller.forEach((taller) => {
        const formation = resultFormation.find(
          (item) => item[taller.description]
        );
        if (formation) {
          const formationData = formation[taller.description];
          newSaber.push(...formationData.Saber);
          newSaberHacer.push(...formationData.SaberHacer);
          newSaberSer.push(...formationData.SaberSer);
        }
      });

      setSaber(newSaber);
      setSaberHacer(newSaberHacer);
      setSaberSer(newSaberSer);
    }
  }, [typeTaller]);

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

    const checks = {
      results: () =>
        docent.results && docent.results.every((ind) => ind.option !== ""),
      indicators: () =>
        docent.indicators &&
        docent.indicators.every((ind) => ind.status !== ""),
      strategy: () => docent.strategy && docent.strategy.length > 0,
      evidences: () => docent.evidences && docent.evidences.length === 3,
      saber: () => docent.saber && docent.saber.length > 0,
      saberHacer: () => docent.saberHacer && docent.saberHacer.length > 0,
      saberSer: () => docent.saberSer && docent.saberSer.length > 0,
    };

    return checks[type] ? checks[type]() : false;
  };

  const isDocentAdded = (docentId) => {
    return values.tableDocents.some((d) => d.id === docentId);
  };

  return (
    <>
      <Grid container marginBottom={2} justifyContent={"center"}>
        {typeTaller.length == 0 && typeVisit === "Taller de formación" && (
          <Alert severity="warning">
            Tiene que seleccionar un taller antes de agregar a los docentes.
          </Alert>
        )}
      </Grid>

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
                    {typeVisit === "Taller de formación" &&
                    typeTaller.length === 0 ? null : isDocentAdded(row.id) ? (
                      <Tooltip title={"Eliminar docente"}>
                        <IconButton
                          size="small"
                          sx={{
                            fill: "#FF3D3D",
                          }}
                          onClick={() => handleDeleteDocent(row)}
                        >
                          <UserMinus />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title={"Agregar docente"}>
                        <IconButton
                          size="small"
                          sx={{
                            fill: "#4a9d9c",
                          }}
                          onClick={() => handleAddDocent(row)}
                          disabled={isDocentAdded(row.id)}
                        >
                          <UserPlus />
                        </IconButton>
                      </Tooltip>
                    )}

                    {typeVisit === "Acompañamiento pedagógico" ? (
                      <>
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
                          handleCheck={() =>
                            checkCompletion(row.id, "indicators")
                          }
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
                          handleCheck={() =>
                            checkCompletion(row.id, "strategy")
                          }
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
                          handleCheck={() =>
                            checkCompletion(row.id, "evidences")
                          }
                          onClick={handleOpen}
                          disabled={
                            !checkCompletion(row.id, "strategy") ||
                            !isDocentAdded(row.id)
                          }
                          titleTooltip={"evidencias"}
                          context="evidences"
                          iconOne={<GoogleDrive />}
                        />
                      </>
                    ) : (
                      <>
                        <IconButtonTable
                          row={row}
                          handleCheck={() => checkCompletion(row.id, "saber")}
                          onClick={handleOpen}
                          disabled={!isDocentAdded(row.id)}
                          titleTooltip={"Saber"}
                          context="saber"
                          iconOne={<BrainUser />}
                        />
                        <IconButtonTable
                          row={row}
                          handleCheck={() =>
                            checkCompletion(row.id, "saberHacer")
                          }
                          onClick={handleOpen}
                          disabled={
                            !checkCompletion(row.id, "saber") ||
                            !isDocentAdded(row.id)
                          }
                          titleTooltip={"Saber Hacer"}
                          context="hacer"
                          iconOne={<ToolsUser />}
                        />
                        <IconButtonTable
                          row={row}
                          handleCheck={() =>
                            checkCompletion(row.id, "saberSer")
                          }
                          onClick={handleOpen}
                          disabled={
                            !checkCompletion(row.id, "saberHacer") ||
                            !isDocentAdded(row.id)
                          }
                          titleTooltip={"Saber Ser"}
                          context="ser"
                          iconOne={<CardUser />}
                        />
                      </>
                    )}
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
            {modalContent === "saber" && `Evaluación del Saber: `}
            {modalContent === "hacer" && `Evaluación del Saber Hacer: `}
            {modalContent === "ser" && `Evaluación del Saber Ser: `}
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

            {currentDocent && modalContent === "saber" && (
              <RubricTable
                indicators={saber}
                context="saber"
                currentDocent={currentDocent}
              />
            )}
            {currentDocent && modalContent === "hacer" && (
              <RubricTable
                indicators={saberHacer}
                context="saberHacer"
                currentDocent={currentDocent}
              />
            )}
            {currentDocent && modalContent === "ser" && (
              <RubricTable
                indicators={saberSer}
                context="saberSer"
                currentDocent={currentDocent}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </TableContainer>
    </>
  );
};

DocentTableVisit.propTypes = propTypes;

export default DocentTableVisit;
