import { HStack, StackProps, Switch, SwitchProps, VStack } from '@chakra-ui/react'
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Body } from '../typography'

export type ControlledSwitchInputProps<
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
> = UseControllerProps<FormValues, Name> &
  Omit<SwitchProps, 'size'> & {
    label?: string
    labelComponent?: React.ReactNode
    error?: string
    switchPosition?: 'left' | 'right'
    containerProps?: StackProps
  }

export function ControlledSwitchInput<
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
>({
  switchPosition = 'right',
  containerProps,
  ...props
}: ControlledSwitchInputProps<FormValues, Name>) {
  const { field } = useController<FormValues, Name>(props)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (field?.onChange) {
      field.onChange(e)
    }

    if (props.onChange) {
      props.onChange(e)
    }
  }

  const label = props.labelComponent ? props.labelComponent : <Body size="md">{props.label}</Body>

  return (
    <VStack alignItems="flex-start" width="100%" {...containerProps}>
      <HStack>
        {switchPosition === 'right' && <>{label}</>}
        <Switch
          {...field}
          onChange={handleChange}
          sx={{ '--switch-track-width': '2.4rem', '--switch-track-height': '1.2rem' }}
          size="md"
          isChecked={Boolean(field.value ?? props.isChecked ?? props.value)}
          {...props}
        />
        {switchPosition === 'left' && <>{label}</>}
        {props.error && (
          <Body size="sm" color="error.9">
            {props.error}
          </Body>
        )}
      </HStack>
    </VStack>
  )
}
