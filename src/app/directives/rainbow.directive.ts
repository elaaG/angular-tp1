import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: 'input[appRainbow]',
})
export class RainbowDirective {
  @HostBinding('style.color') color = 'black';
  @HostBinding('style.border-color') borderColor = 'black';

  @HostListener('keyup')
  onKeyUp(): void {
    const newColor = this.generateRandomColor();
    this.color = newColor;
    this.borderColor = newColor;
  }

  private generateRandomColor(): string {
    const randomNumber = Math.floor(Math.random() * 0x1000000);
    return '#' + randomNumber.toString(16).padStart(6, '0');
  }
}
