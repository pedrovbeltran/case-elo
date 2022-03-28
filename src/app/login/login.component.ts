import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';

// Importando os models
import { User } from '../_models/user.model';

// Import custom validator class
import { CustomValidators } from '../_providers/CustomValidators';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private titleService: Title,
    private route: Router
  ) {}

  //Variável que, quando é verdadeira, aparece uma mensagem de registro feito com sucesso
  success = false;

  // Declarando o formulário com o validador customizado
  registerForm = this.formBuilder.group(
    {
      user: [''],
      password: [''],
      confirmPassword: [''],
    },
    {
      validator: CustomValidators.mustMatch('password', 'confirmPassword'),
    }
  );

  ngOnInit() {
    this.titleService.setTitle('Registro');
  }

  // Função chamada para verificar atributos como "invalid"
  get retControls() {
    return this.registerForm.controls;
  }
  // Ao submeter o formulário, use o modelo "User" para auxiliar no armazenamento
  // dessas informações no localStorage
  createNewUser() {
    const user = new User(
      this.registerForm.value.user,
      this.registerForm.value.password
    );
    localStorage.setItem('registro', JSON.stringify(user));
    this.success = true;
    this.registerForm.reset();
    setTimeout(() => {
      this.route.navigate(['leads']);
    }, 5000);
  }
}
