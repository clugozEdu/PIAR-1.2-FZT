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

// array to result formation for proposite
export const resultFormation = [
  {
    "Formación a docentes en fluidez digital": {
      Saber: [
        {
          id: 1,
          indicator:
            "Comprender el modelo SAMR como forma de evaluar el nivel de uso de la tecnología",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Comprender el sistema operativo de la herramienta tecnológica y sus funciones",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Reconocer el papel de la tecnología para favorecer aprendizajes significativos",
          status: "",
        },
      ],
      SaberHacer: [
        {
          id: 1,
          indicator:
            "Integrar efectivamente herramientas y recursos tecnológicos en el diseño y la implementación de actividades educativas",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Incorporar en la planificación didáctica estrategias que promuevan el desarrollo de competencias en diferentes áreas del currículo",
          status: "",
        },
      ],
      SaberSer: [
        {
          id: 1,
          indicator:
            "Practicar una conducta de apertura, creatividad y disposición para integrar tecnología en los aprendizajes",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Mostrar disposición para la actualización continua y la adopción de nuevas herramientas y enfoques tecnológicos en la enseñanza",
          status: "",
        },
      ],
    },
    "Formación a docente monitor pedagógico": {
      Saber: [
        {
          id: 1,
          indicator:
            "Comprender su rol de líder como docente monitor pedagógico",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Apropiarse de técnicas de comunicación asertiva y de motivación personal",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Apropiarse de las características de una escuela innovadora que integra tecnología",
          status: "",
        },
      ],
      SaberHacer: [
        {
          id: 1,
          indicator:
            "En su rol como líder, motivar y promover la integración tecnología en el proceso enseñanza - aprendizaje",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Aplicar la comunicación asertiva a nivel institucional, escolar y pedagógica",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Promover el trabajo en equipo como forma estratégica de alcanzar metas comunes",
          status: "",
        },
        {
          id: 4,
          indicator:
            "Implementar un plan de acción que incida en el cambio de paradigmas para la innovación permanente en la escuela",
          status: "",
        },
      ],
      SaberSer: [
        {
          id: 1,
          indicator:
            "Valorar la importancia de su rol de líder al promover y motivar a sus docentes para que innoven e integren tecnología en el proceso enseñanza - aprendizaje",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Practicar una conducta de apertura, creatividad y disposición para integrar tecnología en los aprendizaje",
          status: "",
        },
      ],
    },
    "Taller de Lectoescritura integrando tecnología": {
      Saber: [
        {
          id: 1,
          indicator: "Definir los conceptos de lectura y escritura",
          status: "",
        },
        {
          id: 2,
          indicator: "Identificar los principios básicos de la neuroeducación",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Comprender las etapas de adquisición de la lectoescritura",
          status: "",
        },
        {
          id: 4,
          indicator: "Comprender las habilidades que mide la prueba EGRA",
          status: "",
        },
      ],
      SaberHacer: [
        {
          id: 1,
          indicator:
            "Incorporar en la planificación didáctica estrategias que promuevan el desarrollo de la conciencia fonológica, código alfabético y vocabulario, integrando tecnología",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Incorporar en la planificación didáctica estrategias que promuevan el desarrollo de la comprensión lectora en nivel literal e inferencial, integrando tecnología",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Crear estrategias que aseguren una integración consciente de la tecnología, adaptándose a las necesidades educativas específicas",
          status: "",
        },
        {
          id: 4,
          indicator:
            "Potenciar su creatividad al incorporar estrategias de gamificación y juegos educativos en la planificación didáctica",
          status: "",
        },
      ],
      SaberSer: [
        {
          id: 1,
          indicator:
            "Practicar una conducta de apertura, creatividad y disposición para integrar tecnología en los aprendizajes",
          status: "",
        },
      ],
    },
    "Taller de Matemáticas integrando tecnología": {
      Saber: [
        {
          id: 1,
          indicator: "Comprender las habilidades que mide la prueba EGMA",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Comprender las bases teóricas para el aprendizaje de las matemáticas",
          status: "",
        },
        {
          id: 3,
          indicator: "Comprender el enfoque de resolución de problemas",
          status: "",
        },
      ],
      SaberHacer: [
        {
          id: 1,
          indicator:
            "Incorporar en la planificación didáctica estrategias para favorecer el enfoque de enseñanza de resolución de problemas integrando tecnología",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Aplicar estrategias según las necesidades educativas integrando tecnología de forma consciente",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Crear estrategias que aseguren una integración consciente de la tecnología, adaptándose a las necesidades educativas específicas",
          status: "",
        },
        {
          id: 4,
          indicator:
            "Potenciar su creatividad al incorporar estrategias de gamificación y juegos educativos en la planificación didáctica",
          status: "",
        },
      ],
      SaberSer: [
        {
          id: 1,
          indicator:
            "Practicar una conducta de apertura, creatividad y disposición para integrar tecnología en los aprendizajes",
          status: "",
        },
      ],
    },
    "Taller Pensamiento computacional con Scratch": {
      Saber: [
        {
          id: 1,
          indicator:
            "Identificar de forma correcta los elementos que integran la interfaz del programa Scratch",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Definir las etapas del pensamiento computacional enfatizando su importancia para promover el aprendizaje en el aula",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Reconocer la relevancia del pensamiento algorítmico para procesar la información de manera procesual y ordenada",
          status: "",
        },
      ],
      SaberHacer: [
        {
          id: 1,
          indicator:
            "Aplicar de forma natural y espontánea las etapas del pensamiento computacional al resolver problemas",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Utilizar el pensamiento algorítmico a modo de descomposición y abstracción de la realidad para plantear soluciones ante problemas",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Implementar de forma adecuada la programación en bloques para codificar simulaciones educativas basadas en algoritmos",
          status: "",
        },
        {
          id: 4,
          indicator:
            "Diseñar simulaciones educativas que integren saberes de manera interdisciplinar o disciplinar para motivar el pensamiento lógico - matemático de forma práctica",
          status: "",
        },
      ],
      SaberSer: [
        {
          id: 1,
          indicator:
            "Practicar una conducta de apertura, creatividad y disposición para integrar tecnología en los aprendizajes",
          status: "",
        },
      ],
    },
    "Taller El ciudadano del siglo XXI": {
      Saber: [
        {
          id: 1,
          indicator:
            "Comprender los principios fundamentales de la ciudadanía digital, incluyendo la alfabetización mediática y la ética digital",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Identificar y analizar las implicaciones éticas y sociales del uso de la tecnología digital",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Reconocer el papel de la tecnología en la promoción de la participación cívica y el activismo en línea",
          status: "",
        },
      ],
      SaberHacer: [
        {
          id: 1,
          indicator:
            "Integrar efectivamente herramientas y recursos tecnológicos en el diseño y la implementación de actividades educativas",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Utilizar estrategias de enseñanza activas y participativas que fomenten el aprendizaje colaborativo y la creatividad",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Evaluar el impacto de la tecnología en el proceso de enseñanza y aprendizaje, y ajustar las prácticas pedagógicas en consecuencia",
          status: "",
        },
      ],
      SaberSer: [
        {
          id: 1,
          indicator:
            "Demostrar una actitud ética y responsable hacia el uso de la tecnología digital",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Fomentar un ambiente inclusivo y respetuoso en el aula digital, promoviendo la diversidad y la equidad",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Mostrar disposición para la actualización continua y la adopción de nuevas herramientas y enfoques tecnológicos en la enseñanza",
          status: "",
        },
      ],
    },
    "Taller Creador de recursos educativos digitales": {
      Saber: [
        {
          id: 1,
          indicator:
            "Comprender la influencia de los diferentes estilos de aprendizaje (visual, auditivo, kinestésico) en la adquisición de información y en la comprensión de conceptos",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Distinguir entre recursos didácticos y estrategias didácticas, ejemplificando su aplicación en el proceso educativo",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Reconocer la importancia de la comunicación visual y audiovisual en el enriquecimiento de la enseñanza y mejora de la retención de información",
          status: "",
        },
        {
          id: 4,
          indicator:
            "Comprender el concepto de gamificación y su aplicación como enfoque pedagógico para mejorar el aprendizaje",
          status: "",
        },
      ],
      SaberHacer: [
        {
          id: 1,
          indicator:
            "Aplicar pautas creativas en la creación de recursos educativos digitales que incorporan elementos visuales, auditivos y kinestésicos",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Justificar la elección de recursos educativos en función de las pautas creativas y las necesidades de los estudiantes",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Utilizar herramientas en línea para la elaboración de imágenes interactivas, infografías y animaciones educativas efectivas",
          status: "",
        },
        {
          id: 4,
          indicator:
            "Crear juegos educativos alineados con objetivos de aprendizaje, utilizando herramientas de diseño competentes",
          status: "",
        },
      ],
      SaberSer: [
        {
          id: 1,
          indicator:
            "Mostrar empatía hacia la diversidad de estilos de aprendizaje presentes en el aula, fomentando un ambiente inclusivo",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Demostrar entusiasmo por la gamificación como enfoque pedagógico que hace que el aprendizaje sea más atractivo",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Fomentar un ambiente de aprendizaje que valore la originalidad y la innovación en la creación de recursos educativos",
          status: "",
        },
        {
          id: 4,
          indicator:
            "Mantener una actitud de compromiso y responsabilidad en la planificación y desarrollo de proyectos educativos finales",
          status: "",
        },
      ],
    },
    "Taller Evaluador de los aprendizajes": {
      Saber: [
        {
          id: 1,
          indicator:
            "Reconocer el papel fundamental del evaluador en el desarrollo de los aprendizajes, comprendiendo su responsabilidad en la implementación de prácticas evaluativas efectivas",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Seleccionar los instrumentos de evaluación adecuados para evaluar diferentes aspectos del aprendizaje de los estudiantes",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Demostrar conocimientos sólidos sobre los beneficios y la relevancia de las PPL como herramientas de evaluación en el desarrollo de las habilidades de lectura de los estudiantes",
          status: "",
        },
      ],
      SaberHacer: [
        {
          id: 1,
          indicator:
            "Aplicar estrategias y técnicas adecuadas en la recolección, registro y análisis de datos relacionados con el desempeño de los estudiantes, con el fin de tomar decisiones pedagógicas fundamentadas",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Utilizar herramientas tecnológicas y recursos digitales apropiados en el desarrollo y adaptación de los instrumentos de evaluación a las necesidades específicas de sus estudiantes y contextos educativos",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Diseñar pruebas de lecturas que permitan la recolección de información precisa y relevante sobre las habilidades y competencias lectoras de los estudiantes",
          status: "",
        },
      ],
      SaberSer: [
        {
          id: 1,
          indicator:
            "Valorar la importancia de la colaboración y el trabajo en equipo con sus colegas, reconociendo que el mejoramiento de la calidad de la evaluación y el aprendizaje en las aulas de clase de la educación primaria se logra de manera más efectiva mediante la colaboración y el intercambio de ideas y experiencias",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Fomentar el uso de instrumentos de evaluación digitales en el proceso educativo, reconociendo que la tecnología ofrece oportunidades para la innovación y la adaptación a las necesidades de los estudiantes en el siglo XXI",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Valorar la importancia del diseño y aplicación de las Pruebas Periódicas de Lectura (PPL), en la obtención de la información necesaria para el ajuste pedagógico que posibilite el desarrollo de habilidades lectoras en los estudiantes",
          status: "",
        },
      ],
    },
    "Taller de Robótica": {
      Saber: [
        {
          id: 1,
          indicator:
            "Conocer los conceptos básicos de la electrónica, incluyendo circuitos, componentes electrónicos y principios de funcionamiento",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Conocimiento introductorio sobre la tarjeta electrónica Arduino, sus componentes y capacidades",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Conocer los principios básicos de la programación en Arduino, incluyendo estructuras de control, variables y funciones",
          status: "",
        },
      ],
      SaberHacer: [
        {
          id: 1,
          indicator:
            "Configurar el entorno de desarrollo de Arduino para trabajar con la tarjeta Arduino",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Desarrollar programas simples en Arduino para controlar actuadores y leer datos de sensores",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Diseñar y construir de un prototipo utilizando material del medio y tecnología Arduino para solucionar una problemática identificada",
          status: "",
        },
      ],
      SaberSer: [
        {
          id: 1,
          indicator:
            "Tener la capacidad para identificar, analizar y resolver problemas de manera creativa",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Practicar una conducta de apertura, creatividad y disposición para integrar tecnología en los aprendizajes",
          status: "",
        },
      ],
    },
    "Taller de metodologías ágiles": {
      Saber: [
        {
          id: 1,
          indicator: "Comprender los principios y valores del Manifiesto Ágil",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Conocer los diferentes marcos de trabajo agiles (Scrum, Human centered design, Design Thinking, etc.)",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Identificar los roles y responsabilidades en equipo agiles",
          status: "",
        },
      ],
      SaberHacer: [
        {
          id: 1,
          indicator:
            "Implementar técnicas ágiles en los procesos de planificación y búsqueda de soluciones",
          status: "",
        },
        {
          id: 2,
          indicator: "Poder gestionar la formulación de proyectos ágiles",
          status: "",
        },
      ],
      SaberSer: [
        {
          id: 1,
          indicator: "Ser capaz de trabajar en equipo y colaborar con otros",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Ser adaptable y capaz de afrontar cambios con flexibilidad",
          status: "",
        },
        {
          id: 3,
          indicator: "Ser capaz de comunicar ideas de forma clara y concisa",
          status: "",
        },
      ],
    },
    "Taller de gestión directiva": {
      Saber: [
        {
          id: 1,
          indicator:
            "Comprender las competencias digitales y de liderazgo de directores de escuelas",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Apropiarse de técnicas de comunicación asertiva y de motivación personal",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Apropiarse de las características de una escuela innovadora que integra tecnología",
          status: "",
        },
      ],
      SaberHacer: [
        {
          id: 1,
          indicator:
            "En su rol como líder, motivar y promover la integración tecnología en el proceso enseñanza - aprendizaje",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Aplicar la comunicación asertiva a nivel institucional, escolar y pedagógica",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Promover el trabajo en equipo como forma estratégica de alcanzar metas comunes",
          status: "",
        },
        {
          id: 4,
          indicator:
            "Incorporar mejoras en la gestión educativa, a través de la implementación de un plan de acción estratégico",
          status: "",
        },
      ],
      SaberSer: [
        {
          id: 1,
          indicator:
            "Valorar la importancia de su rol de líder al promover y motivar a sus docentes para que innoven e integren tecnología en el proceso enseñanza - aprendizaje",
          status: "",
        },
        {
          id: 2,
          indicator:
            "Implementar acciones educativas creativas e innovadoras en los planes de acción estratégicos",
          status: "",
        },
        {
          id: 3,
          indicator:
            "Mostrar interés en adoptar un modelo de comunicación asertiva como medio para establecer relaciones de respeto entre la comunidad educativa",
          status: "",
        },
      ],
    },
  },
];
