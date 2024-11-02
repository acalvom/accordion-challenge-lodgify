import { Task } from '@/modules/task/domain/task.ts'

import styles from './task-accordion-item.module.css'
import { bind } from '@/core/styles/bind.ts'

const cx = bind(styles)

export const TaskAccordionItem = ({ task }: { task: Task }) => {
  const { id, description, checked } = task

  return (
    <>
      <div className={cx('task-item')}>
        <input type="checkbox" id={`task-${id}`} defaultChecked={checked} />
        <label htmlFor={`task-${id}`}>{description}</label>
      </div>
    </>
  )
}
