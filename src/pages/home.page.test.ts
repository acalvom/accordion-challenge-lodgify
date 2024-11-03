import { describe, expect, it } from 'vitest'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'

import { Home } from './home.page.tsx'
import { customRender } from '@/test/setup.ts'

describe('Accordion interaction', () => {
  it('should display app title and loading spinner', async () => {
    customRender(Home())

    const title = screen.getByText('Lodgify Grouped Tasks')
    expect(title).toBeInTheDocument()

    const loadingSpinner = screen.queryByLabelText('loading-spinner')
    expect(loadingSpinner).toBeInTheDocument()

    await waitForElementToBeRemoved(loadingSpinner)

    expect(loadingSpinner).not.toBeInTheDocument()
  })
})
