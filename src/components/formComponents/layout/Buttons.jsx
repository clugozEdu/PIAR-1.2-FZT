import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";

const propTypes = {
  context: PropTypes.oneOf(["saved", "deleted"]).isRequired,
  handler: PropTypes.func,
};

const ButtonForm = ({ context, handler, ...props }) => {
  const [currentContext, setCurrentContext] = useState(context);

  const defaultColors = {
    saved: {
      color: "#2e8b57",
      hoverColor: "#1d5737",
      text: "Guardar",
      icon: <SaveIcon />,
    },
    deleted: {
      color: "#f44336",
      hoverColor: "#ba000d",
      text: "Eliminar",
      icon: <DeleteIcon />,
    },
  };

  useEffect(() => {
    setCurrentContext(context);
  }, [context]);

  const contextStyles = defaultColors[currentContext];

  return (
    <Button
      {...props}
      variant="contained"
      startIcon={contextStyles.icon}
      onClick={handler}
      sx={{
        backgroundColor: contextStyles.color,
        transition:
          "background-color 0.3s ease, transform 0.3s ease, color 0.3s ease",
        "&:hover": {
          backgroundColor: contextStyles.hoverColor,
          transform: "scale(1.025)",
        },
        color: "white",
      }}
    >
      {contextStyles.text}
    </Button>
  );
};

ButtonForm.propTypes = propTypes;

export default ButtonForm;
