import React, { useEffect, useState } from 'react'
import styles from "./FollowBar.module.css"
import { FiSearch } from 'react-icons/fi'
import { getAllUsers } from '@/libs/actions/userAction';

const FollowBar = () => {
  const [users, setUsers] = useState(null);

  useEffect(()=>{
    const fetchData = async()=>{
      const data = await getAllUsers();
      setUsers(data);
    }
    fetchData();
  }, [])

  return (
    <div className={styles["container"]}>
        <div className={styles["search-bar"]}>
          <FiSearch/>
          <input className={styles["search-input"]} type="text" placeholder='Search Twitter' />
        </div>

        <div className={styles["follow-bar"]}>
          <h2>Who to follow</h2>
          {users?.map((user)=>(
            <p key={user._id}>{user.name}</p>
          ))}
        </div>
    </div>
  )
}

export default FollowBar