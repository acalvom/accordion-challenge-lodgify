import { GroupList } from './accordion/group-list/group-list.component.tsx'
import { useTasks } from '@/modules/task/ui/contexts/task.context.tsx'
import { Percentage } from '@/core/ui/components/percentage/percentage.component.tsx'

export const TasksComponent = () => {
  const { taskGroups, completionPercentage } = useTasks()

  return (
    <>
      <Percentage value={completionPercentage} />
      <GroupList groups={taskGroups} />
    </>
  )
}
