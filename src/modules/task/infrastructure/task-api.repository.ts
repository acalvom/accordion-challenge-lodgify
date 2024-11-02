import { TaskRepository } from '@/modules/task/domain/task.repository.ts'
import { HttpClient } from '@/lib/http-client.ts'
import { GroupDto } from './task-api-response.dto.ts'
import { Group } from '@/modules/task/domain/group.ts'

export class TaskApiRepository implements TaskRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async getAll(): Promise<Group[]> {
    const groupsDto: GroupDto[] = await this.httpClient.get()
    return groupsDto.map(Group.from)
  }
}
