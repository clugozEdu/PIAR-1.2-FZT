import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

const propTypes = {
  title: PropTypes.string.isRequired,
  formComponent: PropTypes.element.isRequired,
  hcolor: PropTypes.string,
  tColor: PropTypes.string,
};

const CardsForms = (props) => {
  return (
    <Card
      sx={{
        width: 1,
      }}
    >
      <CardHeader
        sx={{
          bgcolor: props.hcolor || "primary.main",
          // borderBottom: "1px solid grey.300",
        }}
        title={
          <Typography
            sx={{
              color: props.tColor || "white",
              textAlign: "center",
              fontWeight: "bold",
            }}
            variant="h6"
            component="div"
          >
            {props.title}
          </Typography>
        }
      />
      <CardContent>{props.formComponent}</CardContent>
    </Card>
  );
};

CardsForms.propTypes = propTypes;

export default CardsForms;
