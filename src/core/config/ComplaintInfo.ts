export const ComplaintStatus = [
    {
        id: "1",
        complaint_status: "Pending",
    },
    {
        id: "2",
        complaint_status: "Resolved",
    }
  ];
  

export const SourceOfComplaint = [
    {
        id: "1",
        source: "Email",
    },
    {
        id: "2",
        source: "Feedback Form",
    },
    {
        id: "3",
        source: "Verbal",
    }
  ];

export const GetComplaintStatus = (id: string) => {
    if (id in ComplaintStatus) {
        // Return the value of the key
        return ComplaintStatus[id];
    } else {
        // Return null if the key doesn't exist
        return "";
    }
};