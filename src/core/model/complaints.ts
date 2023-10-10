
interface IComplaint {
    id: number;
    customer_name: string;
    complaint_date: string;
    details_of_complaint: string;
    corrective_action: string;
    resolution_date: string;
    complaint_status: string;
  }  

export type { IComplaint };


export const ComplaintStatus = [
    {
        id: 1,
        status: "Pending",
    },
    {
        id: 2,
        status: "Resolved",
    }
  ];
  


export const SourceOfComplaint = [
    {
        id: 1,
        source: "Email",
    },
    {
        id: 2,
        source: "Feedback Form",
    },
    {
        id: 3,
        source: "Verbal",
    }
  ];

  export const GetComplaintStatus = (id) => {
    const status = ComplaintStatus.find(item => item.id == id);
    return status ? status.status : "";
  };