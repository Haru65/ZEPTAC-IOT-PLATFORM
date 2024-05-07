export const ApprovalStatus = [
    {
      id:"1",
      status: "Pending",
    },
    {
      id:"2",
      status: "Rejected",
    },
    {
      id:"3",
      status: "Approved",
    }
  ];
  
export const GetApprovalStatus = (id) => {
    const item = ApprovalStatus.find(item => item.id == id);
    return item ? item.status : "";
};

