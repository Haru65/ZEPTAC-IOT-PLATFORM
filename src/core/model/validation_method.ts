

interface IVMethod {
    id: number;
    val_date: string;
    method_validation: string;
    method_name: string;
    status: string;
    remark: string;
    approval_status: string;
    company_id: string;
  }
  
  
  export type { IVMethod };
  
export const ValidationMethods = [
  {
      id: "1",
      name: "Use of certified reference standards",
  },
  {
      id: "2",
      name: "Comparison of results achieved with other methods",
  },
  {
      id: "3",
      name: "Inter-laboratory comparisons",
  },
  {
      id: "4",
      name: "Systematic assessment of the factors influencing the results",
  },
  {
      id: "5",
      name: "Participation in proficiency testing programs",
  },
];

export const GetValidationMethod = (id) => {
  const data = ValidationMethods.find(item => item.id == id);
  return data ? data.name : "";
};