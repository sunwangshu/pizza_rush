// GameController constrols the flow of the game, and decides who is the winner.


#pragma strict

var startKey1: KeyCode;
var startKey2: KeyCode;
var startKey3: KeyCode;
var startKey4: KeyCode;

var stage: int = 2;		//1: main title; 2: descriptions; 3: auto countDown; 4: gameplay; 5: end game; 
var player1: Player;
var player2: Player;

// stage 2 instructions
var instructions : GameObject;

// stage 3 countdown
var timePrepStart : float;
var timeLeft : float = 4.0;
var three : GameObject;
var two : GameObject;
var one : GameObject;
var go : GameObject;

// stage 4 in game
var endhight: float = 12.7;
var timeStart: float;	//start game
var timeCount: float = 0.0;
var timeText: UI.Text;	// result
var timePerStep1: float;	// tps of player1
var timePerStep2: float;	// tps of player2
var timePerStepText1_1: UI.Text;	//smaller caps
var timePerStepText2_1: UI.Text;	//smaller caps
var timePerStepText1: UI.Text;	//display tps of player1
var timePerStepText2: UI.Text;	//display tps of player2

// stage 5 results
var player1Win: GameObject;	// result1
var player2Win: GameObject;	// result2
var timeEnd: float;	//end game
var continueText: blinkObject;	


function Start () {
	timeText.text = "";
	timePerStepText1_1.text = "";
	timePerStepText2_1.text = "";
	timePerStepText1.text = "";
	timePerStepText2.text = "";
}

function Update () {
	
	switch(stage) {

		case 2:	// description
			instructions.GetComponent.<Renderer>().enabled = true;
			if(Input.GetKeyDown(startKey1) || Input.GetKeyDown(startKey2) || Input.GetKeyDown(startKey3) ||Input.GetKeyDown(startKey4)){
				timePrepStart = Time.time;
				instructions.GetComponent.<Renderer>().enabled = false;
				stage = 3;
			}
			break;

		case 3:	// auto countdown before game
			timeLeft = 4.0 - (Time.time - timePrepStart);
			var timeLeftFloor : float = Mathf.Floor(timeLeft);
			switch (timeLeftFloor) {
				case 3: 
					three.GetComponent.<Renderer>().enabled = true;
					break;
				case 2: 
					three.GetComponent.<Renderer>().enabled = false;
					two.GetComponent.<Renderer>().enabled = true;
					break;
				case 1: 
					two.GetComponent.<Renderer>().enabled = false;
					one.GetComponent.<Renderer>().enabled = true;
					break;
				case 0: 
					one.GetComponent.<Renderer>().enabled = false;
					go.GetComponent.<Renderer>().enabled = true;
					break;
			}

			if (timeLeft <= 0) {
				go.GetComponent.<Renderer>().enabled = false;
				timeCount = 0.0;
				player1.startGame();
				player2.startGame();
				timeStart = Time.time;
				stage = 4;
			}
			break;

		case 4:	// gameplay
			timeCount = Time.time - timeStart;
			timeText.text = "Time: " + timeCount;
			if (timeCount > 120) {
				// timeout
				player1.endGame();
				player2.endGame();
				player1.reset();
				player2.reset();
				timeText.text = "";
				stage = 2;
			}

			if(player1.transform.position.y >= endhight) {
				// player1 wins
				player1Win.GetComponent.<Renderer>().enabled = true;
				player1.endGame();
				player2.endGame();
				timeEnd = Time.time;
				timePerStep1 = Mathf.Floor(timeCount * 1000.0 / player1.Steps());
				timePerStep2 = Mathf.Floor(timeCount * 1000.0 / player2.Steps());
				stage = 5;
			}
			else if (player2.transform.position.y >= endhight) {
				// player2 wins
				player2Win.GetComponent.<Renderer>().enabled = true;
				player1.endGame();
				player2.endGame();
				timeEnd = Time.time;
				timePerStep1 = Mathf.Floor(timeCount * 1000.0 / player1.Steps());
				timePerStep2 = Mathf.Floor(timeCount * 1000.0 / player2.Steps());
				stage = 5;
			}
			break;

		case 5:	//end game and restart
			timePerStepText1_1.text = "Time per step";
			timePerStepText2_1.text = "Time per step";
			timePerStepText1.text = timePerStep1 + " ms";
			timePerStepText2.text = timePerStep2 + " ms";
			if (Time.time - timeEnd > 4.0) {
				continueText.Enable();
				if(Input.GetKeyDown(startKey1) || 	//press any key
					Input.GetKeyDown(startKey2) || 
					Input.GetKeyDown(startKey3) ||
					Input.GetKeyDown(startKey4) ||
					Time.time - timeEnd > 60.0){	//timeout
					player1Win.GetComponent.<Renderer>().enabled = false;
					player2Win.GetComponent.<Renderer>().enabled = false;
					player1.reset();
					player2.reset();
					continueText.Disable();
					continueText.GetComponent.<Renderer>().enabled = false;
					timeText.text = "";
					timePerStepText1_1.text = "";
					timePerStepText2_1.text = "";
					timePerStepText1.text = "";
					timePerStepText2.text = "";
					stage = 2;
				}
			}
			break;
	}

}