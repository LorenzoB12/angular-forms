import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConsultaCepService } from '../service/consulta-cep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(private router: Router, private consultaCepService: ConsultaCepService) { }

  ngOnInit(): void {
  }

  cadastrar(form : NgForm) {
    if(form.valid) {
      this.router.navigate(['./sucesso']);
    } else {
      console.log('Formulário inválido!');
    }
  }

  consultaCEP(ev: any, form: NgForm) {
    const cep = ev.target.value;
    if (cep !== '') {
      this.consultaCepService.getConsultaCep(cep).subscribe(resultado => this.populandoEndereco(resultado, form));
    }
  }

  populandoEndereco(resultado: any, form: NgForm) {
    form.form.patchValue({
      endereco: resultado.logradouro,
      complemento: resultado.complemento,
      bairro: resultado.bairro,
      cidade: resultado.localidade,
      estado: resultado.uf
    })
  }
}
