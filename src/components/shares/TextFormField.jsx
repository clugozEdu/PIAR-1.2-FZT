import React from "react";
import PropTypes from "prop-types";
import { TextField, Grid } from "@mui/material";
import { useField } from "formik";

const TextFormField = ({ xs = 12, sm = 12, md = 6, lg = 3, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <TextField
        fullWidth
        helperText={meta.touched && meta.error}
        error={!!(meta.touched && meta.error)}
        {...field}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "20px",
          },
        }}
        {...props}
      />
    </Grid>
  );
};

TextFormField.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

export default TextFormField;
