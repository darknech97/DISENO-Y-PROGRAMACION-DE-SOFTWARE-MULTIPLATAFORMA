import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Router, Link } from "@reach/router";

import Info from "./Home/Info"
import Contacto from "./Home/Contacto"
import Help from "./Home/Help"
import User from "./Home/User"


import Agregar from "./add-empleado"
import List from "./empleado-list.component"

const ProfilePage = () => {

  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();  
  };

  return (
    <div>
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Parcial 3 - UDB</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Inicio</Link></li>
            <li><Link to="agregar">Agregar Empleados</Link></li>
            <li><Link to="list">Lista de Empleados</Link></li>
            <button className="btn btn-danger" onClick={() => { signOut() }}>
              Sign out</button>
          </ul>
        </div>
      </nav>
      
      <div className="container">
        <div className="row">
          <div className="col-md-12 m-5 p-5 bg-info">
            <span className="float-right">
              <div
                style={{
                  background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
                  backgroundSize: "cover",
                  height: "100px",
                  width: "100px"
                }}
                className="border border-blue-300"
              ></div>
             <b>Nombre:</b> <h2 className="text-2xl font-semibold">{displayName}</h2>
             <b>Correo:</b> <h3 className="italic">{email}</h3>
            </span>
          </div>
          <div className="col-md-12 p-5 m-5"></div>
          <div className="col-md-12">
            <Router>
              <Agregar exact path="agregar" />
              <List exact path="list" />
              <Info exact path="info" />
              <Contacto exact path="contacto" />
              <Help exact path="help" />
              <User exact path="user" />
            </Router>
          </div>
        </div>
      </div>
          </div>
  )
};

export default ProfilePage;

