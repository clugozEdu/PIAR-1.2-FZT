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
  Box,
  Modal,
  Paper,
} from "@mui/material";
import { useFormikContext } from "formik";
import IndicatorsTable from "./results/Indicators";
import EvidencesDocents from "../evidences/EvidencesDocents";
import { GoogleDrive, DocentAcompa } from "../../../assets/icons/ListIcons";
import IconButtonTable from "../../IconButtonTable";

const propTypes = {
  data: PropTypes.array.isRequired,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 3,
};

const DocentTableVisit = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [currentDocent, setCurrentDocent] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const { values } = useFormikContext();

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

  const checkCompletion = (docentId, type) => {
    const docent = values.tableDocents.find((d) => d.id === docentId);
    if (!docent) return false;

    if (type === "indicators") {
      return (
        docent.indicators && docent.indicators.every((ind) => ind.status !== "")
      );
    }

    if (type === "evidences") {
      return (
        docent.evidences && docent.evidences.every((ind) => ind.type !== "")
      );
    }

    return false;
  };

  return (
    <TableContainer component={Paper} style={{ width: "100%" }}>
      <Table size="small" style={{ width: "100%" }}>
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
                  <IconButtonTable
                    row={row}
                    handleCheck={() => checkCompletion(row.id, "indicators")}
                    onClick={handleOpen}
                    titleTooltip="Resultado Acompañamiento"
                    context="indicators"
                    iconOne={<DocentAcompa />}
                  />

                  <IconButtonTable
                    row={row}
                    handleCheck={() => checkCompletion(row.id, "evidences")}
                    onClick={handleOpen}
                    disabled={!checkCompletion(row.id, "indicators")}
                    titleTooltip="Evidencias"
                    context="evidences"
                    iconOne={<GoogleDrive />}
                  />
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
          >
            {modalContent === "results" && `Resultados de la visita de: `}
            {modalContent === "indicators" && `Indicadores de la visita de: `}
            {modalContent === "strategies" && `Estrategias de la visita de: `}
            {modalContent === "evidences" && `Evidencias de la visita de: `}
            <strong>{currentDocent?.Nombre}</strong>
          </Typography>
          {currentDocent && modalContent === "indicators" && (
            <IndicatorsTable currentDocent={currentDocent} setOpen={setOpen} />
          )}
          {currentDocent && modalContent === "evidences" && (
            <EvidencesDocents
              currentDocent={currentDocent}
              typeEvidences="Pedagogic"
              onClose={handleClose}
            />
          )}
        </Box>
      </Modal>
    </TableContainer>
  );
};

DocentTableVisit.propTypes = propTypes;

export default DocentTableVisit;
