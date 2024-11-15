interface INotification {
    id: number;
    type: string;
    data: [];
    read_at: string;
    status: string;
    created_at: string;
  }
  
  
  export type { INotification };
  
  export const NotificationTypes = [
    {
        id: "1",
        type: "App\\Notifications\\LeadExistsNotification",
        labelValue: "Leads"
    },
  ];