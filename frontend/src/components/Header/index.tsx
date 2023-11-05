import { memo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { LOGIN, MANAGE_PATH, REWARDS } from "../../constants";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="App-header">
      {isAuthenticated === false && <Link to={LOGIN}>Login</Link>}
      <Link to={REWARDS}>Rewards</Link>
      <Link to={MANAGE_PATH}>Manage Rewards</Link>
      {isAuthenticated === true && <button onClick={logout}>Logout</button>}
    </header>
  )
}

export default memo(Header);