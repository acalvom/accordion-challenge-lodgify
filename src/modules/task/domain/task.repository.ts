import { Group } from '@/modules/task/domain/group.ts'

export interface TaskRepository {
  getAll(): Promise<Group[]>
}
