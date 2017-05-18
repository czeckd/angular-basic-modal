import { ComponentFactoryResolver, ApplicationRef, EmbeddedViewRef, Injectable, Injector, ReflectiveInjector, Type } from '@angular/core';

import { BaseModal } from './base-modal.component';
import { BaseModalConfig } from './base-modal-config';

@Injectable()
export class BasicModalService {

	constructor(private app:ApplicationRef, private cfr:ComponentFactoryResolver, private injector:Injector) {
	}

	show(config:any, modal:Type<BaseModal>) : Promise<string> {

		// Top level
		let root = (this.app.components[0].hostView as EmbeddedViewRef<any>).rootNodes[0];

		// Set up a promise to resolve when the modal is dismissed.
		let resolve:(value?: string | PromiseLike<string>) => void;
		let promise = new Promise<string>((res) => {
			resolve = res;
		});

		let inj:ReflectiveInjector;
		if (config.constructor.name === 'BaseModalConfig') {
			inj = ReflectiveInjector.resolveAndCreate([
				{ provide: BaseModalConfig, useValue: config }
			], this.injector);
		} else {
			inj = ReflectiveInjector.resolveAndCreate([
				{ provide: config.constructor, useValue: config },
				{ provide: BaseModalConfig, useValue: config }
			], this.injector);
		}

		let comp = this.cfr.resolveComponentFactory(modal);
		let cref = comp.create(inj);

		cref.instance.cref = cref;
		cref.instance.resolver = resolve;

		let vref = cref.hostView as EmbeddedViewRef<any>;
		let app:any = this.app;

		app.attachView(cref.hostView);
		cref.onDestroy( () => {
			app.detachView(cref.hostView);
		});

		root.appendChild(vref.rootNodes[0]);

		return promise;
	}
}
