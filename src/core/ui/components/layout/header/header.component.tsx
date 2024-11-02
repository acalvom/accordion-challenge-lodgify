import styles from './header.module.css'
import { bind } from '@/core/styles/bind'

const cx = bind(styles)

export const Header = () => {
  return (
    <header className={cx('header')}>
      <h1>Lodgify Grouped Tasks</h1>
    </header>
  )
}
