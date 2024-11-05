import { Group } from '@/modules/task/domain/group.ts'
import { GroupAccordionItem } from '../group-accordion-item/group-accordion-item.component.tsx'
import styles from './group-list.module.css'
import { bind } from '@/core/ui/styles/bind.ts'
import { useToggleAccordion } from '@/modules/task/ui/controllers/use-toggle-accordion.hook.tsx'

const cx = bind(styles)

export const GroupList = ({ groups }: { groups: Group[] }) => {
  const [openGroups, toggle] = useToggleAccordion()

  return (
    <div className={cx('group-list')}>
      {groups.map((group: Group) => (
        <GroupAccordionItem
          key={group.id}
          group={group}
          isOpen={openGroups[group.id]}
          onToggle={() => toggle(group.id)}
        />
      ))}
    </div>
  )
}
