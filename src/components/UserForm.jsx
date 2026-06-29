import { useEffect, useState } from "react";

function UserForm({
  isOpen,
  onClose,
  onSubmit,
  editUser,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editUser) {
      setFormData(editUser);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        department: "",
      });
    }
  }, [editUser]);

  if (!isOpen) return null;

  const validate = () => {
    let temp = {};

    if (!formData.firstName.trim())
      temp.firstName = "First Name is required";

    if (!formData.lastName.trim())
      temp.lastName = "Last Name is required";

    if (!formData.department.trim())
      temp.department = "Department is required";

    if (!/\S+@\S+\.\S+/.test(formData.email))
      temp.email = "Invalid Email";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
    setFormData({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  })
  };

  return (
    <div className="modal">
      <div className="modal-content">

        <h2>
          {editUser ? "Edit User" : "Add User"}
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e)=>
              setFormData({
                ...formData,
                firstName:e.target.value
              })
            }
          />

          <p>{errors.firstName}</p>

          <input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e)=>
              setFormData({
                ...formData,
                lastName:e.target.value
              })
            }
          />

          <p>{errors.lastName}</p>

          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e)=>
              setFormData({
                ...formData,
                email:e.target.value
              })
            }
          />

          <p>{errors.email}</p>

          <input
            placeholder="Department"
            value={formData.department}
            onChange={(e)=>
              setFormData({
                ...formData,
                department:e.target.value
              })
            }
          />

          <p>{errors.department}</p>

          <button type="submit">
            Save
          </button>

          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>

        </form>

      </div>
    </div>
  );
}

export default UserForm;