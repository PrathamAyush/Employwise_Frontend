import "./UsersList.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateForm, setUpdateForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Base URL
  const BASE_URL = "https://reqres.in/api";

  //Fetch data from server
  useEffect(() => {
    axios.get(`${BASE_URL}/users?page=${currentPage}`).then((res) => {
      setUsers(res.data.data);
      setLoading(false);
    });
  }, [currentPage]);

  //Handling Deletion Request
  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  //Handleing Update Request
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedUser) return;

    await axios.put(`${BASE_URL}/users/${selectedUser.id}`, selectedUser);

    setUsers(
      users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...selectedUser } : user
      )
    );

    setUpdateForm(false);
    setSelectedUser(null);
  };

  const handlePagination = (direction) => {
    if (direction === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h2 className="text-center">Users List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {users.map((user) => (
            <div className="card m-2" style={{ width: "18rem" }} key={user.id}>
              <section className="d-flex justify-content-center">
                <img
                  className="m-2"
                  src={user.avatar}
                  alt=""
                  style={{ borderRadius: "50%", width: "5em", height: "5em" }}
                />
              </section>

              <div className="card-body">
                <h5 className="card-title">
                  {user.first_name} {user.last_name}
                </h5>
                <p className="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <div className="d-flex justify-content-around">
                  <button
                    className="btn btn-primary"
                    style={{ width: "40%" }}
                    onClick={() => {
                      setSelectedUser(user);
                      setUpdateForm(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ width: "40%" }}
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

{/* Pegination area */}
      <hr />
      <div className="d-flex justify-content-center">
        <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => handlePagination("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => handlePagination("next")}
          >
            Next
          </button>
        </li>
      </ul>
      </div>
      
      {/*USER update form */}
      {updateForm && selectedUser && (
        <div style={{ width: "18rem" }} className="updateForm">
          <form className="p-3">
            <label htmlFor="username" className="form-label">
              <sup style={{ color: "red" }}>*</sup>First Name
            </label>
            <input
              type="text"
              className="form-control bg-light"
              value={selectedUser.first_name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, first_name: e.target.value })
              }
              placeholder="First Name"
              required
            />

            <label htmlFor="Lastname" className="form-label">
              <sup style={{ color: "red" }}>*</sup>Last Name
            </label>
            <input
              type="text"
              className="form-control bg-light"
              value={selectedUser.last_name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, last_name: e.target.value })
              }
              placeholder="Last Name"
              required
            />

            <label htmlFor="Emaile" className="form-label">
              <sup style={{ color: "red" }}>*</sup>Email
            </label>
            <input
              type="email"
              className="form-control bg-light"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              placeholder="Email"
              required
            />

            {/* Login Button */}
            <div className="d-flex justify-content-between mt-3">
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() => setUpdateForm(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleUpdate}
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UsersList;
