import { Task } from '@/modules/task/domain/task.ts'

import styles from './task-accordion-item.module.css'
import { bind } from '@/core/styles/bind.ts'
import { useTasks } from '@/modules/task/ui/contexts/task.context.tsx'

const cx = bind(styles)

export const TaskAccordionItem = ({ task }: { task: Task }) => {
  const { id, description, checked } = task

  const { toggleTaskChecked } = useTasks()

  const handleCheck = () => {
    console.log('handleCheck')
    toggleTaskChecked(task.id)
  }

  return (
    <>
      <div className={cx('task-item')}>
        <input type="checkbox" id={`task-${id}`} defaultChecked={checked} onChange={handleCheck} />
        <label htmlFor={`task-${id}`}>{description}</label>
      </div>
    </>
  )
}
