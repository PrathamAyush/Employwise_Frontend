#Live Project Link:
https://employwise-frontend-psi.vercel.app/

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# User Management Component Documentation

## Overview
This React component is designed to manage user data using CRUD (Create, Read, Update, Delete) operations. It fetches user data from an API, displays it in a card layout, allows for editing user details through a popup form, and supports deletion of users.

## Features
 ->Fetches user data from an API and displays it in a list format.
 ->Provides an edit functionality with a pre-filled popup form.
 ->Supports updating user details and reflects the changes instantly.
 ->Allows users to be deleted from the list.
 ->Implements a responsive UI using Bootstrap.

## Technologies Used
- React.js
- Axios (for API requests)
- Bootstrap (for styling)
- CSS (for custom styles)

---

## Installation & Setup

1. **Clone the Repository**
   ```sh
   git clone https://github.com/PrathamAyush/Employwise_Frontend
   cd your-repository
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Run the Project**
   ```sh
   npm start
   ```

---

## API Used
The application fetches user data from **ReqRes API**:

- **GET Users:** `https://reqres.in/api/users?page=1`
- **DELETE User:** `https://reqres.in/api/users/{id}`
- **PUT Update User:** `https://reqres.in/api/users/{selectedUser.id}`

---

## Component Structure
### `UsersList.js`
This component is responsible for:
1. Fetching user data from the API.
2. Displaying users in a list format.
3. Providing Edit and Delete functionalities.
4. Handling the update logic through a popup form.

### State Variables
| State          | Description |
|---------------|-------------|
| `users`       | Stores the list of users fetched from API. |
| `loading`     | Manages loading state during data fetch. |
| `updateForm`  | Controls the visibility of the edit popup form. |
| `selectedUser`| Stores the user data that is being edited. |
| `currentPage` | Manage pagination. |

---

## Functions & Handlers
### `handleDelete(id)`
- Sends a DELETE request to remove a user.
- Updates the UI by filtering out the deleted user.

```js
const handleDelete = async (id) => {
  await axios.delete(`${BASE_URL}/users/${id}`);
  setUsers(users.filter((user) => user.id !== id));
};
```

### `handleUpdate(event)`
- Prevents form submission.
- Sends a PUT request with the updated user data.
- Updates the user list with modified data.
- Closes the popup form.

```js
const handleUpdate = async (e) => {
  e.preventDefault();
  if (!selectedUser) return;
  await axios.put(`${BASE_URL}/users/${selectedUser.id}`, selectedUser);
  setUsers(users.map(user => user.id === selectedUser.id ? { ...user, ...selectedUser } : user));
  setUpdateForm(false);
  setSelectedUser(null);
};
```

### `setSelectedUser(user)`
- Sets the currently selected user for editing.
- Opens the update popup.

```js
onClick={() => {
  setSelectedUser(user);
  setUpdateForm(true);
}}
```

---

## UI & Popup Form Structure
The form is displayed in a centered popup when editing a user.

```jsx
{updateForm && selectedUser && (
  <div className="updateForm">
    <div className="popup">
      <form onSubmit={handleUpdate}>
        <input type="text" value={selectedUser.first_name} onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })} />
        <input type="text" value={selectedUser.last_name} onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })} />
        <input type="email" value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
        <button type="submit">Update</button>
        <button type="button" onClick={() => setUpdateForm(false)}>Cancel</button>
      </form>
    </div>
  </div>
)}
```

---

## Styling
### `.updateForm` (Popup Styling)
```css
.updateForm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
```

---

## Future Improvements
-  Add form validation before updating user details.
-  Add toast notifications for success/error messages.


