
interface IFeedback {
    id: number;
    customer_id: number;
    feedbacker_name: string;
    feedback_no: string;
    feedback_data: [];
    avg_rating: number;
    suggestion_remark: string;
    customer: {
      id: string;
      name: string;
      company_name: string;
      address1: string;
      address2: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    };
    approval_status: string;
    approval_comment: string;
    created_at: string;
    company_id,
  } 

export type { IFeedback };

export const FeedbackServices = [
    { id: "1" , service: "Punctuality", percentage: 100},
    { id: "2" , service: "Personnel Hygienic", percentage: 100},
    { id: "3" , service: "Safety Procedures", percentage: 100},
    { id: "4" , service: "Testing Instruments Handling", percentage: 100},
    { id: "5" , service: "Technical Knowledge of Personnel", percentage: 100},
    { id: "6" , service: "SOP Follow Up", percentage: 100},
    { id: "7" , service: "Test Reports Preparation", percentage: 100},
    { id: "8" , service: "Overall Rating", percentage: 100},
];
