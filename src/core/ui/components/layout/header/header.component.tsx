import styles from './header.module.css'
import { bind } from '@/core/styles/bind'
import { Title } from '@/core/ui/components/title/title.component.tsx'

const cx = bind(styles)

export const Header = () => {
  return (
    <header className={cx('header')}>
      <Title>Lodgify Grouped Tasks</Title>
    </header>
  )
}
