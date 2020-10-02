import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//  Service 
import { ClienteService } from '../../services/cliente.service';
// Class
import { Cliente } from '../../models/cliente';
import { Consulta } from '../../models/consulta'
// toastr
//import { ToastrService } from 'ngx-toastr';

//Service
import { AuthService } from "../../services/auth.service";
import { element } from 'protractor';

import Swal from 'sweetalert2'


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  listaClientes: Cliente[];
  listaConsultas: Consulta[];

  constructor(
      public authService: AuthService,
      public clienteService: ClienteService
    ) { }

  ngOnInit(): void {
    this.clienteService.listaClientes()
    .snapshotChanges().subscribe(
        item => {this.listaClientes = []; 
        item.forEach(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            this.listaClientes.push(x as Cliente);
     })
    });
  }

  limpiarClienteForm(){
    this.clienteService.clienteSeleccionado = new Cliente;
    this.clienteService.consultaSeleccionada = new Consulta;
    this.listaConsultas = null;
  }

  limpiarConsultaForm(){
    this.clienteService.consultaSeleccionada = new Consulta;
  }


  onSubmit(clienteForm : NgForm){
    if (clienteForm.value.$key == null){
      this.clienteService.insertCliente(clienteForm.value);
      this.limpiarClienteForm();

      Swal.fire({
        icon: 'success',
        title: 'El cliente se agrego con exito!',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
      this.clienteService.updateCliente(clienteForm.value);
      this.limpiarClienteForm();

      Swal.fire({
        icon: 'info',
        title: 'El cliente se actualizo con exito!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  onSubmitConsulta(consultaForm : NgForm){
    if (consultaForm.value.key_cliente == null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Por favor selecciona un cliente para poder agregar una consulta!'
      })
    }
    else{
      if(consultaForm.value.$key == null){

        let msg_descuento : string;

        if((this.listaConsultas.length+1) == 4){
          consultaForm.value.costo = consultaForm.value.costo * 0.95;
          msg_descuento = "Tienes 4 visitas. Descuento de 4%.";
        }
        else if((this.listaConsultas.length+1) > 5){
          consultaForm.value.costo = consultaForm.value.costo * 0.92;
          msg_descuento = "Tienes mas de 5 visitas. Descuento de 8%.";
        }

        Swal.fire({
          title: 'Ticket',
          html: "<b>Mascota: </b>" + consultaForm.value.mascota + "<br>" +
                "<b>Costo: </b> $" + consultaForm.value.costo + "<br>" +
                "<b>Tratamiento: </b>" + consultaForm.value.tratamiento + "<br>" +
                "<b>Medicamento: </b>" + consultaForm.value.medicamento + "<br>" + 
                msg_descuento,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Continuar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.clienteService.insertConsulta(consultaForm.value);
            this.limpiarConsultaForm();
            Swal.fire(
              'La consulta fue agregada con exito.',
              'success'
            )
          }
        })
      }
      else{
        this.clienteService.updateConsulta(consultaForm.value);
        this.limpiarConsultaForm();

        Swal.fire({
          icon: 'info',
          title: 'La consulta se actualizo con exito!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }

  seleccionarConsulta(consulta: Consulta){
    this.clienteService.consultaSeleccionada = Object.assign({}, consulta);
  }

  seleccionarCliente(cliente : Cliente){
    this.clienteService.clienteSeleccionado = Object.assign({}, cliente);
    this.abrirConsultas(cliente);
  }

  eliminarCliente(cliente : Cliente){

    Swal.fire({
      title: 'Esta seguro que desea eliminar este registro?',
      text: "Si el registro se elimina, no habra manera de recuperar la informacion.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(cliente.$key);
        this.limpiarClienteForm();
        Swal.fire(
          'Eliminado!',
          'El registro fue eliminado con exito.',
          'success'
        )
      }
    })
  }

  eliminarConsulta(consulta : Consulta){

    Swal.fire({
      title: 'Esta seguro que desea eliminar este registro?',
      text: "Si el registro se elimina, no habra manera de recuperar la informacion.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteConsulta(consulta.$key);
        this.limpiarConsultaForm();
        Swal.fire(
          'Eliminado!',
          'El registro fue eliminado con exito.',
          'success'
        )
      }
    })
  }

  abrirConsultas(cliente : Cliente){
    this.clienteService.listaConsultas(cliente.$key)
    .snapshotChanges().subscribe(
        item => {this.listaConsultas = [];
        item.forEach(element => {
            let x = element.payload.toJSON();
            x["$key"] = element.key;
            this.listaConsultas.push(x as Consulta);
        })
    });
  }

  buscarCliente(nombre_cliente_buscar: string){
    if(nombre_cliente_buscar != ""){
      this.clienteService.buscarCliente(nombre_cliente_buscar)
      .snapshotChanges().subscribe(
          item => {this.listaClientes = []; 
          item.forEach(element => {
              let x = element.payload.toJSON();
              x["$key"] = element.key;
              this.listaClientes.push(x as Cliente);
      })
      });
    }
    else if(nombre_cliente_buscar === ""){
      this.clienteService.listaClientes()
      .snapshotChanges().subscribe(
          item => {this.listaClientes = []; 
          item.forEach(element => {
              let x = element.payload.toJSON();
              x["$key"] = element.key;
              this.listaClientes.push(x as Cliente);
      })
      });
    }
    else{
      this.clienteService.listaClientes()
      .snapshotChanges().subscribe(
          item => {this.listaClientes = []; 
          item.forEach(element => {
              let x = element.payload.toJSON();
              x["$key"] = element.key;
              this.listaClientes.push(x as Cliente);
      })
      });
    }
  }

}
