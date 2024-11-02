import { useTaskList } from '../controllers/use-task-list.hook.tsx'
import { Loading } from '@/core/ui/components/loading/loading.component.tsx'
import { Accordion } from '@/core/ui/components/accordion/accordion.component.tsx'
import { Title } from '@/core/ui/components/title/title.component.tsx'

export const GroupList = () => {
  const { tasks, hasTasks, isFetching } = useTaskList()
  const showTasks = !isFetching && hasTasks

  return (
    <>
      {isFetching && <Loading />}
      {showTasks ? <Accordion items={tasks} /> : <Title>No podcasts to show</Title>}
    </>
  )
}
