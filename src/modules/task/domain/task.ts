import { Id } from '@/core/domain/interfaces/id.ts'
import { Uuid } from '@/core/domain/uuid/uuid.ts'

export interface TaskPrimitives {
  id?: Id
  description: string
  value: number
  checked: boolean
}

export class Task implements TaskPrimitives {
  id: Id
  description: string
  value: number
  checked: boolean

  constructor(value: TaskPrimitives) {
    this.id = value.id || Uuid.create()
    this.description = value.description
    this.value = value.value
    this.checked = value.checked
  }

  static from(value: TaskPrimitives): Task {
    return new Task(value)
  }

  toPrimitives(): TaskPrimitives {
    return {
      id: this.id,
      description: this.description,
      value: this.value,
      checked: this.checked,
    }
  }
}
