import { Publish } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import "./user.css";

export default function User() {
  const location = useLocation();
  const user = location.user;

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      {user && (
        <div className="userContainer">
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    placeholder={user.username}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder={user.email}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    placeholder={user.profilePic}
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img className="userUpdateImg" src={user.profilePic} alt="" />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
