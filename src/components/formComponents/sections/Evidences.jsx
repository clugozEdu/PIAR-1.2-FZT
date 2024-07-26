import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import {
  Box,
  Grid,
  Typography,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import {
  PhotoIcon,
  VideoIcon,
  TestimonyIcon,
  PlanClases,
  ClassObservation,
  FormatPedagogyc,
} from "../../../assets/icons/ListIcons";
import SelectFormField from "../../shares/SelectFormField";
import TextFormField from "../../shares/TextFormField";
import ResultCard from "../layout/ResultsCard";
import ButtonForm from "../layout/Buttons";
import AlertComponent from "../layout/Alerts";

const allEvidences = {
  visit: [
    { id: 1, name: "Foto", typeEvidences: "Visit", icon: <PhotoIcon /> },
    { id: 2, name: "Videos", typeEvidences: "Visit", icon: <VideoIcon /> },
    {
      id: 3,
      name: "Testimonios",
      typeEvidences: "Visit",
      icon: <TestimonyIcon />,
    },
  ],
  docents: [
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
  ],
};

const Evidences = ({ type, maxEvidences, currentDocent }) => {
  const { values, setFieldValue } = useFormikContext();
  const [newEvidence, setNewEvidence] = useState({ type: "", link: "" });
  /* eslint-disable-next-line no-unused-vars */
  const [evidenceExist, setEvidenceExist] = useState(false);
  const [linkError, setLinkError] = useState(false);

  const getInitEvidences = () => {
    if (type === "docents" && currentDocent) {
      const foundDocent = values.tableDocents.find(
        (d) => d.id === currentDocent.id
      );
      return foundDocent ? foundDocent.evidences || [] : [];
    }
    return values.evidencesVisit || [];
  };

  const [data, setData] = useState(getInitEvidences());

  useEffect(() => {
    setData(getInitEvidences());
  }, [currentDocent, values.tableDocents, values.evidencesVisit]);

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

      if (type === "docents") {
        const updatedDocents = values.tableDocents.map((docent) =>
          docent.id === currentDocent.id
            ? { ...docent, evidences: updatedEvidences }
            : docent
        );
        setFieldValue("tableDocents", updatedDocents);
      } else {
        setFieldValue("evidencesVisit", updatedEvidences);
      }

      setData(updatedEvidences);
      setNewEvidence({ type: "", link: "" });
      setEvidenceExist(false);
      setLinkError(false);
    }
  };

  const handleDeleteEvidence = (index) => {
    const updatedEvidences = data.filter((_, i) => i !== index);

    if (type === "docents") {
      const updatedDocents = values.tableDocents.map((docent) =>
        docent.id === currentDocent.id
          ? { ...docent, evidences: updatedEvidences }
          : docent
      );
      setFieldValue("tableDocents", updatedDocents);
    } else {
      setFieldValue("evidencesVisit", updatedEvidences);
    }

    setData(updatedEvidences);
  };

  const getEvidenceIcon = (evidenceType) => {
    const evidence = allEvidences[type].find((e) => e.name === evidenceType);
    return evidence ? evidence.icon : null;
  };

  return (
    <Card sx={{ p: 1, border: "2px solid #d3d3d3", borderRadius: "20px" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" flexDirection={"column"}>
              <Typography
                variant="h5"
                component="h5"
                gutterBottom
                fontWeight={"bold"}
              >
                {type === "docents"
                  ? "Evidencias del Docente"
                  : "Evidencias de la Visita"}
              </Typography>
            </Box>
          </Grid>

          <SelectFormField
            name="type"
            label="Tipo de evidencia"
            catalog={allEvidences[type]}
            menuItemValue="name"
            optionValue="name"
            value={newEvidence.type}
            onChange={handleInputChange}
            xs={12}
            sm={12}
            md={4}
            lg={4}
            disabled={data.length >= maxEvidences}
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
            disabled={data.length >= maxEvidences}
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
              <ButtonForm
                context={"saved"}
                handler={handleAddEvidence}
                disabled={data.length >= maxEvidences}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {data && data.length > 0 ? (
            data.map((evidence, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <ResultCard
                  option={evidence.type}
                  link={evidence.link}
                  icon={getEvidenceIcon(evidence.type)}
                  onDelete={() => handleDeleteEvidence(index)}
                />
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
                  <AlertComponent
                    type={"info"}
                    message={
                      type === "docents"
                        ? "Agrega las evidencias del docente"
                        : "Agrega las evidencias de la visita"
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

Evidences.propTypes = {
  type: PropTypes.oneOf(["visit", "docents"]).isRequired,
  maxEvidences: PropTypes.number.isRequired,
  currentDocent: PropTypes.object,
};

export default Evidences;
