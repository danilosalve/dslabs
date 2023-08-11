import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDarkenWithBlueOnHover]'
})
export class DarkenWithBlueOnHoverDirective {
  constructor(private el: ElementRef, private render: Renderer2) {}

  @HostListener('mouseover')
  darkenOn(): void {
      this.el.nativeElement.style.backgroundColor = 'var(--color-brand-01-lightest)';

    }

    @HostListener('mouseleave')
    darkenOff(): void {
      this.el.nativeElement.style.backgroundColor = '#f4f5f7';
  }
}
