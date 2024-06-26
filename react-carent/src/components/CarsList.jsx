import Car from "./Car";
import { useState, useEffect, useRef, useMemo, useContext } from "react";
import { OptionsContext } from "../App";
import convertPath from "../utils/convertPath";
import capitalize from "../utils/capitalize";
import axios from "axios";

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

export default function CarsList() {
  const { cars, setCars } = useContext(OptionsContext);
  const [filter, setFilter] = useState("");
  const [carDetails, setCarDetails] = useState(null);
  const category = useRef("Category");
  const make = useRef("Make");
  const model = useRef("Model");
  const city = useRef("City");

  const applyFilter = async (e, filterType) => {
    let filterString = "";
    if (filterType !== "remove") {
      if (filter === "") {
        if (filterType === "city") {
          filterString = `${filter}&${filterType}=${e.target.text}`
        }
        else{
          filterString = `${filterType}=${e.target.text.toLowerCase()}`
        } 
          
      } else {
        if (filterType === "city") {
          filterString = `${filter}&${filterType}=${e.target.text}`;
        } else {
          filterString = `${filter}&${filterType}=${e.target.text.toLowerCase()}`;
        }
      }
    }

    //console.log(filterString)

    await axios.get(`http://localhost:8080/cars?${filterString}`).then(
      (res) => {
        if (filterType === "remove") {
          category.current = "Category";
          make.current = "Make";
          model.current = "Model";
          city.current = "City";
        } else {
          if (filterType === "category") category.current = e.target.text;
          if (filterType === "make") make.current = e.target.text;
          if (filterType === "model") model.current = e.target.text;
          if (filterType === "city") city.current = e.target.text;
        }

        setCars(res.data);
        setFilter(filterString);
      },
      (err) => console.log(err)
    );
  };

  const categories = useMemo(() => {
    return removeDuplicates(
      cars.map((car) => {
        return car.category;
      })
    ).map((category) => {
      return (
        <a
          className="dropdown-item"
          role="button"
          key={category}
          onClick={(e) => applyFilter(e, "category")}
        >
          {capitalize(category)}
        </a>
      );
    });
  }, [cars]);

  const makes = useMemo(() => {
    return removeDuplicates(
      cars.map((car) => {
        return car.make;
      })
    ).map((make) => {
      return (
        <a
          className="dropdown-item"
          role="button"
          key={make}
          onClick={(e) => applyFilter(e, "make")}
        >
          {capitalize(make)}
        </a>
      );
    });
  }, [cars]);

  const models = useMemo(() => {
    return removeDuplicates(
      cars.map((car) => {
        return car.model;
      })
    ).map((model) => {
      return (
        <a
          className="dropdown-item"
          role="button"
          key={model}
          onClick={(e) => applyFilter(e, "model")}
        >
          {capitalize(model)}
        </a>
      );
    });
  }, [cars]);

  const cities = useMemo(() => {
    return removeDuplicates(
      cars.map((car) => {
        return car.city;
      })
    ).map((city) => {
      return (
        <a
          className="dropdown-item"
          role="button"
          key={city}
          onClick={(e) => applyFilter(e, "city")}
        >
          {capitalize(city)}
        </a>
      );
    });
  }, [cars]);

  // console.log(cars);

  return (
    <>
      {carDetails ? (
        <Car
          carDetails={carDetails}
          back={
            <button
              className="btn btn-primary btn-sm"
              type="button"
              style={{
                marginTop: 10,
                width: "181.969px",
                height: "41.1719px",
                fontSize: 18,
              }}
              onClick={() => setCarDetails(null)}
            >
              GO BACK
            </button>
          }
        />
      ) : (
        <section>
          <div
            className="container py-5"
            style={{
              width: 1096,
              borderRadius: 84,
              background: "rgba(205,205,205,0.95)",
            }}
          >
            <div className="row">
              <div className="col-md-8 col-xl-12 col-xxl-9 text-center mx-auto">
                <h3 className="fw-bold" style={{ color: "var(--bs-black)" }}>
                  Find your Perfect Ride:
                </h3>
                <div className="dropdown d-inline-flex">
                  <button
                    className="btn btn-warning dropdown-toggle border rounded-pill shadow"
                    aria-expanded="false"
                    data-bs-toggle="dropdown"
                    type="button"
                    style={{
                      margin: 13,
                      opacity: 1,
                      width: "auto",
                      background: "#3763f4",
                      color: "rgb(255,255,255)",
                    }}
                  >
                    {category.current}
                  </button>
                  <div className="dropdown-menu">{categories}</div>
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
                      width: "auto",
                      background: "#3763f4",
                      color: "rgb(255,255,255)",
                    }}
                  >
                    {make.current}
                  </button>
                  <div className="dropdown-menu">{makes}</div>
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
                      width: "auto",
                      background: "#3763f4",
                      color: "rgb(255,255,255)",
                    }}
                  >
                    {model.current}
                  </button>
                  <div className="dropdown-menu">{models}</div>
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
                      width: "auto",
                      background: "#3763f4",
                      color: "rgb(255,255,255)",
                    }}
                  >
                    {city.current}
                  </button>
                  <div className="dropdown-menu">{cities}</div>
                </div>
                <a onClick={(e) => applyFilter(e, "remove")}>
                  <span
                    id="myspan"
                    style={{
                      marginLeft: "20px",
                      color: "#000000",
                      fontWeight: "bold",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Clear Filters
                  </span>
                </a>
              </div>
            </div>
            <div
              className="py-5 p-lg-5"
              style={{ paddingTop: 202, marginTop: 46 }}
            >
              <div
                className="row row-cols-1 row-cols-md-2 mx-auto"
                style={{ maxWidth: 900 }}
              >
                {cars.map((car) => {
                  return (
                    <div className="col mb-4" key={car._id}>
                      <div
                        className="card shadow-sm"
                        style={{
                          marginRight: 22,
                          marginLeft: "-9px",
                          borderRadius: 49,
                          background: "rgba(255,255,255,0.57)",
                          width: 415,
                        }}
                      >
                        <div
                          className="card-body px-4 py-5 px-md-5"
                          style={{
                            borderRadius: 45,
                            borderWidth: 3,
                            borderStyle: "solid",
                          }}
                        >
                          <div
                            className="d-flex justify-content-center align-items-center mb-3 bs-icon"
                            style={{
                              top: "1rem",
                              right: "1rem",
                              position: "relative",
                              marginLeft: 58,
                              width: 221,
                              height: 129,
                              paddingBottom: 52,
                            }}
                          >
                            <img
                              src={convertPath(car.photos_url[0])}
                              style={{ maxWidth: 321, maxHeight: 170 }}
                            />
                          </div>
                          <h5
                            className="fw-bold shadow-sm card-title"
                            style={{
                              textAlign: "left",
                              fontSize: 29,
                              textShadow: "0px 0px 6px var(--bs-gray-500)",
                              paddingLeft: 20,
                              color: "var(--bs-black)",
                            }}
                          >
                            {capitalize(car.make) + " " + capitalize(car.model)}
                          </h5>
                          <p
                            className="card-text mb-4"
                            style={{
                              fontSize: 18,
                              margin: 19,
                              color: "var(--bs-black)",
                            }}
                          >
                            <strong>Category:</strong> {car.category}
                            <br />
                            <strong>Location:</strong> {capitalize(car.city)}
                          </p>
                          <h5
                            className="fw-bold shadow-sm card-title"
                            style={{
                              textAlign: "center",
                              fontSize: 29,
                              textShadow: "0px 0px 6px var(--bs-gray-500)",
                              width: 99,
                              display: "inline-block",
                              position: "relative",
                              paddingLeft: 0,
                              marginLeft: 92,
                              color: "var(--bs-black)",
                            }}
                          >
                            {car.price_per_day}
                          </h5>
                          <h5
                            className="fw-bold shadow-sm card-title"
                            style={{
                              textAlign: "center",
                              fontSize: 16,
                              textShadow: "0px 0px 6px var(--bs-gray-500)",
                              width: 78,
                              display: "inline-block",
                              color: "var(--bs-black)",
                            }}
                          >
                            PKR / day
                          </h5>
                          <button
                            className="btn btn-primary shadow"
                            type="button"
                            style={{ width: 310 }}
                            onClick={() => setCarDetails(car)}
                          >
                            Rent Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
