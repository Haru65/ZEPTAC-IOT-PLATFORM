
interface IRReport {
    id: number;
    uuc_details: {
        name: string;
    };
    master_equipment_1: {
        string: NamedCurve;
    };
    engineer_1: string;
    engineer_2: string;
    replicate_date: string;
    approval_status: string;
  }
  
  
export type { IRReport };
