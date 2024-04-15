// import { getAssetPath } from "@/core/helpeassets";

interface IRisk {
    id: number;
    risk_identification: {
      description: string;
      cause: string;
      effect: string;
    };
    risk_evaluation: {
      probability: string;
      severity: string;
      risk_mode: string;
    };
    risk_counter: {
      controls: string;
      probability: string;
      severity: string;
      risk_mode: string;
    };
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