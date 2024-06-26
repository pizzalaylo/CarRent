import RegConfirmation from "./RegConfirmation";
import { useContext, useState } from "react";
import { OptionsContext } from "../App";
import { defaultComponent } from "../App";
import axios from "axios";

function Signup() {
  const { component, setComponent } = useContext(OptionsContext);
  const [invalid, setInvalid] = useState(null);

  const signUp = (e) => {
    e.preventDefault();

    const obj = {
      fullname: e.target.fullname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    };

    if (obj.fullname === "") {
      setInvalid(
        <span className="badge bg-danger" style={{ marginTop: "20px" }}>
          Please enter your Full Name
        </span>
        
      );
      return;
    }

    else if (obj.email === "") {
      setInvalid(<span className="badge bg-danger" style={{ marginTop: "20px" }}>
          Please enter your Email
        </span>)
        return;
    }
    else if (obj.password === "") {
      setInvalid(<span className="badge bg-danger" style={{ marginTop: "20px" }}>
          Please enter a Password
        </span>)
        return;
    }

    if (e.target.password.value === e.target.confirmPassword.value) {
      axios
        .post("http://localhost:8080/auth/signup", obj)
        .then(function (response) {
          setInvalid("successful")
        })
        .catch(function (error) {
          setInvalid(<span className="badge bg-danger" style={{ marginTop: "20px" }}>
         Email already exists
        </span>)
          console.log(error);
        });
    } else {
      setInvalid(
        <span className="badge bg-danger" style={{ marginTop: "20px" }}>
          Password does not match
        </span>
      );
    }
  };

  return (
    <>
    {invalid === "successful" ? <RegConfirmation/>:
    <section className="py-5">
      <div className="container py-5" style={{ marginTop: "-2px" }}>
        <div className="row mb-4 mb-lg-5" style={{ marginTop: "-30px" }}>
          <div className="col-md-8 col-xl-6 text-center mx-auto">
            <p className="fw-bold text-success mb-2">Sign up</p>
            <h2 className="fw-bold" style={{ paddingBottom: 0 }}>
              Welcome
            </h2>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-6 col-xl-4">
            <div className="card">
              <div className="card-body text-center d-flex flex-column align-items-center">
                <div className="bs-icon-xl bs-icon-circle bs-icon-primary shadow bs-icon my-4">
                  <svg
                    className="bi bi-person"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                </div>
                <form
                  onSubmit={(e) => {
                    signUp(e);
                  }}
                >
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="text"
                      id="fullname"
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="password"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                    />
                    {invalid?invalid:""}
                  </div>
                  <div className="mb-3">
                    <button
                      className="btn btn-primary shadow d-block w-100"
                      type="submit"
                    >
                      Sign up
                    </button>
                  </div>
                  <p className="text">
                    Already have an account?&nbsp;
                    <a
                      onClick={() =>
                        setComponent({ ...defaultComponent, login: true })
                      }
                    >
                      <span
                        id="myspan"
                        style={{
                          color: "#0d6efd",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        Log in
                      </span>
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>}
    </>
  );
}

export default Signup;
