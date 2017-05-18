import { Component } from '@angular/core';

import { BaseModal } from 'angular-basic-modal';
import { IconModalConfig } from './icon-modal-config';

@Component({
	selector: 'modal',
	styleUrls: ['app/custom/icon-modal.component.css'],
	template: `
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
</div>`
})

export class IconModal extends BaseModal {

	private _icon:string;

	constructor(imc:IconModalConfig) {
		super(imc);
		this.parseIconModalType(imc.type);
	}

	private parseIconModalType(val:IconModalType) {
		switch (val) {
		case IconModalType.Info:
			this.icon = 'images/info-circle.svg';
			break;
		case IconModalType.Warning:
			this.icon = 'images/warning.svg';
			break;
		case IconModalType.Critical:
			this.icon = 'images/exclamation-circle.svg';
			break;
		default:
			this.icon = '';
			break;
		}
	}

	get icon() : string {
		return this._icon;
	}

	set icon(icn:string)  {
		this._icon = icn;
	}
}

export enum IconModalType {
	None,
	Info,
	Warning,
	Critical
}
