import convertPath from "../utils/convertPath";
import capitalize from "../utils/capitalize";
import getCookie from "../utils/getCookie";
import getDateOnly from "../utils/dateHelper";
import axios from "axios";

export default function UserCars({cars, toDelete}) {


   const handleDelete = async(id) => {
    await axios.delete(
      `http://localhost:8080/user/car/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${
            getCookie("carent-session-token").token
          }`
        },
      }
    )
    .then((res) => {
      toDelete(<UserCars cars={cars.filter(car=>{return car._id !== res.data._id})} toDelete={toDelete} />);
    })
    .catch((err) => {
      console.log(err);
    });
   }

  return (
    <div className="py-5 p-lg-5" style={{ paddingTop: 50, marginTop: "-4px"}}>
      <h1
        className="fw-bolder"
        style={{
          color: "rgb(255,255,255)",
          textAlign: "center",
          paddingBottom: 16,
        }}
      >
        Your Cars
      </h1>
      {cars.map(car=>{ return <div
        className="row row-cols-1 row-cols-md-2 mx-auto"
        style={{ maxWidth: 1085 }}
        key={car._id}
      >
        <div className="col-xl-12 mb-4">
          <div
            className="card shadow-sm"
            style={{
              marginRight: 22,
              marginLeft: "-9px",
              borderRadius: 30,
              background: "rgba(255,255,255,0.98)",
              width: 1020,
            }}
          >
            <div
              className="card-body px-4 py-5 px-md-5"
              style={{
                borderRadius: 30,
                borderWidth: 3,
                borderStyle: "solid",
                height: 127,
              }}
            >
              <div
                className="d-flex flex-row justify-content-evenly align-items-xl-center"
                style={{
                  height: 84,
                  margin: "-14px",
                  marginTop: "-26px",
                }}
              >
                <div
                  className="d-flex justify-content-center align-items-center mb-3 bs-icon"
                  style={{
                    top: "1rem",
                    right: "1rem",
                    position: "relative",
                    marginLeft: 3,
                    width: 221,
                    height: 118,
                    paddingBottom: 32,
                  }}
                >
                  <img
                    src={convertPath(car.photos_url[0])}
                    style={{ maxWidth: 270, width: 230 }}
                  />
                </div>
                <h1
                  className="fw-semibold shadow-sm d-xl-flex justify-content-xl-center align-items-xl-center"
                  style={{
                    textAlign: "center",
                    fontSize: 27,
                    textShadow: "0px 0px 6px var(--bs-gray-500)",
                    paddingLeft: 0,
                    color: "var(--bs-black)",
                    height: 48,
                    width: "475.672px",
                  }}
                >
                  {`${car.make.toUpperCase()} ${capitalize(car.model)}`} 
                </h1>
                <div className="flex-row" style={{ height: "72.578px" }}>
                  <button
                    className="btn btn-primary shadow"
                    type="button"
                    style={{ width: 207, background: "#e31b2f" }}
                    onClick={()=>handleDelete(car._id)}
                  >
                    Delete
                  </button>
                  <p
                    className="fw-normal mb-4"
                    style={{
                      fontSize: 18,
                      margin: 19,
                      color: "var(--bs-black)",
                      marginLeft: 10,
                      marginTop: 3,
                    }}
                  >
                    <strong>Added on:</strong>&nbsp;{getDateOnly(car.date_added)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>})}
    </div>
  );
}
