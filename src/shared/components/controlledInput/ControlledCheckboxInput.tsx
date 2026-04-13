import { Checkbox, CheckboxProps, VStack } from '@chakra-ui/react'
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Body } from '../typography'

type Props<
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
> = UseControllerProps<FormValues, Name> &
  CheckboxProps & {
    label: string
    error?: string
    defaultChecked?: boolean
  }

export function ControlledCheckboxInput<
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
>(props: Props<FormValues, Name>) {
  const { field, fieldState } = useController<FormValues, Name>(props)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (field?.onChange) {
      field.onChange(e)
    }

    if (props.onChange) {
      props.onChange(e)
    }
  }

  const error = fieldState.error?.message ? `${fieldState.error.message}` : props.error ? props.error : ''

  return (
    <VStack alignItems="flex-start" width="100%">
      <Checkbox {...field} {...props} onChange={handleChange} defaultChecked={props.defaultValue || false}>
        <Body size={props.size || 'md'} color="neutral.700">
          {props.label}
        </Body>
      </Checkbox>
      {error && (
        <Body size="sm" fontWeight="400" color="secondary.red">
          {error}
        </Body>
      )}
    </VStack>
  )
}
