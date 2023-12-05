import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import {Navbar} from '../../components/Navbar/Navbar';
import styles from './Container.module.scss';

export default function Container() {

  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(open);
  }, [open]);

  return (
    <>
    <div className={styles.container}>
        <div className={styles.Popup}>
            {open ? (
              <div>hello</div>
            ) : null}
        </div>
        <div className={styles.NavBar}>
            <Navbar OpenProfile={open} setOpenProfile={setOpen}/>
        </div>
        <div className={styles.Footer}>
            <Footer theme="white"/>
        </div>
    </div>
    </>
  );
}
