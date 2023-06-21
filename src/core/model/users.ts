import { getAssetPath } from "@/core/helpers/assets";
import JwtService from "../services/JwtService";
import ApiService from "../services/ApiService";

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  email_verified_at: string;
  role_id: number;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: number;
  is_active: number;
}

export type { IUser };

