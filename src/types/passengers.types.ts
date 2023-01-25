import { ILocationDB } from "./shared.types";


export interface IPassengers {
  name: string;
  email: string;
  phone_number: string;
  location: ILocationDB;
  score: number;
}