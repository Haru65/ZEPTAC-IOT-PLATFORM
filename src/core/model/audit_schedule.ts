// import { getAssetPath } from "@/core/helpeassets";

interface IAuditSchedule {
    id: number;
    auditor_name: string;
    address: string;
    auditees: [];
    meeting_place: string;
    audit_area: string;
    scope: string;
    approval_status: string;
    company_id: string;
  }
  
export type { IAuditSchedule };