import styles from './loading.module.css'
import { bind } from '@/core/styles/bind'

const cx = bind(styles)

export const Loading = () => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('loading')}></div>
    </div>
  )
}