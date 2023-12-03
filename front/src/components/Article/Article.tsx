import React from "react";
import { Link } from "react-router-dom";
import "./Article.scss";
// import ParticleTwo from "./ParticleTwo";

const Article: React.FC = () => {
  return (
    <>
      <div className="ht__bradcaump__area">
        <div className="ht__bradcaump__container">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="bradcaump__inner text-center">
                  <h2 className="bradcaump-title">Articles</h2>
                  {/* <nav className="bradcaump-inner">
                    <Link className="breadcrumb-item" to={"#"}>
                      Home
                    </Link>
                    <span className="brd-separetor">/</span>
                    <span className="breadcrumb-item active">
                      {"Lorem Ipsum"}
                    </span>
                  </nav> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dg__blog__area bg--white pt--110 pb--140">
        <div className="container">
          <div className="row">
            {/* Start Single Blog */}
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <article className="blog__3">
                <div className="thumb">
                  <Link to={"#"}>
                    <img src={"#"} alt="" />
                  </Link>
                </div>
                <div className="content">
                  <div className="bl__author">
                    <img src="./img/1.png" alt="author images" />
                    <div className="author__inner">
                      <h6>Farhan</h6>
                      <span>16 Feb, 2020</span>
                    </div>
                  </div>
                  <h2>
                    <Link to={"#"}>
                      Large Mining Farm Discovered in Abandoned Russian Factory
                    </Link>
                  </h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text{" "}
                  </p>
                </div>
              </article>
            </div>
            {/* End Single Blog */}
            {/* Start Single Blog */}
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <article className="blog__3">
                <div className="thumb">
                  <Link to={"#"}>
                    <img src={"#"} alt="" />
                  </Link>
                </div>
                <div className="content">
                  <div className="bl__author">
                    <img src={"#"} alt="author images" />
                    <div className="author__inner">
                      <h6>Alex</h6>
                      <span>16 Feb, 2020</span>
                    </div>
                  </div>
                  <h2>
                    <Link to={"#"}>
                      Phasellus semper felisnon imperdiet varius.
                    </Link>
                  </h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text{" "}
                  </p>
                </div>
              </article>
            </div>
            {/* End Single Blog */}
            {/* Start Single Blog */}
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <article className="blog__3">
                <div className="thumb">
                  <Link to={"#"}>
                    <img src={"#"} alt="" />
                  </Link>
                </div>
                <div className="content">
                  <div className="bl__author">
                    <img src={"#"} alt="author images" />
                    <div className="author__inner">
                      <h6>Maria</h6>
                      <span>16 Feb, 2020</span>
                    </div>
                  </div>
                  <h2>
                    <Link to={"#"}>
                      World’s Central Bank: Crypto Could Risk Bank Runs
                    </Link>
                  </h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text{" "}
                  </p>
                </div>
              </article>
            </div>
            {/* End Single Blog */}
            {/* Start Single Blog */}
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <article className="blog__3">
                <div className="thumb">
                  <Link to={"#"}>
                    <img src={"#"} alt="" />
                  </Link>
                </div>
                <div className="content">
                  <div className="bl__author">
                    <img src={"#"} alt="author images" />
                    <div className="author__inner">
                      <h6>Farhan</h6>
                      <span>16 Feb, 2020</span>
                    </div>
                  </div>
                  <h2>
                    <Link to={"#"}>
                      Blogger ‘Bitfinex’ed’ Hires Legal Counsel to Fight
                      Bitfinex Lawsuit
                    </Link>
                  </h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text{" "}
                  </p>
                </div>
              </article>
            </div>
            {/* End Single Blog */}
            {/* Start Single Blog */}
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <article className="blog__3">
                <div className="thumb">
                  <Link to={""}>
                    <img src={""} alt="" />
                  </Link>
                </div>
                <div className="content">
                  <div className="bl__author">
                    <img src={""} alt="author images" />
                    <div className="author__inner">
                      <h6>James J Trump</h6>
                      <span>16 Feb, 2020</span>
                    </div>
                  </div>
                  <h2>
                    <Link to={"#"}>
                      World’s Central Bank: Crypto Could Risk Bank Runs
                    </Link>
                  </h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text{" "}
                  </p>
                </div>
              </article>
            </div>
            {/* End Single Blog */}
            {/* Start Single Blog */}
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <article className="blog__3">
                <div className="thumb">
                  <Link to={"#"}>
                    <img src={"#"} alt="" />
                  </Link>
                </div>
                <div className="content">
                  <div className="bl__author">
                    <img src={"#"} alt="author images" />
                    <div className="author__inner">
                      <h6>James J Trump</h6>
                      <span>16 Feb, 2020</span>
                    </div>
                  </div>
                  <h2>
                    <Link to={"#"}>
                      Phasellus semper felisnon imperdiet varius.
                    </Link>
                  </h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text{" "}
                  </p>
                </div>
              </article>
            </div>
            {/* End Single Blog */}
            {/* Start Single Blog */}
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <article className="blog__3">
                <div className="thumb">
                  <Link to={"#"}>
                    <img src={"#"} alt="" />
                  </Link>
                </div>
                <div className="content">
                  <div className="bl__author">
                    <img src={"#"} alt="author images" />
                    <div className="author__inner">
                      <h6>John Smith</h6>
                      <span>16 Feb, 2020</span>
                    </div>
                  </div>
                  <h2>
                    <Link to={"#"}>
                      World’s Central Bank: Crypto Could Risk Bank Runs
                    </Link>
                  </h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text{" "}
                  </p>
                </div>
              </article>
            </div>
            {/* End Single Blog */}
            {/* Start Single Blog */}
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <article className="blog__3">
                <div className="thumb">
                  <Link to={"#"}>
                    <img src={"#"} alt="" />
                  </Link>
                </div>
                <div className="content">
                  <div className="bl__author">
                    <img src={"#"} alt="author images" />
                    <div className="author__inner">
                      <h6>Robert</h6>
                      <span>16 Feb, 2020</span>
                    </div>
                  </div>
                  <h2>
                    <Link to={"#"}>
                      Phasellus semper felisnon imperdiet varius.
                    </Link>
                  </h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text{" "}
                  </p>
                </div>
              </article>
            </div>
            {/* End Single Blog */}
            {/* Start Single Blog */}
            <div className="col-lg-4 col-md-6 col-sm-6 col-12">
              <article className="blog__3">
                <div className="thumb">
                  <Link to={"#"}>
                    <img src={"#"} alt="" />
                  </Link>
                </div>
                <div className="content">
                  <div className="bl__author">
                    <img src={"#"} alt="author images" />
                    <div className="author__inner">
                      <h6>Robert Downey</h6>
                      <span>16 Feb, 2020</span>
                    </div>
                  </div>
                  <h2>
                    <Link to={"#"}>
                      Phasellus semper felisnon imperdiet varius.
                    </Link>
                  </h2>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text{" "}
                  </p>
                </div>
              </article>
            </div>
            {/* End Single Blog */}
          </div>
          <div className="row mt--40">
            <div className="col-lg-12">
              <ul className="dg__pagination d-flex">
                <li>
                  <a href={"/"}>01</a>
                </li>
                <li>
                  <a href={"/"}>02</a>
                </li>
                <li>
                  <a className="active" href={"/"}>
                    03
                  </a>
                </li>
                <li>
                  <a href={"/"}>04</a>
                </li>
                <li>
                  <a href={"/"}>05</a>
                </li>
                <li>
                  <a href={"/"}>......</a>
                </li>
                <li>
                  <a href={"/"}>10</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
