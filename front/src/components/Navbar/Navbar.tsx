import { NavLink, Outlet, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useGlobalContext } from '../../context/context.ts'
import { logout } from "../api/auth.api.tsx";
// import logo from "./../../assets/crypton.png"

export const Navbar: React.FC = () => {
  const {username, role} = useGlobalContext();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = () => {
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
          <>
            <div className={styles.navcontentLeft}>
            <NavLink to="/home" className={styles.logo}>
            {/* <img src={logo} alt="Crypton Logo" />  */}
            </NavLink>
              <div className={styles.navlinks}>
                <NavLink to="/home" className={styles.navlink}>
                  Home
                </NavLink>
                <NavLink to="/home/Markets" className={styles.navlink}>
                  Markets
                </NavLink>
                <NavLink to="/home/Article" className={styles.navlink}>
                  Articles
                </NavLink>
                <NavLink to="/home/prediction" className={styles.navlink}>
                  Prediction
                </NavLink>
              </div>
            </div>
          </>
        {role === "guest" ?
          <div className={styles.navcontentRight}>
            <NavLink to={""} className={styles.navlink} onClick={handleLogin}>
              Login
            </NavLink>
          </div> :
          <>
            <div className={styles.navcontentRight}>
              <NavLink to="/home/Currency" className={styles.navlink}>
                Buy Crypto
              </NavLink>
              <NavLink to="/home/wallet" className={styles.navlink}>
                Wallet
              </NavLink>
              <NavLink to="/home/profile" className={styles.navlink}>
                <div className={styles.profile}>
                  <div className={styles.name}>{username}</div>
                </div>
              </NavLink>
              <NavLink to={""} className={styles.navlink} onClick={handleLogout}>
                Logout
              </NavLink>
            </div>

          </>
        }

      </div>
      <Outlet />
    </div>
  );
}
