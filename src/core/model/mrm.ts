
interface IMRM {
    id: number;
    agenda: string;
    meeting_date: string;
    attendees: [];
    meetings_count: number;
    company_id: string;
  }
  
  export type { IMRM };

export const Agendas = [
  {
    id:"1",
    point: "Changes in Internal and External issues that are relevant to the laboratory",
  },
  {
    id:"2",
    point: "Fulfilment of objectives",
  },
  {
    id:"3",
    point: "Suitability of policies and procedures",
  },
  {
    id:"4",
    point: "Status of action from previous management reviews",
  },
  {
    id:"5",
    point: "Outcome of recent internal audits",
  },
  {
    id:"6",
    point: "Corrective actions",
  },
  {
    id:"7",
    point: "Assessments by external bodies",
  },
  {
    id:"8",
    point: "Changes in volume and type of the work or in the range of laboratory activities",
  },
  {
    id:"9",
    point: "Customer and personnel feedback",
  },
  {
    id:"10",
    point: "Complaints",
  },
  {
    id:"11",
    point: "Effectiveness of any implemented improvements",
  },
  {
    id:"12",
    point: "Adequacy of Resources",
  },
  {
    id:"13",
    point: "Results of risk identification",
  },
  {
    id:"14",
    point: "Outcomes of the assurance of the validity of results ",
  },
  {
    id:"15",
    point: "Other relevant factors, such as monitoring activities and training",
  },
];

export const GetAgendaName = (id) => {
  const item = Agendas.find(item => item.id == id);
  return item ? item.point : "";
};
