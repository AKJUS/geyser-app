import { Box } from '@chakra-ui/react'
import { Emoji, EmojiStyle } from 'emoji-picker-react'
import { Controller, FieldPath, FieldValues, UseControllerProps } from 'react-hook-form'

import { AddEmojiIcon } from '../../../components/icons/svg/AddEmojiIcon'

type Props<
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
> = UseControllerProps<FormValues, Name> & {
  isDisabled?: boolean
  onOpenEmojiPicker: () => void
}

export function ControlledEmojiInput<
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
>({ control, name, onOpenEmojiPicker, isDisabled }: Props<FormValues, Name>) {
  return (
    <Controller<FormValues, Name>
      name={name}
      control={control}
      render={({ field }) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          border="2px solid"
          borderColor="neutral.200"
          borderRadius="8px"
          cursor={isDisabled ? 'not-allowed' : 'pointer'}
          p={1}
          width="40px"
          height="40px"
          onClick={() => {
            if (!isDisabled) {
              onOpenEmojiPicker()
            }
          }}
        >
          {field.value ? (
            <Box>
              <Emoji size={24} unified={field.value} emojiStyle={EmojiStyle.NATIVE} />
            </Box>
          ) : (
            <AddEmojiIcon color={isDisabled ? 'neutral.200' : 'neutral.700'} />
          )}
        </Box>
      )}
    />
  )
}
