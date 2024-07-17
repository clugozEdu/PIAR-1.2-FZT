import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import {
  Card,
  CardContent,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
  Typography,
  Grid,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SectionDocents from "../../../components/formComponents/docents/DocentsSection";
import SectionObjectives from "../../../components/formComponents/generals/Objectives";
import GeneralsSection from "../../../components/formComponents/generals/GeneralsSection";
import SchoolSection from "../../../components/formComponents/schools/SchoolsSection";
import { getErrorMessages } from "../../../utils/helpers";
import { typeIntervention } from "../../../utils/Variables";

// array to map index step for error
const stepErrorFields = [
  ["date", "modality", "programType", "register", "entryTime", "departureTime"],
  ["objectives"],
  ["tableDocents"],
];

const FormPlanning = ({ isSubmitting, submitStatus }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { errors, touched, handleSubmit, setFieldValue, resetForm } =
    useFormikContext();
  const { isLoading: isLoadingSchools } = useSelector(
    (state) => state.schoolData
  );

  const location = useLocation();

  useEffect(() => {
    setActiveStep(0);
    resetForm();

    // get typeRegister
    const dataIntervention = typeIntervention.filter(
      (type) => type.keyPath === location.pathname
    );

    if (dataIntervention.length > 0) {
      setFieldValue("register", dataIntervention[0].typeRegister);
      setFieldValue("typeOfRegister", dataIntervention[0].name);
    }
  }, [location, setFieldValue]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const errorMessages = getErrorMessages(errors, touched);
  console.log(errorMessages);
  const steps = ["Datos de la visita", "Objetivos o Própositos", "Docentes"];

  // reset steps
  useEffect(() => {
    setActiveStep(0);
  }, [submitStatus]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ minWidth: "200px" }}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            "& .MuiStepIcon-root": {
              color: "#0D1F2D",
              "&.Mui-completed": {
                color: "#2e8b57",
              },
              "&.Mui-active": {
                color: "#4a9d9c",
              },
              "&.Mui-error": {
                color: "#b22a2a",
              },
            },
            "& .MuiStepLabel-iconContainer": {
              color: "#4a9d9c",
            },
          }}
        >
          {steps.map((label, index) => {
            const isStepValid = stepErrorFields[index].every(
              (key) => !touched[key] || !errors[key]
            );

            return (
              <Step key={label}>
                <StepLabel error={!isStepValid}>
                  <Box display="flex" justifyContent="flex-start">
                    <Typography fontWeight={"bold"} color={"#1d2e3d"}>
                      {label}
                    </Typography>
                    {index === 0 && isLoadingSchools ? (
                      <CircularProgress size={20} sx={{ ml: 1 }} />
                    ) : null}
                  </Box>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box sx={{ flexGrow: 1, p: 3, paddingTop: 0 }}>
        <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <GeneralsSection />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <SchoolSection titleCard={"Escuela a planificar"} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <SectionObjectives />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <SectionDocents />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            type="button"
            sx={{
              backgroundColor: "#0D6E6E",
              "&:hover": {
                backgroundColor: "#4a9d9c",
              },
            }}
          >
            <Typography fontWeight={"bold"} color={"#ffffff"}>
              Atrás
            </Typography>
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep === steps.length - 1 ? (
            <Button
              type="button"
              variant="contained"
              disabled={isSubmitting}
              onClick={() => {
                handleSubmit();
              }}
              startIcon={
                isSubmitting ? <CircularProgress size={24} /> : <SaveIcon />
              }
              sx={{
                backgroundColor: "#0D6E6E",
                "&:hover": {
                  backgroundColor: "#4a9d9c",
                },
              }}
            >
              {isSubmitting ? "Guardando..." : "Guardar Planificación"}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              type="button"
              sx={{
                backgroundColor: "#0D6E6E",
                "&:hover": {
                  backgroundColor: "#4a9d9c",
                },
              }}
            >
              <Typography fontWeight={"bold"} color={"#ffffff"}>
                Siguiente
              </Typography>
            </Button>
          )}
        </Box>
        {Object.keys(errorMessages).length > 0 && (
          <Alert
            sx={{
              marginTop: 3,
              borderRadius: 5,
            }}
            severity="error"
          >
            <AlertTitle>Formulario contiene los siguientes errores:</AlertTitle>
            <ul>
              {Object.keys(errorMessages).map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </Alert>
        )}
      </Box>
    </Box>
  );
};

FormPlanning.propTypes = {
  isSubmitting: PropTypes.bool,
  submitStatus: PropTypes.string,
};

export default FormPlanning;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import {
  Card,
  CardContent,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
  Alert,
  AlertTitle,
  Typography,
  Grid,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import SectionDocents from "../../../components/formComponents/docents/DocentsSection";
import SectionObjectives from "../../../components/formComponents/generals/Objectives";
import GeneralsSection from "../../../components/formComponents/generals/GeneralsSection";
import SchoolSection from "../../../components/formComponents/schools/SchoolsSection";
import { getErrorMessages } from "../../../utils/helpers";
import { typeIntervention } from "../../../utils/Variables";

// array to map index step for error
const stepErrorFields = [
  ["date", "modality", "programType", "register", "entryTime", "departureTime"],
  ["objectives"],
  ["tableDocents"],
];

const FormPlanning = ({ isSubmitting, submitStatus }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { errors, touched, handleSubmit, setFieldValue, resetForm } =
    useFormikContext();
  const { isLoading: isLoadingSchools } = useSelector(
    (state) => state.schoolData
  );

  const location = useLocation();

  useEffect(() => {
    setActiveStep(0);
    resetForm();

    // get typeRegister
    const dataIntervention = typeIntervention.filter(
      (type) => type.keyPath === location.pathname
    );

    if (dataIntervention.length > 0) {
      setFieldValue("register", dataIntervention[0].typeRegister);
      setFieldValue("typeOfRegister", dataIntervention[0].name);
    }
  }, [location, setFieldValue]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const errorMessages = getErrorMessages(errors, touched);
  console.log(errorMessages);
  const steps = ["Datos de la visita", "Objetivos o Própositos", "Docentes"];

  // reset steps
  useEffect(() => {
    setActiveStep(0);
  }, [submitStatus]);

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ minWidth: "200px" }}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            "& .MuiStepIcon-root": {
              color: "#0D1F2D",
              "&.Mui-completed": {
                color: "#2e8b57",
              },
              "&.Mui-active": {
                color: "#4a9d9c",
              },
              "&.Mui-error": {
                color: "#b22a2a",
              },
            },
            "& .MuiStepLabel-iconContainer": {
              color: "#4a9d9c",
            },
          }}
        >
          {steps.map((label, index) => {
            const isStepValid = stepErrorFields[index].every(
              (key) => !touched[key] || !errors[key]
            );

            return (
              <Step key={label}>
                <StepLabel error={!isStepValid}>
                  <Box display="flex" justifyContent="flex-start">
                    <Typography fontWeight={"bold"} color={"#1d2e3d"}>
                      {label}
                    </Typography>
                    {index === 0 && isLoadingSchools ? (
                      <CircularProgress size={20} sx={{ ml: 1 }} />
                    ) : null}
                  </Box>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box sx={{ flexGrow: 1, p: 3, paddingTop: 0 }}>
        <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <SchoolSection titleCard={"Escuela a planificar"} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <GeneralsSection />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <SectionObjectives />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <SectionDocents />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            type="button"
            sx={{
              backgroundColor: "#0D6E6E",
              "&:hover": {
                backgroundColor: "#4a9d9c",
              },
            }}
          >
            <Typography fontWeight={"bold"} color={"#ffffff"}>
              Atrás
            </Typography>
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep === steps.length - 1 ? (
            <Button
              type="button"
              variant="contained"
              disabled={isSubmitting}
              onClick={() => {
                handleSubmit();
              }}
              startIcon={
                isSubmitting ? <CircularProgress size={24} /> : <SaveIcon />
              }
              sx={{
                backgroundColor: "#0D6E6E",
                "&:hover": {
                  backgroundColor: "#4a9d9c",
                },
              }}
            >
              {isSubmitting ? "Guardando..." : "Guardar Planificación"}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              type="button"
              sx={{
                backgroundColor: "#0D6E6E",
                "&:hover": {
                  backgroundColor: "#4a9d9c",
                },
              }}
            >
              <Typography fontWeight={"bold"} color={"#ffffff"}>
                Siguiente
              </Typography>
            </Button>
          )}
        </Box>
        {Object.keys(errorMessages).length > 0 && (
          <Alert
            sx={{
              marginTop: 3,
              borderRadius: 5,
            }}
            severity="error"
          >
            <AlertTitle>Formulario contiene los siguientes errores:</AlertTitle>
            <ul>
              {Object.keys(errorMessages).map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
          </Alert>
        )}
      </Box>
    </Box>
  );
};

FormPlanning.propTypes = {
  isSubmitting: PropTypes.bool,
  submitStatus: PropTypes.string,
};

export default FormPlanning;
