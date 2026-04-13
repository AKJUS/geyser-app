import { FormControl, Input, InputProps } from '@chakra-ui/react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

import { FieldContainer } from '../../components/form/FieldContainer'

export type TextFieldProps<
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
> = InputProps & {
  name: Name
  placeholder?: string
  label?: string
  caption?: string
  required?: boolean
  control: Control<FormValues>
}

export const TextField = <
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
>({
  control,
  name,
  placeholder,
  required,
  label,
  caption,
  ...props
}: TextFieldProps<FormValues, Name>) => {
  return (
    <Controller<FormValues, Name>
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl>
          <FieldContainer
            title={
              label && (
                <>
                  {label}
                  {required ? '*' : ''}
                </>
              )
            }
            subtitle={caption}
            error={fieldState.error ? fieldState.error.message?.toString() || '' : null}
          >
            <Input type="text" placeholder={placeholder || 'Type here'} {...props} {...field} />
          </FieldContainer>
        </FormControl>
      )}
    />
  )
}
