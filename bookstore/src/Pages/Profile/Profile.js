import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import useAxios from "../../Network/AxiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";

function Profile() {
  //model vars
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false), setActiveTab("info");
  };
  const handleShow = () => setShow(true);
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("general");
  //
  const user_id = useParams().user_id;
  const [user, setUser] = useState({});
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [profile_image, setProfileImage] = useState(null);
  const [old_password, setOldPassword] = useState(null);
  const [new_password, setNewPassword] = useState(null);
  const [confirm_password, setConfirmPassword] = useState(null);
  const [changePasswordError, setChangePasswordError] = useState("");
  const [msg, setMSG] = useState("");
  let api = useAxios();
  useEffect(() => {
    api
      .get(`https://django-book-store.onrender.com/users/${user_id}/`)
      .then(
        (res) => (
          setUser(res.data),
          setFirstName(res.data.first_name),
          setLastName(res.data.last_name),
          console.log(Number(res.data.phone)),
          setPhone(res.data.phone)
        )
      )
      .catch((err) => console.log(err));
  }, []);
  useEffect(()=>{
setNewPassword("");
setConfirmPassword("");
setChangePasswordError("");
setOldPassword("");
  },[activeTab])
  //function to hundle user profile update
  const setUserData = (e) => {
    e.preventDefault();
    // if (!first_name){
    //   setErrors({
    //     ...errors,
    //     first_name_err:"this field is required"
    //   })
    //   return 0;
    // }
    // if (!last_name){
    //   setErrors({
    //     ...errors,
    //     last_name_err:"this field is required"
    //   })
    //   return 0;
    // }
    // if (!first_name){
    //   setErrors({
    //     ...errors,
    //     first_name_err:"this field is required"
    //   })
    //   return 0;
    // }
    console.log(profile_image);
    api
      .patch(
        `https://django-book-store.onrender.com/users/${user_id}/update/`,
        {
          email: user.email,
          first_name: first_name,
          last_name: last_name,
          phone: phone,
          Profile_Pic: profile_image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(
        (res) => (
          setUser(res.data),
          setFirstName(res.data.first_name),
          setLastName(res.data.last_name),
          console.log(res.data.phone),
          setPhone(res.data.phone)
        )
      )
      .catch((err) => console.log(err));
  };

  //function to hundle user password update
  const changeUserPassword = (e) => {
    e.preventDefault();
    setChangePasswordError("");
    setMSG("");
    if (new_password != confirm_password) {
      setChangePasswordError("Passwords do not match.");
      return 0;
    }
    api
      .patch(`https://django-book-store.onrender.com/users/${user_id}/change-password/`, {
        old_password: old_password,
        new_password: new_password,
        confirm_password: confirm_password,
      })
      .then((res) => (console.log(res), setMSG(res.data), handleShow()))
      .catch(
        (err) => (
          console.log(err.response.data),
          setChangePasswordError(err.response.data.old_password)
        )
      );
  };

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container container-p-y mb-4">
      <h4 className="font-weight-bold py-3 mb-4">Account settings</h4>
      <div className="mx-auto bg-white rounded shadow">
        <div className="row">
          <div className="col-md-3 pt-0">
            <div className="list-group list-group-flush account-settings-links">
              <a
                className={`list-group-item list-group-item-action ${
                  activeTab === "general" ? "active" : ""
                }`}
                onClick={() => handleTabChange("general")}
                href="#account-general"
              >
                General
              </a>
              <a
                className={`list-group-item list-group-item-action ${
                  activeTab === "info" ? "active" : ""
                }`}
                onClick={() => handleTabChange("info")}
                href="#account-info"
              >
                Update Profile
              </a>
              <a
                className={`list-group-item list-group-item-action ${
                  activeTab === "password" ? "active" : ""
                }`}
                onClick={() => handleTabChange("password")}
                href="#account-change-password"
              >
                Change password
              </a>
            </div>
          </div>
          <div className="col-md-9 p-4">
            <div className="tab-content">
              <div
                className={`tab-pane fade ${
                  activeTab === "general" ? "active show" : ""
                }`}
                id="account-general"
              >
                {/* General content */}
                <div className="container">
                  <div className="row">
                    <div className="col-4">
                      <img
                        src={
                          user.Profile_Pic
                            ? user.Profile_Pic
                            : "https://bootdey.com/img/Content/avatar/avatar1.png"
                        }
                        alt=""
                        className="rounded w-75"
                      />
                    </div>
                    <div className="col-8">
                      <div className="row mb-2">
                        <div className="form-group col-6">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control mb-1"
                            defaultValue={user.first_name}
                            readOnly
                          />
                        </div>
                        <div className="form-group col-6">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={user.last_name}
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                          type="text"
                          className="form-control mb-1"
                          defaultValue={user.email}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "info" ? "active show" : ""
                }`}
                id="account-info"
              >
                {/* Info content */}
                <form
                  onSubmit={(e) => {
                    setUserData(e);
                  }}
                  enctype="multipart/form-data"
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-4">
                        <img
                          src={
                            user.Profile_Pic
                              ? user.Profile_Pic
                              : "https://bootdey.com/img/Content/avatar/avatar1.png"
                          }
                          alt=""
                          className="rounded w-75"
                        />
                      </div>
                      <div className="col-8">
                        <div className="row mb-2">
                          <div className="form-group col-6">
                            <label className="form-label">First Name</label>
                            <input
                              type="text"
                              className="form-control mb-1"
                              defaultValue={user.first_name}
                              onChange={(e) => setFirstName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="form-group col-6">
                            <label className="form-label">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={user.last_name}
                              onChange={(e) => setLastName(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group mb-2">
                          <label className="form-label">Email</label>
                          <input
                            type="text"
                            className="form-control mb-1"
                            defaultValue={user.email}
                            readOnly
                          />
                        </div>
                        <div className="form-group mb-2">
                          <label className="form-label">Phone</label>
                          <input
                            className="form-control"
                            type="tel"
                            pattern="^01[0-2,5]{1}[0-9]{8}$"
                            defaultValue={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Profile</label>
                          <input
                            type="file"
                            className="form-control"
                            onChange={(e) => setProfileImage(e.target.files[0])}
                          />
                        </div>
                        <div className="text-right mt-4">
                          <button type="submit" className="filled-button">
                            Save changes
                          </button>
                          &nbsp;
                          <button type="reset" className="btn btn-default">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "password" ? "active show" : ""
                }`}
                id="account-change-password"
              >
                {/* Change password content */}
                <form
                  onSubmit={(e) => {
                    changeUserPassword(e);
                  }}
                >
                  <div className="card-body pb-2">
                    <div className="form-group mb-3">
                      <label className="form-label">Current password</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className="form-label">New password</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Repeat new password</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="text-right mt-4">
                      {changePasswordError && (
                        <p className="text-danger">{changePasswordError}</p>
                      )}
                      {msg && (
                        <>
                          {/* <Button variant="primary" onClick={handleShow}>
        click modal
      </Button> */}
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>confirmation message</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{msg}</Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                OK
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </>
                      )}
                      <button type="submit" className="filled-button">
                        Save changes
                      </button>
                      &nbsp;
                      <button type="reset" className="btn btn-default">
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
