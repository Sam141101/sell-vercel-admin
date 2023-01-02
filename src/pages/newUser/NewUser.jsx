import { useState } from "react";
import "./newUser.css";

export default function NewUser() {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">Người dùng mới</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Tên tài khoản</label>
          <input type="text" placeholder="john" />
        </div>
        {/* <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" />
        </div> */}
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Mật khẩu</label>
          <input type="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Số điện thoại</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label>Địa chỉ</label>
          <input type="text" placeholder="New York | USA" />
        </div>
        <div className="newUserItem">
          <label>Giới tính</label>
          <div
            className="newUserGender"
            style={{ display: "flex" }}
            onChange={handleChange}
          >
            <input type="radio" name="gender" id="male" value="Nam" />
            <label for="male">Nam</label>
            <input type="radio" name="gender" id="female" value="Nữ" />
            <label for="female">Nữ</label>
            <input type="radio" name="gender" id="other" value="Khác" />
            <label for="other">Khác</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <button className="newUserButton">Tạo</button>
      </form>
    </div>
  );
}
