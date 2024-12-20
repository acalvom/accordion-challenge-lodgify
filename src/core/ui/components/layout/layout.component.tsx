import React from 'react'
import { Header } from './header/header.component.tsx'
import { Main } from './main/main.component.tsx'

import styles from './layout.module.css'
import { bind } from '@/core/ui/styles/bind'

const cx = bind(styles)

type LayoutProps = {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={cx('container')}>
      <Header />
      <Main>{children}</Main>
    </div>
  )
}
