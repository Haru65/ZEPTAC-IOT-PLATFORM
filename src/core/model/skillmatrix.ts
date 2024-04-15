

interface ISkillMatrix {
    id: number;
    user: {
        id: string;
        first_name: string;
        last_name: string;
    };
    skills: [];
  }
  
  
  export type { ISkillMatrix };
  
//   Skills
  export const SkillMatrix = [
    { skill_name: "Master handling / Maintain", score: 0 },
    { skill_name: "Testing Techniques Basic", score: 0 },
    { skill_name: "Site Calibration Procedure", score: 0 },
    { skill_name: "ISO 17025:2017 Awareness", score: 0 },
    { skill_name: "Certificate Preparation", score: 0 },
    { skill_name: "Uncertainty Calculation", score: 0 },
    { skill_name: "Documents Maintenance", score: 0 },
    { skill_name: "Filing / Accounts", score: 0 },
    { skill_name: "Customer Support", score: 0 },
    { skill_name: "Delivery & Collection", score: 0 }
  ];