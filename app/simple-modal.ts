import {Component, ComponentRef, DynamicComponentLoader, ApplicationRef, ElementRef, Injectable} from 'angular2/core';
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
	confirmBtn:string = null;
	cancelBtn:string = 'Ok';
	width:number = 250;
	height:number = 150;

	template:string =
`<div class="modal" [ngStyle]="{'width':width, 'height':height}">
	<img *ngIf="icon" class="modal-icon" [src]="icon" alt="" title="" />
	<h2 class="modal-title">{{title}}</h2>
	<div class="modal-message" [ngStyle]="{'height':msgHeight}">{{message}}</div>
	<div class="modal-buttonbar">
		<button *ngIf="confirmBtn" (click)="affirm()">{{confirmBtn}}</button>
		<button (click)="cancel()" >{{cancelBtn}}</button>
	</div>
</div>
`;

	constructor(private dcl:DynamicComponentLoader, private app:ApplicationRef) {
	}

	toComponent() : Function {
		let title:string = this.title;
		let message:string = this.message;
		let width:string = this.width + 'px';
		let height:string = this.height + 'px';
		let msgHeight:string = this.height - 95 + 'px';
		let confirmBtn:string = this.confirmBtn;
		let cancelBtn:string = this.cancelBtn;
		let template:string = this.template + '<div class="modal-background"></div>';
		let icon:string = null;

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
			cref:ComponentRef = null;

			/* tslint:disable:no-unused-variable */
			private title:string = title;
			private message:string = message;
			private width:string = width;
			private height:string = height;
			private msgHeight:string = msgHeight;
			private icon:string = icon;
			/* tslint:enable:no-unused-variable */
			private confirmBtn:string = confirmBtn;
			private cancelBtn:string = cancelBtn;
			private result:any;


			affirm() {
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
