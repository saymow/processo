import * as Yup from "yup";

export const userEditSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  username: Yup.string().required().min(3).max(32),
  telephone: Yup.string()
    .required()
    .matches(/(\({1})(\d{2})(\){1})\s(\d{5})(-{1})(\d{4})/),
  role: Yup.string().required().oneOf(["ADMIN", "CLIENT"]),
  state: Yup.string().required(),
  city: Yup.string().required(),
  neighborhood: Yup.string().required(),
  street: Yup.string().required(),
  postal_code: Yup.string().required(),
  number: Yup.string().required(),
  lat: Yup.string().required(),
  lng: Yup.string().required(),
});

export const loginSchema = Yup.object().shape({
  username: Yup.string().min(3).max(32).required(),
  password: Yup.string().required(),
});

export const userCreateSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  username: Yup.string().required().min(3).max(32),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")]),
  telephone: Yup.string()
    .required()
    .matches(/(\({1})(\d{2})(\){1})\s(\d{5})(-{1})(\d{4})/),
  role: Yup.string().required().oneOf(["ADMIN", "CLIENT"]),
  state: Yup.string().required(),
  city: Yup.string().required(),
  neighborhood: Yup.string().required(),
  street: Yup.string().required(),
  postal_code: Yup.string().required(),
  number: Yup.string().required(),
  lat: Yup.string().required(),
  lng: Yup.string().required(),
});

export const userEditValidation = async (
  gonnaChangePass: boolean,
  data: any
) => {
  const errorsMap: Record<string, string> = {};

  try {
    const schema = gonnaChangePass ? userCreateSchema : userEditSchema;

    await schema.validate(data, { abortEarly: false });
  } catch (err) {
    if (err instanceof Yup.ValidationError) {
      err.inner.forEach((error) => {
        errorsMap[error.path as string] = error.message;
      });
    }
  }

  return errorsMap;
};

export const TELEPHONE_MASK = [
  "(",
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const POSTALCODE_MASK = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
];
