import { describe, expect, it, vi } from 'vitest'
import { Group } from '@/modules/task/domain/group.ts'
import { TaskRepository } from '@/modules/task/domain/task.repository.ts'
import { GetTasksQuery } from '@/modules/task/application/get-tasks.query.ts'
import { GroupMother } from '@/modules/task/domain/test/group.mother.ts'

describe('GetTasksQuery', () => {
  it('should call the repository and return a list of groups', async () => {
    const groups: Group[] = GroupMother.list()

    const taskRepository: TaskRepository = {
      getAll: vi.fn().mockResolvedValue(groups),
    }

    const getTasksQuery = new GetTasksQuery(taskRepository)

    const expectedGroups = await getTasksQuery.execute()

    expect(taskRepository.getAll).toHaveBeenCalledOnce()
    expect(expectedGroups).toEqual(groups)
  })
})
