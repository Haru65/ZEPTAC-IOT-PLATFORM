// import { getAssetPath } from "@/core/helpeassets";

interface IAObservation {
    id: number;
    auditor_name: string;
    clause_name: string;
    clauses: string;
    company_id: string;
  }
  
export type { IAObservation };

// Audit Observation
interface IClause {
  id: number;
  clause_number: string;
  description: string;
  nc_observation: string;
  compilance_type: string;
  evidence: string;
  approval_status: string;
  company_id: string;
}

export type { IClause };


// Non-Conformance List(Non-Compilance)
interface IACorrectiveAction {
  id: number;
  clause_number: string;
  description: string;
  nc_observation: string;
  corrective_action: {};
  evidence: string;
  company_id: string;
}

export type { IACorrectiveAction };