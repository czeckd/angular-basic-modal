import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { BaseModal, BootstrapModal, SimpleModal } from './modal/index';

import { DemoAppComponent } from './demo-app.component';

@NgModule({
	imports:         [ BrowserModule, FormsModule ],
	declarations:    [ DemoAppComponent, BaseModal, BootstrapModal ],
	entryComponents: [ BaseModal, BootstrapModal ],
	providers:       [ SimpleModal ],
	bootstrap:       [ DemoAppComponent ]
})
export class AppModule { }

