import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { Group } from '@/modules/task/domain/group.ts'

export interface TaskState {
  taskGroups: Group[]
  completionPercentage: number
  toggleTaskChecked: (taskId: string) => void
}

export const TaskContext = createContext<TaskState>({
  taskGroups: [],
  completionPercentage: 0,
  toggleTaskChecked: () => {},
})

const calculateCompletionPercentage = (taskGroups: Group[]): number => {
  const totalValue = taskGroups.reduce(
    (acc, group) => acc + group.tasks.reduce((sum, task) => sum + task.value, 0),
    0
  )

  const completedValue = taskGroups.reduce(
    (acc, group) =>
      acc + group.tasks.reduce((sum, task) => (task.checked ? sum + task.value : sum), 0),
    0
  )

  return totalValue ? (completedValue / totalValue) * 100 : 0
}

export const TaskProvider: FC<PropsWithChildren<{ groups: Group[] }>> = ({ children, groups }) => {
  const [taskGroups, setTaskGroups] = useState(groups)
  const completionPercentage = calculateCompletionPercentage(taskGroups)

  useEffect(() => {
    setTaskGroups(groups)
  }, [groups])

  const toggleTaskChecked = (taskId: string) => {
    setTaskGroups((prevTaskGroups) =>
      prevTaskGroups.map((group) => ({
        ...group,
        tasks: group.tasks.map((task) =>
          task.id === taskId ? { ...task, checked: !task.checked } : task
        ),
      }))
    )
  }

  console.log(completionPercentage)
  return (
    <TaskContext.Provider value={{ taskGroups, completionPercentage, toggleTaskChecked }}>
      {children}
    </TaskContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}
