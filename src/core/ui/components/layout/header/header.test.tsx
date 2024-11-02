import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Header } from './header.component'

test('renders Header component', () => {
  render(<Header />)

  const title = screen.getByText('Lodgify Grouped Tasks')
  expect(title).toBeInTheDocument()
})
