import { TaskAccordionItem } from '../task-accordion-item/task-accordion-item.component.tsx'
import { Task } from '@/modules/task/domain/task.ts'

import { bind } from '@/core/styles/bind.ts'
import styles from './task-list.module.css'

const cx = bind(styles)

export const TaskList = ({ tasks }: { tasks: Task[] }) => (
  <div className={cx('task-list')}>
    {tasks.map((task: Task) => (
      <TaskAccordionItem task={task} key={task.id} />
    ))}
  </div>
)
