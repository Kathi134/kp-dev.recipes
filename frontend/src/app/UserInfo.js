import { useUser } from "../context/UserContext";

export default function UserInfo() {
    const {user} = useUser();

    return (
        <div className="centered-center">User-Id: {user.id}</div>
    );
}