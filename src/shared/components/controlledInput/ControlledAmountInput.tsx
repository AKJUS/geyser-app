import { Input, InputGroup, InputProps, InputRightAddon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FieldPath, FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { RewardCurrency } from '@/types'
import { toInt } from '@/utils'

import { FieldContainer } from '../form'
import { Body } from '../typography'

type ControlledAmountInputProps<
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
> = UseControllerProps<FormValues, Name> &
  Omit<InputProps, 'size'> & {
    width?: string | number
    inputRef?: React.Ref<HTMLInputElement>
    description?: string
    label?: string
    error?: React.ReactNode
    disableErrorLabel?: boolean
    rightAddon?: React.ReactNode
    required?: boolean
    infoTooltip?: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
    fontSize?: string
    currency: RewardCurrency
  }

export function ControlledAmountInput<
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
>(props: ControlledAmountInputProps<FormValues, Name>) {
  const { field, fieldState } = useController<FormValues, Name>({ name: props.name, control: props.control })
  const [formattedValue, setFormattedValue] = useState('')

  useEffect(() => {
    if (field.value) {
      const numericValue = Number(field.value)
      const initialValue =
        props.currency === RewardCurrency.Usdcent ? (numericValue / 100).toFixed(2) : numericValue.toString()
      setFormattedValue(initialValue)
    } else {
      setFormattedValue('')
    }
  }, [field.value, props.currency])

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')
    let formattedAmount = value
    if (props.currency === RewardCurrency.Usdcent) {
      formattedAmount = parseFloat(value).toFixed(2)
    } else {
      formattedAmount = toInt(value).toFixed(0)
    }

    setFormattedValue(formattedAmount)
    field.onChange(
      props.currency === RewardCurrency.Usdcent ? toInt(parseFloat(formattedAmount) * 100) : toInt(formattedAmount),
    )

    if (field?.onBlur) {
      field.onBlur()
    }

    if (props.onBlur) {
      props.onBlur(e)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')
    setFormattedValue(value)

    if (props.onChange) {
      props.onChange(e)
    }
  }

  const error = fieldState.error?.message ? `${fieldState.error.message}` : props.error ? props.error : ''

  const title =
    props.label || props.infoTooltip ? (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Body size={props.size || 'md'} medium>
          {props.label}
        </Body>
        {props.infoTooltip && props.infoTooltip}
      </div>
    ) : null

  return (
    <FieldContainer
      required={props.required}
      title={title}
      subtitle={props.description}
      error={!props.disableErrorLabel && error}
    >
      <InputGroup>
        <Input
          {...field}
          {...props}
          variant="outline"
          colorScheme="primary1.1"
          borderColor="neutral1.6"
          borderRadius="8px"
          borderWidth="1px"
          ref={props.inputRef}
          isDisabled={props.isDisabled}
          onBlur={handleBlur}
          onChange={handleChange}
          width={props.width || '100%'}
          value={formattedValue}
          isInvalid={Boolean(error)}
          size={props.size || 'md'}
          fontSize={props.fontSize || 'md'}
        />
        {props.rightAddon && <InputRightAddon>{props.rightAddon}</InputRightAddon>}
      </InputGroup>
    </FieldContainer>
  )
}
