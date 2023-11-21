import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string = 'Entrar';
  @Input() type: string = 'primary';
  @Input() background: string = '#5f27a7';
  @Input() height: string = '45px';
  @Input() color: string = '#ffffff';
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
      return '../../../../svgs/images/google.svg';
    else if (this.icon === 'microsoft')
      return '../../../../svgs/images/microsoft.svg';
    else if (this.icon === 'github')
      return '../../../../svgs/images/github.svg';
  }
}
