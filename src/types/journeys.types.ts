import { ObjectId } from "mongodb";
import { ILocation, ILocationDB } from "./shared.types";

export type TPaymentMethod = "cash" | "debit" | "credit" | "paypal";
export type TJourneyStatus = "assigned" | "on-going" | "completed" | "rejected";
export interface IJourney {
  driverId: ObjectId;
  passengerId: ObjectId;
  start_location: ILocationDB;
  end_location: ILocationDB;
  payment_method: TPaymentMethod;
  status: TJourneyStatus;
}

export interface IJourneyPayload {
  driverId: ObjectId;
  passengerId: ObjectId;
  start_location: ILocation;
  end_location: ILocation;
  payment_method?: TPaymentMethod;
}