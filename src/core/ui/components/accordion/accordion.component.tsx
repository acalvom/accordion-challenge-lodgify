import { AccordionItem } from '@/core/ui/components/accordion/accordion-item.component.tsx'
import { Group } from '@/modules/task/domain/group.ts'

import styles from './accordion.module.css'
import { bind } from '@/core/styles/bind'

const cx = bind(styles)

export const Accordion = ({ items }: { items: Group[] }) => {
  return (
    <div className={cx('accordion')}>
      {items.map((item: Group, index) => (
        <AccordionItem key={index} title={item.name} tasks={item.tasks} />
      ))}
    </div>
  )
}
