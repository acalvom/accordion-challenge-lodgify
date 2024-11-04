import { Layout } from '@/core/ui/components/layout/layout.component.tsx'
import { TasksComponent } from '@/modules/task/ui/components/tasks.component.tsx'
import { TaskProvider } from '@/modules/task/ui/contexts/task.context'
import { useTaskList } from '@/modules/task/ui/controllers/use-task-list.hook.tsx'
import { Loading } from '@/core/ui/components/loading/loading.component.tsx'
import { Title } from '@/core/ui/components/title/title.component.tsx'

export const Home = () => {
  const { tasks, hasTasks, isFetching } = useTaskList()
  const showTasks = !isFetching && hasTasks

  return (
    <Layout>
      <TaskProvider groups={tasks}>
        {isFetching && <Loading />}
        {showTasks ? <TasksComponent /> : <Title>No tasks to show</Title>}
      </TaskProvider>
    </Layout>
  )
}
