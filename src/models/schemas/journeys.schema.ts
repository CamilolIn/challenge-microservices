import * as yup from 'yup';
import { IJourney, IJourneyPayload } from '../../types/journeys.types';

export class JourneysSchema {
  private static _schema = yup.object({
    driverId: yup.string().required(),
    passengerId: yup.string().required(),
    start_location: yup.object({
      longitude: yup.number().required().max(180).min(-180),
      latitude: yup.number().required().max(90).min(-90)
    }).required(),
    end_location: yup.object({
      longitude: yup.number().required().max(180).min(-180),
      latitude: yup.number().required().max(90).min(-90)
    }).required(),
    payment_method: yup.mixed().oneOf(["cash", "debit", "credit", "paypal"])
  });

  public static async validate(payload: IJourneyPayload) {
    return await JourneysSchema._schema.validate(payload, { strict: true });
  }

  public static cast(payload: IJourneyPayload): IJourney {
    const newJourney: IJourney = {
      driverId: payload.driverId,
      passengerId: payload.passengerId,
      start_location: {
        type: "Point",
        coordinates: [payload.start_location.longitude, payload.start_location.latitude]
      },
      end_location: {
        type: "Point",
        coordinates: [payload.end_location.longitude, payload.end_location.latitude]
      },
      payment_method: payload.payment_method || "cash",
      status: "assigned",
    }
    return newJourney;
  }
}