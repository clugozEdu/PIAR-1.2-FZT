import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import CardsForms from "../../components/layout/Cards";
import FormPlanning from "./components/FormPlanning";
import formSubmitHandler from "../../utils/FormSubmitHandler";
import FormikInitializer from "../../components/formComponents/FormInitializer";
import { initialValuesForm } from "../../utils/Variables";

const getValidationSchema = (typeOfRegister) => {
  return Yup.object({
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
    idSchool: Yup.array()
      .min(1, "Debe agregar al menos una escuela")
      .required("Required"),
    modality: Yup.string().required("Requerido"),
    register: Yup.string().required("Requerido"),
    typeOfRegister: Yup.string().required("Requerido"),
    programType: Yup.string().required("Requerido"),
    tableDocents:
      typeOfRegister === "Acompañamiento tecnológico"
        ? Yup.array().notRequired()
        : Yup.array()
            .min(1, "Debe agregar al menos un docente")
            .required("Debe agregar al menos un docente"),
    objectives: Yup.array()
      .of(
        Yup.object().shape({
          description: Yup.string().required(),
          option: Yup.string().required(),
        })
      )
      .test(
        "is-empty",
        "Debe agregar al menos un objetivo",
        (value) => value && value.length > 0
      ),
  });
};

const DynamicValidation = () => {
  const { values, validateForm } = useFormikContext();

  useEffect(() => {
    validateForm();
  }, [values.typeOfRegister, validateForm]);

  return null;
};

function AddPlanning() {
  const [submitStatus, setSubmitStatus] = useState("idle");

  return (
    <Formik
      initialValues={initialValuesForm}
      validationSchema={Yup.lazy((values) =>
        getValidationSchema(values.typeOfRegister)
      )}
      onSubmit={(values, actions) =>
        formSubmitHandler(values, actions, setSubmitStatus)
      }
    >
      {({ values, errors, isSubmitting }) => (
        <Form>
          <DynamicValidation />
          <FormikInitializer>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CardsForms
                  title="Planificación de Visitas"
                  formComponent={
                    <FormPlanning
                      isSubmitting={isSubmitting}
                      submitStatus={submitStatus}
                    />
                  }
                  hcolor={"#1d2e3d"}
                />
              </Grid>
            </Grid>
          </FormikInitializer>
          <pre>{JSON.stringify(values, null, 2)}</pre>
          <pre>{JSON.stringify(errors, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  );
}

export default AddPlanning;
