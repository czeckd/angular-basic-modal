import {Component, OnInit} from '@angular/core';
import {SimpleModal, SimpleModalType} from './simple-modal';

@Component({
    selector: 'demo-app',
	providers: [ SimpleModal ],
    template: `
<div style="margin:25px;">
	<h2>Simple Modal Demo</h2>
	<form>
		<fieldset>
			<label class="form-label">Settings:</label>
			<label><input type="checkbox" [(ngModel)]="customize">Customize</label>
			<label><input type="checkbox" [(ngModel)]="useConfirm">Confirm button</label>
			<label><input type="checkbox" [(ngModel)]="modal.blocking">Blocking</label>
			<label><input type="checkbox" [(ngModel)]="showResult">Show result</label>
			<div>
				<label class="form-label">Modal type:</label>
				<label *ngFor="let t of modTypes; let i=index"><input type="radio" name="modt" (click)="radio(i)" [checked]="i===0">{{t}}</label>
			</div>
		</fieldset>
		<fieldset *ngIf="customize">
			<p><label class="form-label">Title:</label><input type="text" [(ngModel)]="modal.title"></p>
			<p><label class="form-label">Message:</label><input type="text" [(ngModel)]="modal.message"></p>
			<p *ngIf="useConfirm"><label class="form-label">Confirm button:</label><input type="text" [(ngModel)]="modal.confirmBtn"></p>
			<p><label class="form-label">Cancel button:</label><input type="text" [(ngModel)]="modal.cancelBtn"></p>
		
			<p><label class="form-label">Height:</label><input type="number" [(ngModel)]="modal.height" min="150" max="400"></p>
			<p><label class="form-label">Width:</label><input type="number" [(ngModel)]="modal.width" min="250" max="640"></p>

		</fieldset>
	</form>
	<p *ngIf="showResult"><label class="form-label">Last result:</label>{{result}}&nbsp;</p>
	<div style="margin:25px 10px;">
		<button #bt (click)="showModal();bt.blur()">Show Modal</button><label>
		<input type="checkbox" [(ngModel)]="demoCascade">Cascade?</label>
	</div>
</div>`
})

export class DemoAppComponent implements OnInit {

	private modTypes:Array<string> = [];
	private mt:SimpleModalType = SimpleModalType.Default;
	private showResult:boolean = false;
	private customize:boolean = false;
	private useConfirm:boolean = false;
	private demoCascade:boolean = false;
	private result:string;

	constructor(private modal:SimpleModal) {
	}

	ngOnInit() {
		for (let t in SimpleModalType) {
			if (typeof SimpleModalType[t] === 'number') {
				this.modTypes.push(t);
			}
		}
	}

	radio(index:any) {
		this.mt = index;

		switch (this.mt) {
		case SimpleModalType.Info:
			this.modal.title = 'Information';
			this.modal.message = 'This is a simple informational message.';
			this.modal.type = SimpleModalType.Info;
			break;
		case SimpleModalType.Warning:
			this.modal.title = 'Warning';
			this.modal.message = 'This is a simple warning message.';
			this.modal.type = SimpleModalType.Warning;
			break;
		case SimpleModalType.Critical:
			this.modal.title = 'Critical';
			this.modal.message = 'This is a simple critical message.';
			this.modal.type = SimpleModalType.Critical;
			break;
		default:
			this.modal.title = 'Default title';
			this.modal.message = 'Default message.';
			this.modal.type = SimpleModalType.Default;
			break;
		}
		this.modal.cancelBtn = 'OK';
		this.modal.confirmBtn = null;
		this.modal.width = 250;
		this.modal.height = 150;
		this.confirmText();
	}

	confirmText() {
		if (this.useConfirm && this.modal.confirmBtn === null) {
			this.modal.confirmBtn = 'Confirm';
		} else if (!this.useConfirm) {
			this.modal.confirmBtn = null;
		}
	}

	cancelText() {
		if (this.modal.blocking && this.modal.cancelBtn.length === 0) {
			this.modal.cancelBtn = 'OK';
		}
	}

	private cascade() {
		let w:number = this.modal.width;
		let h:number = this.modal.height;
		let t:string = this.modal.title;

		if (this.demoCascade) {
			this.modal.width = w + 150;
			this.modal.height = h + 150;
			this.modal.title = 'Cascade 1 ' + t;

			if (!this.showResult) {
				this.modal.show();
			} else {
				this.modal.show().then( (res:string) => this.result = res);
			}

			this.modal.width = w;
			this.modal.height = h;
			this.modal.title = 'Cascade 2 ' + t;

			if (!this.showResult) {
				this.modal.show();
			} else {
				this.modal.show().then( (res:string) => this.result = res);
			}

			this.modal.title = t;
		}
	}

	showModal() {
		this.result = null;
		this.confirmText();
		this.cancelText();

		if (!this.showResult) {
			this.modal.show();
		} else {
			this.modal.show().then( (res:string) => this.result = res);
		}
		this.cascade();
	}
}
