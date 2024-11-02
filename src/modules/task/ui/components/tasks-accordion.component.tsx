import { Loading } from '@/core/ui/components/loading/loading.component.tsx'
import { Title } from '@/core/ui/components/title/title.component.tsx'
import { useTaskList } from '../controllers/use-task-list.hook.tsx'
import { GroupList } from './accordion/group-list/group-list.component.tsx'

export const TasksAccordion = () => {
  const { tasks, hasTasks, isFetching } = useTaskList()
  const showTasks = !isFetching && hasTasks

  return (
    <>
      {isFetching && <Loading />}
      {showTasks ? <GroupList groups={tasks} /> : <Title>No tasks to show</Title>}
    </>
  )
}
