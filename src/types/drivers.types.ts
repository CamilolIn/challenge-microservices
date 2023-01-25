import { ILocationDB } from "./shared.types";


export interface IDriver {
  name: string;
  email: string;
  phone_number: string;
  license_plate: string;
  location: ILocationDB;
  is_available: boolean;
  score: number;
}