export default class FieldProps {
	private _x: number;
	private _y: number;
	private _hasMine: boolean = false;
	private _mineCount: number = 0;
	private _hasFlag: boolean = false;
	private _isUncovered: boolean = false;

	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
	}

	get x(): number {
		return this._x;
	}

	get y(): number {
		return this._y;
	}

	get hasMine(): boolean {
		return this._hasMine;
	}

	set hasMine(hasMine: boolean) {
		this._hasMine = hasMine;
	}

	get hasFlag(): boolean {
		return this._hasFlag;
	}

	set hasFlag(hasFlag: boolean) {
		this._hasFlag = hasFlag;
	}

	get mineCount(): number {
		return this._mineCount;
	}

	set mineCount(mineCount: number) {
		this._mineCount = mineCount;
	}

	get isUncovered(): boolean {
		return this._isUncovered;
	}

	set isUncovered(isUncovered: boolean) {
		this._isUncovered = isUncovered;
	}
}
