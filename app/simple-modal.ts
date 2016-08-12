import { Component, ComponentRef, DynamicComponentLoader, ApplicationRef, Injectable, ViewContainerRef } from '@angular/core';

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
	template:string = null;

	private defaultTemplate:string = `
<div class="modal-background" (click)="dismiss()">
	<div class="modal" (click)="$event.stopPropagation()" [ngStyle]="{'width': width + 'px', 'height':  height + 'px'}">
		<img *ngIf="icon" class="modal-icon" [src]="icon" alt="" title=""/>
		<h2 class="modal-title" [innerHTML]="title"></h2>
		<div class="modal-message" [innerHTML]="message"></div>
		<div class="modal-buttonbar">
			<button *ngIf="confirmBtn" (click)="confirm()">{{confirmBtn}}</button>
			<button *ngIf="cancelBtn" (click)="cancel()" >{{cancelBtn}}</button>
		</div>
	</div>
</div>`;

	constructor(private dcl:DynamicComponentLoader, private app:ApplicationRef) {
	}

	toComponent() : Function {
		let blocking:boolean = this.blocking;
		let title:string = this.title;
		let message:string = this.message;
		let width:number = this.width;
		let height:number = this.height;
		let confirmBtn:string = this.confirmBtn;
		let cancelBtn:string = this.cancelBtn;
		let icon:string = null;
		let template:string = this.template;

		if (template === null) {
			template = this.defaultTemplate;
		}

		switch (this.type) {
			case SimpleModalType.Info:
				icon = 'images/info-circle.svg';
				break;
			case SimpleModalType.Warning:
				icon = 'images/warning.svg';
				break;
			case SimpleModalType.Critical:
				icon = 'images/exclamation-circle.svg';
				break;
			default:
				break;
		}

		// Note: Do NOT use styleUrls, because they'll keep getting added to the DOM.
		@Component({
			selector: 'modal',
			template: template
		})
		class Modal {
			cref:ComponentRef<Modal> = null;

			private blocking:boolean = blocking;
			/* tslint:disable:no-unused-variable */
			private title:string = title;
			private message:string = message;
			private icon:string = icon;
			private width:number = width;
			private height:number = height;
			/* tslint:enable:no-unused-variable */
			private confirmBtn:string = confirmBtn;
			private cancelBtn:string = cancelBtn;
			private resolver:Function;

			dismiss(value:string) {
				if (!this.blocking) {
					this.cancel(value);
				}
			}

			confirm(value:string) {
				this.cref.destroy();
				this.resolver(value === undefined ? this.confirmBtn : value);
			}

			cancel(value:string) {
				this.cref.destroy();
				this.resolver(value === undefined ? this.cancelBtn : value);
			}
		}
		return Modal;
	}

	show() : Promise<string> {
		// Top level hack
		let vcr:ViewContainerRef = this.app['_rootComponents'][0]['_hostElement'].vcRef;

		// Set up a promise to resolve when the modal is dismissed.
		let resolve:(value?: string | PromiseLike<string>) => void;
		let promise = new Promise<string>((res) => {
			resolve = res;
		});

		this.dcl.loadNextToLocation(this.toComponent(), vcr).then( (cref) => {
			// Assign the cref to the newly created modal so it can self-destruct correctly.
			cref.instance.cref = cref;

			// Assign the resolve.
			cref.instance.resolver = resolve;
		});

		return promise;
	}
}
