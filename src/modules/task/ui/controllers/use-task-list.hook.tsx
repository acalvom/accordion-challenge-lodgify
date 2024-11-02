import { useEffect, useState } from 'react'
import { TaskLocator } from '../di/task.locator.ts'
import { Group } from '@/modules/task/domain/group.ts'

export function useTaskList() {
  const [tasks, setTasks] = useState<Group[]>([])
  const [isFetching, setIsFetching] = useState(true)

  const getTasks = async () => {
    const getTasksQuery = TaskLocator.getTasksQuery()
    const tasks = await getTasksQuery.execute()

    setTasks(tasks)
    setTimeout(() => setIsFetching(false), 1000)
  }

  useEffect(() => {
    getTasks()
  }, [])

  return { tasks, hasTasks: tasks.length > 0, isFetching }
}
