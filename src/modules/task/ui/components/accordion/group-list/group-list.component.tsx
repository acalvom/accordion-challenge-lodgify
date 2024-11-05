import { Group } from '@/modules/task/domain/group.ts'
import { GroupAccordionItem } from '../group-accordion-item/group-accordion-item.component.tsx'
import styles from './group-list.module.css'
import { bind } from '@/core/styles/bind.ts'
import { useToggle } from '@/modules/task/ui/controllers/use-toggle-accordion.hook.tsx'

const cx = bind(styles)

export const GroupList = ({ groups }: { groups: Group[] }) => {
  const { isOpen, toggleOpen } = useToggle()

  return (
    <div className={cx('group-list')}>
      {groups.map((group: Group) => (
        <GroupAccordionItem key={group.id} group={group} isOpen={isOpen} onToggle={toggleOpen} />
      ))}
    </div>
  )
}
