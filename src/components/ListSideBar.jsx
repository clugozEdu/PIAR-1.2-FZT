import React, { useState } from "react";
import { List, Collapse, Divider } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string,
      icon: PropTypes.element, // Asegúrate de que sea un componente React válido
      children: PropTypes.array,
      area: PropTypes.string,
      pl: PropTypes.number,
    })
  ).isRequired,
  userArea: PropTypes.string,
  isAdmin: PropTypes.bool.isRequired,
};

function ListSideBar({ listData, userArea, isAdmin }) {
  const [open, setOpen] = useState({});
  const location = useLocation();

  const handleClick = (index) => {
    setOpen((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  // Filter recursive for area
  const filterByArea = (items) => {
    return items
      .filter((item) => isAdmin || !item.area || item.area === userArea)
      .map((item) => ({
        ...item,
        children: item.children ? filterByArea(item.children) : [],
      }));
  };

  const filteredData = filterByArea(listData);

  const isSelected = (path) => location.pathname === path;

  return (
    <List>
      {filteredData.map((listItem, index) => (
        <div key={index}>
          <ListItemButton
            onClick={() => handleClick(index)}
            component={listItem.path ? Link : undefined}
            to={listItem.path || ""}
            sx={{
              pl: listItem.pl,
              backgroundColor: isSelected(listItem.path)
                ? "#354656"
                : "inherit",
              "&.Mui-selected": {
                backgroundColor: "#354656",
                "&:hover": {
                  backgroundColor: "#4c657c",
                },
              },
              "&:hover": {
                backgroundColor: "#d3d3d3",
              },
              color: isSelected(listItem.path) ? "white" : "inherit",
            }}
            selected={isSelected(listItem.path)}
          >
            {listItem.icon && (
              <ListItemIcon
                sx={{
                  fill: isSelected(listItem.path) ? "white" : "inherit",
                }}
              >
                {listItem.icon}
              </ListItemIcon>
            )}
            <ListItemText primary={listItem.name} />
            {listItem.children.length > 0 &&
              (open[index] ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          {listItem.children.length > 0 && (
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <ListSideBar
                listData={listItem.children}
                userArea={userArea}
                isAdmin={isAdmin}
              />
            </Collapse>
          )}
          {index === 1 && <Divider />}
        </div>
      ))}
    </List>
  );
}

ListSideBar.propTypes = propTypes;

export default ListSideBar;
