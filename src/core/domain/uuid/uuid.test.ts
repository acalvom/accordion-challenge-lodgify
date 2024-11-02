import { v4 as uuidv4 } from 'uuid'
import { describe, expect, it, vi } from 'vitest'
import { Uuid } from './uuid.ts'

vi.mock('uuid')

describe('Uuid', () => {
  it('should call uuidv4 and return a UUID string', () => {
    const mockUuid = '123e4567-e89b-12d3-a456-426614174000'
    vi.mocked(uuidv4).mockReturnValue(mockUuid as unknown as Uint8Array)

    const result = Uuid.create()

    expect(uuidv4).toHaveBeenCalledOnce()
    expect(result).toBe(mockUuid)
  })

  it('should return a valid UUID format', () => {
    vi.unmock('uuid')
    const uuid = Uuid.create()

    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i)
  })
})
