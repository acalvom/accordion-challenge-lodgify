import { Task, TaskPrimitives } from './task.ts'
import { Id } from '@/core/domain/interfaces/id.ts'
import { Uuid } from '@/core/domain/uuid/uuid.ts'

export interface GroupPrimitives {
  name: string
  tasks: TaskPrimitives[]
}

export class Group implements GroupPrimitives {
  id: Id
  name: string
  tasks: Task[]

  constructor(value: GroupPrimitives) {
    this.id = Uuid.create()
    this.name = value.name
    this.tasks = value.tasks.map(Task.from)
  }

  static from(value: GroupPrimitives): Group {
    return new Group(value)
  }
}
