import { getConnection, getRepository } from "typeorm";
import argon2 from "argon2";
import "reflect-metadata";
import dbConnection from "./app/database";

import Address from "./app/models/Address";
import User from "./app/models/User";

const fakeData = [
  {
    name: "admin",
    email: "admin@yahoo.com.br",
    username: "admin",
    password: "1234",
    telephone: "(99) 99999-9999",
    role: "ADMIN",
    address: {
      state: "PE",
      city: "Recife",
      neighborhood: "Vasco da Gama",
      postal_code: "52081-150",
      street: "Córrego do Visgueiro",
      number: "222",
      lat: "-8.005240419471187",
      lng: "-34.92003858089448",
    },
  },
  {
    name: "admin2",
    email: "admin2@yahoo.com.br",
    username: "admin2",
    password: "1234",
    telephone: "(88) 88888-8888",
    role: "ADMIN",
    address: {
      state: "MG",
      city: "Betim",
      neighborhood: "Guarujá",
      postal_code: "32603-235",
      street: "Rua Iara",
      number: "26",
      lat: "-19.9640024",
      lng: "-44.2070152",
    },
  },
  {
    name: "user",
    email: "user@yahoo.com.br",
    username: "user",
    password: "1234",
    telephone: "(77) 77777-7777",
    role: "CLIENT",
    address: {
      state: "AP",
      city: "Macapá",
      neighborhood: "Pacoval",
      postal_code: "68908-350",
      street: "Rua Mato Grosso",
      number: "270",
      lat: "0.05901948436441828",
      lng: "-51.05513513088227",
    },
  },
  {
    name: "user2",
    email: "user2@yahoo.com.br",
    username: "user2",
    password: "1234",
    telephone: "(66) 66666-6666",
    role: "CLIENT",
    address: {
      state: "TO",
      city: "Araguaína",
      neighborhood: "Setor Oeste",
      postal_code: "77816-330",
      street: "Rua Perimetral 007",
      number: "273",
      lat: "-7.207579749355022",
      lng: "-48.23395550251008",
    },
  },
];

dbConnection.then(async () => {
  await populate(fakeData);
});

async function populate(usersData: any) {
  const usersRepository = getRepository(User);
  const addressRepository = getRepository(Address);

  usersData.forEach(async (data: any) => {
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

    await getConnection().transaction(async (transactionalEntityManager) => {
      const hashedPass = await argon2.hash(userData.password);

      const userAddress = addressRepository.create({
        state: userAddressData.state,
        city: userAddressData.city,
        neighborhood: userAddressData.neighborhood,
        postal_code: userAddressData.postal_code,
        street: userAddressData.street,
        number: userAddressData.number,
        lat: userAddressData.lat,
        lng: userAddressData.lng,
      });

      const user = usersRepository.create({
        ...userData,
        password: hashedPass,
      });

      user.address = userAddress;

      await transactionalEntityManager.save(userAddress);
      await transactionalEntityManager.save(user);
    });
  });
}
