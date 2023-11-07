import { ComponentProps, memo, useCallback, useMemo } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { LOGIN, MANAGE_PATH, REWARDS } from "../../constants";
import { deauthenticate } from "../../api/auth";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { toast } from "sonner";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  const { pathname } = useLocation();

  const onLogout = useCallback(async () => {
    await deauthenticate();
    logout();
    toast.success("See you soon!");
  }, [logout]);

  const paths = useMemo(() => (
    isAuthenticated ? [
      { path: REWARDS, label: "Rewards" },
      { path: MANAGE_PATH, label: "Manage" },
      { label: "Logout", onClick: onLogout, path: undefined }
    ] : [
      { path: REWARDS, label: "Rewards" },
      { path: LOGIN, label: "Login" },
    ]), [isAuthenticated]);
  
  const value = useMemo(() => {
    const index = paths.findIndex(({ path }) => path === pathname);
    return index > -1 ? index : false;
  }, [pathname, paths]);

  return (
    <header className="App-header">
      <Tabs value={value} aria-label="basic tabs example">
        {
          paths.map(({ path, label, onClick }, i) => {
            const params:ComponentProps<typeof Tab> = { key: label, label };
            if (i === paths.length - 1) { 
              params['sx'] = { ml: 'auto' };
            }
            if (onClick) {
              params['onClick'] = onClick;
            } else {
              (params as any).component = RouterLink;
              (params as any).to = path;
            }
            return <Tab {...params} />
          })
        }
      </Tabs>
    </header>
  )
}

export default memo(Header);