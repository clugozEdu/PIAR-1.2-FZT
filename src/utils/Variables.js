// areas
export const areas = [
  { id: 1, name: "Área Educativa" },
  { id: 2, name: "Área de Tecnología" },
];

// type program select options
export const typeProgram = [
  {
    id: 1,
    name: "PEUCPN",
  },
  {
    id: 2,
    name: "Hub Edutech",
  },
  {
    id: 3,
    name: "SUMMA",
  },
];

// type intervention program
export const typeIntervention = [
  {
    id_area: 1,
    id: 1,
    keyPath: "/planning/pedagogic",
    name: "Acompañamiento pedagógico",
    typeRegister: "Planning",
  },
  {
    id_area: 1,
    id: 2,
    keyPath: "/planning/workshop",
    name: "Taller de formación",
    typeRegister: "Planning",
  },
  // { id_area: 1, id: 3, name: "Cursos" },
  {
    id_area: 2,
    id: 4,
    keyPath: "/planning/technology",
    name: "Acompañamiento tecnológico",
    typeRegister: "Planning",
  },
  {
    id_area: 1,
    id: 1,
    keyPath: "/visit/pedagogic",
    name: "Acompañamiento pedagógico",
    typeRegister: "Visit",
  },
  {
    id_area: 1,
    id: 2,
    keyPath: "/visit/workshop",
    name: "Taller de formación",
    typeRegister: "Visit",
  },
];

// type modality visit
export const modalityVisit = [
  {
    id: 1,
    name: "Presencial",
  },
  {
    id: 2,
    name: "Remota",
  },
];

//  objectives
export const optionsObjectives = [
  {
    id_intervention: "Acompañamiento pedagógico",
    id: 1,
    name: "Fortalecer las competencias de fluidez digital de los docentes",
    option: "Propósito del acompañamiento pedagógico",
  },
  {
    id_intervention: "Acompañamiento pedagógico",
    id: 2,
    name: "Impulsar la integración y uso diario de tecnología mediante la elaboración de planes didácticos",
    option: "Propósito del acompañamiento pedagógico",
  },
  {
    id_intervention: "Acompañamiento pedagógico",
    id: 3,
    name: "Brindar asesoría personalizada para la integración de tecnología en el aprendizaje",
    option: "Propósito del acompañamiento pedagógico",
  },
  {
    id_intervention: "Acompañamiento pedagógico",
    id: 4,
    name: "Brindar asesoría grupal para la integración de tecnología en el aprendizaje",
    option: "Propósito del acompañamiento pedagógico",
  },
  {
    id_intervention: "Acompañamiento pedagógico",
    id: 5,
    name: "Promover la implementación de estrategias de lectoescritura integrando tecnología",
    option: "Propósito del acompañamiento pedagógico",
  },
  {
    id_intervention: "Acompañamiento pedagógico",
    id: 6,
    name: "Promover la implementación de estrategias matemáticas integrando tecnología",
    option: "Propósito del acompañamiento pedagógico",
  },
  {
    id_intervention: "Acompañamiento pedagógico",
    id: 7,
    name: "Promover la creación de cuentos infantiles con enfoque en el fomento de valores",
    option: "Propósito del acompañamiento pedagógico",
  },
  {
    id_intervention: "Acompañamiento pedagógico",
    id: 8,
    name: "Brindar acompañamiento a la gestión directiva",
    option: "Propósito del acompañamiento pedagógico",
  },
  {
    id_intervention: "Acompañamiento pedagógico",
    id: 9,
    name: "Promover una cultura de evaluación permanente, mediante la aplicación de las PPL",
    option: "Propósito del acompañamiento pedagógico",
  },
  {
    id_intervention: "Acompañamiento pedagógico",
    id: 10,
    name: " Apoyar procesos del área de tecnología",
    option: "Propósito del acompañamiento pedagógico",
  },
  {
    id_intervention: "Acompañamiento pedagógico",
    id: 11,
    name: "Apoyar procesos del área de MEIA",
    option: "Propósito del acompañamiento pedagógico",
  },
  {
    id_intervention: "Taller de formación",
    id: 12,
    name: "Taller de Lectoescritura integrando tecnología",
    option: "Propósito de la Formación",
  },
  {
    id_intervention: "Taller de formación",
    id: 13,
    name: "Formación a docentes en fluidez digital",
    option: "Propósito de la Formación",
  },
  {
    id_intervention: "Taller de formación",
    id: 14,
    name: "Formación a docente monitor pedagógico",
    option: "Propósito de la Formación",
  },
  {
    id_intervention: "Taller de formación",
    id: 15,
    name: "Taller de Matemáticas integrando tecnología",
    option: "Propósito de la Formación",
  },
  {
    id_intervention: "Taller de formación",
    id: 16,
    name: "Taller Pensamiento computacional con Scratch",
    option: "Propósito de la Formación",
  },
  {
    id_intervention: "Taller de formación",
    id: 17,
    name: "Taller El ciudadano del siglo XXI",
    option: "Propósito de la Formación",
  },
  {
    id_intervention: "Taller de formación",
    id: 18,
    name: "Taller Creador de recursos educativos digitales",
    option: "Propósito de la Formación",
  },
  {
    id_intervention: "Taller de formación",
    id: 19,
    name: "Taller Evaluador de los aprendizajes",
    option: "Propósito de la Formación",
  },
  {
    id_intervention: "Taller de formación",
    id: 20,
    name: "Taller de Robótica",
    option: "Propósito de la Formación",
  },
  {
    id_intervention: "Taller de formación",
    id: 21,
    name: "Taller de metodologías ágiles",
    option: "Propósito de la Formación",
  },
  {
    id_intervention: "Taller de formación",
    id: 22,
    name: "Taller de gestión directiva",
    option: "Propósito de la Formación",
  },
  {
    id_intervention: "Acompañamiento tecnológico",
    id: 23,
    name: "Asegurar el funcionamiento de la plataforma tecnológica",
    option: "Objetivo",
  },
  {
    id_intervention: "Acompañamiento tecnológico",
    id: 24,
    name: "Desarrollar capacidades locales en niños monitores técnicos",
    option: "Objetivo",
  },
  {
    id_intervention: "Acompañamiento tecnológico",
    id: 25,
    name: "Desarrollar capacidades locales en docente monitor técnico",
    option: "Objetivo",
  },
];

