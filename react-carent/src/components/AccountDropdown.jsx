import getCookie from "../utils/getCookie";
import axios from "axios";
import { defaultComponent } from "../App";
import { useContext } from "react";
import { OptionsContext } from "../App";



export default function AccountDropdown()  {
  const { setComponent, setLogged } = useContext(OptionsContext);

  const signOut = async () => {
    
    await axios
      .get("http://localhost:8080/auth/signout", { withCredentials: true })
      .then((res) => {
        setLogged(false);
        setComponent({...defaultComponent, home: true})
        
      });
  };

    
    return (
    <div
      className="dropdown d-inline-flex"
      style={{ width: 175, height: "72.7812px" }}
    >
      <button
        className="btn btn-warning dropdown-toggle border rounded-pill shadow"
        aria-expanded="false"
        data-bs-toggle="dropdown"
        type="button"
        style={{
          margin: "19px",
          padding: "4.6px 32px",
          opacity: 1,
          width: "auto",
          height:"36.7812px",
          background: "#3763f4",
          color: "rgb(255,255,255)",
          boxShadow: "0px 0px var(--bs-red)",
        }}
      >
        {getCookie("carent-session-token").fullname}
      </button>
      <div className="dropdown-menu">
        <a className="dropdown-item" role="button" onClick={()=>setComponent({...defaultComponent, dashboard:true})}>
          View Dashboard
        </a>
        <a className="dropdown-item" role="button" onClick={signOut}>
          Log Out
        </a>
      </div>
    </div>
  );
}