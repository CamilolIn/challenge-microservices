import yup from 'yup';
import { IDriver } from '../../types/drivers.types';

export class DriversSchema {
  private static _schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup.string().required(),
    license_plate: yup.string().required(),
    location: yup.array().max(2).of(yup.number()),
    is_available: yup.boolean().default(true).required(),
    score: yup.number().min(0).max(5)
  });

  public static async validate(payload: IDriver) {
    return await this._schema.validate(payload, { strict: true });
  }

  public static cast(payload: Partial<IDriver>) {
    return this._schema.cast(payload);
  }
}