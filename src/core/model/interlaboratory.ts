

interface ILaboratoryComparison {
    id: number;
    lab_date: string;
    reference_lab_name: string;
    participate_lab_name: string;
    artifact_name: string;
    ranges: string;
    status: string;
    remark: string;
    company_id: string;
  }
  
  
export type { ILaboratoryComparison };