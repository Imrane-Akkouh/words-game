var Animals = [								//LIST OF ANIMALS
	["cow", "./images/animals/cow.jpg", "./images/spelling/cow.png"],
	["horse", "./images/animals/horse.jpg", "./images/spelling/horse.png"],
	["dog", "./images/animals/dog.jpg", "./images/spelling/dog.png"],
	["giraffe", "./images/animals/giraffe.jpg", "./images/spelling/giraffe.png"],
	["shark", "./images/animals/shark.jpg", "./images/spelling/shark.png"],
	["snake", "./images/animals/snake.jpg", "./images/spelling/snake.png"],
	["zebra", "./images/animals/zebra.jpg", "./images/spelling/zebra.png"],
	["lion", "./images/animals/lion.jpg", "./images/spelling/lion.png"],
	["whale", "./images/animals/whale.jpg", "./images/spelling/whale.png"],
	["crocodile", "./images/animals/crocodile.jpg", "./images/spelling/crocodile.png"],
	["frog", "./images/animals/frog.jpg", "./images/spelling/frog.png"],
	["hippo", "./images/animals/hippo.jpg", "./images/spelling/hippo.png"],
	["scorpion", "./images/animals/scorpion.jpg", "./images/spelling/scorpion.png"],
	["ant", "./images/animals/ant.jpg", "./images/spelling/ant.png"],
	["ostrich", "./images/animals/ostrich.jpg", "./images/spelling/ostrich.png"],
	["rhino", "./images/animals/rhino.jpg", "./images/spelling/rhino.png"],
	["leopard", "./images/animals/leopard.jpg", "./images/spelling/leopard.png"],
	["porcupine", "./images/animals/porcupine.jpg", "./images/spelling/porcupine.png"],
	["monkey", "./images/animals/monkey.jpg", "./images/spelling/monkey.png"],
	["tiger", "./images/animals/tiger.jpg", "./images/spelling/tiger.png"]
  ];

  const synth = window.speechSynthesis;
  const speak = (action) => { //SPEECH SYNTHESIS PROCEDURE
	  utterThis = new SpeechSynthesisUtterance(action); // I removed () from action()
	  synth.speak(utterThis);
  };

  document.getElementById('sound').src = "chime.mp3";
  var chime = document.getElementById('sound');
  const correctAnswer = "That is correct!";
  const wrongAnswer = "Try this!";
  let checkAnswer = false;
  var image = document.getElementById('animImg');

  let highscore = document.getElementById('highscore');
  let score = document.getElementById('score');
  score.innerHTML=0;

  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  const recognition = new SpeechRecognition();

let paragraph = document.getElementById('answer');

const chill = () =>{
	
}

  const dictate = () => {
	chime.play();
	recognition.start();
	recognition.onresult = (event) => {
		const speechToText = event.results[0][0].transcript;
		paragraph.textContent = speechToText;

		if (event.results[0].isFinal) {
			checkAnswer = false;

			if(speechToText.includes(shuffledAnimals[animalPos][0])){ //TESTS TO SEE IF THE RESULT IS CORRECT OR NOT AND RESPONDS
				checkAnswer = true;
			} 	
			
			if (checkAnswer) { 			//CHECK RESPONSES
				score.innerHTML = score.innerHTML*1 + 10;
				speak(correctAnswer);
			}
			else{
				if(animalPos<4)
				speak(wrongAnswer);
			}
			

			if (animalPos == 4){		//GAME OVER AND HIGH SCORE MANAGEMENT
				var score1 = score.innerHTML*1;
				var score2 = highscore.innerHTML*1;

				if ( score1 >= score2){ 
					highscore.innerHTML = score.innerHTML*1;
					setTimeout(()=>{
						paragraph.innerHTML = "NEW HIGH SCORE !!!";
					},2000);
					speak("WE HAVE A WINNER! CONGRATULATIONS.");
				}
				
				speak("Your score is: "+score.innerHTML);
				animalPos++;
			}
			else{
				setTimeout(()=>{
					paragraph.innerHTML="";
					animalPos++;
					image.src=shuffledAnimals[animalPos][1]+"";
				},2000);						//CHANGE IMAGE IF THE GAME IS STILL ON
				
			}

		}
	}
};

const speakAnimal = () => {

	if (animalPos<5){  //WE ONLY GET TO PLAY 5 GAMES
		dictate();
	}
};

  	let arrayShuffle = function (someAnimals){  //SHUFFLE THE LIST OF ANIMALS
		let newPosition, temp;
		for (let i = someAnimals.length-1; i>0; i--){
			newPosition = Math.floor(Math.random() * (i + 1));
			
			temp = someAnimals[i];
			someAnimals[i] = someAnimals[newPosition];
			someAnimals[newPosition] = temp;
		}
		return someAnimals;
	}

	let shuffledAnimals = arrayShuffle(Animals);
	let animalPos = 0;
	 
	image.src=shuffledAnimals[animalPos][1]+"";		//CHARGING THE FIRST ANIMAL IMAGE
	
	const listenAnimal = () => {
		speak(shuffledAnimals[animalPos][0]);
	};