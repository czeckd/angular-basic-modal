import { Component, OnInit } from '@angular/core';
import { SimpleModal, SimpleModalType } from './simple-modal';

import { BaseModal } from './base-modal.component';
import { BootstrapModal } from './bootstrap-modal.component';


@Component({
	selector: 'demo-app',
	templateUrl: 'app/demo-app.component.html'
})

export class DemoAppComponent implements OnInit {

	/* tslint:disable:no-unused-variable */
	private customize:boolean = false;
	private bootstrapSizes:Array<string> = [ 'small', 'default', 'large' ];
	/* tslint:enable:no-unused-variable */
	private bootstrap:boolean = false;
	private modTypes:Array<string> = [];
	private mt:SimpleModalType = SimpleModalType.Default;
	private showResult:boolean = false;
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

	swapStyleSheet() {
		// Delay this slightly to get uniform behavior across different browsers.
		setTimeout( () => {
			let links:any = window.document.getElementsByTagName('link');
			for (let i = 0; i < links.length; i += 1) {
				if (links[i].href.substring( links[i].href.length - 3) === 'css') {
					if (links[i].href.indexOf('bootstrap') !== -1) {
						links[i].disabled = (this.bootstrap ? false : true);
					} else {
						links[i].disabled = (this.bootstrap ? true : false);
					}
				}
			}
		}, 10);
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

		if (!this.bootstrap) {
			this.modal.width = 250;
		}
		this.modal.height = 150;
		this.confirmText();
	}

	bootsize(size:string) {
		switch (size) {
		case 'small':
			this.modal.width = 250;
			break;
		case 'large':
			this.modal.width = 600;
			break;
		default:
			this.modal.width = 400;
			break;
		}
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
				this.modal.show(this.bootstrap ? BootstrapModal : BaseModal);
			} else {
				this.modal.show(this.bootstrap ? BootstrapModal : BaseModal).then( (res:string) => this.result = res);
			}

			this.modal.width = w;
			this.modal.height = h;
			this.modal.title = 'Cascade 2 ' + t;

			if (!this.showResult) {
				this.modal.show(this.bootstrap ? BootstrapModal : BaseModal);
			} else {
				this.modal.show(this.bootstrap ? BootstrapModal : BaseModal).then( (res:string) => this.result = res);
			}

			this.modal.title = t;
		}
	}

	showModal() {
		this.result = null;
		this.confirmText();
		this.cancelText();

		if (!this.showResult) {
			this.modal.show(this.bootstrap ? BootstrapModal : BaseModal);
		} else {
			this.modal.show(this.bootstrap ? BootstrapModal : BaseModal).then( (res:string) => this.result = res);
		}
		this.cascade();
	}
}
