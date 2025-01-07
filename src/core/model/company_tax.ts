interface ICompanyTax {
    id: number | string;
    tax_type: string;
    tax_description: string;
    tax_rate: number;
    tax_amount: number;
    company_id: string;
}

export type { ICompanyTax };