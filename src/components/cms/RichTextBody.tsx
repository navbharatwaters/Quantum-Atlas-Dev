import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

/** Lexical content from the CMS, styled for the dark/amber theme (see .cms-prose in globals.css). */
export function RichTextBody({ data }: { data?: SerializedEditorState | null }) {
  if (!data?.root?.children?.length) return null
  return <RichText data={data} className="cms-prose max-w-3xl" />
}
