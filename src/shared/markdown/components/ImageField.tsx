import { FormControl } from '@chakra-ui/react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

import { FileUpload } from '@/shared/molecules'

import { UploadBox } from '../../../components/ui'
import { FieldContainer } from '../../components/form/FieldContainer'

export type ImageFieldProps<
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
> = {
  name: Name
  caption?: string
  label?: string
  required?: boolean
  control: Control<FormValues>
}

export const ImageField = <
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
>({
  control,
  name,
  caption,
  required,
  label,
}: ImageFieldProps<FormValues, Name>) => {
  return (
    <Controller<FormValues, Name>
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl>
          <FieldContainer
            title={
              <>
                {label || name}
                {required ? '*' : ''}
              </>
            }
            subtitle={caption}
            error={fieldState.error ? fieldState.error.message?.toString() || '' : null}
          >
            <FileUpload
              showcase
              caption={caption}
              src={field.value}
              onUploadComplete={field.onChange}
              onDeleteClick={() => field.onChange('')}
              childrenOnLoading={<UploadBox loading />}
              containerProps={{ width: '100%' }}
            >
              <UploadBox h={10} title={field.value ? 'Change image' : undefined} />
            </FileUpload>
          </FieldContainer>
        </FormControl>
      )}
    />
  )
}
