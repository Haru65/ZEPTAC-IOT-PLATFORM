interface IInvoices {
  id: number;
  customer_name: string;
  invoice_no: string;
  date: string;
  duedate: string;
  status: string;
  total: string;
}

export type { IInvoices };
