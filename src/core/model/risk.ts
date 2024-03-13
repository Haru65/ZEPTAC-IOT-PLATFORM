// import { getAssetPath } from "@/core/helpeassets";

interface IRisk {
    id: number;
    entity: string;
    threats: string;
    impacts: string;
    present_control: string;
    control_adequacy: string;
    review_date: string;
    additional_control: string;
    company_id: string;
  }
  
  export type { IRisk };
  

  export const EntityList = [
    "Impartiality",
    "Confidentiality",
    "Decision rule",
    "Personnel Asset",
    "Management of NC work",
    "Equipment Asset",
    "Lab Premises",
  ];