import { describe, expect, it, vi } from 'vitest'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'

import { Home } from './home.page.tsx'
import { customRender, userEvent } from '@/test/setup.ts'
import { TaskLocator } from '@/modules/task/ui/di/task.locator.ts'
import { GetTasksQuery } from '@/modules/task/application/get-tasks.query.ts'
import { GroupMother } from '@/modules/task/domain/test/group.mother.ts'
import { Group } from '@/modules/task/domain/group.ts'
import { TaskMother } from '@/modules/task/domain/test/task.mother.ts'
import { TaskProvider } from '@/modules/task/ui/contexts/task.context'

describe('Home page', () => {
  const setup = (groupList: Group[]) => {
    const getTasksQuery = {
      execute: vi.fn().mockResolvedValue(groupList),
    }
    vi.spyOn(TaskLocator, 'getTasksQuery').mockReturnValue(
      getTasksQuery as unknown as GetTasksQuery
    )

    const homeRender = () =>
      customRender(
        <TaskProvider groups={groupList}>
          <Home />
        </TaskProvider>
      )
    return { getTasksQuery, homeRender }
  }

  describe('Percentage interaction', () => {
    it('should display the completion percentage', async () => {
      const group = GroupMother.withTasks(
        TaskMother.checkedTask({ value: 10 }),
        TaskMother.uncheckedTask({ value: 20 })
      )

      const { homeRender } = setup([group])

      homeRender()

      const loadingSpinner = screen.queryByLabelText('loading-spinner')
      await waitForElementToBeRemoved(loadingSpinner)

      const percentage = screen.getByText('33.33%')
      expect(percentage).toBeInTheDocument()
    })

    it('should update the completion percentage when a task is checked', async () => {
      const group = GroupMother.withTasks(
        TaskMother.checkedTask({ value: 10 }),
        TaskMother.uncheckedTask({ value: 20 })
      )

      const { homeRender } = setup([group])

      homeRender()

      const loadingSpinner = screen.queryByLabelText('loading-spinner')
      await waitForElementToBeRemoved(loadingSpinner)

      const percentage = screen.getByText('33.33%')
      expect(percentage).toBeInTheDocument()

      const toggleButton = screen.getByText('Show')
      expect(toggleButton).toBeInTheDocument()
      await userEvent.click(toggleButton)

      const taskDescription = group.tasks[1].description
      const checkbox = screen.getByRole('checkbox', {
        name: taskDescription,
      })
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).not.toBeChecked()

      await userEvent.click(checkbox)
      expect(checkbox).toBeChecked()

      const updatedPercentage = screen.getByText('100.00%')
      expect(updatedPercentage).toBeInTheDocument()
    })
  })

  describe('Accordion interaction', () => {
    it('should display app title and loading spinner', async () => {
      const { homeRender } = setup([])

      homeRender()

      const title = screen.getByText('Lodgify Grouped Tasks')
      expect(title).toBeInTheDocument()

      const loadingSpinner = screen.queryByLabelText('loading-spinner')
      expect(loadingSpinner).toBeInTheDocument()

      await waitForElementToBeRemoved(loadingSpinner)

      expect(loadingSpinner).not.toBeInTheDocument()
    })

    it('should show the accordion with folded groups', async () => {
      const groupList = GroupMother.list()
      const [group1, group2, group3] = groupList

      const { homeRender, getTasksQuery } = setup(groupList)

      homeRender()

      const loadingSpinner = screen.queryByLabelText('loading-spinner')
      await waitForElementToBeRemoved(loadingSpinner)

      expect(getTasksQuery.execute).toHaveBeenCalledOnce()

      const nameGroup1 = await screen.findByText(group1.name)
      expect(nameGroup1).toBeInTheDocument()

      const nameGroup2 = await screen.findByText(group2.name)
      expect(nameGroup2).toBeInTheDocument()

      const nameGroup3 = await screen.findByText(group3.name)
      expect(nameGroup3).toBeInTheDocument()

      const showLabel = screen.getAllByText('Show')
      expect(showLabel).toHaveLength(groupList.length)
    })

    it('should unfold a group from the accordion', async () => {
      const group = GroupMother.withTasks()
      const { getTasksQuery, homeRender } = setup([group])

      homeRender()

      const loadingSpinner = screen.queryByLabelText('loading-spinner')
      await waitForElementToBeRemoved(loadingSpinner)

      expect(getTasksQuery.execute).toHaveBeenCalledOnce()

      const nameGroup1 = await screen.findByText(group.name)
      expect(nameGroup1).toBeInTheDocument()

      const showLabel = screen.getByText('Show')
      expect(showLabel).toBeInTheDocument()

      await userEvent.click(showLabel)

      const hideLabel = screen.getByText('Hide')
      expect(hideLabel).toBeInTheDocument()
    })

    it('should validate task info & uncheck from the accordion', async () => {
      const checkedTask = TaskMother.checkedTask()
      const group = GroupMother.withOneTask(checkedTask)

      const { getTasksQuery, homeRender } = setup([group])

      homeRender()

      const loadingSpinner = screen.queryByLabelText('loading-spinner')
      await waitForElementToBeRemoved(loadingSpinner)

      expect(getTasksQuery.execute).toHaveBeenCalledOnce()

      const showLabel = screen.getByText('Show')
      expect(showLabel).toBeInTheDocument()

      await userEvent.click(showLabel)

      const taskDescription = screen.getByText(checkedTask.description)
      expect(taskDescription).toBeInTheDocument()

      const taskCheckbox = screen.getByRole('checkbox')
      expect(taskCheckbox).toBeInTheDocument()
      expect(taskCheckbox).toBeChecked()

      await userEvent.click(taskCheckbox)

      expect(taskCheckbox).not.toBeChecked()
    })

    it('should check a task from the accordion', async () => {
      const uncheckedTask = TaskMother.uncheckedTask()
      const group = GroupMother.withOneTask(uncheckedTask)

      const { homeRender, getTasksQuery } = setup([group])

      homeRender()
      const loadingSpinner = screen.queryByLabelText('loading-spinner')
      await waitForElementToBeRemoved(loadingSpinner)

      expect(getTasksQuery.execute).toHaveBeenCalledOnce()

      const showLabel = screen.getByText('Show')
      expect(showLabel).toBeInTheDocument()

      await userEvent.click(showLabel)

      const taskCheckbox = screen.getByRole('checkbox')
      expect(taskCheckbox).toBeInTheDocument()
      expect(taskCheckbox).not.toBeChecked()

      await userEvent.click(taskCheckbox)

      expect(taskCheckbox).toBeChecked()
    })
  })
})
