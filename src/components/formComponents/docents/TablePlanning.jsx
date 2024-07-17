import React, { useState } from "react";
import { useFormikContext } from "formik";
import {
  Alert,
  AlertTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PropTypes from "prop-types";

const propTypes = {
  data: PropTypes.array.isRequired,
};

function DocentsTablePlanning({ data }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const { values, setFieldValue } = useFormikContext();

  // select for planning add or quit
  const handleToggleDocent = (docent, isAdding) => {
    const newDocents = isAdding
      ? [...values.tableDocents, [docent.id, docent.Nombre, docent.Grado]]
      : values.tableDocents.filter((d) => d[0] !== docent.id);
    setFieldValue("tableDocents", newDocents);
  };

  const handleToggle = (row) => {
    const isSelected = selectedRows.includes(row.id);
    const newSelectedRows = isSelected
      ? selectedRows.filter((id) => id !== row.id)
      : [...selectedRows, row.id];

    setSelectedRows(newSelectedRows);
    handleToggleDocent(row, !isSelected);
  };

  return (
    <TableContainer component={Paper}>
      {values.typeOfRegister !== "Acompañamiento tecnológico" ? (
        data.length > 0 && (
          <Table size="small" style={{ width: "100%" }}>
            <TableHead sx={{ backgroundColor: "#354656" }}>
              <TableRow>
                {/* Encabezados generados por el objeto */}
                {Object.keys(data[0]).map((key, index) => (
                  <TableCell key={index}>
                    <Typography variant="h7" color="white">
                      {key}
                    </Typography>
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, idx) => (
                    <TableCell key={idx}>{value}</TableCell>
                  ))}
                  <TableCell>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={
                          selectedRows.includes(row.id) ? (
                            <RemoveIcon />
                          ) : (
                            <AddIcon />
                          )
                        }
                        sx={{
                          backgroundColor: selectedRows.includes(row.id)
                            ? "#FF3D3D"
                            : "#4a9d9c",
                          "&:hover": {
                            backgroundColor: selectedRows.includes(row.id)
                              ? "#b22a2a"
                              : "#0D6E6E",
                          },
                          color: "white",
                        }}
                        onClick={() => handleToggle(row)}
                      >
                        {selectedRows.includes(row.id) ? "Quitar" : "Agregar"}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      ) : (
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          Acompañamiento tecnológico sin docentes.
        </Alert>
      )}
    </TableContainer>
  );
}

DocentsTablePlanning.propTypes = propTypes;

export default DocentsTablePlanning;
