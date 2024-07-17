import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import CardsForms from "../../components/Cards";
import FormVisit from "./components/FormVisit";
import formSubmitHandler from "../../utils/FormSubmitHandler";
import FormikInitializer from "../../components/FormInitializer";
import { initialValuesForm } from "../../utils/Variables";

// Función para obtener el esquema de validación base
const getBaseValidationSchema = () => {
  return Yup.object().shape({
    idAdvisor: Yup.string().required("Requerido"),
    idArea: Yup.string().required("Requerido"),
    date: Yup.date()
      .max(
        new Date(),
        "La fecha de la visita no puede ser mayor a la fecha de hoy"
      )
      .required("La fecha de la visita es obligatoria"),
    entryTime: Yup.string()
      .required("La hora de entrada es obligatoria")
      .test(
        "is-less-than-departureTime",
        "La hora de entrada debe ser menor que la hora de salida",
        function (value) {
          const { departureTime } = this.parent;
          return departureTime ? value < departureTime : true;
        }
      ),
    departureTime: Yup.string()
      .required("La hora de salida es obligatoria")
      .test(
        "is-greater-than-entryTime",
        "La hora de salida debe ser mayor que la hora de entrada",
        function (value) {
          const { entryTime } = this.parent;
          return entryTime ? value > entryTime : true;
        }
      ),
    idLocation: Yup.array()
      .min(1, "Debe agregar al menos una escuela")
      .required("Requerido"),
    modality: Yup.string().required("Requerido"),
    register: Yup.string().required("Requerido"),
    typeOfRegister: Yup.string().required("Requerido"),
    programType: Yup.string().required("Requerido"),
    evidencesVisit: Yup.array()
      .min(1, "Debe agregar al menos una evidencia")
      .required("Requerido"),
  });
};

// Función para obtener el esquema de validación para tableDocents
const getTableDocentsValidationSchema = (typeOfRegister) => {
  if (typeOfRegister === "Acompañamiento tecnológico") {
    return Yup.array().notRequired();
  } else if (typeOfRegister === "Acompañamiento pedagógico") {
    return Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.number().required(),
          Escuela: Yup.string().required(),
          Nombre: Yup.string().required(),
          Grado: Yup.string().required(),
          Sección: Yup.string().required(),
          results: Yup.array()
            .of(
              Yup.object().shape({
                option: Yup.string().required(),
                description: Yup.string().required(),
              })
            )
            .length(4, "Debe tener exactamente 4 resultados")
            .required(),
          indicators: Yup.array()
            .of(
              Yup.object().shape({
                id: Yup.number().required(),
                indicator: Yup.string().required(),
                description: Yup.string().required(),
                status: Yup.string().required(),
              })
            )
            .length(7, "Debe tener exactamente 7 indicadores")
            .required(),
          strategy: Yup.array()
            .of(
              Yup.object().shape({
                strategy: Yup.string().required(),
                category_sarm: Yup.string().required(),
              })
            )
            .min(1, "Debe tener al menos una estrategia")
            .required(),
          evidences: Yup.array()
            .of(
              Yup.object().shape({
                type: Yup.string().required(),
                link: Yup.string().url().required(),
              })
            )
            .min(3, "Debe tener al menos una evidencia")
            .required(),
        })
      )
      .min(1, "Debe agregar al menos un docente")
      .required("Requerido");
  } else if (typeOfRegister === "Taller de formación") {
    return Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.number().required(),
          Escuela: Yup.string().required(),
          Nombre: Yup.string().required(),
          Grado: Yup.string().required(),
          Sección: Yup.string().required(),
          saber: Yup.array()
            .min(
              1,
              "Debe de completar los saberes con exactamente 4 indicadores"
            )
            .required(),
          saberHacer: Yup.array()
            .min(
              1,
              "Debe de completar los saberes hacer con exactamente 4 indicadores"
            )
            .required(),
          saberSer: Yup.array()
            .min(
              1,
              "Debe de completar los saberes ser con exactamente 1 indicador"
            )
            .required(),
        })
      )
      .min(1, "Debe agregar al menos un docente")
      .required("Requerido");
  }
};

// Función para obtener el esquema de validación para objectives
const getObjectivesValidationSchema = () => {
  return Yup.array()
    .of(
      Yup.object().shape({
        description: Yup.string().required(),
        option: Yup.string().required(),
      })
    )
    .min(1, "Debe agregar al menos un objetivo");
};

const getValidationSchemaVisit = (typeOfRegister) => {
  return Yup.object().shape({
    ...getBaseValidationSchema().fields,
    tableDocents: getTableDocentsValidationSchema(typeOfRegister),
    objectives: getObjectivesValidationSchema(),
  });
};

const DynamicValidation = () => {
  const { values, validateForm } = useFormikContext();

  useEffect(() => {
    validateForm();
  }, [values.typeOfRegister, validateForm]);

  return null;
};

function AddVisits() {
  const [submitStatus, setSubmitStatus] = useState("idle");

  return (
    <Formik
      initialValues={initialValuesForm}
      validationSchema={Yup.lazy((values) =>
        getValidationSchemaVisit(values.typeOfRegister)
      )}
      onSubmit={(values, actions) => {
        setSubmitStatus("submitting");
        formSubmitHandler(values, actions, setSubmitStatus);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <DynamicValidation />
          <FormikInitializer>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CardsForms
                  title="Planificación de Visitas"
                  formComponent={
                    <FormVisit
                      isSubmitting={isSubmitting}
                      submitStatus={submitStatus}
                    />
                  }
                  hcolor={"#1d2e3d"}
                />
              </Grid>
            </Grid>
          </FormikInitializer>
          {console.log(values)}
        </Form>
      )}
    </Formik>
  );
}

export default AddVisits;
