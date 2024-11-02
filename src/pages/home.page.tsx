import { Layout } from '@/core/ui/components/layout/layout.component.tsx'
import { GroupList } from '@/modules/task/ui/components/group-list.component.tsx'

export const Home = () => {
  return (
    <Layout>
      <GroupList />
    </Layout>
  )
}
