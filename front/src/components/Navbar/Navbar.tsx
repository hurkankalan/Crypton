import { NavLink, Outlet } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { Dispatch, SetStateAction, useState } from "react";

interface NavBarProps {
  OpenProfile: boolean;
  setOpenProfile: Dispatch<SetStateAction<boolean>>
}



export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleMenuOne = () => {
    // do something
    setOpen(false);
  };

  const handleMenuTwo = () => {
    // do something
    setOpen(false);
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
              {/* A CHANGER PAR LE NOM DE L'UTILISATEUR */}
              <div className={styles.name}>John Doe</div>
            </div>
          </NavLink>
          <NavLink to="/login" className={styles.navlink}>
            Logout
          </NavLink>
          <div className={styles.profile}>
            <button onClick={()=>setOpenProfile(!OpenProfile)}>Profile</button>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
