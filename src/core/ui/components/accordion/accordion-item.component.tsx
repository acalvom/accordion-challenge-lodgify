import { useState } from 'react'
import { Task } from '@/modules/task/domain/task.ts'

import styles from './accordion-item.module.css'
import { bind } from '@/core/styles/bind'

const cx = bind(styles)

export const AccordionItem = ({ title, tasks }: { title: string; tasks: Task[] }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className={cx('accordion-item')}>
      <div className={cx('accordion-header')} onClick={toggleOpen}>
        <span className={cx('accordion-icon')}>📋</span>
        <span className={cx('accordion-title')}>{title}</span>
        <button className={cx('accordion-toggle')}>{isOpen ? 'Hide' : 'Show'}</button>
      </div>
      {isOpen && (
        <div className={cx('accordion-content')}>
          {tasks.map((task: Task, i: number) => (
            <div key={i} className={cx('task-item')}>
              <input type="checkbox" id={`task-${i}`} />
              <label htmlFor={`task-${i}`}>{task.description}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
