import { HttpClient } from '@/lib/http-client'
import { GetTasksQuery } from '@/modules/task/application/get-tasks.query.ts'
import { TaskApiRepository } from '@/modules/task/infrastructure/task-api.repository.ts'

export class TaskLocator {
  static http = HttpClient.create(import.meta.env.VITE_API_URL)
  static taskApiRepository = new TaskApiRepository(this.http)

  static getTasksQuery() {
    return new GetTasksQuery(this.taskApiRepository)
  }
}
