import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BaseModal, BasicModalService } from './index';

export function BASIC_MODAL_REGISTRY_PROVIDER_FACTORY(parentRegistry:BasicModalServiceService, http:Http) {
	return parentRegistry || new BasicModalServiceService(http);
}

export const BASIC_MODAL_REGISTRY_PROVIDER = {
	provide: BasicModalServiceService,
	deps: [ [new Optional(), new SkipSelf(), BasicModalServiceService], Http],
	useFactory: BASIC_MODAL_REGISTRY_PROVIDER_FACTORY
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [
		BaseModal
	],
	exports: [
		BaseModal
	],
	providers: [
		BASIC_MODAL_REGISTRY_PROVIDER
	],
	entryComponents: [
		BaseModal
	]
})

export class BasicModalModule { }
