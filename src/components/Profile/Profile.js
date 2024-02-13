import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import styles from "./Profile.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import ViewPost from "../ViewPost/ViewPost";
import { getAllPosts } from "@/libs/actions/postAction";
import EditProfileModal from "../EditProfileMpdal/EditProfileModal";
import { IoLocationOutline } from "react-icons/io5";
import { getAllUsers, updateUser } from "@/libs/actions/userAction";

const Profile = ({ sessionUser, profile_user }) => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const [postClick, setPostClick] = useState(true);
  const [mediaClick, setMediaClick] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(profile_user);

  const Posts = useSelector((state) => state.posts);
  const Users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      Users.find((user) => user?._id == sessionUser?._id)?.following?.includes(
        user?._id
      )
    )
      setClicked(true);
  }, [Users]);

  useEffect(() => {
    getPostsFromDatabase();
    getUsersFromDatabase();
  }, [profile_user]);

  const getUsersFromDatabase = async () => {
    try {
      const response = await getAllUsers();
      dispatch({ type: "SET_USERS", payload: response });
      setUser(response.find((user) => user._id === profile_user._id));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const getPostsFromDatabase = async () => {
    try {
      const response = await getAllPosts(user?.email);
      const filteredPosts = response?.filter(
        (post) => post?.userId === profile_user._id
      );
      if (filteredPosts) {
        dispatch({ type: "SET_POSTS", payload: filteredPosts });
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleFollow = async () => {
    const currentUser = Users.find((user) => user?._id == sessionUser?._id);
    const updatedFollowing = [...currentUser?.following, user?._id];
    const updatedFollower = [...user?.followers, currentUser?._id];
    await updateUser({ _id: currentUser?._id, following: updatedFollowing });
    await updateUser({ _id: user?._id, followers: updatedFollower });

    setClicked(true);
  };

  const handleUnfollow = async () => {
    const currentUser = Users.find((user) => user?._id == sessionUser?._id);
    const updatedFollowing = currentUser?.following.filter(
      (id) => id !== user?._id
    );
    const updatedFollower = user?.followers.filter(
      (id) => id !== currentUser?._id
    );

    await updateUser({ _id: currentUser?._id, following: updatedFollowing });
    await updateUser({ _id: user?._id, followers: updatedFollower });

    setClicked(false);
  };

  const handlePosts = () => {
    setPostClick(true);
    setMediaClick(false);
  };

  const handleMedia = () => {
    setMediaClick(true);
    setPostClick(false);
  };

  const toggleModal = (postId, state) => {
    setToggle(state);
  };
  return (
    <section className={styles["main-container"]}>
      <div className={styles["back-arrow"]}>
        <BsArrowLeft
          className={styles["back-icon"]}
          onClick={(e) => {
            router.push(`/home`);
            e.stopPropagation();
          }}
        />
        <b>{user?.name}</b>
      </div>
      <img src={user?.cover} alt="" className={styles["cover-photo"]} />

      <div className={styles["container"]}>
        <div className={styles["user-container"]}>
          <div>
            <img src={user?.image} alt="" className={styles["user-img"]} />
          </div>
          {sessionUser?._id === user?._id && (
            <button
              className={styles["edit-profile-btn"]}
              onClick={() => setShowModal(true)}
            >
              Edit Profile
            </button>
          )}
          {sessionUser?._id != user?._id && !clicked && (
            <button
              onClick={() => handleFollow()}
              className={styles["edit-profile-btn"]}
            >
              Follow
            </button>
          )}
          {sessionUser?._id != user?._id && clicked && (
            <button
              onClick={() => handleUnfollow()}
              className={styles["edit-profile-btn"]}
            >
              Unfollow
            </button>
          )}
          {showModal && (
            <EditProfileModal
              sessionUser={user}
              onClose={() => setShowModal(false)}
              getUsersFromDatabase={() => getUsersFromDatabase()}
            />
          )}
        </div>

        <div className={styles["name"]}>
          <div>
            <b>{user?.name}</b>
          </div>
          <div>@{user?.username}</div>
        </div>

        <div className={styles["location"]}>
          <IoLocationOutline />
          <span>{user?.location}</span>
        </div>

        <div className={styles["follow"]}>
          <Link href="#" className={styles["following"]}>
            <b>{user?.following?.length}</b> Following
          </Link>
          <Link href="#" className={styles["following"]}>
            <b>{user?.followers?.length}</b> Followers
          </Link>
        </div>

        <nav>
          <div
            className={styles[postClick ? "clicked" : ""]}
            onClick={(e) => {
              e.stopPropagation();
              handlePosts();
            }}
          >
            Posts
          </div>
          <div
            className={styles[mediaClick ? "clicked" : ""]}
            onClick={(e) => {
              e.stopPropagation();
              handleMedia();
            }}
          >
            Media
          </div>
        </nav>
      </div>
      <hr />
      {postClick &&
        Posts?.map((post) => (
          <div key={post._id} className={styles["main"]}>
            <ViewPost user={user} post={post} />
            <hr />
          </div>
        ))}
      <div className={styles["media-container"]}>
        {mediaClick &&
          Posts?.map(
            (post) =>
              post.image && (
                <div key={post._id} className={styles["media"]}>
                  <img src={post?.image} alt="no image" />
                </div>
              )
          )}
      </div>
    </section>
  );
};

export default Profile;
