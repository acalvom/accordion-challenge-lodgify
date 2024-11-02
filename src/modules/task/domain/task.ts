import { Id } from '@/core/domain/interfaces/id.ts'
import { Uuid } from '@/core/domain/uuid/uuid.ts'

export interface TaskDto {
  description: string
  value: number
  checked: boolean
}

export class Task implements TaskDto {
  id: Id
  description: string
  value: number
  checked: boolean

  constructor(value: TaskDto) {
    this.id = Uuid.create()
    this.description = value.description
    this.value = value.value
    this.checked = value.checked
  }

  static from(value: TaskDto): Task {
    return new Task(value)
  }
}
