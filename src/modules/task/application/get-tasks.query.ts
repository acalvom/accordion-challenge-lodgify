import { Query } from '@/core/application/usecase/query.ts'
import { Group } from '../domain/group.ts'
import { TaskRepository } from '../domain/task.repository.ts'

export class GetTasksQuery implements Query<Group[]> {
  constructor(private taskRepository: TaskRepository) {}

  execute(): Promise<Group[]> {
    return this.taskRepository.getAll()
  }
}
