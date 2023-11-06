import { memo, useMemo } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { LOGIN, MANAGE_PATH, REWARDS } from "../../constants";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  const { pathname } = useLocation();

  const paths = useMemo(() => (
    isAuthenticated ? [
      { path: REWARDS, label: "Rewards" },
      { path: MANAGE_PATH, label: "Manage" },
      { label: "Logout", onClick: () => logout(), path: undefined }
    ] : [
      { path: REWARDS, label: "Rewards" },
      { path: LOGIN, label: "Login" },
    ]), [isAuthenticated]);

  const value = useMemo(() => Math.max(paths.findIndex(({ path }) => path === pathname), 0), [pathname, paths]);

  return (
    <header className="App-header">
      <Tabs value={value} aria-label="basic tabs example">
        {
          paths.map(({ path, label, onClick }) => {
            if (onClick) {
              return <Tab key={label} label={label} onClick={onClick} />
            }
            return <Tab key={path} label={label} component={RouterLink} to={path} />
          })
        }
      </Tabs>
    </header>
  )
}

export default memo(Header);