import { EditorPageClient } from '@/components/editor/editor-page-client'

export default async function EditorPage(props: PageProps<'/editor/[id]'>) {
  const { id } = await props.params

  return <EditorPageClient resumeId={id} />
}
