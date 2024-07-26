import React from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@mui/material";

const IconButtonTable = ({
  row,
  handleCheck,
  onClick,
  disabled,
  titleTooltip,
  context,
  // iconSet,
  iconOne,
  ...props
}) => {
  const isRowChecked = handleCheck();
  const iconColor = isRowChecked ? "#2e8b57" : "#0d1f2d";
  const titleChange = isRowChecked ? "Editar" : "Agregar";

  const button = (
    <IconButton
      {...props}
      size="small"
      sx={{
        color: disabled ? "#c0c0c0" : iconColor,
        fill: disabled ? "#c0c0c0" : iconColor,
      }}
      onClick={() => onClick(row, context)}
      disabled={disabled}
    >
      {iconOne}
    </IconButton>
  );

  return (
    <Tooltip title={`${titleChange} ${titleTooltip}`}>
      {disabled ? <span>{button}</span> : button}
    </Tooltip>
  );
};

IconButtonTable.propTypes = {
  context: PropTypes.string,
  row: PropTypes.object.isRequired,
  handleCheck: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  // iconSet: PropTypes.node.isRequired,
  iconOne: PropTypes.node.isRequired,
  titleTooltip: PropTypes.string.isRequired,
};

export default IconButtonTable;
