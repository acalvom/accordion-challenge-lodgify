import { Group, GroupDto } from '@/modules/task/domain/group.ts'
import { TaskMother } from '@/modules/task/domain/test/task.mother.ts'
import { faker } from '@faker-js/faker'
import { TaskDto } from '@/modules/task/domain/task.ts'

export class GroupMother {
  static withOneTask(task: TaskDto): Group {
    const groupDto: GroupDto = {
      name: faker.lorem.words({ min: 1, max: 5 }),
      tasks: [TaskMother.task(task)],
    }
    return Group.from(groupDto)
  }

  static withTasks(): Group {
    const groupDto: GroupDto = {
      name: faker.lorem.words({ min: 1, max: 5 }),
      tasks: TaskMother.list(),
    }
    return Group.from(groupDto)
  }

  static list(length: number = 3): Group[] {
    return Array.from({ length }, () => this.withTasks())
  }
}
