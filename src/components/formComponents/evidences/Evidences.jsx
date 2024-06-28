import React, { useState } from "react";
import { useFormikContext } from "formik";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import {
  PhotoIcon,
  VideoIcon,
  TestimonyIcon,
} from "../../../assets/icons/ListIcons";
import DeleteIcon from "@mui/icons-material/Delete";
import SelectFormField from "../../shares/SelectFormField";
import TextFormField from "../../shares/TextFormField";

const evidencesVisit = [
  {
    id: 1,
    name: "Foto",
    typeEvidences: "Visit",
    icon: <PhotoIcon />,
  },
  {
    id: 2,
    name: "Videos",
    typeEvidences: "Visit",
    icon: <VideoIcon />,
  },
  {
    id: 3,
    name: "Testimonios",
    typeEvidences: "Visit",
    icon: <TestimonyIcon />,
  },
];

const Evidence = () => {
  const { values, setFieldValue } = useFormikContext();
  const [newEvidence, setNewEvidence] = useState({ type: "", link: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvidence((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvidence = () => {
    if (newEvidence.type && newEvidence.link) {
      const updatedEvidenceList = [...values.evidencesVisit, newEvidence];
      setFieldValue("evidencesVisit", updatedEvidenceList);
      setNewEvidence({ type: "", link: "" });
    }
  };

  const handleDeleteEvidence = (index) => {
    const updatedEvidenceList = values.evidencesVisit.filter(
      (_, i) => i !== index
    );
    setFieldValue("evidencesVisit", updatedEvidenceList);
  };

  const getEvidenceIcon = (type) => {
    const evidence = evidencesVisit.find((e) => e.name === type);
    return evidence ? evidence.icon : null;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" flexDirection={"column"}>
          <Typography
            variant="h5"
            component="h5"
            gutterBottom
            fontWeight={"bold"}
          >
            Evidencias de la Visita
          </Typography>
        </Box>
      </Grid>

      <SelectFormField
        name="type"
        label="Tipo de evidencia"
        catalog={evidencesVisit}
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

      {values.evidencesVisit.map((evidence, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: "20px",
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center">
                {getEvidenceIcon(evidence.type)}
                <Typography variant="h6" ml={1}>
                  {evidence.type}
                </Typography>
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
            <CardActions disableSpacing>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteEvidence(index)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Evidence;
