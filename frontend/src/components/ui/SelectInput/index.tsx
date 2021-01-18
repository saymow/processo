import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

import {
  Container,
  Label,
  InputSelect,
  InputOptions,
  InputError,
} from "./styles";

interface Props {
  options: any;
  label: string;
  onBlurWatcher?: (
    e: React.FocusEvent<HTMLInputElement>,
    error: string | undefined
  ) => void;
}

const SelectInput: React.FC<InputHTMLAttributes<HTMLSelectElement> & Props> = ({
  children,
  options,
  label,
  onBlurWatcher,
  ...props
}) => {
  const [field, meta] = useField(props as any);

  const inputProps: Record<any, any> = {
    ...props,
    ...field,
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      field.onBlur(e);
      if (onBlurWatcher) onBlurWatcher(e, meta.error);
    },
  };

  return (
    <Container>
      <Label htmlFor={props.id}>{label}</Label>
      <InputSelect defaultValue="" {...inputProps}>
        <InputOptions value="" disabled hidden>
          SELECIONAR
        </InputOptions>
        {typeof options[0] === "string"
          ? options.map((option: string, i: number) => (
              <InputOptions key={i} value={option}>
                {option}
              </InputOptions>
            ))
          : options.map((option: any, i: number) => (
              <InputOptions key={i} value={option.value}>
                {option.text}
              </InputOptions>
            ))}
      </InputSelect>
      {meta.touched && meta.error && <InputError>{meta.error}</InputError>}
    </Container>
  );
};

export default SelectInput;
