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
	private _icon:string;
	private _width:number;
	private _height:number;
	private _confirmBtn:string;
	private _cancelBtn:string;
	private _resolver:Function;

	constructor(type:SimpleModalType = SimpleModalType.Default) {
		this._blocking = true;
		this._title = 'Title';
		this._message = 'Message';
		this._width = 250;
		this._height = 150;
		this._confirmBtn = null;
		this._cancelBtn = 'OK';

		switch (type) {
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
				break;
		}
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

	get resolver() : Function {
		return this._resolver;
	}

	set resolver(val:Function) {
		this._resolver = val;
	}

}
