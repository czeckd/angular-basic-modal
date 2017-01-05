import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { ModalModule } from './modal/modal.module';
import { BootstrapModal } from './custom/bootstrap-modal.component';
import { IconModal } from './custom/icon-modal.component';

import { DemoAppComponent } from './demo-app.component';

@NgModule({
	imports:         [ BrowserModule, FormsModule, ModalModule.forRoot() ],
	declarations:    [ DemoAppComponent, BootstrapModal, IconModal ],
	entryComponents: [ BootstrapModal, IconModal ],
	bootstrap:       [ DemoAppComponent ]
})
export class AppModule {}
