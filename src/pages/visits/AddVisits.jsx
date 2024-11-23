import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import CardsForms from "../../components/layout/Cards";
import FormVisit from "./components/FormVisit";
import formSubmitHandler from "../../utils/FormSubmitHandler";
import FormikInitializer from "../../components/formComponents/FormInitializer";
import { initialValuesForm } from "../../utils/Variables";

// Función para obtener el esquema de validación base
const getBaseValidationSchema = (sharedVisit) => {
  return Yup.object().shape({
    sharedVisit: Yup.bool(),
    idAdvisor: sharedVisit
      ? Yup.array()
          .min(
            2,
            "Debe seleccionar al menos dos asesores para compartir la visita."
          )
          .required(
            "Es necesario seleccionar los asesores para compartir la visita."
          )
      : Yup.array()
          .min(1, "Debe seleccionar al menos un asesor.")
          .required("Es necesario seleccionar un asesor para la visita."),
    idArea: Yup.string().required("El área es obligatoria."),
    date: Yup.date()
      .max(new Date(), "La fecha de la visita no puede ser en el futuro.")
      .required("La fecha de la visita es obligatoria."),
    entryTime: Yup.string()
      .required("La hora de entrada es obligatoria.")
      .test(
        "is-less-than-departureTime",
        "La hora de entrada debe ser menor que la hora de salida.",
        function (value) {
          const { departureTime } = this.parent;
          return departureTime ? value < departureTime : true;
        }
      ),
    departureTime: Yup.string()
      .required("La hora de salida es obligatoria.")
      .test(
        "is-greater-than-entryTime",
        "La hora de salida debe ser mayor que la hora de entrada.",
        function (value) {
          const { entryTime } = this.parent;
          return entryTime ? value > entryTime : true;
        }
      ),
    idSchool: Yup.array()
      .min(1, "Debe seleccionar al menos una escuela.")
      .required("Seleccionar una escuela es obligatorio."),
    modality: Yup.string().required("La modalidad es obligatoria."),
    register: Yup.string().required("El registro es obligatorio."),
    typeOfRegister: Yup.string().required(
      "El tipo de registro es obligatorio."
    ),
    programType: Yup.string().required("El tipo de programa es obligatorio."),
    evidencesVisit: Yup.array()
      .min(1, "Debe agregar al menos una evidencia de la visita.")
      .required("Es obligatorio agregar evidencias de la visita."),
  });
};

// Función para obtener el esquema de validación para tableDocents
const getTableDocentsValidationSchema = (typeOfRegister, sharedVisit) => {
  if (typeOfRegister === "Acompañamiento tecnológico") {
    return Yup.array().notRequired();
  } else if (typeOfRegister === "Acompañamiento pedagógico") {
    return Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.number().required("El ID del docente es obligatorio."),
          Nombre: Yup.string().required(
            "El nombre del docente es obligatorio."
          ),
          advisorAttend: sharedVisit
            ? Yup.number().required(
                "Debe seleccionar qué asesor atendió al docente."
              )
            : Yup.number().notRequired(),
          results: sharedVisit
            ? Yup.array().notRequired()
            : Yup.array()
                .of(
                  Yup.object().shape({
                    option: Yup.string().required("La opción es obligatoria."),
                    description: Yup.string().required(
                      "La descripción es obligatoria."
                    ),
                  })
                )
                .length(
                  4,
                  "Debe completar exactamente 4 resultados para cada docente."
                )
                .required("Debe agregar resultados para el docente."),
          indicators: sharedVisit
            ? Yup.array().notRequired()
            : Yup.array()
                .of(
                  Yup.object().shape({
                    id: Yup.number().required(
                      "El ID del indicador es obligatorio."
                    ),
                    indicator: Yup.string().required(
                      "El indicador es obligatorio."
                    ),
                    description: Yup.string().required(
                      "La descripción del indicador es obligatoria."
                    ),
                    status: Yup.string().required(
                      "El estado del indicador es obligatorio."
                    ),
                  })
                )
                .length(
                  7,
                  "Debe completar exactamente 7 indicadores para cada docente."
                )
                .required("Debe agregar indicadores para el docente."),
          strategy: sharedVisit
            ? Yup.array().notRequired()
            : Yup.array()
                .of(
                  Yup.object().shape({
                    strategy: Yup.string().required(
                      "La estrategia es obligatoria."
                    ),
                    category_sarm: Yup.string().required(
                      "La categoría SARM es obligatoria."
                    ),
                  })
                )
                .min(1, "Debe agregar al menos una estrategia para el docente.")
                .required("Debe agregar estrategias para el docente."),
          evidences: sharedVisit
            ? Yup.array().notRequired()
            : Yup.array()
                .of(
                  Yup.object().shape({
                    type: Yup.string().required(
                      "El tipo de evidencia es obligatorio."
                    ),
                    link: Yup.string()
                      .url("El enlace debe ser una URL válida.")
                      .required("El enlace de la evidencia es obligatorio."),
                  })
                )
                .min(3, "Debe agregar al menos 3 evidencias para el docente.")
                .required("Debe agregar evidencias para el docente."),
        })
      )
      .min(1, "Debe agregar al menos un docente.")
      .required("Es obligatorio agregar docentes.");
  } else if (typeOfRegister === "Taller de formación") {
    return Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.number().required("El ID del docente es obligatorio."),
          Nombre: Yup.string().required(
            "El nombre del docente es obligatorio."
          ),
          saber: Yup.array()
            .min(1, "Debe completar el saber del docente.")
            .required("Debe agregar saberes para el docente."),
          saberHacer: Yup.array()
            .min(
              1,
              "Debe completar los saberes hacer con exactamente 4 indicadores."
            )
            .required("Debe agregar saberes hacer para el docente."),
          saberSer: Yup.array()
            .min(
              1,
              "Debe completar los saberes ser con exactamente 1 indicador."
            )
            .required("Debe agregar saberes ser para el docente."),
        })
      )
      .min(1, "Debe agregar al menos un docente.")
      .required("Es obligatorio agregar docentes.");
  }
};

// Función para obtener el esquema de validación para objectives
const getObjectivesValidationSchema = () => {
  return Yup.array()
    .of(
      Yup.object().shape({
        description: Yup.string().required(
          "La descripción del objetivo es obligatoria."
        ),
        option: Yup.string().required("La opción del objetivo es obligatoria."),
      })
    )
    .min(1, "Debe agregar al menos un objetivo.")
    .required("Es obligatorio agregar objetivos.");
};

const getValidationSchemaVisit = (typeOfRegister, sharedVisit) => {
  return Yup.object().shape({
    ...getBaseValidationSchema(sharedVisit).fields,
    tableDocents: getTableDocentsValidationSchema(typeOfRegister, sharedVisit),
    objectives: getObjectivesValidationSchema(),
  });
};

const DynamicValidation = () => {
  const { values, validateForm } = useFormikContext();

  useEffect(() => {
    validateForm();
  }, [values.typeOfRegister, values.sharedVisit, validateForm]);

  return null;
};

function AddVisits() {
  const [submitStatus, setSubmitStatus] = useState("idle");

  return (
    <Formik
      initialValues={initialValuesForm}
      validationSchema={Yup.lazy((values) =>
        getValidationSchemaVisit(values.typeOfRegister, values.sharedVisit)
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
