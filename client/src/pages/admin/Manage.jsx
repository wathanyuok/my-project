import { useEffect, useState } from "react";
import { actionListUsers, actionUpdateRole } from "../../api/user";
import useAuthStore from "../../store/auth-store";
import { Trash2 } from "lucide-react";
import { createAlert } from "../../utils/createAlert";
import Swal from "sweetalert2";
import { actionDeleteUser } from "../../api/user";

// rfce
function Manage() {
  // JS
  const [users, setUsers] = useState([]);
  const token = useAuthStore((state) => state.token);

  console.log(users);

  useEffect(() => {
    // code
    hdlFetchUsers(token);
  }, []);

  const hdlFetchUsers = async (token) => {
    try {
      const res = await actionListUsers(token);
      setUsers(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const hdlUpdateRole = async (token, id, role) => {
    console.log(token, id, role);

    try {
      const res = await actionUpdateRole(token, { id, role });
      createAlert("success", "updatae Role Success!!!");
      console.log(res);

    } catch (error) {
      console.log(error);
    }
  };

  const hdlDeleteUser = async (token, id) => {
    try {
      // Show confirmation dialog using SweetAlert2
      const data = await Swal.fire({
        icon: "info",
        text: "Are you sure?",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
      });
  
      // Check if user confirmed the action
      if (data.isConfirmed) {
        // Call API to delete user
        const res = await actionDeleteUser(token, id);
        console.log(res);
  
        // Show success alert and refresh user list
        createAlert("success", "Delete User Success!!!");
        hdlFetchUsers(token);
      }
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>
                  {/* Select */}
                  <select
                    onChange={() =>
                      hdlUpdateRole(token, item.id, e.target.value)
                    }
                    defaultValue={item.role}
                  >
                    <option>USER</option>
                    <option>ADMIN</option>
                  </select>
                  {/* /Select */}
                </td>
                <td>
                  <Trash2
                    onClick={() => hdlDeleteUser(token, item.id)}
                    color="red" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default Manage;