import { AxiosRequestConfig } from "axios";
import { FormikProps } from "formik";
import { toast } from "react-toastify";
import { CEP_ABERTO_TOKEN } from "../constants";
import servicesApi from "../services/servicesApi";

export async function postalCodeWatcher(
  this: FormikProps<any>,
  e: React.FocusEvent<HTMLInputElement>,
  error: string | undefined
) {
  try {
    if (error) return;
    const postalCode = e.target.value;
    const formattedPostalCode = postalCode.replace("-", ""); // 99999-999 -> 99999999

    const { data: dataFirstService } = await servicesApi.get(
      `https://viacep.com.br/ws/${formattedPostalCode}/json`
    );

    if (dataFirstService.erro) throw new Error();

    const formmatedData = {
      street: dataFirstService.logradouro,
      neighborhood: dataFirstService.bairro,
      state: dataFirstService.uf,
      city: dataFirstService.localidade,
    } as any;

    const options = {
      headers: {
        Authorization: `Token token=${CEP_ABERTO_TOKEN}`,
      },
      params: {
        estado: formmatedData.state,
        cidade: formmatedData.city,
        bairro: formmatedData.neighborhood,
        logradouro: formmatedData.street,
      },
    } as AxiosRequestConfig;

    const { data: dataSecondService } = await servicesApi.get(
      "https://cors-anywhere.herokuapp.com/https://www.cepaberto.com/api/v3/address",
      options
    );

    formmatedData.lng = dataSecondService.longitude;
    formmatedData.lat = dataSecondService.latitude;

    // mapPos renderiza o mapa, e somente pode ser mudada através da busca pelo cep
    formmatedData.mapLng = dataSecondService.longitude;
    formmatedData.mapLat = dataSecondService.latitude;

    for (const property in formmatedData)
      this.setFieldValue(property, formmatedData[property]);
  } catch (err) {
    toast.error(`Erro ao localizar cep.`);
    this.setErrors({ postal_code: "Cep invalido" });
    this.resetForm();
  }
}
