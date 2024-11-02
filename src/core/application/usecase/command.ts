import { UseCase } from './use-case'

export type Command<Params = void, Result = void> = UseCase<Params, Result>
