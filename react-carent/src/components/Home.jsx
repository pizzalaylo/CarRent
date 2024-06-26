import header_pic from "../assets/img/header-pic.jpg";
import pic1 from "../assets/img/products/1.jpg";
import pic2 from "../assets/img/products/2.jpg";
import pic3 from "../assets/img/products/3.jpg";
import google from "../assets/img/brands/google.png"
import microsoft from "../assets/img/brands/microsoft.png"
import apple from "../assets/img/brands/apple.png"
import facebook from "../assets/img/brands/facebook.png"
import twitter from "../assets/img/brands/twitter.png"
import { useContext } from "react";
import { OptionsContext } from "../App";

export default function Home() {
  const { setComponent } = useContext(OptionsContext);

  return (
    <>
      <section
        className="py-5"
        style={{ background: 'url("/src/assets/img/section.jpg") center' }}
      >
        <div className="container text-center py-5">
          <h1 className="mb-4" style={{ fontSize: "1.6rem" }}>
            Renting a Car
            <br />
            Never been this{" "}
            <span className="text-success">
              <strong>Easy.</strong>
            </span>
          </h1>
          <a
            className="btn btn-primary btn-lg d-flex d-xxl-flex justify-content-center align-items-center flex-wrap justify-content-xxl-center mx-auto"
            role="button"
            style={{
              position: "relative",
              width: 223,
              background: "#b02626",
              height: "45.5938px",
              paddingTop: 6,
            }}
            onClick={() => {
              setComponent({
                login: false,
                home: false,
                regForm: false,
                contacts: false,
                cars: true,
              });
            }}
          >
            Search Now
          </a>
        </div>
      </section>
      <header className="bg-dark">
        <div className="container pt-4 pt-xl-5">
          <div className="row pt-5">
            <div className="col-md-8 col-xl-6 text-center text-md-start mx-auto">
              <div className="text-center">
                <p className="fw-bold text-success mb-2">Voted #1 Worldwide</p>
                <h1 className="fw-bold">The best solution for our customers</h1>
              </div>
            </div>
            <div className="col-6">
              <div className="text-center" />
              <img src={header_pic} width={550} />
            </div>
            <div className="col-12 col-lg-10 mx-auto">
              <div
                className="position-relative"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    flex: "0 0 45%",
                    transform: "translate3d(-15%, 35%, 0)",
                  }}
                >
                  <img
                    className="img-fluid"
                    data-bss-parallax=""
                    data-bss-parallax-speed="0.8"
                    src={pic3}
                  />
                </div>
                <div
                  style={{
                    position: "relative",
                    flex: "0 0 45%",
                    transform: "translate3d(-5%, 20%, 0)",
                  }}
                >
                  <img
                    className="img-fluid"
                    data-bss-parallax=""
                    data-bss-parallax-speed="0.5"
                    src={pic2}
                  />
                </div>
                <div
                  style={{
                    position: "relative",
                    flex: "0 0 60%",
                    transform: "translate3d(0, 5%, 0)",
                  }}
                >
                  <img
                    className="img-fluid"
                    data-bss-parallax=""
                    data-bss-parallax-speed="0.5"
                    src={pic1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="py-5">
        <div className="container text-center py-5">
          <p className="mb-4" style={{ fontSize: "1.6rem" }}>
            Used by{" "}
            <span className="text-success">
              <strong>2400+</strong>
            </span>
            &nbsp;of the best companies in the world.
          </p>
          <a href="#">
            <img className="m-3" src={google} />
          </a>
          <a href="#">
            <img className="m-3" src={microsoft} />
          </a>

          <a href="#">
            <img className="m-3" src={apple} />
          </a>
          <a href="#">
            <img className="m-3" src={facebook} />
          </a>
          <a href="#">
            <img className="m-3" src={twitter} />
          </a>
        </div>
      </section>
    </>
  );
}
