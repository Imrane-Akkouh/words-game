var Animals = [								//LIST OF ANIMALS
	["cow", "./images/animals/cow.jpg", "./images/spelling/cow.png","Cows naturally form large herds, they are red-green colour blind and they can hear lower and higher frequencies better than humans."],
	["horse", "./images/animals/horse.jpg", "./images/spelling/horse.png","Horses can sleep both lying down and standing up, they can run shortly after birth and domestic horses have a lifespan of around 25 years"],
	["dog", "./images/animals/dog.jpg", "./images/spelling/dog.png","Dogs are as smart as a 2-year-old toddler, they have a sense of time and miss you when you’re gone. A year-old puppy is as physically mature as a 15-year-old human."],
	["giraffe", "./images/animals/giraffe.jpg", "./images/spelling/giraffe.png","Giraffe legs alone are taller than many humans. They can run as fast as 35 miles an hour over short distances. A giraffe's neck is too short to reach the ground."],
	["shark", "./images/animals/shark.jpg", "./images/spelling/shark.png","Sharks do not have bones, they have good eyesight, their skin feels similar to sandpaper and scientists age sharks by counting the rings on their vertebrae."],
	["snake", "./images/animals/snake.jpg", "./images/spelling/snake.png","Snakes are carnivores, they don't have eyelids, can't chew food so have to swallow it whole and they have flexible jaws allowing them to eat prey bigger than their head."],
	["zebra", "./images/animals/zebra.jpg", "./images/spelling/zebra.png","Zebra are part of the equidae family along with horse and donkeys. Every zebra has a unique pattern of black and white stripes. Wild zebras live in Africa."],
	["lion", "./images/animals/lion.jpg", "./images/spelling/lion.png","Lions are the second largest big cat species in the world. Their roar can be heard from 8 km away. Most lions are found in the southern and eastern parts of Africa."],
	["whale", "./images/animals/whale.jpg", "./images/spelling/whale.png","Whales can hold their breaths for at least 20 minutes. They are the largest known creature on earth ever. A whale's blowhole does not shoot out seawater and they do not sleep."],
	["crocodile", "./images/animals/crocodile.jpg", "./images/spelling/crocodile.png","Crocodile hearts actively change the destination of blood that flows through it depending on requirements. Crocodiles are closely related to dinosaurs and birds."],
	["frog", "./images/animals/frog.jpg", "./images/spelling/frog.png","Frogs absorb water through their skin so they don't need to drink. They can lay as many as 4,000 eggs and have long webbed feet for jumping and swimming."],
	["hippo", "./images/animals/hippo.jpg", "./images/spelling/hippo.png","The name Hippopotamus comes from the Ancient Greek river horse. An adult Hippo needs to resurface every 3 to 5mins to breathe and are only territorial in the water."],
	["scorpion", "./images/animals/scorpion.jpg", "./images/spelling/scorpion.png","Scorpions have eight legs, a pair of pincers (pedipalps) and a narrow-segmented tail that often curves over their back, on the end of which is a venomous stinger."],
	["ant", "./images/animals/ant.jpg", "./images/spelling/ant.png","The bullet ant has the most painful sting in the world! The ant is one of the world's strongest creatures in relation to its size and longest living insect."],
	["ostrich", "./images/animals/ostrich.jpg", "./images/spelling/ostrich.png","The flightless ostrich is the world's largest bird, they have three stomachs. Ostriches are the fast runners of any birds or other two-legged animal and can sprint at over 70 km/hr."],
	["rhino", "./images/animals/rhino.jpg", "./images/spelling/rhino.png","Rhinoceros means nose horn. There are five different species of rhinoceros, three native to southern Asia and two native to Africa and they can weigh over 3500 kg"],
	["leopard", "./images/animals/leopard.jpg", "./images/spelling/leopard.png","The lifespan of a leopard is between 12 - 17 years in the wild, and up to 23 years in captivity. Leopards are carnivores, but they aren't picky eaters and are very agility."],
	["porcupine", "./images/animals/porcupine.jpg", "./images/spelling/porcupine.png","Body of the porcupine is covered with sharp spines or quills. Porcupines can't shoot out their quills, but they will be easily released when predators get it touch with animal."],
	["monkey", "./images/animals/monkey.jpg", "./images/spelling/monkey.png","There are currently 264 known monkey species. A baboon is an example of an old-world monkey, while a marmoset is an example of a new-world monkey."],
	["tiger", "./images/animals/tiger.jpg", "./images/spelling/tiger.png","Tigers are excellent swimmers and even enjoy swimming and cooling off in the water on a hot day. The mother hunts and feeds her baby cubs until they are around two years old."]
  ];

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

	var image = document.getElementById('animImg'); 
	image.src = shuffledAnimals[animalPos][1]+"";		//CHARGING THE FIRST ANIMAL IMAGE

	var facts = document.getElementById('facts');
	facts.innerHTML = shuffledAnimals[animalPos][3]+"";

	var div = document.getElementById('imgTxt');

	function toggle(){
		div.classList.toggle("imgTxt-toggle");
		facts.classList.toggle("text-toggle");
		image.classList.toggle("image-toggle");
	}

	var spelling = document.getElementById('spelling'); //CHARGING THE FIRST ANIMAL SPELLING
	spelling.src = shuffledAnimals[animalPos][2]+"";
	
	const synth = window.speechSynthesis;
	const speak = (action) => { //SPEECH SYNTHESIS PROCEDURE
		utterThis = new SpeechSynthesisUtterance(action); // I removed () from action()
		synth.speak(utterThis);
	};

	const listenAnimal = () => {
		speak(shuffledAnimals[animalPos][0]);
	};

	document.getElementById('sound').src = "chime.mp3";
	var chime = document.getElementById('sound');
	const correctAnswer = "That is correct!";
	const wrongAnswer = "Try again!";
	let checkAnswer = false;

	window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
	const recognition = new SpeechRecognition();

	const dictate = () => {
			chime.play();
			recognition.start();
			recognition.onresult = (event) => {
				const speechToText = event.results[0][0].transcript;
				if (event.results[0].isFinal) {
					checkAnswer = false;

					if(speechToText.includes(shuffledAnimals[animalPos][0])){
						checkAnswer = true;	//TESTS TO SEE IF THE RESULT IS CORRECT OR NOT AND RESPONDS
					} 	

					if (checkAnswer) { 
						speak(correctAnswer);
					}
					else{
						speak(wrongAnswer);
					};	
				}
			}
		};

	const speakAnimal = () => {
		dictate();
	};

	const back = () => { //GO BACK PROCEDURE
		if (animalPos != 0){
			animalPos--;
			image.src=shuffledAnimals[animalPos][1]+"";
			facts.innerHTML=shuffledAnimals[animalPos][3]+"";
			spelling.src=shuffledAnimals[animalPos][2]+"";
		}
	};

	const forth = () => { //GO FORWARD PROCEDURE
			if (animalPos < shuffledAnimals.length-1){
				animalPos++;
				image.src=shuffledAnimals[animalPos][1]+"";
				facts.innerHTML=shuffledAnimals[animalPos][3]+"";
				spelling.src=shuffledAnimals[animalPos][2]+"";
			}
	};
