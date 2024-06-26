import { useState } from "react";
import getCookie from "../utils/getCookie";
import UserCars from "./UserCars";
import Bookings from "./Bookings";
import axios from "axios";

export default function Dashboard() {
  const [display, setDisplay] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    if (e.target.innerText === "Your Cars") {
      
      await axios
        .get(
          `http://localhost:8080/user/cars/${
            getCookie("carent-session-token").id
          }`,
          {
            headers: {
              Authorization: `Bearer ${
                getCookie("carent-session-token").token
              }`
            },
          }
        )
        .then((res) => {
          //console.log(res.data)
          setDisplay(<UserCars cars={res.data} toDelete={setDisplay} />);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else
    {
      await axios
        .get(
          `http://localhost:8080/user/bookings/${
            getCookie("carent-session-token").id
          }`,
          {
            headers: {
              Authorization: `Bearer ${
                getCookie("carent-session-token").token
              }`
            },
          }
        )
        .then((res) => {
          //console.log(res.data)
          setDisplay(<Bookings bookings={res.data} toDelete={setDisplay} />);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <section style={{ paddingTop: 70, paddingBottom: 70 }}>
        <div
          className="container py-5"
          style={{
            width: 1190,
            borderRadius: 84,
            maxWidth: 1146,
            background:
              "linear-gradient(rgba(0,33,72,0.82) 0%, rgba(255,255,255,0.81)), rgba(255,255,255,0.05)",
          }}
        >
          <div className="row">
            <div className="col-md-8 col-xl-12 col-xxl-9 text-center mx-auto">
              <h1
                className="fw-bold"
                style={{ color: "rgb(255,255,255)", marginBottom: 20 }}
              >
                <span style={{ fontWeight: "normal !important" }}>
                  Welcome,{" "}
                </span>
                {getCookie("carent-session-token").fullname}
              </h1>
              <div className="d-inline-flex">
                <div
                  className="d-xl-flex justify-content-xl-center align-items-xl-center"
                  style={{ width: 175, height: "72.7812px" }}
                >
                  <button
                    className="btn btn-primary shadow"
                    type="button"
                    style={{ width: 149 }}
                    onClick={(e) => handleClick(e)}
                  >
                    Your Cars
                  </button>
                </div>
                <div
                  className="d-xl-flex justify-content-xl-center align-items-xl-center"
                  style={{ width: 175, height: "72.7812px" }}
                />
                <div
                  className="d-xl-flex justify-content-xl-center align-items-xl-center"
                  style={{ height: "72.7812px", width: 175 }}
                >
                  <button
                    className="btn btn-primary shadow"
                    type="button"
                    style={{ width: 149 }}
                    onClick={(e) => handleClick(e)}
                  >
                    Bookings
                  </button>
                </div>
              </div>
            </div>
          </div>
          {display}
        </div>
      </section>
    </>
  );
}
