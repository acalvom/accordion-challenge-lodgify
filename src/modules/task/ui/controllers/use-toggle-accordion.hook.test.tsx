import { useToggleAccordion } from './use-toggle-accordion.hook'
import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'

describe('useToggleAccordion', () => {
  it('should initialized the hook with the initial state', () => {
    const initialState = { group1: true, group2: false }
    const { result } = renderHook(() => useToggleAccordion(initialState))
    const [state] = result.current

    expect(state).toEqual(initialState)
  })

  it('should change (toggle) the state from and existing group', () => {
    const initialState = { group1: true, group2: false }
    const { result } = renderHook(() => useToggleAccordion(initialState))
    const [, toggle] = result.current

    act(() => {
      toggle('group1')
    })

    const [state] = result.current

    expect(state.group1).toBe(false)
    expect(state.group2).toBe(false)

    act(() => {
      toggle('group2')
    })

    const [newState] = result.current

    expect(newState.group1).toBe(false)
    expect(newState.group2).toBe(true)
  })

  it('should add a new group to the state if it not exists in the state', () => {
    const initialState = { group1: true }
    const { result } = renderHook(() => useToggleAccordion(initialState))
    const [, toggle] = result.current

    act(() => {
      toggle('group3')
    })

    const [state] = result.current

    expect(state.group3).toBe(true)
  })

  it('should keep the state in unmodified group keys', () => {
    const initialState = { group1: true, group2: false }
    const { result } = renderHook(() => useToggleAccordion(initialState))
    const [, toggle] = result.current

    act(() => {
      toggle('group2')
    })

    const [state] = result.current

    expect(state.group1).toBe(true)
    expect(state.group2).toBe(true)
  })
})
