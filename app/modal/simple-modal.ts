import { ComponentFactoryResolver, ApplicationRef, EmbeddedViewRef, Injectable, Injector, ReflectiveInjector, Type } from '@angular/core';

import { BaseModal } from './base-modal.component';
import { BaseModalConfig } from './base-modal-config';

@Injectable()
export class SimpleModal {

	constructor(private app:ApplicationRef, private cfr:ComponentFactoryResolver, private injector:Injector) {
	}

	show(config:any, modal:Type<BaseModal>) : Promise<string> {

		// Top level hack
		let root:HTMLElement = (this.app['_rootComponents'][0].hostView as EmbeddedViewRef<any>).rootNodes[0];

		// Set up a promise to resolve when the modal is dismissed.
		let resolve:(value?: string | PromiseLike<string>) => void;
		let promise = new Promise<string>((res) => {
			resolve = res;
		});

		let inj:ReflectiveInjector;
		if (config.constructor.name === 'BaseModalConfig') {
			inj = ReflectiveInjector.resolveAndCreate([
				{ provide: BaseModalConfig, useValue: config }], this.injector);
		} else {
			inj = ReflectiveInjector.resolveAndCreate([
				{ provide: config.constructor, useValue: config }, { provide: BaseModalConfig, useValue: config }], this.injector);
		}


		let comp = this.cfr.resolveComponentFactory(modal);
		let cref = comp.create(inj);

		cref.instance.cref = cref;
		cref.instance.resolver = resolve;

		let vref = cref.hostView as EmbeddedViewRef<any>;
		let cdr = cref.changeDetectorRef;
		let app:any = this.app;

		cref.onDestroy( () => {
			app.unregisterChangeDetector(cdr);

			if (root.parentNode) {
				root.removeChild(vref.rootNodes[0]);
			}
		});

		app.registerChangeDetector(cdr);

		root.appendChild(vref.rootNodes[0]);

		return promise;
	}

}
