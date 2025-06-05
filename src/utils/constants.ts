// develop site 'https://jncvbp-ms.herokuapp.com/graphql';

import moment from "moment";
import _ from "lodash";

// For Development
// export const API_URL = "http://localhost:3000/graphql";

// For Deploy
export const API_URL = process.env.API_URL || "http://localhost:3000/graphql";

// Can be moved up to make the constants
export const MODE_CREATE = "CREATE";
export const MODE_EDIT = "EDIT";

export const DEFAULT_DATE_FORMAT = "DD/MM/YYYY";
export const DEFAULT_DATETIME_FORMAT = "DD/MM/YYYY HH:mm";
// export const API_URL = process.env.JNCVBP_URL || "http://localhost:3000/graphql";

export const AUTH_TOKEN_NAME = "jncvbp-ms-token";

export const BLOOD_TYPES = [
  { id: "Not Set", description: "No definido" },
  { id: "A+", description: "A RH(+)" },
  { id: "A-", description: "A RH(-)" },
  { id: "B+", description: "B RH(+)" },
  { id: "B-", description: "B RH(-)" },
  { id: "AB+", description: "AB RH(+)" },
  { id: "AB-", description: "AB RH(-)" },
  { id: "0+", description: "0 RH(+)" },
  { id: "0-", description: "0 RH(-)" },
];

export const OTHER_NAME = "Otro";
export const OTHER_ID = "other";

export const CODES = {
  ACCIDENT: "10.41",
  FIRE: "10.40",
  RESCUE: "10.43",
};

export const VOLUNTEER_STATUS = [
  { id: "active", description: "Activo" },
  { id: "inactive", description: "Inactivo" },
  { id: "deceased", description: "Muerto en combate" },
];

const DAMAGE_PEQ_ID = "peq";
const DAMAGE_MEDIANA_ID = "mediana";
const DAMAGE_GRANDE_ID = "grande";
const DAMAGE_TOTAL_ID = "total";

export const DAMAGE_OPTIONS = [
  { id: DAMAGE_PEQ_ID, name: "Pequeña" },
  { id: DAMAGE_MEDIANA_ID, name: "Mediana" },
  { id: DAMAGE_GRANDE_ID, name: "Grande" },
  { id: DAMAGE_TOTAL_ID, name: "Total" },
];

export const PROPORTION_OPTIONS = [
  { id: DAMAGE_PEQ_ID, name: "Pequeña" },
  { id: DAMAGE_MEDIANA_ID, name: "Mediana" },
  { id: DAMAGE_GRANDE_ID, name: "Grande" },
];

export const AFFECTED_OWNER_OPTIONS = [
  { id: "estatal", name: "Estatal" },
  { id: "departamental", name: "Departamental" },
  { id: "municipal", name: "Municipal" },
  { id: "particular", name: "Particular" },
];

export const DAMAGE_1041_OPTIONS = [
  { id: "materiales", name: "Materiales" },
  { id: "heridos", name: "Heridos" },
  { id: "heridos_atrapados", name: "Heridos Atrapados" },
  { id: "incendios", name: "Incendios" },
  { id: "mat_pel", name: "Materiales Peligrosos" },
];

export const INVOLVED_ELEMENTS_OPTIONS = [
  { id: "peatones", name: "Peatones" },
  { id: "motos", name: "Motos" },
  { id: "vehiculos_livianos", name: "Vehículos livianos" },
  { id: "vehiculos_pesados", name: "Vehículos pesados" },
  { id: "buses", name: "Buses" },
];

export const MAGNITUDE_1041_OPTIONS = [
  { id: "cinturon_conductor", name: "Cinturón Conductor" },
  { id: "cinturon_acomp", name: "Cinturón Acompañante" },
  { id: "casco_conductor", name: "Casco Conductor" },
  { id: "casco_acomp", name: "Casco Acompañante" },
];

export const QUANTITIES_1044_1045_OPTIONS = [
  { id: "ilesos", name: "Ileso/s" },
  { id: "heridos", name: "Herido/s" },
  { id: "fallecidos", name: "Fallecido/s" },
  { id: "rescates", name: "Rescate/s" },
  { id: "enfermos", name: "Enfermo/s" },
];

export const RESOURCES_OPTIONS_1040 = [
  { id: "agua", name: "Agua (L)" },
  { id: "polvo", name: "Polvo químico (Kg)" },
  { id: "gas", name: "Gas carbónico (Kg)" },
  { id: "espuma", name: "Espuma (L)" },
  { id: "combustible", name: "Combustible (L)" },
  { id: "bomberos", name: "Bomberos" },
  { id: "tiempo", name: "Tiempo total (min)" },
  { id: OTHER_ID, name: OTHER_NAME },
];

export const RESOURCES_OPTIONS_1041 = [
  { id: "combustible", name: "Combustible (L)" },
  { id: "bomberos", name: "Bomberos" },
  { id: "kilometros", name: "Km. recorridos (Km)" },
  { id: "tiempo", name: "Tiempo total (min)" },
  { id: "moviles", name: "Nómina de móviles" },
];

export const RESOURCES_OPTIONS = _.uniqBy([...RESOURCES_OPTIONS_1040, ...RESOURCES_OPTIONS_1041], "id");

export const RESCUE_TYPE_OPTIONS = [
  { id: "vivienda", name: "En Vivienda" },
  { id: "profundidad", name: "Profundidad" },
  { id: "altura", name: "Altura" },
  { id: "derrumbe", name: "Derrumbe" },
  { id: "raudal", name: "Raudal-Naufragio" },
  { id: "bomba", name: "Amenaza de bomba" },
  { id: "suicidio", name: "Intento de suidicio" },
];

export const get_formatted_volunteers = (volunteers) =>
  volunteers
    .map((volunteer) => volunteer.name)
    .sort((v1, v2) => v1.localeCompare(v2))
    .join(", ");

export const get_volunteer_status = (status_id) => {
  return VOLUNTEER_STATUS.find((status) => status.id == status_id)?.description || "";
};

export const get_blood_type = (blood_type_id) => {
  return BLOOD_TYPES.find((blood_type) => blood_type.id == blood_type_id)?.description || "";
};

export const get_formatted_date = (date) => {
  return date ? moment(date).format(DEFAULT_DATE_FORMAT) : "";
};

export const get_formatted_datetime = (date) => {
  return date ? moment(date).format(DEFAULT_DATETIME_FORMAT) : "";
};

// default data
export const volunteerDefaultValues = {
  name: undefined,
  code: undefined,
  status: VOLUNTEER_STATUS[0].id,
  blood_type: "Not Set",
  rank: { id: null },
};
