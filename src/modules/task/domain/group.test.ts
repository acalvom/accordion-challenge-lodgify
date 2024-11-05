import { describe, expect, it } from 'vitest'
import { Group } from './group.ts'
import { Task } from './task'
import { GroupMother } from '@/modules/task/domain/test/group.mother.ts'
import { TaskMother } from '@/modules/task/domain/test/task.mother.ts'

describe('Group', () => {
  it('should create an instance with the correct properties using from()', () => {
    const groupPrimitives = GroupMother.primitive()
    const group = Group.from(groupPrimitives)

    expect(group).toBeInstanceOf(Group)
    expect(group.name).toBe(groupPrimitives.name)
    expect(group.tasks).toHaveLength(groupPrimitives.tasks.length)
    expect(group.tasks[0]).toBeInstanceOf(Task)
  })

  it('should calculate the total value of tasks', () => {
    const task1 = TaskMother.task({ value: 5 })
    const task2 = TaskMother.task({ value: 10 })
    const task3 = TaskMother.task({ value: 15 })
    const group = Group.from({ name: 'Group 1', tasks: [task1, task2, task3] })

    const totalValue = group['_calculateTotal']()

    expect(totalValue).toBe(30)
  })

  it('should calculate the completed value of checked tasks', () => {
    const task1 = TaskMother.task({ value: 5, checked: true })
    const task2 = TaskMother.task({ value: 10, checked: false })
    const task3 = TaskMother.task({ value: 15, checked: true })
    const group = Group.from({ name: 'Group 1', tasks: [task1, task2, task3] })

    const completedValue = group['_calculateCompleted']()

    expect(completedValue).toBe(20)
  })

  it('should calculate the correct completion percentage for a single group', () => {
    const task1 = TaskMother.task({ value: 5, checked: true })
    const task2 = TaskMother.task({ value: 10, checked: false })
    const task3 = TaskMother.task({ value: 15, checked: true })
    const group = Group.from({ name: 'Group 1', tasks: [task1, task2, task3] })

    const completionPercentage = Group.calculateCompletionPercentage([group])

    expect(completionPercentage).toBeCloseTo(66.67, 2) // (20 / 30) * 100 = 66.67
  })

  it('should calculate 0% completion if there are no tasks', () => {
    const emptyGroup = GroupMother.empty()
    const completionPercentage = Group.calculateCompletionPercentage([emptyGroup])

    expect(completionPercentage).toBe(0)
  })

  it('should handle multiple groups when calculating completion percentage', () => {
    const task1 = TaskMother.task({ value: 20, checked: true })
    const task2 = TaskMother.task({ value: 30, checked: false })
    const task3 = TaskMother.task({ value: 10, checked: true })

    const group1 = Group.from({ name: 'Group 1', tasks: [task1, task2] })
    const group2 = Group.from({ name: 'Group 2', tasks: [task2, task3] })

    const completedValue = 20 + 10
    const totalValue = 20 + 30 + 30 + 10
    const completionPercentage = Group.calculateCompletionPercentage([group1, group2])

    const expectedCompletionPercentage = (completedValue / totalValue) * 100
    expect(completionPercentage).toBeCloseTo(expectedCompletionPercentage, 2) // (30 / 90) * 100 = 33.33
  })
})
