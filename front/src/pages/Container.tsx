import Footer from "../components/Footer/Footer";
import Navbar from '../components/Navbar/Navbar';

export default function Container() {


  return (
    <>
    <div className="Container">
        <div className="Navbar">
            <Navbar />
        </div>
        <div className="Footer">
            <Footer theme="white"/>
        </div>
    </div>
    </>
  );
}
