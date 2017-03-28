import { Component, OnInit } from '@angular/core';

import { BaseModalConfig, BaseModal, SimpleModal } from './modal/index';

import { IconModalType } from './custom/icon-modal-type.enum';
import { IconModalConfig } from './custom/icon-modal-config';
import { IconModal } from './custom/icon-modal.component';
import { BootstrapModal } from './custom/bootstrap-modal.component';


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

	private modComp:Array<string> = [ 'Basic', 'Icon', 'Bootstrap' ];
	private mc:number = 0;
	private modTypes:Array<string> = [];
	private mt:IconModalType = IconModalType.None;
	private showResult:boolean = true;
	private useConfirm:boolean = false;
	private demoCascade:boolean = false;
	private result:string;

	private modalconfig:BaseModalConfig;
	private bmc:BaseModalConfig = new BaseModalConfig();
	private imc:IconModalConfig = new IconModalConfig();

	constructor(private modal:SimpleModal) {
	}

	ngOnInit() {
		this.modalconfig = this.bmc;

		for (let t in IconModalType) {
			if (typeof IconModalType[t] === 'number') {
				this.modTypes.push(t);
			}
		}
		// Set-up default
		this.radio(1);
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

	comp(index:any) {
		this.mc = index;
		switch (this.mc) {
		case 0:
			this.modalconfig = this.bmc;
			this.bootstrap = false;
			break;
		case 1:
			this.modalconfig = this.imc;
			this.bootstrap = false;
			break;
		case 2:
			this.modalconfig = this.bmc;
			this.bootstrap = true;
			break;
		}

		this.swapStyleSheet();
	}

	radio(index:any) {
		this.mt = index;

		switch (this.mt) {
		case IconModalType.Info:
			this.modalconfig.title = 'Info';
			this.modalconfig.message = 'This is a simple informational message.';
			this.imc.type = IconModalType.Info;
			break;
		case IconModalType.Warning:
			this.modalconfig.title = 'Warning';
			this.modalconfig.message = 'This is a simple warning message.';
			this.imc.type = IconModalType.Warning;
			break;
		case IconModalType.Critical:
			this.modalconfig.title = 'Critical';
			this.modalconfig.message = 'This is a simple critical message.';
			this.imc.type = IconModalType.Critical;
			break;
		default:
			this.modalconfig.title = 'Default title';
			this.modalconfig.message = 'Default message.';
			this.imc.type = IconModalType.None;
			break;
		}

		this.modalconfig.cancelBtn = 'OK';
		this.modalconfig.confirmBtn = '';

		if (!this.bootstrap) {
			this.modalconfig.width = 250;
		}
		this.modalconfig.height = 150;
		this.confirmText();
	}

	bootsize(size:string) {
		switch (size) {
		case 'small':
			this.modalconfig.width = 250;
			break;
		case 'large':
			this.modalconfig.width = 600;
			break;
		default:
			this.modalconfig.width = 400;
			break;
		}
	}

	confirmText() {
		if (this.useConfirm && this.modalconfig.confirmBtn === '') {
			this.modalconfig.confirmBtn = 'Confirm';
		} else if (!this.useConfirm) {
			this.modalconfig.confirmBtn = '';
		}
	}

	cancelText() {
		if (this.modalconfig.blocking && this.modalconfig.cancelBtn.length === 0) {
			this.modalconfig.cancelBtn = 'OK';
		}
	}

	private cascade() {

		let w:number = this.modalconfig.width;
		let h:number = this.modalconfig.height;
		let t:string = this.modalconfig.title;

		if (this.demoCascade) {
			this.modalconfig.width = w + 150;
			this.modalconfig.height = h + 150;
			this.modalconfig.title = 'Cascade 1 ' + t;

			this.doShow();

			this.modalconfig.width = w;
			this.modalconfig.height = h;
			this.modalconfig.title = 'Cascade 2 ' + t;

			this.doShow();

			this.modalconfig.title = t;
		}
	}

	private doShow() {
		switch (this.mc) {
		case 0:
			this.modal.show(this.modalconfig, BaseModal).then( (res:string) => {
				if (this.showResult) {
					this.result = res
				}
			});
			break;
		case 1:
			this.modal.show(this.modalconfig, IconModal).then( (res:string) => {
				if (this.showResult) {
					this.result = res
				}
			});
			break;
		case 2:
			this.modal.show(this.modalconfig, BootstrapModal).then( (res:string) => {
				if (this.showResult) {
					this.result = res
				}
			});
			break;
		}
	}

	showModal() {

		this.result = '';
		this.confirmText();
		this.cancelText();

		this.doShow();

		this.cascade();
	}
}
