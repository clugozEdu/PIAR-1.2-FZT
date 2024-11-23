import React from "react";
import PropTypes from "prop-types";
import { BarChart } from "@mui/x-charts";

const BarChartComponent = ({ data }) => {
  if (!data || data.length === 0) {
    return <h1>No hay datos disponibles</h1>;
  }

  const xLabels = data.map((item) => item.label);
  const seriesData = data.map((item) => item.data);

  return (
    <BarChart
      borderRadius={10}
      width={650} // Incrementa el ancho del gráfico
      height={400} // Incrementa la altura del gráfico
      series={[{ data: seriesData }]}
      yAxis={[
        {
          data: xLabels,
          scaleType: "band",
          tickPadding: 1, // Ajusta el espaciado entre las etiquetas y las barras
          tickSize: 0,
          tickFormat: (label) =>
            label.length > 10 ? label.slice(0, 10) + "..." : label, // Trunca etiquetas largas
        },
      ]}
      layout="horizontal"
      margin={{ left: 100, right: 100 }} // Añade margen izquierdo para etiquetas más largas
    />
  );
};

BarChartComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      data: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BarChartComponent;
