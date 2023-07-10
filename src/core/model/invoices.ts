interface IInvoices {
  id: number;
  customer_name: string;
  invoice_date: string;
  invoice_duedate: string;
  status: string;
  total: string;
}

export type { IInvoices };
