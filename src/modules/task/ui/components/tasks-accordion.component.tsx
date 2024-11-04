import { Title } from '@/core/ui/components/title/title.component.tsx'
import { GroupList } from './accordion/group-list/group-list.component.tsx'
import { useTasks } from '@/modules/task/ui/contexts/task.context.tsx'

export const TasksAccordion = () => {
  const { taskGroups, completionPercentage } = useTasks()

  return (
    <>
      <Title>{`Completion: ${completionPercentage.toFixed(2)}%`}</Title>
      <GroupList groups={taskGroups} />
    </>
  )
}
