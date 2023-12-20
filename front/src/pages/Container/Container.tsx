import { useLocation} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { Navbar } from '../../components/Navbar/Navbar';
import styles from './Container.module.scss';

export default function Container() {
  const location = useLocation();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.NavBar}>
          <Navbar />
        </div>
        {location.pathname !== "/home/profile" ? (
          <div className={styles.Footer}>
            <Footer theme="white" />
          </div>) : null
        }
      </div>
    </>
  );
}
