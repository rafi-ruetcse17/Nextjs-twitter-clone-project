import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./EditProfileModal.module.css";
import { MdClose } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const EditProfileModal = ({ sessionUser, onClose }) => {
  const [name, setName] = useState(sessionUser?.name);
  const [username, setUsername] = useState(sessionUser?.username);
  const [location, setLocation] = useState(sessionUser?.location);
  const [avatar, setAvatar] = useState(sessionUser?.image);
  const [cover, setCover] = useState(
    sessionUser?.cover ? sessionUser.cover : "/images/cover.png"
  );

  const closeModal = (e) => {
    e.stopPropagation();
    onClose();
  };
  const modalContent = (
    <div className={styles["modal-surrounding"]} onClick={closeModal}>
      <div
        className={styles["modal-container"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["head"]}>
          <MdClose className={styles["close-icon"]} onClick={closeModal} />

          <div className={styles["edit-save-btn"]}>
            <div className={styles["edit-profile"]}>Edit Profile</div>
            <button className={styles["save-btn"]}>Save</button>
          </div>
        </div>

        {cover && <img src={cover} className={styles["cover-photo"]} alt="" />}

        {avatar && (
          <div className={styles["selected-avatar"]}>
            <img src={avatar} className={styles["display-photo"]} alt="" />
            <div onClick={() => setAvatar(null)}>
              <button className={styles["change-avatar-btn"]}>
                Change Avatar
              </button>
            </div>
          </div>
        )}
        <div className={styles["change-cover"]}>
          <button className={styles["change-avatar-btn"]}>Change Cover</button>
        </div>

        <div className={styles["name-edit"]}>
          <div className={styles["name"]}>Name</div>
          <textarea
            className={styles["textarea"]}
            rows="2"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className={styles["name"]}>Username</div>
          <textarea
            className={styles["textarea"]}
            rows="2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className={styles["name"]}>Location</div>
          <textarea
            className={styles["textarea"]}
            rows="2"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("edit-profile-modal")
  );
};

export default EditProfileModal;
