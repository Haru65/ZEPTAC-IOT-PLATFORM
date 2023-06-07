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

const user: Array<IUser> = [
]

export function user_listing() {
  ApiService.setHeader();
  ApiService.get("/users").then((response) => {
    const users = response.data.result.data;
    users.forEach((element) => {
      user.push(element);
    });
  }).catch((err) => {
    console.error(err);
  })

  return null;
}

user_listing();

console.log(user)

export type { IUser };
export default user;
