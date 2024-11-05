import styles from './loading.module.css'
import { bind } from '@/core/ui/styles/bind'

const cx = bind(styles)

export const Loading = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('loading')} aria-label="loading-spinner"></div>
    </div>
  )
}
