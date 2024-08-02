
export const useMonthUtilsDashboard = (financialYearType: number) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  
    const isAprilStart = financialYearType === 2;
  
    const startYear = isAprilStart ? (currentMonth >= 4 ? currentYear : currentYear - 1) : currentYear;
  
    const getMonthName = (monthId: number) => {
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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
  