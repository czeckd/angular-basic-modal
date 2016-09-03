import { ComponentFactoryResolver, ComponentRef, ApplicationRef, Injectable, ReflectiveInjector,
	Type, ViewContainerRef } from '@angular/core';

import { BaseModal } from './base-modal.component';
import { BaseModalConfig } from './base-modal-config';

@Injectable()
export class SimpleModal {

	constructor(private app:ApplicationRef, private cfr:ComponentFactoryResolver) {
	}

	show(config:BaseModalConfig, modal:Type<BaseModal>) : Promise<string> {
		// Top level hack
		let vcr:ViewContainerRef = this.app['_rootComponents'][0]['_hostElement'].vcRef;

		// Set up a promise to resolve when the modal is dismissed.
		let resolve:(value?: string | PromiseLike<string>) => void;
		let promise = new Promise<string>((res) => {
			resolve = res;
		});
		let inj = ReflectiveInjector.resolveAndCreate([
			{ provide: BaseModalConfig, useValue: config }], vcr.injector);

		let comp = this.cfr.resolveComponentFactory(modal);

		let cref:ComponentRef<any> = vcr.createComponent(comp, vcr.length, inj);
		cref.instance.cref = cref;
		cref.instance.resolver = resolve;

		return promise;
	}

}
