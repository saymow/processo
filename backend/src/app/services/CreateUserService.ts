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
  password: Yup.string().required(),
  // .matches(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/g),
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

class CreateUserService {
  async execute(data: any) {
    const usersRepository = getRepository(User);
    const addressRepository = getRepository(Address);
    let user;

    const userData = {
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
      telephone: data.telephone,
      role: data.role,
    };

    const userAddressData = {
      ...data.address,
    };

    await addressSchema.validate(userAddressData, {
      abortEarly: false,
    });

    await userSchema.validate(userData, {
      abortEarly: false,
    });

    const userAlreadyExists = await usersRepository.findOne({
      email: userData.email,
    });

    if (userAlreadyExists) throw new AppError(ERRORS.USER_ALREADY_REGISTERED);

    const hashedPass = await argon2.hash(userData.password);

    await getConnection().transaction(async (transactionalEntityManager) => {
      const userAddress = addressRepository.create({
        city: userAddressData.city,
        state: userAddressData.state,
        neighborhood: userAddressData.neighborhood,
        postal_code: userAddressData.postal_code,
        street: userAddressData.street,
        number: userAddressData.number,
        lat: userAddressData.lat,
        lng: userAddressData.lng,
      });

      user = usersRepository.create({
        ...userData,
        password: hashedPass,
      });

      user.address = userAddress;

      await transactionalEntityManager.save(userAddress);
      await transactionalEntityManager.save(user);
    });

    return user;
  }
}

export default CreateUserService;
