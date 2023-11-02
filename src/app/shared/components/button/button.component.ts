import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string = 'Entrar';
  @Input() type: string = 'primary';
  @Input() width: string = 'large';
  @Input() icon: string = '';
  @Input() disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.icon = this.selectIcon() || this.icon;
  }
  // Seleccione el icono que se mostrará en el botón
  selectIcon(): string | void {
    if (this.icon === 'join') return 'fas fa fa-sign-in';
    else if (this.icon === 'google')
      return '../../../../assets/images/google.svg';
    else if (this.icon === 'microsoft')
      return '../../../../assets/images/microsoft.svg';
    else if (this.icon === 'github')
      return '../../../../assets/images/github.svg';
  }
}
