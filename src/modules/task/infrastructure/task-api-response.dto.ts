export interface GroupDto {
  name: string
  tasks: TaskDto[]
}

export interface TaskDto {
  description: string
  value: number
  checked: boolean
}
