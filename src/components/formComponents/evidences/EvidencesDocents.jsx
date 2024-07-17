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
];

const propTypes = {
  currentDocent: PropTypes.object.isRequired,
  typeEvidences: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const EvidencesDocents = ({ typeEvidences, currentDocent, onClose }) => {
  const { values, setFieldValue } = useFormikContext();
  const [newEvidence, setNewEvidence] = useState({ type: "", link: "" });
  const [evidenceExist, setEvidenceExist] = useState(false);
  const [linkError, setLinkError] = useState(false);

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
    if (name === "link" && value) {
      setLinkError(false);
    }
  };

  const handleAddEvidence = () => {
    if (!newEvidence.link) {
      setLinkError(true);
      return;
    }

    if (newEvidence.type && newEvidence.link) {
      const evidenceExists = data.some(
        (evidence) => evidence.type === newEvidence.type
      );

      if (evidenceExists) {
        setEvidenceExist(true);
        return;
      }

      const updatedEvidences = [...data, newEvidence];

      const updatedDocents = values.tableDocents.map((docent) =>
        docent.id === currentDocent.id
          ? { ...docent, evidences: updatedEvidences }
          : docent
      );

      setFieldValue("tableDocents", updatedDocents);
      setData(updatedEvidences);
      setNewEvidence({ type: "", link: "" });
      setEvidenceExist(false);
      setLinkError(false);
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
        p: 1,
        border: "2px solid #d3d3d3",
        borderRadius: "20px",
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
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            container
            flexDirection={"column"}
            alignContent={"center"}
          >
            {data.length === 3 && (
              <Alert severity="success" sx={{ borderRadius: "20px" }}>
                <Typography variant="body1" align="center">
                  Las evidencias han sido completadas para el docente
                </Typography>
              </Alert>
            )}
          </Grid>

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
            disabled={data.length === 3}
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
            disabled={data.length === 3}
            error={linkError}
            helperText={linkError ? "El enlace no puede estar vacío" : ""}
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
                disabled={data.length === 3}
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
                  <Alert severity="info" sx={{ borderRadius: "20px" }}>
                    <Typography variant="body1" align="center">
                      No hay evidencias disponibles.
                    </Typography>
                  </Alert>
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>

        {evidenceExist && (
          <Alert
            severity="error"
            sx={{ borderRadius: "20px", marginTop: "20px" }}
          >
            <Typography variant="body1" align="center">
              No se puede subir la misma evidencia, seleccione otra opción
            </Typography>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

EvidencesDocents.propTypes = propTypes;

export default EvidencesDocents;
