import React from "react";
import {
  // SchoolSvg,
  CalendarSvg,
  WorkShopSvg,
  PedagogicSvg,
  TecnologycSvg,
  LocationSvg,
  EducationIcon,
} from "../assets/icons/ListIcons";

const navLinks = [
  {
    name: "Área Educativa",
    icon: <EducationIcon sx={{ fill: "#0d1f2d" }} />,
    pl: 3,
    area: "Área Educativa",
    children: [
      {
        name: "Planificación",
        icon: <CalendarSvg sx={{ fill: "#0d1f2d" }} />,
        // path: "/planning/
        pl: 4.5,
        area: "Área Educativa",
        children: [
          {
            name: "Acompañamiento Pedagógico",
            path: "/planning/pedagogic",
            icon: <PedagogicSvg sx={{ fill: "#0d1f2d" }} />,
            pl: 6.2,
          },
          {
            name: "Taller de Formación",
            path: "/planning/workshop",
            icon: <WorkShopSvg sx={{ fill: "#0d1f2d" }} />,
            pl: 6.2,
          },
        ],
      },
      {
        name: "Visitas",
        icon: <LocationSvg sx={{ fill: "#0d1f2d" }} />,
        // path: "/planning/visits",
        pl: 4.5,
        area: "Área Educativa",
        children: [
          {
            name: "Acompañamiento Pedagógico",
            path: "/visit/pedagogic",
            icon: <PedagogicSvg sx={{ fill: "#0d1f2d" }} />,
            pl: 6.2,
          },
          {
            name: "Taller de Formación",
            path: "/visit/workshop",
            icon: <WorkShopSvg sx={{ fill: "#0d1f2d" }} />,
            pl: 6.2,
          },
        ],
      },
    ],
  },
  {
    name: "Área de Tecnologia",
    icon: <TecnologycSvg sx={{ fill: "#0d1f2d" }} />,
    // path: "/techonology/
    pl: 3,
    area: "Área de Tecnología",
    children: [
      {
        name: "Planificación",
        icon: <CalendarSvg sx={{ fill: "#0d1f2d" }} />,
        // path: "/planning/
        pl: 4.5,
        area: "Área de Tecnología",
        children: [
          {
            name: "Acompañamiento Tecnologíco",
            path: "/planning/technology",
            icon: <PedagogicSvg sx={{ fill: "#0d1f2d" }} />,
            pl: 6.2,
          },
        ],
      },
    ],
  },
];

export default navLinks;
