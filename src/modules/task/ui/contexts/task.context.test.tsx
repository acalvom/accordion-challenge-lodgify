import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TaskMother } from '@/modules/task/domain/test/task.mother.ts'
import { GroupMother } from '@/modules/task/domain/test/group.mother.ts'
import { TaskProvider, useTasks } from '@/modules/task/ui/contexts/task.context.tsx'
import { customRender, userEvent } from '@/test/setup.ts'
import { Id } from '@/core/domain/interfaces/id.ts'

const ConsumerComponent = ({ taskId = '1' }: { taskId?: Id }) => {
  const { completionPercentage, toggleTaskChecked } = useTasks()
  return (
    <div>
      <div data-testid="completion-percentage">{completionPercentage}</div>
      <button onClick={() => toggleTaskChecked(taskId)}>Toggle Task</button>
    </div>
  )
}

const setup = () => {
  const task1 = TaskMother.task({ value: 5, checked: false })
  const task2 = TaskMother.task({ value: 10, checked: false })

  const group = GroupMother.withTasks(task1, task2)

  return { group }
}

describe('TaskProvider', () => {
  it('should provide initial taskGroups and completionPercentage', async () => {
    const { group } = setup()

    customRender(
      <TaskProvider groups={[group]}>
        <ConsumerComponent />
      </TaskProvider>
    )

    const percentage = screen.getByTestId('completion-percentage')
    expect(percentage).toBeInTheDocument()

    expect(percentage.textContent).toBe('0')
  })

  it('should update completion percentage when a task is toggled', async () => {
    const { group } = setup()

    const task1Id = group.tasks[0].id

    render(
      <TaskProvider groups={[group]}>
        <ConsumerComponent taskId={task1Id} />
      </TaskProvider>
    )

    const toggleButton = screen.getByRole('button')
    await userEvent.click(toggleButton)

    const percentage = screen.getByTestId('completion-percentage')
    const percentageValue = parseFloat(percentage.textContent || '').toFixed(2)

    expect(percentage.textContent).not.toBe('0')
    expect(percentageValue).toBe('33.33')
  })
})
