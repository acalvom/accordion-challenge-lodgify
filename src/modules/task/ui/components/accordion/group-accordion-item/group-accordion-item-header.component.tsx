import styles from './group-accordion-item.module.scss'
import { bind } from '@/core/ui/styles/bind.ts'

const cx = bind(styles)

interface GroupAccordionHeaderProps {
  title: string
  isOpen: boolean
  onToggle: () => void
}

export const GroupAccordionItemHeader = ({
  title,
  isOpen,
  onToggle,
}: GroupAccordionHeaderProps) => (
  <div className={cx('group-item__header')} onClick={onToggle}>
    <div className={cx('group-item__header__title')}>
      <span>📋</span>
      <span>{title}</span>
    </div>
    <button className={cx('group-item__header__toggle')}>{isOpen ? 'Hide' : 'Show'}</button>
  </div>
)
