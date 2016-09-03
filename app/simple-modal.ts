import { Component, ComponentFactoryResolver, ComponentRef, ApplicationRef, Injectable, Injector, ReflectiveInjector,
ResolvedReflectiveProvider, Type, ViewContainerRef } from '@angular/core';

import { BaseModal } from './base-modal.component';
import { BaseModalConfig } from './base-modal-config';

import { BootstrapModal } from './bootstrap-modal.component';

export enum SimpleModalType {
	Default,
	Info,
	Warning,
	Critical
}

@Injectable()
export class SimpleModal {

	title:string = 'Default title';
	message:string = 'Default message';
	type:SimpleModalType = SimpleModalType.Default;
	blocking:boolean = true;
	confirmBtn:string = null;
	cancelBtn:string = 'OK';
	width:number = 250;
	height:number = 150;

	template:string;

	constructor(private app:ApplicationRef, private cfr:ComponentFactoryResolver) {
	}

	getConfig(resolver:Function) : BaseModalConfig {
		const bmc:BaseModalConfig = new BaseModalConfig(this.type);
		bmc.blocking = this.blocking;
		bmc.title = this.title;
		bmc.message = this.message;
		bmc.width = this.width;
		bmc.height = this.height;
		bmc.confirmBtn = this.confirmBtn;
		bmc.cancelBtn = this.cancelBtn;;
		bmc.resolver = resolver;
		return bmc;
	}

	show(modal:Type<BaseModal>) : Promise<string> {
		// Top level hack
		let vcr:ViewContainerRef = this.app['_rootComponents'][0]['_hostElement'].vcRef;

		// Set up a promise to resolve when the modal is dismissed.
		let resolve:(value?: string | PromiseLike<string>) => void;
		let promise = new Promise<string>((res) => {
			resolve = res;
		});


		let inj = ReflectiveInjector.resolveAndCreate([
			{ provide: BaseModalConfig, useValue: this.getConfig(resolve) }], vcr.injector);

//		let comp = this.cfr.resolveComponentFactory(BaseModal);
		let comp = this.cfr.resolveComponentFactory(modal);

		let cref:ComponentRef<any> = vcr.createComponent(comp, vcr.length, inj);
		cref.instance.cref = cref;

		return promise;
	}
}
