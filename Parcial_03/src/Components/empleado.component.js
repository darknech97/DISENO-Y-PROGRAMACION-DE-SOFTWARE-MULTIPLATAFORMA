import React, { Component } from "react";
import TutorialDataService from "../services/empleado.service";
import Swal from "sweetalert2";

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangeCodigo = this.onChangeCodigo.bind(this);
    this.onChangeNombre = this.onChangeNombre.bind(this);
    this.onChangeHoras = this.onChangeHoras.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      currentTutorial: {
        key: null,
        published: false,
        codigo: "",
        nombre: "",
        horas: "",
        sueldo_liquido: "",
        isss: "",
        afp: "",
        renta: "",
        sueldo_neto: "" 
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { tutorial } = nextProps;
    if (prevState.currentTutorial.key !== tutorial.key) {
      return {
        currentTutorial: tutorial,
        message: ""
      };
    }

    return prevState.currentTutorial;
  }

  componentDidMount() {
    this.setState({
      currentTutorial: this.props.tutorial,
    });
  }



  onChangeCodigo(e) {
    const codigo = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          codigo: codigo,
        },
      };
    });
  }

  onChangeNombre(e) {
    const nombre = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          nombre: nombre,
        },
      };
    });
  }

  onChangeHoras(e) {
    const horas = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTutorial: {
          ...prevState.currentTutorial,
          horas: horas,
        },
      };
    });
  }

  updateTutorial() {
    /*Validacion*/
    if(this.state.currentTutorial.codigo == "" || this.state.currentTutorial.nombre == "" || this.state.currentTutorial.horas == ""){
      Swal.fire({
        icon: 'info',
        title: 'Ups...',
        text: 'Por favor ingresar todos los parametros.',
      });
      return false;
    }

    if(this.state.currentTutorial.horas < 0 || this.state.currentTutorial.horas > 250){
      Swal.fire({
        icon: 'info',
        title: 'Ups...',
        text: 'Las horas no pueden ser menores a 0 o mayores a 250.',
      });
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



    const data = {
      codigo: this.state.currentTutorial.codigo,
      nombre: this.state.currentTutorial.nombre,
      horas: this.state.currentTutorial.horas,
      sueldo_liquido: sueldo,
      isss: isss,
      afp: afp,
      renta: renta,
      sueldo_neto: sueldo_neto 
    };

    TutorialDataService.update(this.state.currentTutorial.key, data)
      .then(() => {
        this.setState({
          message: "¡El empleado fue actualizado con extio!",
        });
      })
      .catch((e) => {
        console.log(e);
      });

      this.state.currentTutorial.sueldo_liquido = sueldo;
      this.state.currentTutorial.isss = isss;
      this.state.currentTutorial.afp = afp;
      this.state.currentTutorial.renta = renta;
      this.state.currentTutorial.sueldo_neto = sueldo_neto;

      Swal.fire({
        icon: 'success',
        title: '¡Exito!',
        text: 'El empleado ' + this.state.currentTutorial.nombre + ' fue actualizado con extio.',
      });
  }

  deleteTutorial() {

    TutorialDataService.delete(this.state.currentTutorial.key)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });


      Swal.fire({
        icon: 'error',
        title: '¡Exito!',
        text: 'El empleado fue eliminado con exito.',
      });  
  }

  render() { 
    const { currentTutorial } = this.state;

    return (
      <div className="m-5 p-5">
        {currentTutorial ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="codigo">Codigo</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="codigo"
                  value={currentTutorial.codigo}
                  onChange={this.onChangeCodigo}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                  required
                  type="text"
                  className="form-control"
                  id="nombre"
                  value={currentTutorial.nombre}
                  onChange={this.onChangeNombre}
                />
              </div>

              <div className="form-group">
                <label htmlFor="horas">Horas</label>
                <input
                  required
                  min="0"
                  max="250"
                  step="1"
                  type="number"
                  className="form-control"
                  id="horas"
                  value={currentTutorial.horas}
                  onChange={this.onChangeHoras}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sueldo_liquido">Sueldo Liquido(USD $)</label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  value= {currentTutorial.sueldo_liquido}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sueldo_liquido">ISSS(USD $)</label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  value={currentTutorial.isss}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sueldo_liquido">AFP(USD $)</label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  value={currentTutorial.afp}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sueldo_liquido">Renta(USD $)</label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  value={currentTutorial.renta}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sueldo_liquido">Sueldo Neto(USD $)</label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  value={currentTutorial.sueldo_neto}
                />
              </div>

            </form>

            <button
              className="btn btn-danger"
              onClick={this.deleteTutorial}
            >
              Eliminar
            </button>

            <button
              type="submit"
              className="btn btn-info"
              onClick={this.updateTutorial}
            >
              Actualizar
            </button>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor seleccionar un empleado....</p>
          </div>
        )}
      </div>
    );
   }
}