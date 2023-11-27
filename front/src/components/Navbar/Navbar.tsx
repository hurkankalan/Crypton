import { NavLink, Outlet } from "react-router-dom";
import styles from './Navbar.module.scss';
import { useState } from "react";

export default function Navbar() {

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
            <NavLink to="/" className={styles.logo}>
              Your Logo
            </NavLink>
            <div className={styles.navlinks}>
              <NavLink to="/" className={styles.navlink}>
                Home
              </NavLink>
              <NavLink to="/Markets" className={styles.navlink}>
                Markets
              </NavLink>
              <NavLink to="/blog" className={styles.navlink}>
                Blog
              </NavLink>
            </div>
          </div>
          <div className={styles.navcontentRight}>
            <div className={styles.dropdown}>
              <button className={styles.button_drop}onClick={handleOpen}>EN/FR</button>
              {open ? (
                <ul className={styles.menu}>
                  <li className={styles.menuItem}>
                    <button className={styles.button_drop} onClick={handleMenuOne}>FR</button>
                  </li>
                  <li className={styles.menuItem}>
                    <button className={styles.button_drop} onClick={handleMenuTwo}>EN</button>
                  </li>
                </ul>
              ) : null}
            </div>
            <NavLink to="/login" className={styles.navlink}>
              Logout 
            </NavLink>
          </div>
        
      </div>
      <Outlet />
    </div>
  );
}
