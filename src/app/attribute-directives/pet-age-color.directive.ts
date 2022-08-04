import { Directive, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appPetAgeColor]' // <p appPetAgeColor>text</p>
})
export class PetAgeColorDirective implements OnInit {

  // we can have angular inject a reference to the element
  // that the attribute directive is applied to
  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    // Doing it right when the attribute initializes:
    // setTimeout(() => {
    //   let color = '';
    //   console.log(this.element.nativeElement.innerHTML);
    //   let ageValue = Number.parseInt(this.element.nativeElement.innerHTML);
    //   console.log(ageValue);
    //   if (ageValue<5) {
    //     color = '#0010d0';
    //   } else {
    //     color = '#00d010';
    //   }
    //   this.element.nativeElement.style.color=color;
    // }, 1000);
  }

  @HostListener('mouseover') onMouseOver() {
      let color = '';
      console.log(this.element.nativeElement.innerHTML);
      let ageValue = Number.parseInt(this.element.nativeElement.innerHTML);
      console.log(ageValue);
      if (ageValue<5) {
        color = '#0040d0';
      } else {
        color = '#00d010';
      }
      this.element.nativeElement.style.backgroundColor=color;
  }

  @HostListener('mouseout') onMouseOut() {
    this.element.nativeElement.style.backgroundColor='transparent';
  }
}
