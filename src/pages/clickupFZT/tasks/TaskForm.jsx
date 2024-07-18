import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { TextField, Grid } from "@mui/material";
import FormikInitializer from "../../../components/FormInitializer";

const TaskForm = () => {
  const initialValues = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    hoursDedicated: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().trim().required("Titulo es requerido."),
    description: Yup.string().trim().required("Descripción es requerido."),
    startDate: Yup.date(),
    endDate: Yup.date().min(
      Yup.ref("startDate"),
      "La fecha fin debe ser posterior a la fecha inicio."
    ),
    hours_dedicated: Yup.number()
      .positive("Debe ser un número positivo.")
      .integer("Debe ser un número entero."),
  });

  const handleSubmit = (values, { resetForm }) => {
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <FormikInitializer>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Field
                  name="title"
                  as={TextField}
                  label="Titulo"
                  variant="outlined"
                  fullWidth
                  error={touched.title && !!errors.title}
                  helperText={<ErrorMessage name="title" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="description"
                  as={TextField}
                  label="Descripción"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  error={touched.description && !!errors.description}
                  helperText={<ErrorMessage name="description" />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  name="startDate"
                  as={TextField}
                  label="Fecha Inicio"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={touched.startDate && !!errors.startDate}
                  helperText={<ErrorMessage name="startDate" />}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Field
                  name="endDate"
                  as={TextField}
                  label="Fecha Fin"
                  type="date"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={touched.endDate && !!errors.endDate}
                  helperText={<ErrorMessage name="endDate" />}
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="hours_dedicated"
                  as={TextField}
                  label="Horas dedicadas"
                  type="number"
                  variant="outlined"
                  fullWidth
                  error={touched.hours_dedicated && !!errors.hours_dedicated}
                  helperText={<ErrorMessage name="hours_dedicated" />}
                />
              </Grid>
            </Grid>
          </FormikInitializer>
        </Form>
      )}
    </Formik>
  );
};
export default TaskForm;
