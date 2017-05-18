import { NgModule, ApplicationRef, ComponentFactoryResolver, Injector, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModal, BasicModalService } from './index';

export function BASIC_MODAL_REGISTRY_PROVIDER_FACTORY(
		parentRegistry:BasicModalService, ar:ApplicationRef, cfr:ComponentFactoryResolver, i:Injector ) {
	return parentRegistry || new BasicModalService(ar, cfr, i);
}

export const BASIC_MODAL_REGISTRY_PROVIDER = {
	provide: BasicModalService,
	deps: [ [new Optional(), new SkipSelf(), BasicModalService], ApplicationRef, ComponentFactoryResolver, Injector ],
	useFactory: BASIC_MODAL_REGISTRY_PROVIDER_FACTORY
}

@NgModule({
	imports: [
		CommonModule
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

export class AngularBasicModalModule { }
