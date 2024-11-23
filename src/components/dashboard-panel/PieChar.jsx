import React from "react";
import { PieChart } from "@mui/x-charts";
import PropTypes from "prop-types";

const PieChartComponent = ({ visits }) => {
  if (!visits || visits.length === 0) {
    return <h1>No hay datos disponibles</h1>;
  }

  return (
    <PieChart
      series={[
        {
          // arcLabel: (item) => `${item.label} (${item.value})`,
          paddingAngle: 2,
          innerRadius: 100,
          outerRadius: 180,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          data: visits,
          cx: 150,
          cy: 200,
        },
      ]}
      width={620}
      height={400}
      sx={{
        padding: 5,
      }}
    />
  );
};

PieChartComponent.propTypes = {
  visits: PropTypes.array.isRequired,
};

export default PieChartComponent;
