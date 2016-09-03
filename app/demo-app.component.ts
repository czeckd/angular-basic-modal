import { Component, OnInit } from '@angular/core';

import { BaseModalConfig, SimpleModalType, BaseModal, BootstrapModal, SimpleModal } from './modal/index';

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
	private showResult:boolean = true;
	private useConfirm:boolean = false;
	private demoCascade:boolean = false;
	private result:string;

	private bmc:BaseModalConfig = new BaseModalConfig();

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
			this.bmc.title = 'Information';
			this.bmc.message = 'This is a simple informational message.';
			this.bmc.type = SimpleModalType.Info;
			break;
		case SimpleModalType.Warning:
			this.bmc.title = 'Warning';
			this.bmc.message = 'This is a simple warning message.';
			this.bmc.type = SimpleModalType.Warning;
			break;
		case SimpleModalType.Critical:
			this.bmc.title = 'Critical';
			this.bmc.message = 'This is a simple critical message.';
			this.bmc.type = SimpleModalType.Critical;
			break;
		default:
			this.bmc.title = 'Default title';
			this.bmc.message = 'Default message.';
			this.bmc.type = SimpleModalType.Default;
			break;
		}
		this.bmc.cancelBtn = 'OK';
		this.bmc.confirmBtn = null;

		if (!this.bootstrap) {
			this.bmc.width = 250;
		}
		this.bmc.height = 150;
		this.confirmText();
	}

	bootsize(size:string) {
		switch (size) {
		case 'small':
			this.bmc.width = 250;
			break;
		case 'large':
			this.bmc.width = 600;
			break;
		default:
			this.bmc.width = 400;
			break;
		}
	}

	confirmText() {
		if (this.useConfirm && this.bmc.confirmBtn === null) {
			this.bmc.confirmBtn = 'Confirm';
		} else if (!this.useConfirm) {
			this.bmc.confirmBtn = null;
		}
	}

	cancelText() {
		if (this.bmc.blocking && this.bmc.cancelBtn.length === 0) {
			this.bmc.cancelBtn = 'OK';
		}
	}

	private cascade() {

		let w:number = this.bmc.width;
		let h:number = this.bmc.height;
		let t:string = this.bmc.title;

		if (this.demoCascade) {
			this.bmc.width = w + 150;
			this.bmc.height = h + 150;
			this.bmc.title = 'Cascade 1 ' + t;


			if (!this.showResult) {
				this.modal.show(this.bmc, (this.bootstrap ? BootstrapModal : BaseModal));
			} else {
				this.modal.show(this.bmc, (this.bootstrap ? BootstrapModal : BaseModal)).then( (res:string) => this.result = res);
			}

			this.bmc.width = w;
			this.bmc.height = h;
			this.bmc.title = 'Cascade 2 ' + t;

			if (!this.showResult) {
				this.modal.show(this.bmc, (this.bootstrap ? BootstrapModal : BaseModal));
			} else {
				this.modal.show(this.bmc, (this.bootstrap ? BootstrapModal : BaseModal)).then( (res:string) => this.result = res);
			}

			this.bmc.title = t;
		}
	}

	showModal() {

		this.result = null;
		this.confirmText();
		this.cancelText();

		if (!this.showResult) {
			this.modal.show(this.bmc, (this.bootstrap ? BootstrapModal : BaseModal));
		} else {
			this.modal.show(this.bmc, (this.bootstrap ? BootstrapModal : BaseModal)).then( (res:string) => this.result = res);
		}
		this.cascade();
	}
}
