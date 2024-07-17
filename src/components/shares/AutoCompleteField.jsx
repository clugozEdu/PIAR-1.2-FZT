import React from "react";
import PropTypes from "prop-types";
import { Grid, TextField, Autocomplete, CircularProgress } from "@mui/material";
import { useField, useFormikContext } from "formik";

const AutoCompleteFormField = ({
  name,
  label,
  options,
  getOptionLabel,
  getOptionSelectedValue,
  xs = 12,
  sm = 12,
  md = 6,
  lg = 3,
  limitTags = 3,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const loading = options.length === 0;

  const handleChange = (event, newValue) => {
    setFieldValue(
      name,
      newValue.map((option) => getOptionSelectedValue(option))
    );
  };

  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg}>
      <Autocomplete
        multiple
        limitTags={limitTags}
        {...props}
        options={options}
        getOptionLabel={getOptionLabel}
        value={options.filter((option) =>
          (field.value || []).includes(getOptionSelectedValue(option))
        )}
        onChange={handleChange}
        disableCloseOnSelect
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: "20px",
              },
            }}
          />
        )}
      />
    </Grid>
  );
};

AutoCompleteFormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  getOptionLabel: PropTypes.func.isRequired,
  getOptionSelectedValue: PropTypes.func.isRequired,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  limitTags: PropTypes.number,
};

export default AutoCompleteFormField;
