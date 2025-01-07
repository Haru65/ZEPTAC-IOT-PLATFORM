// import { getAssetPath } from "@/core/helpeassets";

interface ITReport {
    id: number;
    room_name: string;
    logger_used: number;
    mapping_duration: number;
    logging_interval: number;
    company_name:{
      company_name: string;
    };
    created_at: string;
  }
  
  export type { ITReport };
  