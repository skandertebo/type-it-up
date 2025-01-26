import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-svg',
  standalone: true,
  templateUrl: './svg-display.component.html',
})
export class SVGDisplayComponent {
  @Input() height = '100px';
  @Input() width = '100px';
  @Input() path = '/shared-assets/images/monster.svg';
}
