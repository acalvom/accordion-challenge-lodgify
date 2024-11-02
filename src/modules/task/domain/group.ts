import { Task, TaskDto } from './task.ts'
import { Id } from '@/core/domain/interfaces/id.ts'
import { Uuid } from '@/core/domain/uuid/uuid.ts'

export interface GroupDto {
  name: string
  tasks: TaskDto[]
}

export class Group implements GroupDto {
  id: Id
  name: string
  tasks: Task[]

  constructor(value: GroupDto) {
    this.id = Uuid.create()
    this.name = value.name
    this.tasks = value.tasks.map(Task.from)
  }

  static from(value: GroupDto): Group {
    return new Group(value)
  }
}
