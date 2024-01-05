import React, { useState, useEffect } from "react";
import { animateScroll } from "react-scroll";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaVimeoSquare,
  FaTumblrSquare,
} from "react-icons/fa";
import { MdExpandLess } from "react-icons/md";
import "./Footer.module.scss";

interface FooterProps {
  theme: string;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const [scroll, setScroll] = useState<number>(0);
  const [top, setTop] = useState<number>(0);

  useEffect(() => {
    setTop(100);
    const handleScroll = () => {
      setScroll(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  return (
    <footer
      className={`footer-area ${theme === "white" ? "footer--2" : "footer--1"}`}
    >
      <div
        className={`dg__footer__container ${
          theme === "white" ? "bg--white" : "bg__color--2"
        }`}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 col-12">
              <div className="footer__widget">
                <h4>Resources</h4>
                <div className="footer__inner">
                  <ul className="ft__menu">
                    <li>
                      <a href="#">Bitcoin Price</a>
                    </li>
                    <li>
                      <a href="#">Blog</a>
                    </li>
                    <li>
                      <a href="#">Helps Portal</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Buy Theme</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 xs__mt--40">
              <div className="footer__widget information">
                <h4>Information</h4>
                <div className="footer__inner">
                  <ul className="ft__menu">
                    <li>
                      <a href="#">Currency Exchange</a>
                    </li>
                    <li>
                      <a href="#">Todays Rate</a>
                    </li>
                    <li>
                      <a href="#">About Howard</a>
                    </li>
                    <li>
                      <a href="#"> Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">How To Video</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12 md__mt--40 sm__mt--40">
              <div className="footer__widget support">
                <h4>Support</h4>
                <div className="footer__inner">
                  <ul className="ft__menu">
                    <li>
                      <a href="#">Contact us</a>
                    </li>
                    <li>
                      <a href="#">Support Center</a>
                    </li>
                    <li>
                      <a href="#">Helps</a>
                    </li>
                    <li>
                      <a href="#">Terms &amp; Conditions</a>
                    </li>
                    <li>
                      <a href="#">Live Chat</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 md__mt--40 sm__mt--40">
              <div className="footer__widget resources">
                <h4>Contact</h4>
                <div className="footer__inner">
                  <ul>
                    <li>howard@example.info</li>
                    <li>
                      Address:
                      <br /> your address here
                    </li>
                    <li>
                      Phone:
                      <br /> +11 1111 111 111
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`copyright ${
          theme === "white" ? "bg__color--1" : "bg--black"
        }`}
      >
        <div className="container" >
          <div className="row align-items-center">
            <div className="col-lg-6 col-sm-6 col-12">
              <div className="copyright__inner">
                <p>Copyright © All Right Reserved</p>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6 col-12">
            <ul className="footer__right social__icon" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <li>
                  <a
                    href="//facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebookSquare />
                  </a>
                </li>
                <li>
                  <a
                    href="//linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin />
                  </a>
                </li>
                <li>
                  <a
                    href="//twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitterSquare />
                  </a>
                </li>
                <li>
                  <a
                    href="//vimeo.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaVimeoSquare />
                  </a>
                </li>
                <li>
                  <a
                    href="//tumblr.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTumblrSquare />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <MdExpandLess />
      </button>
    </footer>
  );
};

export default Footer;
