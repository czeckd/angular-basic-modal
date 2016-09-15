import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { ModalModule } from './modal/modal.module';
import { BootstrapModal } from './modal/bootstrap-modal.component';

import { DemoAppComponent } from './demo-app.component';

@NgModule({
	imports:         [ BrowserModule, FormsModule, ModalModule ],
//	declarations:    [ DemoAppComponent, BaseModal, BootstrapModal, ModalModule ],
	declarations:    [ DemoAppComponent, BootstrapModal ],
//	entryComponents: [ BaseModal, BootstrapModal ],
	entryComponents: [ BootstrapModal ],
//	providers:       [ SimpleModal ],
	bootstrap:       [ DemoAppComponent ]
})
export class AppModule { }

