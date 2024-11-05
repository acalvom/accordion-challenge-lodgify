import styles from './percentage.module.css'
import { bind } from '@/core/ui/styles/bind'

const cx = bind(styles)

export const Percentage = ({ value }: { value: number }) => {
  return (
    <div className={cx('container')}>
      <div className={cx('progress')} style={{ width: `${value.toFixed(0)}%` }}>
        <span className={cx('text')}>{`${value.toFixed(2)}%`}</span>
      </div>
    </div>
  )
}
