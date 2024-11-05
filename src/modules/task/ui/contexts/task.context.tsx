/* eslint-disable react-refresh/only-export-components */

import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { Group } from '@/modules/task/domain/group.ts'
import { Id } from '@/core/domain/interfaces/id.ts'
import { Task } from '@/modules/task/domain/task.ts'

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
  const totalValue = taskGroups.reduce((acc, group) => acc + group.calculateTotal(), 0)
  const completedValue = taskGroups.reduce((acc, group) => acc + group.calculateCompleted(), 0)

  return totalValue ? (completedValue / totalValue) * 100 : 0
}

// TODO: refactor, and add test for context  and for this user interaction
export const TaskProvider: FC<PropsWithChildren<{ groups: Group[] }>> = ({ children, groups }) => {
  const [taskGroups, setTaskGroups] = useState(groups)
  const completionPercentage = calculateCompletionPercentage(taskGroups)

  useEffect(() => {
    setTaskGroups(groups)
  }, [groups])

  const toggleTaskChecked = (taskId: Id) => {
    setTaskGroups((prevTaskGroups) =>
      prevTaskGroups.map((group) => {
        const updatedTasks = group.tasks.map((task) =>
          task.id === taskId ? Task.from({ ...task, checked: !task.checked }) : task
        )

        return Group.from({
          name: group.name,
          tasks: updatedTasks.map((task) => task.toPrimitives()),
        })
      })
    )
  }

  return (
    <TaskContext.Provider value={{ taskGroups, completionPercentage, toggleTaskChecked }}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTasks = () => {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}
