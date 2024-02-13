import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./EditProfileModal.module.css";
import { MdClose } from "react-icons/md";
import { updateUser } from "@/libs/actions/userAction";
import { useRouter } from "next/router";
import { uploadImage } from "@/libs/actions/postAction";

const EditProfileModal = ({ sessionUser, onClose, getUsersFromDatabase }) => {
  const [name, setName] = useState(sessionUser?.name);
  const [username, setUsername] = useState(sessionUser?.username);
  const [location, setLocation] = useState(sessionUser?.location);
  const [avatar, setAvatar] = useState(
    sessionUser?.image ? sessionUser?.image : "/images/blank_user.jpg"
  );
  const router = useRouter();
  const [tempCover, setTempCover] = useState(null);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [cover, setCover] = useState(
    sessionUser?.cover ? sessionUser.cover : "/images/cover.png"
  );

  const addAvatarImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setTempAvatar(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setAvatar(readerEvent.target.result);
    };
  };

  const addCoverImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setTempCover(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setCover(readerEvent.target.result);
    };
  };

  const handleSave = async () => {
    if (tempCover) {
      const body = new FormData();
      body.append("file", tempCover);
      try {
        const coverUrl = await uploadImage(body);
        await updateUser({
          _id: sessionUser?._id,
          name,
          username,
          location,
          cover: coverUrl,
        });
      } catch (error) {
        console.error("Failed to upload image!");
      }
    }

    if (tempAvatar) {
      const body = new FormData();
      body.append("file", tempAvatar);
      try {
        const avatarUrl = await uploadImage(body);
        await updateUser({
          _id: sessionUser?._id,
          name,
          username,
          location,
          image: avatarUrl,
        });
      } catch (error) {
        console.error("Failed to upload image!");
      }
    } else
      await updateUser({ _id: sessionUser?._id, name, username, location });
    getUsersFromDatabase();
    onClose();
    router.push(`/${username}`);
  };

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
            <button
              className={styles["save-btn"]}
              disabled={
                !name.trim() ||
                !username.trim() ||
                (name === sessionUser?.name &&
                  username === sessionUser?.username &&
                  location === sessionUser?.location &&
                  avatar === sessionUser?.image &&
                  cover === sessionUser?.cover)
              }
              onClick={() => handleSave()}
            >
              Save
            </button>
          </div>
        </div>

        {cover && <img src={cover} className={styles["cover-photo"]} alt="" />}

        {avatar && (
          <div className={styles["selected-avatar"]}>
            <img src={avatar} className={styles["display-photo"]} alt="" />
            <div>
              <label htmlFor="avatar" className={styles["change-avatar-btn"]}>
                Change Avatar
              </label>
            </div>
            <input id="avatar" type="file" hidden onChange={addAvatarImage} />
          </div>
        )}

        <div className={styles["change-cover"]}>
          <label htmlFor="cover" className={styles["change-avatar-btn"]}>
            Change Cover
          </label>

          <input id="cover" type="file" hidden onChange={addCoverImage} />
        </div>

        <div className={styles["name-edit"]}>
          <div className={styles["name"]}>Name</div>
          <textarea
            className={styles["textarea"]}
            rows="2"
            placeholder="Your Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <div className={styles["name"]}>Username</div>
          <textarea
            className={styles["textarea"]}
            rows="2"
            placeholder="Username"
            required
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
