import {Component, OnInit} from 'angular2/core';

import {SimpleModal, SimpleModalType} from './simple-modal'

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
			<label><input type="checkbox" [(ngModel)]="showResult">Show result</label>
			<div>
				<label class="form-label">Modal type:</label>
				<label *ngFor="#t of modTypes;#i=index"><input type="radio" name="modt" (click)="radio(i)" [checked]="i===0">{{t}}</label>
			</div>
		</fieldset>
		<fieldset *ngIf="customize">
			<p><label class="form-label">Title:</label><input type="text" [(ngModel)]="modal.title"></p>
			<p><label class="form-label">Message:</label><input type="text" [(ngModel)]="modal.message"></p>
			<p><label class="form-label">Cancel button:</label><input type="text" [(ngModel)]="modal.cancelBtn"></p>
		
			<p *ngIf="useConfirm"><label class="form-label">Confirm button:</label><input type="text" [(ngModel)]="modal.confirmBtn"></p>
			<p><label class="form-label">Height:</label><input type="number" [(ngModel)]="modal.height" min="150" max="400"></p>
			<p><label class="form-label">Width:</label><input type="number" [(ngModel)]="modal.width" min="250" max="640"></p>

		</fieldset>
	</form>
	<p *ngIf="showResult"><label class="form-label">Result:</label>{{result}}&nbsp;</p>
	<div style="margin:25px 10px;"><button (click)="showModal()">Show Modal</button></div>
</div>
`
})

export class DemoAppComponent implements OnInit { 

	private modTypes:Array<string> = [];
	private mt:SimpleModalType = SimpleModalType.Default;
	private showResult:boolean = false;
	private customize:boolean = false;
	private useConfirm:boolean = false;
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

	private radio(index:any) {
		this.mt = index;

		switch (this.mt) {
		case SimpleModalType.Info:
			this.modal.title = 'Information';
			this.modal.message = 'This is a simple informational message.'
			this.modal.cancelBtn = 'Ok';
			this.modal.confirmBtn = null;
			this.modal.type = SimpleModalType.Info;
			break;
		case SimpleModalType.Warning:
			this.modal.title = 'Warning';
			this.modal.message = 'This is a simple warning message.'
			this.modal.cancelBtn = 'Ok';
			this.modal.confirmBtn = null;
			this.modal.type = SimpleModalType.Warning;
			break;
		case SimpleModalType.Critical:
			this.modal.title = 'Critical';
			this.modal.message = 'This is a simple critical message.'
			this.modal.cancelBtn = 'Ok';
			this.modal.confirmBtn = null;
			this.modal.type = SimpleModalType.Critical;
			break;
		default:
			this.modal.title = 'Default title';
			this.modal.message = 'Default message.'
			this.modal.cancelBtn = 'Ok';
			this.modal.confirmBtn = null;
			this.modal.type = SimpleModalType.Default;
			break;
		}
		this.confirmText();
	}

	confirmText() {
		if (this.useConfirm && this.modal.confirmBtn === null) {
			this.modal.confirmBtn = 'Confirm';
		} else {
			this.modal.confirmBtn = null;
		}
	}

	showModal() {
		this.result = null;
		this.confirmText();

		if (!this.showResult) {
			this.modal.show();
		} else {
			this.modal.show().then( (res) => this.result = res);
		}
	}

}
