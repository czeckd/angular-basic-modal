import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { BaseModal } from './base-modal.component';
import { BootstrapModal } from './bootstrap-modal.component';
import { SimpleModal } from './simple-modal';

import { DemoAppComponent } from './demo-app.component';


@NgModule({
	imports:         [ BrowserModule, FormsModule ],
	declarations:    [ DemoAppComponent, BaseModal, BootstrapModal ],
	entryComponents: [ BaseModal, BootstrapModal ],
	providers:       [ SimpleModal ],
	bootstrap:       [ DemoAppComponent ]
})
export class AppModule { }

