import React from "react";
import logo1 from "../assets/img/clipboard-image.png";
import AccountDropdown from "./AccountDropdown";
import { useContext, useRef, useEffect } from "react";
import { OptionsContext } from "../App";
import { defaultComponent } from "../App";

const Navbar = () => {
  const { logged, component, setComponent } = useContext(OptionsContext);

  const active = useRef(null);
  const prevActive = useRef(null);

  useEffect(() => {
    prevActive.current = active.current;
  }, [component]);

  const setFocus = (e) => {
    e.preventDefault();

    if (prevActive.current) {
      prevActive.current.className = "nav-link";
    }

    if (e.target.text === "Log in") {
      prevActive.current = null;
      active.current = null;
      return;
    }

    e.target.className = "nav-link active";
    active.current = e.target;
  };

  return (
    <nav
      id="mainNav"
      className="navbar navbar-dark navbar-expand-md sticky-top py-3"
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logo1} width={186} height={44} />
        </a>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navcol-1"
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon" />
        </button>
        <div id="navcol-1" className="collapse navbar-collapse">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a
                className="nav-link"
                role="button"
                onClick={(e) => {
                  setFocus(e);
                  setComponent({
                    ...defaultComponent,
                    home: true,
                  });
                }}
              >
                Home
              </a>
            </li>
            {logged ? (
              <li className="nav-item">
                <a
                  className="nav-link"
                  role="button"
                  onClick={(e) => {
                    setFocus(e);
                    setComponent({
                      ...defaultComponent,
                      addCars: true,
                    });
                  }}
                >
                  Add Car
                </a>
              </li>
            ) : (
              ""
            )}
            <li className="nav-item">
              <a
                className="nav-link"
                role="button"
                onClick={(e) => {
                  setFocus(e);
                  setComponent({
                    ...defaultComponent,
                    cars: true,
                  });
                }}
              >
                Rent Car
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                role="button"
                onClick={(e) => {
                  setFocus(e);
                  setComponent({
                    ...defaultComponent,
                    faqs: true,
                  });
                }}
              >
                FAQ
              </a>
            </li>
            <li className="nav-item" />
            <li className="nav-item">
              <a
                className="nav-link"
                role="button"
                onClick={(e) => {
                  setFocus(e);
                  setComponent({
                    ...defaultComponent,
                    contacts: true,
                  });
                }}
              >
                Contact Us
              </a>
            </li>
          </ul>
          {/* <input
            type="search"
            style={{
              width: 216,
              height: "36.5938px",
              borderRadius: 40,
              paddingLeft: 19,
              paddingRight: 10,
            }}
            placeholder="Search Car"
          /> */}
          {logged ? (
            <AccountDropdown />
          ) : (
            <a
              className="btn btn-primary shadow"
              role="button"
              style={{
                backgroundColor: "0353C3",
                height: "36.7812px",
                margin: 6,
                padding: "4.6px 32px",
              }}
              onClick={(e) => {
                setFocus(e);
                setComponent({
                  ...defaultComponent,
                  login: true,
                });
              }}
            >
              Log in
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