// name for breathcumbs
export const pathTitles = {
  planning: "Planificación",
  visit: "Visitas",
  pedagogic: "Acompañamiento Pedagógico",
  technology: "Tecnología",
  workshop: "Taller de Formación",
  home: "Inicio",
};

// errors fields
export const errorFields = [
  {
    keys: ["date"],
    message: "La fecha de la visita no puede ser mayor a la fecha de hoy",
  },
  {
    keys: ["idLocation"],
    message: "Escuela sin seleccionar",
  },
  {
    keys: ["modality"],
    message: "Modalidad de la visita sin seleccionar",
  },
  {
    keys: ["visitType"],
    message: "Tipo de visita sin seleccionar",
  },
  {
    keys: ["objectives"],
    message: "Falta seleccionar al menos un propósito",
  },
  {
    keys: ["tableDocents"],
    message: "Error en la sección de docentes",
  },
  {
    keys: ["entryTime"],
    message: "La hora de entrada debe ser menor que la hora de salida",
  },
  {
    keys: ["departureTime"],
    message: "La hora de salida no puede ser menor a la hora de entrada",
  },
  {
    keys: ["evidencesVisit"],
    message: "Tiene que seleccionar una evidencia",
  },
  {
    keys: ["register"],
    message: "Verifica el registro que estas haciendo",
  },
];

export const initialValuesForm = {
  advisorLogin: {},
  idAdvisor: "",
  idArea: "",
  date: null,
  entryTime: "",
  departureTime: "",
  modality: "",
  register: "",
  typeOfRegister: "",
  programType: "",
  objectives: [],
  tableDocents: [],
  evidencesVisit: [],
  // data for not endpoint
  // schoolType: "",
  // schoolDependenci: "",
  country: "",
  idLocation: [],
  departments: [],
  municipalities: [],
};
