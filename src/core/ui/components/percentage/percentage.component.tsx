import styles from './percentage.module.css'
import { bind } from '@/core/styles/bind'

const cx = bind(styles)

export const Percentage = ({ value }: { value: number }) => {
  return <span className={cx('percentage')}>{value.toFixed(2)}%</span>
}
