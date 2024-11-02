import React from 'react'
import styles from './main.module.css'
import { bind } from '@/core/styles/bind'

const cx = bind(styles)

type MainProps = {
  children: React.ReactNode
}

export const Main = ({ children }: MainProps) => {
  return <main className={cx('main')}>{children}</main>
}
