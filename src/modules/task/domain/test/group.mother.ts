import { Group, GroupPrimitives } from '@/modules/task/domain/group.ts'
import { TaskMother } from '@/modules/task/domain/test/task.mother.ts'
import { faker } from '@faker-js/faker'
import { TaskPrimitives } from '@/modules/task/domain/task.ts'

export class GroupMother {
  static empty(): Group {
    return Group.from({
      name: faker.lorem.words({ min: 1, max: 5 }),
      tasks: [],
    })
  }

  static withOneTask(task: TaskPrimitives): Group {
    const groupPrimitives: GroupPrimitives = {
      name: faker.lorem.words({ min: 1, max: 5 }),
      tasks: [TaskMother.task(task)],
    }
    return Group.from(groupPrimitives)
  }

  static withTasks(): Group {
    const groupPrimitives: GroupPrimitives = {
      name: faker.lorem.words({ min: 1, max: 5 }),
      tasks: TaskMother.list(),
    }
    return Group.from(groupPrimitives)
  }

  static list(length: number = 3): Group[] {
    return Array.from({ length }, () => this.withTasks())
  }

  static primitive(): GroupPrimitives {
    return {
      name: faker.lorem.words({ min: 1, max: 5 }),
      tasks: TaskMother.primitiveList(),
    }
  }
}
