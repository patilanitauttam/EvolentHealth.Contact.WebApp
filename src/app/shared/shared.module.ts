import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { ContactComponent } from './contact/contact.component';
import { NoWhitespaceDirective } from './directive/no-whitespace.directive';
import { ContactService } from '../services/contact.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  ],
  declarations: [ContactComponent, NoWhitespaceDirective],

  exports: [
    CommonModule,
    ContactComponent,
    NoWhitespaceDirective
  ],
  providers: [ContactService]

})
export class SharedModule { }
