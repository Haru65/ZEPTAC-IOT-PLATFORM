
interface IPlan {
    id: number;
    data: {};
    month_id: string;
    company_id: string;
  }
  
export type { IPlan };

export const useMonthUtils = (financialYearType: number) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Adding 1 because getMonth() returns zero-based index

  const isAprilStart = financialYearType === 2;

  const startYear = isAprilStart ? (currentMonth >= 4 ? currentYear : currentYear - 1) : currentYear;

  const getMonthName = (monthId: number) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthId - 1]; // Month ID starts from 1, array index starts from 0
  };

  const months: { id: number; name: string; year: number; }[] = [];

  if (isAprilStart) {
    for (let i = 4; i <= 12; i++) {
      months.push({ id: i, name: getMonthName(i), year: startYear });
    }
    for (let i = 1; i <= 3; i++) {
      months.push({ id: i, name: getMonthName(i), year: startYear + 1 });
    }
  } else {
    for (let i = 1; i <= 12; i++) {
      months.push({ id: i, name: getMonthName(i), year: startYear });
    }
  }

  return {
    months,
    currentYear,
    currentMonth,
    getMonthName,
  };
};

// export const GetMonthName = (id) => {
//   const item = months.find(item => item.id == id);
//   return item ? item.name : "";
// };

export const plans = [
  {
    id:"1",
    plan: "Training Plan",
  },
  {
    id:"2",
    plan: "Intermediate Check Plan",
  },
  {
    id:"3",
    plan: "Maintenance Plan",
  },
  {
    id:"4",
    plan: "Replicate Plan",
  },
  {
    id:"5",
    plan: "Interlaboratory Comparison Plan",
  },
  {
    id:"6",
    plan: "Internal Audit Plan",
  },
  {
    id:"7",
    plan: "MRM Plan",
  },
];

export const GetPlanName = (id) => {
  const item = plans.find(item => item.id == id);
  return item ? item.plan : "";
};
