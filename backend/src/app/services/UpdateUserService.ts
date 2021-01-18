import { getConnection, getRepository } from "typeorm";
import argon2 from "argon2";
import * as Yup from "yup";
import User from "../models/User";
import { AppError, ERRORS } from "../errors";
import Address from "../models/Address";

const userSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  username: Yup.string().required().min(3).max(32),
  password: Yup.string(),
  //   .matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/g),
  telephone: Yup.string()
    .required()
    .matches(/(\({1})(\d{2})(\){1})\s(\d{5})(-{1})(\d{4})/),
  role: Yup.string().required().oneOf(["ADMIN", "CLIENT"]),
});

const addressSchema = Yup.object().shape({
  state: Yup.string().required(),
  city: Yup.string().required(),
  neighborhood: Yup.string().required(),
  street: Yup.string().required(),
  postal_code: Yup.string().required(),
  number: Yup.string().required(),
  lat: Yup.string().required(),
  lng: Yup.string().required(),
});

class UpdateUserService {
  async execute(id: string, userData: any) {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(id);

    if (!user) throw new AppError(ERRORS.USER_NOT_FOUND);

    console.log(userData.address);

    await userSchema.validate(userData, {
      abortEarly: false,
    });

    await addressSchema.validate(userData.address, { abortEarly: false });

    user.email = userData.email;
    user.name = userData.name;
    user.username = userData.username;
    user.role = userData.role;
    user.telephone = userData.telephone;

    if (userData.password) {
      user.password = await argon2.hash(userData.password);
    }

    user.address.state = userData.address.state;
    user.address.city = userData.address.city;
    user.address.neighborhood = userData.address.neighborhood;
    user.address.street = userData.address.street;
    user.address.postal_code = userData.address.postal_code;
    user.address.number = userData.address.number;
    user.address.lat = userData.address.lat;
    user.address.lng = userData.address.lng;

    await getConnection().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(user.address);
      await transactionalEntityManager.save(user);
    });

    return user;
  }
}

export default UpdateUserService;
