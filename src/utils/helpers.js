const departments = [
  "IT",
  "HR",
  "Engineering",
  "Marketing",
  "Finance",
  "Sales",
];

export const formatUsers = (users) => {
  return users.map((user, index) => {
    const names = user.name.split(" ");

    return {
      id: user.id,
      firstName: names[0],
      lastName: names.slice(1).join(" "),
      email: user.email,
      department: departments[index % departments.length],
    };
  });
};