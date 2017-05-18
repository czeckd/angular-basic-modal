import { Component } from '@angular/core';

import { BaseModalConfig, BaseModal } from 'angular-basic-modal';

@Component({
	selector: 'modal',
	template: `

<div class="modal" role="dialog" tabindex="-1" role="dialog" style="display:inherit;" (click)="dismiss('Dismiss')">
	<div class="modal-dialog" [ngClass]= "{'modal-sm':width<301, 'modal-lg':width>599}" (click)="$event.stopPropagation()">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" (click)="cancel('Cancel')">
					<span>&times;</span><span class="sr-only">Close</span>
				</button>
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
<div class="modal-backdrop fade in"></div>
`
})

export class BootstrapModal extends BaseModal {

	constructor(bmc:BaseModalConfig) {
		super(bmc);
	}
}
