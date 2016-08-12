import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { SimpleModal } from './simple-modal';

import { DemoAppComponent } from './demo-app.component';


@NgModule({
	imports:      [ BrowserModule, FormsModule ],
	declarations: [ DemoAppComponent ],
	providers:    [ SimpleModal ],
	bootstrap:    [ DemoAppComponent ]
})
export class AppModule { }

