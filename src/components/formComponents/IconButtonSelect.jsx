import React, { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Radio,
  Avatar,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { stringAvatar } from "../../utils/helpers";
import AlertComponent from "./layout/Alerts";

const IconButtonMenu = ({
  row,
  advisors,
  handleCheck,
  disabled,
  titleTooltip,
  iconOne,
}) => {
  const { values, setFieldValue } = useFormikContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState(null);

  const { advisors: advisorsShared } = useSelector(
    (state) => state.advisorsShared
  );

  useEffect(() => {
    if (advisorsShared.length === 0) return;

    const currentDocent = values.tableDocents.find(
      (docent) => docent.id === row.id
    );
    if (currentDocent && currentDocent.advisorAttend) {
      setSelectedAdvisor(currentDocent.advisorAttend);
    } else {
      setSelectedAdvisor(null);
    }
  }, [row.id, values.tableDocents, advisorsShared]);

  const isRowChecked = handleCheck();
  const iconColor = isRowChecked ? "#2e8b57" : "#0d1f2d";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (id) => {
    setSelectedAdvisor(id);
    setAnchorEl(null);
  };

  useEffect(() => {
    if (advisorsShared.length === 0) return;

    const currentDocent = values.tableDocents.find(
      (docent) => docent.id === row.id
    );

    if (currentDocent) {
      const isAdvisorAttendPresent = currentDocent.advisorAttend !== undefined;

      if (
        selectedAdvisor !== null &&
        currentDocent.advisorAttend !== selectedAdvisor
      ) {
        const updatedTableDocents = values.tableDocents.map((docent) =>
          docent.id === row.id
            ? { ...docent, advisorAttend: selectedAdvisor }
            : docent
        );
        setFieldValue("tableDocents", updatedTableDocents);
      } else if (selectedAdvisor === null && isAdvisorAttendPresent) {
        const updatedTableDocents = values.tableDocents.map((docent) =>
          docent.id === row.id
            ? { ...docent, advisorAttend: undefined }
            : docent
        );
        setFieldValue("tableDocents", updatedTableDocents);
      }
    } else {
      setSelectedAdvisor(null);
    }
  }, [
    selectedAdvisor,
    row.id,
    // values.tableDocents,
    // setFieldValue,
    advisorsShared,
  ]);

  const open = Boolean(anchorEl);

  return (
    <div>
      <Tooltip title={titleTooltip}>
        <span>
          <IconButton
            onClick={handleClick}
            disabled={disabled}
            sx={{
              color: disabled ? "#c0c0c0" : iconColor,
              fill: disabled ? "#c0c0c0" : iconColor,
            }}
          >
            {iconOne}
          </IconButton>
        </span>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {advisors.length > 0 ? (
          advisors.map((advisor) => (
            <MenuItem
              key={advisor.id_advisor}
              onClick={() => handleSelect(advisor.id_advisor)}
            >
              <Radio
                checked={selectedAdvisor === advisor.id_advisor}
                onChange={() => handleSelect(advisor.id_advisor)}
              />
              <ListItemAvatar>
                <Avatar {...stringAvatar(advisor.name)} />
              </ListItemAvatar>
              <ListItemText primary={advisor.name} />
            </MenuItem>
          ))
        ) : (
          <AlertComponent type={"info"} message={"Agrega a otro asesor"} />
        )}
      </Menu>
    </div>
  );
};

IconButtonMenu.propTypes = {
  row: PropTypes.object.isRequired,
  advisors: PropTypes.array.isRequired,
  handleCheck: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  iconOne: PropTypes.node.isRequired,
  titleTooltip: PropTypes.string.isRequired,
};

export default IconButtonMenu;
