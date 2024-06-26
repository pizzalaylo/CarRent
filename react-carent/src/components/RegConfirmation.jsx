import { LottiePlayer } from "@lottiefiles/lottie-player"
export default function RegConfirmation() {
    return (
        <div className="row row-cols-1 d-flex justify-content-evenly">
  <div className="col-xl-10 m-auto mb-4">
    <div
      className="card"
      style={{
        borderRadius: 49,
        background:
          "linear-gradient(0deg, #ffffff, rgba(255,255,255,0.59)), rgba(55,99,244,0)",
        border: "3px outset rgb(174,174,174)"
      }}
    >
      <div className="card-body text-center px-4 py-5 px-md-5">
        <h3
          className="fw-bold d-flex justify-content-md-center justify-content-xl-center card-title"
          style={{
            fontSize: 33,
            textShadow: "0px 0px 6px var(--ref-gray)",
            paddingLeft: 20,
            marginBottom: 36,
            marginTop: 36,
            color: "var(--bs-black)",
            textAlign: "center"
          }}
        >
          YOU HAVE REGISTERED <br />
          SUCCESSFULLY
        </h3>
        <div
          className="d-flex d-xl-flex justify-content-center align-items-center justify-content-xl-end"
          style={{ position: "relative", marginTop: 12 }}
        >
          <div
            className="d-flex d-xl-flex flex-row justify-content-center align-items-center m-auto justify-content-xl-center align-items-xl-center"
            style={{
              position: "relative",
              width: 273,
              paddingLeft: 37,
              paddingRight: 37
            }}
          >
            <lottie-player
              src="https://lottie.host/47dc54c6-79a5-45e6-83dc-1085f40ff2b4/E14AVPuSeO.json"
              mode="normal"
              style={{ marginTop: "-45px" }}
              speed="1.2"
              loop=""
              autoPlay=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}