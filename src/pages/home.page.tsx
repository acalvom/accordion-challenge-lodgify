import { Layout } from '@/core/ui/components/layout/layout.component.tsx'
import { TasksAccordion } from '@/modules/task/ui/components/tasks-accordion.component.tsx'

export const Home = () => {
  return (
    <Layout>
      <TasksAccordion />
    </Layout>
  )
}
