import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BaseModal, SimpleModal } from './index';

@NgModule({
	imports:         [ CommonModule, FormsModule ],
	declarations:    [ BaseModal ],
	exports:         [ BaseModal ],
	entryComponents: [ BaseModal ],
	providers:       [ SimpleModal ]
})

export class ModalModule {
}
