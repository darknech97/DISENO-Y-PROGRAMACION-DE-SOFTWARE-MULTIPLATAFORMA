import React, { Component } from "react";
import EmpleadoDataService from "../services/empleado.service";

export default class AddTutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeCodigo = this.onChangeCodigo.bind(this);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeHoras = this.onChangeHoras.bind(this);
    this.saveEmpleado = this.saveEmpleado.bind(this);
    this.newEmpleado = this.newEmpleado.bind(this);

    this.state = {
      codigo: "",
      nombre: "",
      horas: "",

      submitted: false,
    };
  }

  onChangeCodigo(e) {
    this.setState({
      codigo: e.target.value,
    });
  }

  onChangeNombre(e) {
    this.setState({
      nombre: e.target.value,
    });
  }

  onChangeHoras(e) {
    this.setState({
      horas: e.target.value,
    });
  }

  saveEmpleado() {

    /*Validacion*/
    if(this.state.codigo == "" || this.state.nombre == "" || this.state.horas == ""){
      alert("Por favor ingresar todos los parametros.");
      return false;
    }

    if(this.state.horas < 0 || this.state.horas > 250){
      alert("Las horas no pueden ser menores a 0 o mayores a 250.");
      return false;
    }

    let sueldo = 0;
    let residuo = 0;

    if(this.state.horas <= 160){
      sueldo = this.state.horas * 9.75;
    }
    else if(this.state.horas > 160 && this.state.horas <= 200){
      residuo = this.state.horas - 160;
      sueldo = (160 * 9.75) + (residuo * 11.5);
    }
    else if(this.state.horas > 200 && this.state.horas <= 250){
      residuo = this.state.horas - 200;
      sueldo = (160 * 9.75) + (40 * 11.5) + (residuo * 12.50);
    }

    let isss = (sueldo * 0.0525).toFixed(2);
    let afp = (sueldo * 0.0688).toFixed(2);
    let renta = (sueldo * 0.1).toFixed(2);
    let sueldo_neto = (sueldo - isss - afp - renta).toFixed(2);

    let data = {
      codigo: this.state.codigo,
      nombre: this.state.nombre,
      horas: this.state.horas,
      sueldo_liquido: sueldo,
      isss: isss,
      afp: afp,
      renta: renta,
      sueldo_neto: sueldo_neto 
    };

    EmpleadoDataService.create(data)
      .then(() => {
        console.log("Se creo nuevo empleado con exito.");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newEmpleado() {
    this.setState({
      codigo: "",
      nombre: "",
      horas: "",

      submitted: false,
    });
  }

  render() {
    return (
        <div className="container-fluid">
            <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>¡El empleado se agrego con exito!</h4>
            <button className="btn btn-success" onClick={this.newEmpleado}>
              Agregar Nuevamente
            </button>
          </div>
        ) : (
          <div>
            <b>Agregar Empleado</b>
            <div className="form-group">
              <input
                placeholder="Codigo"
                required
                type="text"
                className="form-control"
                id="codigo"
                required
                value={this.state.codigo}
                onChange={this.onChangeCodigo}
                name="codigo"
              />
            </div>

            <div className="form-group">
              <input
                placeholder="Nombre"
                required
                type="text"
                className="form-control"
                id="nombre"
                required
                value={this.state.nombre}
                onChange={this.onChangeNombre}
                name="nombre"
              />
            </div>

            <div className="form-group">
              <input
                placeholder="Horas"
                required
                min="0"
                max="250"
                step="1"
                type="number"
                className="form-control"
                id="horas"
                required
                value={this.state.horas}
                onChange={this.onChangeHoras}
                name="horas"
              />
            </div>

            

            <button onClick={this.saveEmpleado} className="btn btn-success">
              Agregar
            </button>
          </div>
        )}
      </div>
        </div>
      
    );
  }
}