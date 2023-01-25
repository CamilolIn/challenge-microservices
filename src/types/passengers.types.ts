import { ILocationDB } from "./shared.types";

export interface IPassenger {
  name: string;
  email: string;
  phone_number: string;
  location: ILocationDB;
  score: number;
}