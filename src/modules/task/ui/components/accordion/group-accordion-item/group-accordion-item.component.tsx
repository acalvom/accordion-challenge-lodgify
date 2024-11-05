import { GroupAccordionItemHeader } from './group-accordion-item-header.component.tsx'
import { TaskList } from '../task-list/task-list.component.tsx'

import { bind } from '@/core/styles/bind.ts'
import styles from './group-accordion-item.module.scss'
import { Group } from '@/modules/task/domain/group.ts'

const cx = bind(styles)

export const GroupAccordionItem = ({
  group,
  isOpen,
  onToggle,
}: {
  group: Group
  isOpen: boolean
  onToggle: () => void
}) => {
  const { name, tasks } = group
  
  return (
    <div className={cx('group-item')}>
      <GroupAccordionItemHeader title={name} isOpen={isOpen} onToggle={onToggle} />
      {isOpen && <TaskList tasks={tasks} />}
    </div>
  )
}
