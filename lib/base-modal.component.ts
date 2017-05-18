import { Component, ComponentRef } from '@angular/core';

import { BaseModalConfig } from './base-modal-config';

@Component({
	selector: 'modal',
	styleUrls: ['./base-modal.component.css'],
	template: `
<div class="modal-background" (click)="dismiss()">
	<div class="modal" (click)="$event.stopPropagation()" [ngStyle]="{'width': width + 'px', 'height':  height + 'px'}">
		<h2 class="modal-title" [innerHTML]="title"></h2>
		<div class="modal-message" [innerHTML]="message"></div>
		<div class="modal-buttonbar">
			<button *ngIf="confirmBtn" (click)="confirm()">{{confirmBtn}}</button>
			<button *ngIf="cancelBtn" (click)="cancel()" >{{cancelBtn}}</button>
		</div>
	</div>
</div>`

})
export class BaseModal {
	private _cref:ComponentRef<BaseModal>;
	private _resolver:Function;

	private blocking:boolean;
	private title:string;
	private message:string;
	private width:number;
	private height:number;
	private confirmBtn:string;
	private cancelBtn:string;

	constructor(bmc:BaseModalConfig) {
		this.blocking = bmc.blocking;
		this.title = bmc.title;
		this.message = bmc.message;
		this.width = bmc.width;
		this.height = bmc.height;
		this.confirmBtn = bmc.confirmBtn;
		this.cancelBtn = bmc.cancelBtn;
	}

	set cref(crf:ComponentRef<BaseModal>) {
		this._cref = crf;
	}

	set resolver(res:Function) {
		this._resolver = res;
	}

	dismiss(value?:string) {
		if (!this.blocking) {
			this.cancel(value);
		}
	}

	confirm(value?:string) {
		this._cref.destroy();
		this._resolver(value === undefined ? this.confirmBtn : value);
	}

	cancel(value?:string) {
		this._cref.destroy();
		this._resolver(value === undefined ? this.cancelBtn : value);
	}
}
