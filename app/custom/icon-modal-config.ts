import { BaseModalConfig } from 'angular-basic-modal';
import { IconModalType } from './icon-modal.component';

export class IconModalConfig extends BaseModalConfig {

	private _type:IconModalType;

	constructor() {
		super();
		this.type = IconModalType.None;
	}

	get type() : IconModalType {
		return this._type;
	}

	set type(val:IconModalType)  {
		this._type = val;
	}
}
