import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";

const ResultCard = ({
  option,
  description,
  description2,
  link,
  icon,
  onDelete,
}) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: "20px" }}>
      <CardHeader
        avatar={icon}
        action={
          onDelete && (
            <Tooltip title={"Eliminar"}>
              <IconButton edge="end" aria-label="delete" onClick={onDelete}>
                <DeleteIcon
                  sx={{
                    fill: "white",
                    mr: "10px",
                  }}
                />
              </IconButton>
            </Tooltip>
          )
        }
        title={
          <Typography variant="body1" color={"white"} fontWeight={"bold"}>
            {option}
          </Typography>
        }
        sx={{
          borderBottom: "1px solid #e0e0e0",
          background: "#1d2e3d",
          fill: "#FFFFFF",
        }}
      />
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {description && description2 ? (
            <Typography variant="body1" color="black">
              {description} | {description2}
            </Typography>
          ) : description ? (
            <Typography variant="body1" color="black">
              {description}
            </Typography>
          ) : null}
          {link && (
            <Typography color="textSecondary">
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

ResultCard.propTypes = {
  option: PropTypes.string.isRequired,
  description: PropTypes.string,
  description2: PropTypes.string,
  icon: PropTypes.node,
  onDelete: PropTypes.func,
  link: PropTypes.string,
};

export default ResultCard;
