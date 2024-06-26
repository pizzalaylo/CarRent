import { useRef, useState, useContext } from "react";
import { categories, years, cities } from "../utils/carFormHelper";
import getCookie from "../utils/getCookie";
import axios from "axios";
import { OptionsContext } from "../App";
import { defaultComponent } from "../App";

export default function CarForm() {
  const [click, setClick] = useState(false);
  const {setComponent} = useContext(OptionsContext)
  const category = useRef("Category");
  const year = useRef("Year");
  const city = useRef("City");

  const handleClick = (e, clickType) => {
    e.preventDefault();
    if (clickType === "category") {
      category.current = e.target.text;
    } else if (clickType === "year") {
      year.current = e.target.text;
    } else if (clickType === "city") {
      city.current = e.target.text;
    }
    setClick(!click);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    data.append("owner", getCookie("carent-session-token").id);
    data.append("owner_name", getCookie("carent-session-token").fullname);
    data.append("city", city.current)
    data.append("category", category.current)
    data.append("year", category.current)

    await axios
      .post("http://localhost:8080/user/car/add", data, {
        headers: {
          Authorization: `Bearer ${getCookie("carent-session-token").token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setComponent({...defaultComponent, dashboard: true})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <section style={{ paddingTop: 70, paddingBottom: 70 }}>
        <div
          className="container py-5"
          style={{
            width: 1096,
            borderRadius: 84,
            background:
              "linear-gradient(rgb(0,0,0), rgba(0,0,0,0.6)), rgba(205,205,205,0)",
            color: "rgba(255,255,255,0)",
          }}
        >
          <div className="row mb-5" style={{ marginBottom: 30 }}>
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2
                className="fw-bold"
                style={{ marginBottom: 6, color: "rgb(255,255,255)" }}
              >
                Add your Car
              </h2>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-12">
              <div>
                <form
                  className="d-xl-flex justify-content-xl-center p-3 p-xl-4"
                  method="post"
                  style={{ marginTop: "-54px" }}
                >
                  <div className="dropdown d-inline-flex">
                    <button
                      className="btn btn-warning dropdown-toggle border rounded-pill shadow"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      type="button"
                      style={{
                        margin: 13,
                        opacity: 1,
                        width: 149,
                        background: "#3763f4",
                        color: "rgb(255,255,255)",
                        boxShadow: "0px 0px var(--bs-red)",
                      }}
                    >
                      {year.current}
                    </button>
                    <div
                      className="dropdown-menu"
                      style={{ boxShadow: "0px 0px var(--bs-red)" }}
                    >
                      {years.map((year) => {
                        return (
                          <a
                            className="dropdown-item"
                            href="#"
                            style={{ boxShadow: "0px 0px var(--bs-red)" }}
                            onClick={(e)=>handleClick(e, "year")}
                          >
                            {year}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div className="dropdown d-inline-flex">
                    <button
                      className="btn btn-warning dropdown-toggle border rounded-pill shadow"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      type="button"
                      style={{
                        margin: 13,
                        opacity: 1,
                        width: 149,
                        background: "#3763f4",
                        color: "rgb(255,255,255)",
                        boxShadow: "0px 0px var(--bs-red)",
                      }}
                    >
                    {category.current}
                    </button>
                    <div
                      className="dropdown-menu"
                      style={{ boxShadow: "0px 0px var(--bs-red)" }}
                    >
                      {categories.map((category) => {
                        return (
                          <a
                            className="dropdown-item"
                            href="#"
                            style={{ boxShadow: "0px 0px var(--bs-red)" }}
                            onClick={(e)=>handleClick(e, "category")}
                          >
                            {category}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div className="dropdown d-inline-flex">
                    <button
                      className="btn btn-warning dropdown-toggle border rounded-pill shadow"
                      aria-expanded="false"
                      data-bs-toggle="dropdown"
                      type="button"
                      style={{
                        margin: 13,
                        opacity: 1,
                        width: 149,
                        background: "#3763f4",
                        color: "rgb(255,255,255)",
                        boxShadow: "0px 0px var(--bs-red)",
                      }}
                    >
                      {city.current}
                    </button>
                    <div
                      className="dropdown-menu"
                      style={{ boxShadow: "0px 0px var(--bs-red)" }}
                    >
                      {cities.map((city) => {
                        return (
                          <a
                            className="dropdown-item"
                            href="#"
                            style={{ boxShadow: "0px 0px var(--bs-red)" }}
                            onClick={(e)=>handleClick(e, "city")}
                          >
                            {city}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <form
            id="carform"
            encType={"multipart/form-data"}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="row d-flex justify-content-center">
              <div className="col-md-6 col-xl-4" style={{ marginRight: 30 }}>
                <div>
                  <div className="mb-3">
                    <input
                      id="email-3"
                      className="form-control"
                      type="text"
                      name="make"
                      placeholder="Make"
                      style={{ color: "var(--bs-black)" }}
                    />
                  </div>
                  <div className="mb-3" />
                  <div className="mb-3">
                    <input
                      id="email-1"
                      className="form-control"
                      type="number"
                      name="gas_mileage"
                      placeholder="Fuel Average"
                      style={{ color: "var(--bs-black)" }}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      id="email-5"
                      className="form-control"
                      type="text"
                      name="exterior_color"
                      placeholder="Color"
                      style={{ color: "black" }}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      id="message-1"
                      className="form-control"
                      name="description"
                      rows={3}
                      placeholder="Description"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6 col-xl-4" style={{ marginLeft: 30 }}>
                <div>
                  <div className="mb-3">
                    <input
                      id="email-6"
                      className="form-control"
                      type="text"
                      name="model"
                      placeholder="Model"
                      style={{ color: "var(--bs-black)" }}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      id="email-2"
                      className="form-control"
                      type="number"
                      name="price_per_day"
                      placeholder="Price / Day"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      id="email-4"
                      className="form-control"
                      type="file"
                      name="car_images"
                      placeholder="Price / Day"
                      multiple
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      id="message-3"
                      className="form-control"
                      name="address"
                      rows={3}
                      placeholder="Address"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
              <div>
                <div>
                  <button
                    className="btn btn-primary shadow d-block w-100"
                    type="submit"
                    form="carform"
                    style={{ fontSize: 21 }}
                  >
                    Add Car
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
