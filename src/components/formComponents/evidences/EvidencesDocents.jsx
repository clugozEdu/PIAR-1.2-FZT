import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  Divider,
  Alert,
} from "@mui/material";
import {
  PlanClases,
  ChildMonitors,
  DocentMonitors,
  ClassObservation,
  FormatPedagogyc,
} from "../../../assets/icons/ListIcons";
import { useFormikContext } from "formik";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SelectFormField from "../../shares/SelectFormField";
import TextFormField from "../../shares/TextFormField";

const evidenceDocents = [
  {
    id: 1,
    name: "Formato de acompañamiento pedagógico",
    typeEvidences: "Pedagogic",
    icon: <FormatPedagogyc />,
  },
  {
    id: 2,
    name: "Plan de clases",
    typeEvidences: "Pedagogic",
    icon: <PlanClases />,
  },
  {
    id: 3,
    name: "Formato de observación de clases",
    typeEvidences: "Pedagogic",
    icon: <ClassObservation />,
  },
  {
    id: 4,
    name: "Lista de niños monitores pedagógicos",
    typeEvidences: "Pedagogic",
    icon: <ChildMonitors />,
  },
  {
    id: 5,
    name: "Lista de docentes monitores pedagógicos",
    typeEvidences: "Pedagogic",
    icon: <DocentMonitors />,
  },
];

const propTypes = {
  currentDocent: PropTypes.object.isRequired,
  typeEvidences: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const EvidencesDocents = ({ typeEvidences, currentDocent, onClose }) => {
  const { values, setFieldValue } = useFormikContext();
  const [newEvidence, setNewEvidence] = useState({ type: "", link: "" });

  const getInitEvidences = (docent) => {
    const foundDocent = values.tableDocents.find((d) => d.id === docent.id);
    return foundDocent ? foundDocent.evidences : [];
  };

  const [data, setData] = useState(getInitEvidences(currentDocent) || []);

  useEffect(() => {
    setData(getInitEvidences(currentDocent) || []);
  }, [currentDocent, values.tableDocents]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvidence((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvidence = () => {
    if (newEvidence.type && newEvidence.link) {
      const updatedEvidences = [...data, newEvidence];

      const updatedDocents = values.tableDocents.map((docent) =>
        docent.id === currentDocent.id
          ? { ...docent, evidences: updatedEvidences }
          : docent
      );

      setFieldValue("tableDocents", updatedDocents);
      setData(updatedEvidences);
      setNewEvidence({ type: "", link: "" });
    }
  };

  const handleDeleteEvidence = (index) => {
    const updatedEvidences = data.filter((_, i) => i !== index);

    const updatedDocents = values.tableDocents.map((docent) =>
      docent.id === currentDocent.id
        ? { ...docent, evidences: updatedEvidences }
        : docent
    );

    setFieldValue("tableDocents", updatedDocents);
    setData(updatedEvidences);
  };

  const getEvidenceIcon = (type) => {
    const evidence = evidenceDocents.find((e) => e.name === type);
    return evidence ? evidence.icon : null;
  };

  return (
    <Card
      sx={{
        p: 2,
        border: "2px solid #d3d3d3", // Borde más visible
        borderRadius: "20px", // Borde redondeado
        position: "relative", // Asegura que el botón de cierre se posicione correctamente
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <CardContent>
        <Grid container spacing={2} mt={2}>
          <SelectFormField
            name="type"
            label="Tipo de evidencia"
            catalog={evidenceDocents.filter(
              (e) => e.typeEvidences === typeEvidences
            )}
            menuItemValue="name"
            optionValue="name"
            value={newEvidence.type}
            onChange={handleInputChange}
            xs={12}
            sm={12}
            md={4}
            lg={4}
          />

          <TextFormField
            label="Enlace de Google Drive"
            name="link"
            value={newEvidence.link}
            onChange={handleInputChange}
            xs={12}
            sm={12}
            md={6}
            lg={6}
          />

          <Grid item xs={12} sm={12} md={2} lg={2}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              my={1}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "#2e8b57",
                  "&:hover": {
                    backgroundColor: "#1d5737",
                  },
                }}
                onClick={handleAddEvidence}
              >
                Añadir
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {data && data.length > 0 ? (
            data.map((evidence, index) => (
              <Grid item xs={12} sm={12} md={6} lg={6} key={index}>
                <Card variant="outlined" sx={{ borderRadius: "20px" }}>
                  <CardContent>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box display="flex" alignItems="center">
                        {getEvidenceIcon(evidence.type)}
                        <Typography variant="h6" ml={1}>
                          {evidence.type}
                        </Typography>
                      </Box>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteEvidence(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Typography color="textSecondary">
                      <a
                        href={evidence.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {evidence.link}
                      </a>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid container mt={3} spacing={2}>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection={"column"}
                >
                  <Alert severity="info">
                    <Typography variant="body1" align="center">
                      No hay evidencias disponibles.
                    </Typography>
                  </Alert>
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

EvidencesDocents.propTypes = propTypes;

export default EvidencesDocents;
