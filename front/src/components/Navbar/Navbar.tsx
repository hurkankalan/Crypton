import { NavLink, Outlet } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useGlobalContext } from '../../context/context.ts'
import { logout } from "../api/auth.api.tsx";





export const Navbar: React.FC = () => {
  const { username } = useGlobalContext();

  const handleLogout = async () => {
    try{
      await logout();
    }catch(err){
      console.log(err);
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.navcontentLeft}>
          <NavLink to="/home" className={styles.logo}>
            Your Logo
          </NavLink>
          <div className={styles.navlinks}>
            <NavLink to="/home" className={styles.navlink}>
              Home
            </NavLink>
            <NavLink to="/home/Markets" className={styles.navlink}>
              Markets
            </NavLink>
            <NavLink to="/home/Article" className={styles.navlink}>
              Blog
            </NavLink>
          </div>
        </div>
        <div className={styles.navcontentRight}>
          <NavLink to="" className={styles.navlink}>
            Wallet
          </NavLink>
          <NavLink to="/home/profile" className={styles.navlink}>
            <div className={styles.profile}>
              <div className={styles.name}>{username}</div>
            </div>
          </NavLink>
          <NavLink  to={""} className={styles.navlink} onClick={handleLogout}>
            Logout
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
