import Footer from "../../components/Footer/Footer";
import Navbar from '../../components/Navbar/Navbar';
import styles from './Container.module.scss';

export default function Container() {


  return (
    <>
    <div className={styles.container}>
        <div className={styles.NavBar}>
            <Navbar />
        </div>
        <div className={styles.Footer}>
            <Footer theme="white"/>
        </div>
    </div>
    </>
  );
}
