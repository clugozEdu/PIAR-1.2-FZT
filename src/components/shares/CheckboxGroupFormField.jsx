import { useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { useField } from "formik";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";

const propTypes = {
  catalog: PropTypes.array.isRequired,
  menuValue: PropTypes.string.isRequired,
  optionValue: PropTypes.string.isRequired,
  fatherValue: PropTypes.string,
  values: PropTypes.array,
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
};

function CheckboxGroupFormField({
  catalog,
  optionValue,
  menuValue,
  fatherValue,
  xs = 12,
  sm = 12,
  md = 6,
  lg = 3,
  values = [],
  ...props
}) {
  const [field, meta, helpers] = useField(props);

  useEffect(() => {
    if (
      !values?.every((item) =>
        catalog.some((item2) => item2[menuValue] === item.description)
      )
    ) {
      helpers.setValue([]);
    }
  }, [fatherValue, catalog, menuValue, values, helpers]);

  const handleCheckboxChange = (event, value) => {
    const isChecked = event.target.checked;
    let updatedValues;
    if (isChecked) {
      updatedValues = [
        ...values,
        {
          description: value[menuValue],
          option: value[optionValue],
        },
      ];
    } else {
      updatedValues = values.filter(
        (item) => item.description !== value[menuValue]
      );
    }
    helpers.setValue(updatedValues);
  };

  return (
    <Grid sx={{ mt: "inherit" }} item xs={xs} sm={sm} md={md} lg={lg}>
      <FormControl
        required
        error={!!(meta.touched && meta.error)}
        component="fieldset"
        variant="standard"
      >
        <FormGroup>
          {catalog.map((value) => (
            <FormControlLabel
              key={value[menuValue]}
              control={
                <Checkbox
                  checked={values.some(
                    (item) => item.description === value[menuValue]
                  )}
                  onChange={(e) => handleCheckboxChange(e, value)}
                  sx={{
                    color: "#0D1F2D",
                    "&.Mui-checked": {
                      color: "#4a9d9c",
                    },
                  }}
                />
              }
              label={<Typography variant="h7">{value[menuValue]}</Typography>}
            />
          ))}
        </FormGroup>
        {meta.touched && meta.error && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}

CheckboxGroupFormField.propTypes = propTypes;

export default CheckboxGroupFormField;
