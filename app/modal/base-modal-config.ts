export enum SimpleModalType {
	Default,
	Info,
	Warning,
	Critical
}

export class BaseModalConfig {

	private _blocking:boolean;
	private _title:string;
	private _message:string;
	private _type:SimpleModalType;
	private _icon:string;
	private _width:number;
	private _height:number;
	private _confirmBtn:string;
	private _cancelBtn:string;

	constructor() {
		this._blocking = true;
		this._title = 'Default title';
		this._message = 'Default message';
		this.type = SimpleModalType.Default;
		this._width = 250;
		this._height = 150;
		this._confirmBtn = null;
		this._cancelBtn = 'OK';
	}

	get blocking() : boolean {
		return this._blocking;
	}

	set blocking(val:boolean) {
		this._blocking = val;
	}

	get title() : string {
		return this._title;
	}

	set title(val:string) {
		this._title = val;
	}

	get message() : string {
		return this._message;
	}

	set message(val:string) {
		this._message = val;
	}

	get icon() : string {
		return this._icon;
	}

	set icon(val:string) {
		this._icon = val;
	}

	get type() : SimpleModalType {
		return this._type;
	}

	set type(val:SimpleModalType)  {
		this._type = val;

		switch (this._type) {
			case SimpleModalType.Info:
				this._icon = 'images/info-circle.svg';
				break;
			case SimpleModalType.Warning:
				this._icon = 'images/warning.svg';
				break;
			case SimpleModalType.Critical:
				this._icon = 'images/exclamation-circle.svg';
				break;
			default:
				this._icon = undefined;
				break;
		}
	}

	get width() : number {
		return this._width;
	}

	set width(val:number) {
		this._width = val;
	}

	get height() : number {
		return this._height;
	}

	set height(val:number) {
		this._height = val;
	}

	get confirmBtn() : string {
		return this._confirmBtn;
	}

	set confirmBtn(val:string) {
		this._confirmBtn = val;
	}

	get cancelBtn() : string {
		return this._cancelBtn;
	}

	set cancelBtn(val:string) {
		this._cancelBtn = val;
	}

}
