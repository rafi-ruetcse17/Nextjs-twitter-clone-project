import React from 'react'
import styles from "@/components/SidebarLink/SidebarLink.module.css"
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const SidebarLink = ({text, Icon}) => {
  return (
    <div className={styles["sidebar-icon"]}>
        <Icon/>
        <span className={styles["icon-name"]}>{text}</span>
    </div>
  )
}

export default SidebarLink