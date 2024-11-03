import { cleanup, render, RenderOptions } from '@testing-library/react'
import { afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'

import '@testing-library/jest-dom/vitest'
import React from 'react'

afterEach(() => {
  cleanup()
})

export const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  return render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  })
}

export { userEvent }
export * from '@testing-library/react'
export * from '@testing-library/jest-dom/vitest'
