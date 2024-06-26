import { OptionsContext } from "../App";
import capitalize from "../utils/capitalize";
import convertPath from "../utils/convertPath";
import getCookie from "../utils/getCookie";
import { defaultComponent } from "../App";
import { useRef, useState, useContext } from "react";
import axios from "axios";
import Dashboard from "./DashBoard";

export default function Car({ carDetails, back }) {
  const { setComponent } = useContext(OptionsContext);
  let count1 = -1;
  let count2 = -1;
  const pickupDate = useRef(null);
  const returnDate = useRef(null);
  const [bill, setBill] = useState(0);
  const [invalid, setInvalid] = useState(null);

  const calculateBill = (pickup, dropoff) => {
    if (pickup && dropoff) {
      if (pickup.getFullYear() <= dropoff.getFullYear()) {
        if (dropoff && pickup) {
          if (pickup.getMonth() <= dropoff.getMonth()) {
            if (pickup.getDate() < dropoff.getDate()) {
              setInvalid(null);
              setBill(
                (dropoff.getDate() - pickup.getDate()) *
                  carDetails.price_per_day
              );
            } else {
              setBill(0);
              setInvalid(<span className="badge bg-danger">Invalid Date</span>);
            }
          } else {
            setBill(0);
            setInvalid(<span className="badge bg-danger">Invalid Date</span>);
          }
        }
      }else {
        setBill(0);
        setInvalid(<span className="badge bg-danger">Invalid Date</span>);
      }
    } 
  };

  const setPickupDate = (e) => {
    e.preventDefault();
    pickupDate.current = new Date(Date.parse(e.target.value));
    calculateBill(pickupDate.current, returnDate.current);
  };

  const setReturnDate = (e) => {
    e.preventDefault();
    returnDate.current = new Date(Date.parse(e.target.value));
    calculateBill(pickupDate.current, returnDate.current);
  };

  const rentNow = async () => {
    if (getCookie("carent-session-token") === "") {
      setComponent({ ...defaultComponent, login: true });
    } else if (!invalid) {
      const data = {
        from: pickupDate.current,
        to: returnDate.current,
        total_bill: bill,
        owner: carDetails.owner,
        car_id: carDetails._id,
        make: carDetails.make,
        model: carDetails.model,
        price_per_day: carDetails.price_per_day,
        url: carDetails.photos_url[0],
        rented_by: getCookie("carent-session-token").id,
      };

      if (data.rented_by === data.owner) {
        setInvalid(<span className="badge bg-danger">This is your car!</span>);
        return;
      }

      await axios
        .post("http://localhost:8080/user/car/rent", data, {
          headers: {
            Authorization: `Bearer ${getCookie("carent-session-token").token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setComponent({ ...defaultComponent, dashboard: "true" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="container py-5">
        <div
          className="row row-cols-1 d-flex justify-content-evenly"
          style={{ maxWidth: 1127 }}
        >
          <div className="col-xl-10 m-auto mb-4">
            <div
              className="card"
              style={{
                borderRadius: 49,
                background:
                  "linear-gradient(180deg, rgba(55,99,244,0.48), rgba(0,0,0,0.89)), rgba(55,99,244,0)",
                border: "3px outset rgb(174,174,174)",
              }}
            >
              <div className="card-body text-center px-4 py-5 px-md-5">
                <h5
                  className="fw-bold d-flex justify-content-xl-center card-title"
                  style={{
                    fontSize: 29,
                    textShadow: "0px 0px 6px",
                    paddingLeft: 20,
                    marginBottom: 36,
                  }}
                >
                  <span style={{ fontWeight: "normal !important" }}>
                    RENT A
                  </span>
                  &nbsp;
                  {`${carDetails.make.toUpperCase()} ${capitalize(
                    carDetails.model
                  )}`}
                </h5>
                <div className="row">
                  <div className="col">
                    <p
                      className="mb-4"
                      style={{
                        fontSize: 18,
                        margin: 19,
                        paddingBottom: 0,
                        textAlign: "left",
                        marginTop: 16,
                      }}
                    >
                      <strong>Color: </strong>
                      {capitalize(carDetails.exterior_color)}
                    </p>
                    <p
                      className="mb-4"
                      style={{
                        fontSize: 18,
                        margin: 19,
                        marginTop: "-20px",
                        textAlign: "left",
                      }}
                    >
                      <strong>Fuel Average: </strong>
                      {carDetails.gas_mileage} km/liter
                    </p>

                    <p
                      className="mb-4"
                      style={{
                        fontSize: 18,
                        margin: 19,
                        marginTop: "-20px",
                        textAlign: "left",
                      }}
                    >
                      <strong>Rent: </strong>
                      {carDetails.price_per_day} PKR/day
                    </p>
                    <p
                      className="mb-4"
                      style={{
                        fontSize: 18,
                        margin: 19,
                        marginTop: "-20px",
                        textAlign: "left",
                      }}
                    >
                      <strong>Category:</strong>{" "}
                      {capitalize(carDetails.category)}
                    </p>
                    <p
                      className="mb-4"
                      style={{
                        fontSize: 18,
                        margin: 19,
                        marginTop: "-20px",
                        textAlign: "left",
                      }}
                    >
                      <strong>Location:</strong> {capitalize(carDetails.city)},
                      Pakistan
                    </p>
                  </div>
                  <div className="col">
                    <div className="d-flex d-xl-flex justify-content-center mx-auto justify-content-xl-center">
                      <div
                        id="carousel-2"
                        className="carousel slide d-xl-flex"
                        data-bs-ride="false"
                        style={{
                          width: "380.328px",
                          display: "block",
                          marginTop: 22,
                          height: 213,
                        }}
                      >
                        <div className="carousel-inner">
                          {carDetails.photos_url.map((url) => {
                            count1++;
                            return (
                              <div
                                className={
                                  count1 === 0
                                    ? "carousel-item active"
                                    : "carousel-item"
                                }
                                key={url}
                              >
                                <img
                                  className="w-100 d-block"
                                  src={convertPath(url)}
                                  alt="Slide Image"
                                />
                              </div>
                            );
                          })}
                        </div>
                        <div>
                          <a
                            className="carousel-control-prev"
                            href="#carousel-2"
                            role="button"
                            data-bs-slide="prev"
                          >
                            <span className="carousel-control-prev-icon" />
                            <span className="visually-hidden">Previous</span>
                          </a>
                          <a
                            className="carousel-control-next"
                            href="#carousel-2"
                            role="button"
                            data-bs-slide="next"
                          >
                            <span className="carousel-control-next-icon" />
                            <span className="visually-hidden">Next</span>
                          </a>
                        </div>
                        <ol className="carousel-indicators">
                          {carDetails.photos_url.map((url) => {
                            count2++;
                            return (
                              <li
                                key={url + "a"}
                                className={count2 === 0 ? "active" : ""}
                                data-bs-target="#carousel-2"
                                data-bs-slide-to={count2}
                              />
                            );
                          })}
                        </ol>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <p
                      className="mb-4"
                      style={{
                        fontSize: 18,
                        margin: 19,
                        textAlign: "left",
                        marginTop: "-2px",
                        paddingTop: 2,
                      }}
                    >
                      <strong>Description: </strong>
                      {capitalize(carDetails.description)}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-3">
                    <p
                      className="mb-4"
                      style={{
                        fontSize: 18,
                        margin: 19,
                        textAlign: "right",
                        paddingTop: 2,
                        paddingBottom: 0,
                        marginTop: 4,
                        marginRight: 0,
                      }}
                    >
                      <strong>Pick-up Date:</strong>
                    </p>
                    <p
                      className="mb-4"
                      style={{
                        fontSize: 18,
                        margin: 19,
                        textAlign: "right",
                        marginTop: 10,
                        paddingBottom: 0,
                        paddingTop: 11,
                        marginRight: "-8px",
                      }}
                    >
                      <strong>Returning Date:&nbsp;</strong>
                    </p>
                  </div>
                  <div className="col-xl-4">
                    <form name="color" placeholder="Color">
                      <div
                        className="mb-3"
                        style={{
                          width: "75%",
                          paddingTop: 6,
                          paddingBottom: 8,
                          marginTop: "-2px",
                        }}
                      >
                        <input
                          id="email-2"
                          className="form-control"
                          name="from"
                          placeholder="Model"
                          type="date"
                          style={{ height: "37.7812px" }}
                          onChange={(e) => {
                            setPickupDate(e);
                          }}
                        />
                        {invalid ? invalid : ""}
                      </div>

                      <div className="mb-3" style={{ width: "75%" }}>
                        <input
                          id="email-5"
                          className="form-control"
                          name="to"
                          placeholder="Price / Day"
                          type="date"
                          style={{ height: "37.7812px" }}
                          onChange={(e) => {
                            setReturnDate(e);
                          }}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="col-xl-3">
                    <div
                      className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-end"
                      style={{ position: "relative", marginTop: 12 }}
                    >
                      <div
                        className="d-flex d-xl-flex flex-row justify-content-center align-items-center m-auto justify-content-xl-center align-items-xl-center"
                        style={{
                          position: "relative",
                          width: 273,
                          paddingRight: 1,
                          paddingLeft: 25,
                        }}
                      >
                        <h5
                          className="fw-bold text-center shadow-sm d-xl-flex justify-content-start m-auto align-items-xl-center"
                          style={{
                            textAlign: "center",
                            fontSize: 16,
                            textShadow: "0px 0px 6px",
                            width: 68,
                            display: "inline-block",
                            position: "relative",
                            paddingRight: 0,
                            paddingLeft: 15,
                          }}
                        >
                          Total
                        </h5>
                        <h5
                          className="fw-bold text-center shadow-sm d-xl-flex m-auto justify-content-xl-start"
                          style={{
                            textAlign: "left",
                            fontSize: 29,
                            textShadow: "0px 0px 6px",
                            width: 270,
                            display: "inline-block",
                            position: "relative",
                            marginLeft: 92,
                            paddingLeft: 12,
                          }}
                        >
                          {bill} PKR
                        </h5>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      style={{
                        marginTop: 10,
                        width: "181.969px",
                        height: "41.1719px",
                        fontSize: 18,
                      }}
                      onClick={rentNow}
                    >
                      RENT NOW
                    </button>
                  </div>
                </div>
                {back}
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto" style={{ maxWidth: 900 }} />
      </div>
    </>
  );
}
