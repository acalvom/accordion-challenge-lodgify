import { v4 as uuidv4 } from 'uuid'
import { Id } from '@/core/domain/interfaces/id.ts'

export class Uuid {
  static create(): Id {
    return uuidv4()
  }
}
