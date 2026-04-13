import { BoxProps, HStack, VStack } from '@chakra-ui/react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { SkeletonLayout } from '../../shared/components/layouts'
import { MdxMarkdownEditor } from './MdxMarkdownEditor.tsx'

export type MarkdownFieldProps<
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
> = {
  autoFocus?: boolean
  preview?: boolean
  content?: string
  placeholder?: string
  initialContent?: () => string
  initialContentReady?: boolean
  name?: Name
  control?: Control<FormValues>
  flex?: boolean
  stickyToolbar?: string | number
  toolbarWrapperProps?: BoxProps
  editorWrapperProps?: Omit<BoxProps, 'flex'> & { minHeight?: string | number }
  markdownRawEditorProps?: { minHeight?: string | number }
  enableRawMode?: boolean
  isEditorMode?: boolean
  toggleEditorMode?: () => void
  isFloatingToolbar?: boolean
  noFloatingToolbar?: boolean
  toolbarMaxWidth?: number | string
  fontFamily?: string
}

/** Legacy compatibility bridge from Remirror-based props to the shared MDX editor API. */
export const MarkdownField = <
  FormValues extends FieldValues = FieldValues,
  Name extends FieldPath<FormValues> = FieldPath<FormValues>,
>({
  autoFocus,
  preview,
  content,
  placeholder,
  initialContent,
  initialContentReady = true,
  name,
  control,
  editorWrapperProps,
  markdownRawEditorProps,
  fontFamily,
}: MarkdownFieldProps<FormValues, Name>) => {
  const resolvedValue = content ?? initialContent?.() ?? ''
  const minHeight = markdownRawEditorProps?.minHeight ?? editorWrapperProps?.minHeight ?? (preview ? '0px' : '120px')

  if (preview) {
    return <MdxMarkdownEditor mode="preview" value={resolvedValue} minHeight={minHeight} fontFamily={fontFamily} />
  }

  if (!initialContentReady) {
    return null
  }

  if (control) {
    return (
      <MdxMarkdownEditor
        mode="edit"
        control={control}
        name={name ?? ('description' as Name)}
        autoFocus={autoFocus}
        placeholder={placeholder}
        minHeight={minHeight}
        fontFamily={fontFamily}
      />
    )
  }

  return (
    <MdxMarkdownEditor
      mode="edit"
      value={resolvedValue}
      onChange={() => undefined}
      autoFocus={autoFocus}
      placeholder={placeholder}
      minHeight={minHeight}
      fontFamily={fontFamily}
    />
  )
}

export const MarkdownFieldSkeleton = () => {
  return (
    <VStack w="full" p="10px" spacing="40px">
      <HStack w="full">
        <SkeletonLayout h="40px" w="80px" />
        <SkeletonLayout h="40px" w="160px" />
        <SkeletonLayout h="40px" w="120px" />
        <SkeletonLayout h="40px" w="160px" />
        <SkeletonLayout h="40px" w="80px" />
        <SkeletonLayout h="40px" w="160px" />
      </HStack>
      <SkeletonLayout h="400px" w="full" />
    </VStack>
  )
}
