import { Group } from '@/modules/task/domain/group.ts'
import { GroupAccordionItem } from '../group-accordion-item/group-accordion-item.component.tsx'
import styles from './group-list.module.css'
import { bind } from '@/core/styles/bind.ts'

const cx = bind(styles)

export const GroupList = ({ groups }: { groups: Group[] }) => {
  return (
    <div className={cx('group-list')}>
      {groups.map(({ id, name, tasks }: Group) => (
        <GroupAccordionItem key={id} title={name} tasks={tasks} />
      ))}
    </div>
  )
}
