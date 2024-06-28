import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import { useField } from "formik";
import PropTypes from "prop-types";

const propTypes = {
  label: PropTypes.string.isRequired,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

function CheckboxFormField({
  label,
  xs = 12,
  sm = 12,
  md = 6,
  lg = 3,
  ...props
}) {
  const [field, meta] = useField(props);
  // console.log('CheckboxFormField', field, meta)

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              {...field}
              {...props}
              value={field.value}
              defaultChecked
            />
          }
          label={label}
        />
      </FormGroup>
      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </Grid>
  );
}

CheckboxFormField.propTypes = propTypes;

export default CheckboxFormField;
