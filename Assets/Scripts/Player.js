// both player1 and player2 use this same script (same class), because they have the same behavior (climb up)
// the only difference is stepx (horizontal velocity) and can be set differently in Inspector for both players

#pragma strict

var playing: boolean = false;
var star: GameObject;

var key1 : KeyCode;
var key2: KeyCode;
var key1Once: boolean = false;
var key2Once: boolean = false;

var positionx: float;
var positiony: float;

var stepx: float;	//0.40 for player1, -0.40 for player2
var stepy: float = 0.40;

var steps: float = 0;

function Start () {
	
}

function Update () {
	if (playing){
		if (Input.GetKeyDown(key1)) {
			key1Once = true;
		}
		if (Input.GetKeyDown(key2)) {
			key2Once = true;
		}

		if (key1Once == true && key2Once == true){
			transform.position.x += stepx;
			transform.position.y += stepy;
			steps ++;
			key1Once = false;
			key2Once = false;
		}
	}
}

public function reset () {
	// reset steps, position
	steps = 0;
	transform.position.x = positionx;
	transform.position.y = positiony;
}

public function startGame () {
	// enable playing
	playing = true;
}

public function endGame () {
	playing = false;
}

public function Steps () {
	return steps;
}