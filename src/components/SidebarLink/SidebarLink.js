import React from 'react'
import styles from "@/components/SidebarLink/SidebarLink.module.css"

const SidebarLink = ({text, Icon}) => {
  return (
    <div className={styles["sidebar-icon"]}>
        <Icon/>
        <span className={styles["icon-name"]}>{text}</span>
    </div>
  )
}

export default SidebarLink