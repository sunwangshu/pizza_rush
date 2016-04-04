// a class of blinking objects that appear and disappear
// when enable is true, then Sprite Renderer will be turn on for halfPeriod, and turn off for halfPeriod, based on running time.

#pragma strict
var r: Renderer;
var halfPeriod: float = 0.5;
var enable: boolean = false;

function Start () {
	r = GetComponent.<Renderer>();
}

function Update () {
	if (enable) {
		if (Mathf.Floor(Time.time/halfPeriod) % 2 == 0) {
			r.enabled = true;
		}
		else {
			r.enabled = false;
		}
	}
}

public function Enable() {
	enable = true;
}

public function Disable() {
	enable = false;
}