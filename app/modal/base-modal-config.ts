export class BaseModalConfig {

	private _blocking:boolean;
	private _title:string;
	private _message:string;
	private _width:number;
	private _height:number;
	private _confirmBtn:string;
	private _cancelBtn:string;

	constructor() {
		this._blocking = true;
		this._title = 'Default title';
		this._message = 'Default message';
		this._width = 250;
		this._height = 150;
		this._confirmBtn = '';
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
