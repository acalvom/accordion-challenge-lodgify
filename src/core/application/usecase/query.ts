import { UseCase } from './use-case'

export type Query<Result = void, Params = void> = UseCase<Params, Result>
