import { getAssetPath } from "@/core/helpers/assets";

interface IEmployee {
  id: number;
  profile: string;
  name: string;
  mobile: string;
  role: string;
  history_card: string;
  company_name: string;
  meta: {
    adhar: string;
    pan: string;
    profile_pic: string;
    company_name: string;
  }
}

export type { IEmployee };
