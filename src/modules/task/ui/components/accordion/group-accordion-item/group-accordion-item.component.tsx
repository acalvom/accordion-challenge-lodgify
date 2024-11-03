import { Task } from '@/modules/task/domain/task.ts'
import { useToggle } from '@/modules/task/ui/controllers/use-toggle-accordion.hook.tsx'
import { GroupAccordionItemHeader } from './group-accordion-item-header.component.tsx'
import { TaskList } from '../task-list/task-list.component.tsx'

import { bind } from '@/core/styles/bind.ts'
import styles from './group-accordion-item.module.scss'

const cx = bind(styles)

export const GroupAccordionItem = ({ title, tasks }: { title: string; tasks: Task[] }) => {
  const { isOpen, toggleOpen } = useToggle()

  return (
    <div className={cx('group-item')}>
      <GroupAccordionItemHeader title={title} isOpen={isOpen} onToggle={toggleOpen} />
      {isOpen && <TaskList tasks={tasks} />}
    </div>
  )
}
