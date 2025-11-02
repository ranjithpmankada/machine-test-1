import { useParams } from "react-router";
import UsersDetail from "../features/users/details/user-details";

function UsersDetailScreen() {
  const params = useParams();
  return <UsersDetail id={params['id'] as string}/>
}

export default UsersDetailScreen;