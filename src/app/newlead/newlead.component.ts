import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Title } from '@angular/platform-browser';
import {
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { Lead } from '../_models/lead.model';

@Component({
  selector: 'app-newlead',
  templateUrl: './newlead.component.html',
  styleUrls: ['./newlead.component.css'],
})
export class NewleadComponent implements OnInit {
  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  // Conteúdo dos checkboxes e se eles estão selecionados por padrão
  checkboxes = [
    { label: 'RPA', selected: false },
    { label: 'Produto Digital', selected: false },
    { label: 'Analitycs', selected: false },
    { label: 'BPM', selected: false },
  ];

  ngOnInit() {
    this.titleService.setTitle('Novo Lead');
  }

  //Tratamento do Formulário
  leadForm = this.formBuilder.group({
    name: [''],
    phone: [''],
    email: [''],
    table: this.formBuilder.array([], [Validators.required]),
  });

  // Retorna os controles para validação do campo
  get retControls() {
    return this.leadForm.controls;
  }

  // Tabela com checkboxes
  // Lidando com o checkbox mestre, que marca ou desmarca todos
  toggleCheckboxAll(event) {
    const formArray: FormArray = this.leadForm.get('table') as FormArray;

    const checked = event.target.checked;

    formArray.clear();
    for (var i = 0; i < this.checkboxes.length; i++) {
      this.checkboxes[i].selected = checked;

      if (checked) {
        formArray.push(new FormControl(this.checkboxes[i].label));
      }
    }
  }

  // Salva a informação de checkbox selecionado ou não no lugar correto no array
  onCheckChange(event) {
    const formArray: FormArray = this.leadForm.get('table') as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      // Encontra o elemento que não está selecionado
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        // Remove o elemento que não está selecionado do array
        if (ctrl.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  // Criando novo Lead e armazenando no localStorage
  createNewLead() {
    const lead = new Lead(
      this.leadForm.value.name,
      this.leadForm.value.phone,
      this.leadForm.value.email,
      this.leadForm.value.table,
      0
    );
    // Se não tiver nada no localStorage, inicializa o array
    if (localStorage.getItem('newLeads') == null) {
      localStorage.setItem('newLeads', JSON.stringify([lead]));
    } else {
      let stored = JSON.parse(localStorage.getItem('newLeads'));
      stored.push(lead);
      localStorage.setItem('newLeads', JSON.stringify(stored));
    }
    this.router.navigate(['/leads', { success: true }]);
  }
}
