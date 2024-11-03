import { Task, TaskDto } from '@/modules/task/domain/task.ts'
import { faker } from '@faker-js/faker'

export class TaskMother {
  static task(taskDto?: Partial<TaskDto>) {
    const baseTaskDto: TaskDto = {
      description: faker.lorem.words({ min: 1, max: 5 }),
      checked: faker.datatype.boolean(),
      value: faker.number.int({ min: 1, max: 50 }),
    }
    return Task.from({ ...baseTaskDto, ...taskDto })
  }

  static checkedTask(taskDto?: Partial<TaskDto>) {
    const baseTaskDto: TaskDto = {
      description: faker.lorem.words({ min: 1, max: 5 }),
      checked: true,
      value: faker.number.int({ min: 1, max: 50 }),
    }
    return Task.from({ ...baseTaskDto, ...taskDto })
  }

  static uncheckedTask(taskDto?: Partial<TaskDto>) {
    const baseTaskDto: TaskDto = {
      description: faker.lorem.words({ min: 1, max: 5 }),
      checked: false,
      value: faker.number.int({ min: 1, max: 50 }),
    }
    return Task.from({ ...baseTaskDto, ...taskDto })
  }

  static list(taskDto?: Partial<TaskDto>, length: number = 3) {
    const overrideLength = taskDto ? length - 1 : length
    const task = taskDto ? [this.task(taskDto)] : []
    const taskList = Array.from({ length: overrideLength }).map(() => this.task())

    return [...task, ...taskList]
  }
}
