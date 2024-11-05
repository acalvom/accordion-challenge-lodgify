/* eslint-disable react-refresh/only-export-components */

import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { Group } from '@/modules/task/domain/group.ts'
import { Id } from '@/core/domain/interfaces/id.ts'
import { Task } from '@/modules/task/domain/task.ts'

export interface TaskState {
  groupList: Group[]
  completionPercentage: number
  toggleTaskChecked: (taskId: string) => void
}

export const TaskContext = createContext<TaskState>({
  groupList: [],
  completionPercentage: 0,
  toggleTaskChecked: () => {},
})

export const TaskProvider: FC<PropsWithChildren<{ groups: Group[] }>> = ({ children, groups }) => {
  const [groupList, setGroupList] = useState(groups)
  const completionPercentage = Group.calculateCompletionPercentage(groupList)

  useEffect(() => {
    setGroupList(groups)
  }, [groups])

  const toggleTaskChecked = (taskId: Id) => {
    setGroupList((prevTaskGroups) =>
      prevTaskGroups.map((group) => {
        const updatedTasks = group.tasks.map((task) =>
          task.id === taskId
            ? Task.from({
                ...task,
                checked: !task.checked,
              })
            : task
        )

        return Group.from({
          id: group.id,
          name: group.name,
          tasks: updatedTasks.map((task) => task.toPrimitives()),
        })
      })
    )
  }

  return (
    <TaskContext.Provider value={{ groupList, completionPercentage, toggleTaskChecked }}>
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
