import {Component, ComponentRef, DynamicComponentLoader, ApplicationRef, ElementRef, Injectable} from 'angular2/core';
import {NgStyle} from 'angular2/common';
import {PromiseWrapper} from 'angular2/src/facade/async';


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

	template:string =`
		<img *ngIf="icon" class="modal-icon" [src]="icon" alt="" title="" />
		<h2 class="modal-title" [innerHTML]="title"></h2>
		<div class="modal-message" [innerHTML]="message"></div>
		<div class="modal-buttonbar">
			<button *ngIf="confirmBtn" (click)="confirm()">{{confirmBtn}}</button>
			<button *ngIf="cancelBtn" (click)="cancel()" >{{cancelBtn}}</button>
		</div>`;

	constructor(private dcl:DynamicComponentLoader, private app:ApplicationRef) {
	}

	toComponent() : Function {
		let title:string = this.title;
		let message:string = this.message;
		let width:string = this.width + 'px';
		let height:string = this.height + 'px';
		let confirmBtn:string = this.confirmBtn;
		let cancelBtn:string = this.cancelBtn;
		let icon:string = null;
		let template:string;

		if (this.blocking) {
			template = `<div class="modal-background">` +
					`<div class="modal" [ngStyle]="{'width':'` + width + `', 'height':'` + height + `'}">` +
					this.template + `</div></div>`;
		} else {
			template = `<div class="modal-background" (click)="cancel()">` +
					`<div class="modal" (click)="$event.stopPropagation()" [ngStyle]="{'width':'` + width + `', 'height':'` + height + `'}">` +
					this.template + `</div></div>`;
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
			directives: [ NgStyle ],
			template: template
		})
		class Modal {
			cref:ComponentRef = null;

			/* tslint:disable:no-unused-variable */
			private title:string = title;
			private message:string = message;
			private icon:string = icon;
			/* tslint:enable:no-unused-variable */
			private confirmBtn:string = confirmBtn;
			private cancelBtn:string = cancelBtn;
			private result:any;

			confirm() {
				this.cref.dispose();
				this.result.resolve(this.confirmBtn);
			}

			cancel() {
				this.cref.dispose();

				// By rejecting, the show must catch the error. So by resolving,
				// it can be ignored silently in case the result is unimportant.
				// this.result.reject(this.cancelBtn);
				this.result.resolve(this.cancelBtn);
			}
		}
		return Modal;
	}

	show() : Promise<any> {
		// Top level
		let elem:ElementRef = this.app['_rootComponents'][0].location;

		// Set up the promise to return.
		let pw:any = PromiseWrapper.completer();

		this.dcl.loadNextToLocation(this.toComponent(), elem).then( (cref) => {
			// Assign the cref to the newly created modal so it can self-destruct correctly.
			cref.instance.cref = cref;

			// Assign the promise to resolve.
			cref.instance.result = pw;
		});

		return pw.promise;
	}
}
