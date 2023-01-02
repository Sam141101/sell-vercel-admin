import {
  CalendarToday,
  Create,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  Wc,
} from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./user.css";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../../firebase";
import { updateUser } from "../../redux/apiCalls";

export default function User() {
  const admin = useSelector((state) => state.user?.currentUser);
  const token = admin.token;
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  // const [pStats, setPStats] = useState([]);
  const user = useSelector((state) =>
    state.users.users.find((user) => user._id === userId)
  );
  console.log(user);
  console.log(user.token);

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    // add info
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, toString(fileName));

    const uploadTask = uploadBytesResumable(storageRef, file);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const update = { ...inputs, img: downloadURL };
          updateUser(token, dispatch, user._id, update);
        });
      }
    );
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Chỉnh sửa người dùng</h1>
        {/* <Link to="/newUser">
          <button className="userAddButton">Tạo mới</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={
                user.img ||
                "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
              }
              alt="Ảnh đại diện"
              className="userShowImg"
            />

            <div className="userShowTopTitle">
              <div className="userShowUsername">{user.username}</div>
              <div className="userShowUserTitle">
                <Create style={{ fontSize: "18px", marginRight: "5px" }} />
                Sửa hồ sơ
              </div>
            </div>
          </div>

          <div className="userShowBottom">
            <span className="userShowTitle">Chi tiết tài khoản</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <Wc className="userShowIcon" />
              <span className="userShowInfoTitle">{user.gender}</span>
            </div>
            <span className="userShowTitle">Chi tiết liên hệ</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Chỉnh sửa</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder={user.username}
                  className="userUpdateInput"
                />
              </div>
              {/* <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                />
              </div> */}
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  placeholder={user.email}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  onChange={handleChange}
                  placeholder={user.phone}
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Địa chỉ liên hệ</label>
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  placeholder={user.address}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={
                    user.img ||
                    "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                  }
                  alt="Ảnh đại diện"
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  // {...file("test", { required: true })}
                  // ref={register({
                  //   required: "Required",
                  // })}
                />
              </div>
              <button className="userUpdateButton" onClick={handleClick}>
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
