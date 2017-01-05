import { BaseModalConfig } from '../modal/base-modal-config';

import { IconModalType } from './icon-modal-type.enum';


export class IconModalConfig extends BaseModalConfig {

	private _type:IconModalType;

	constructor() {
		super();
		this.type = IconModalType.Default;
	}

	get type() : IconModalType {
		return this._type;
	}

	set type(val:IconModalType)  {
		this._type = val;
	}
}
