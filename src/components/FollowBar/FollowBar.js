import React from 'react'
import styles from "./FollowBar.module.css"
import { FiSearch } from 'react-icons/fi'

const FollowBar = () => {
  return (
    <div className={styles["container"]}>
        <div className={styles["search-bar"]}>
            <FiSearch/>
            <input className={styles["search-input"]} type="text" placeholder='Search Twitter' />
        </div>
    </div>
  )
}

export default FollowBar