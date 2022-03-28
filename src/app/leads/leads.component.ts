import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

/* Next Step: to improve initial prototype:
  https://s3.amazonaws.com/gupy5/production/companies/384/emails/1647972105808/21fb3970-aa0a-11ec-847d-f152ff2b2c17/case_estag_e_dev_jr.pdf
  And at least one checkbox:
  https://stackoverflow.com/questions/11787665/making-sure-at-least-one-checkbox-is-checked
*/

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css'],
})
export class LeadsComponent implements OnInit {
  constructor(private titleService: Title, private route: ActivatedRoute) {}

  // Configurando os Leads de exemplo previamente
  leads = [
    {
      name: 'Org. Internacionais',
      phone: 'XX912345678',
      email: 'orginter@elogroup.com.br',
      table: ['RPA'],
      status: 0,
    },
    {
      name: 'Ind. Farm. Ltda',
      phone: 'XX912345678',
      email: 'indfarm@elogroup.com.br',
      table: ['Analytics'],
      status: 1,
    },
    {
      name: 'Musc. Live Cmp',
      phone: 'XX912345678',
      email: 'musclive@elogroup.com.br',
      table: ['BPM'],
      status: 0,
    },
  ];

  success: string;
  dragNotAllowed: boolean;
  ngOnInit() {
    this.titleService.setTitle('Painel de Leads');
    this.success = this.route.snapshot.paramMap.get('success');
    if (localStorage.getItem('leads') == null) {
      // Se os Leads de exemplo não estiverem armazenados no localStorage, ale serão armazenados
      localStorage.setItem('leads', JSON.stringify(this.leads));
    } else {
      // Pega todos os leads que já estão armazenados no localStorage
      this.leads = JSON.parse(localStorage.getItem('leads'));
    }
    if (localStorage.getItem('newLeads') !== null) {
      // Pega os novos Leads e adicionam nos Leads já existentes no localStorage
      this.leads = this.leads.concat(
        JSON.parse(localStorage.getItem('newLeads'))
      );
      localStorage.setItem('leads', JSON.stringify(this.leads));
      localStorage.removeItem('newLeads');
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex !== event.currentIndex) {
      if (
        (event.previousIndex == 0 && event.currentIndex == 2) ||
        event.previousIndex > event.currentIndex
      ) {
        // Evita que operações não permitidas aconteçam
        this.dragNotAllowed = true;
      } else {
        // Se uma operação é permitida, faça as alterações no vetor e atualize o localStorage
        this.dragNotAllowed = false;
        this.leads[event.item.data].status = event.currentIndex;
        localStorage.setItem('leads', JSON.stringify(this.leads));
      }
    }
  }
}
