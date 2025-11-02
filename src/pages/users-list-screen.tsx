import { useNavigate } from "react-router";
import UserList from "../features/users/list/user-list";
import type { User } from "../models/models";

function UsersListScreen() {
  const navigate = useNavigate();

  const onRowClick = (_: React.MouseEvent, data: User) => {
    navigate(`/users/${data.id}`)
  }

  return <>
    <UserList onRowClick={onRowClick} />
  </>
}

export default UsersListScreen;