import styles from './title.module.css'
import { bind } from '@/core/ui/styles/bind'

const cx = bind(styles)

export const Title = ({ children }: { children: string }) => {
  return <h2 className={cx('title')}>{children}</h2>
}
