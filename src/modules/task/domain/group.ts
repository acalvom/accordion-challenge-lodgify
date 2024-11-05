import { Task, TaskPrimitives } from './task.ts'
import { Id } from '@/core/domain/interfaces/id.ts'
import { Uuid } from '@/core/domain/uuid/uuid.ts'

export interface GroupPrimitives {
  id: Id
  name: string
  tasks: TaskPrimitives[]
}

export class Group implements GroupPrimitives {
  id: Id
  name: string
  tasks: Task[]

  constructor(value: GroupPrimitives) {
    this.id = value.id || Uuid.create()
    this.name = value.name
    this.tasks = value.tasks.map(Task.from)
  }

  private _calculateTotal(): number {
    return this.tasks.reduce((sum, { value }) => sum + value, 0)
  }

  private _calculateCompleted(): number {
    return this.tasks.reduce((sum, { value, checked }) => (checked ? sum + value : sum), 0)
  }

  static calculateCompletionPercentage = (groups: Group[]): number => {
    const totalValue = groups.reduce((acc, group) => acc + group._calculateTotal(), 0)
    const completedValue = groups.reduce((acc, group) => acc + group._calculateCompleted(), 0)

    return totalValue ? (completedValue / totalValue) * 100 : 0
  }

  static from(value: GroupPrimitives): Group {
    return new Group(value)
  }
}
