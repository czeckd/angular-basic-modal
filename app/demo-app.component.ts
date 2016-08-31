import { Component, OnInit } from '@angular/core';
import { SimpleModal, SimpleModalType } from './simple-modal';

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
	private modalTemplate:string;


	private bootstrapTemplate:string = `
<div class="modal" id="important-msg" tabindex="-1" role="dialog" style="display:block;" (click)="dismiss('Dismiss')">
	<div class="modal-dialog" [ngClass]= "{'modal-sm':width<301, 'modal-lg':width>599}" (click)="$event.stopPropagation()">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" (click)="cancel('Cancel')">
					<span>&times;</span><span class="sr-only">Close</span>
				</button>
				<img *ngIf="icon" class="modal-icon" style="width:24px;position:relative;top:-2px;" [src]="icon" alt="" title=""/>
				<h4 class="modal-title" style="display:inline-block;" id="modal-title" [innerHTML]="title"></h4>
			</div>
			<div class="modal-body" [innerHTML]="message"></div>
			<div class="modal-footer">
				<button *ngIf="confirmBtn" type="button" class="btn btn-default" (click)="confirm()">{{confirmBtn}}</button>
				<button *ngIf="cancelBtn" type="button" class="btn btn-primary" (click)="cancel()">{{cancelBtn}}</button>
			</div>
		</div>
	</div>
</div>
<div class="modal-backdrop fade in"></div>`;

	constructor(private modal:SimpleModal) {
		this.modalTemplate = this.modal['defaultTemplate'];
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
						this.modalTemplate = null;
					}
				}
			}
		}, 10);
		setTimeout( () => {
			// Wait until after 'click'.
			this.modalTemplate = (this.bootstrap ? this.bootstrapTemplate : this.modal['defaultTemplate']);
		}, 50);
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

		if (this.bootstrap) {
			this.modal.template = this.bootstrapTemplate;
		} else {
			this.modal.template = null;
		}

		if (!this.showResult) {
			this.modal.show();
		} else {
			this.modal.show().then( (res:string) => this.result = res);
		}
		this.cascade();
	}
}
