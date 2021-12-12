import User from "./User";

function UserList({ users, setUsers }) {
  console.log(users);
  return (
    <div>
      <ul>
        {users.map((user) => {
          return (
            <User
              key={user.email}
              user={user}
              setUsers={setUsers}
              users={users}
            />
          );
        })}
      </ul>
    </div>
  );
}
export default UserList;
