// bblackmoor@blackgate.net
// https://github.com/bblackmoor/whimsy
// :TODO: I am aware that my variable scope is all over the place.

let data = new Object();
let front = false;
let index = 0;
let i = 0;
let copyText = "";

// Getting the front and the back titles
const titles = document.querySelectorAll(".title");

// Getting the front and the back text boxes
const texts = document.querySelectorAll(".text");

// Getting the buttons
const buttons = document.querySelectorAll(".new-card");

// Getting the previous 10 indexes
const oldIndex10 = document.getElementById("old-index-10");
const oldIndex09 = document.getElementById("old-index-09");
const oldIndex08 = document.getElementById("old-index-08");
const oldIndex07 = document.getElementById("old-index-07");
const oldIndex06 = document.getElementById("old-index-06");
const oldIndex05 = document.getElementById("old-index-05");
const oldIndex04 = document.getElementById("old-index-04");
const oldIndex03 = document.getElementById("old-index-03");
const oldIndex02 = document.getElementById("old-index-02");
const oldIndex01 = document.getElementById("old-index-01");

const blockFront = document.querySelector(".block__front");
const blockBack = document.querySelector(".block__back");

const titleFront = titles[0];
const titleBack = titles[1];

const textFront = texts[0];
const textBack = texts[1];

const buttonFront = buttons[0];
const buttonBack = buttons[1];

const cardIcon = "<!-- Icon -->\n<i class=\"fa-solid fa-flip-horizontal fa-scale-unbalanced\"></i>\n";
const copySpanStart = "<span class=\"copy-span\" style=\"cursor: pointer\" onclick=\"copyCard()\">\n";
const copySpanEnd = "</span>\n";
const copyIcon = "<i class=\"fa-regular fa-copy\"></i>";
const copyTooltip = "<span class=\"copy-tooltip\">Click to copy</span>";

const initializeButtons = document.querySelectorAll('.btn-initialize');
const initializeButtonFront = initializeButtons[0];
const initializeButtonBack = initializeButtons[1];

const instructionTexts = document.querySelectorAll('.instructions');
const instructionTextFront = instructionTexts[0];
const instructionTextBack = instructionTexts[1];

// Show initial instructions
function initializeInstructions() {
	if (front) {
		instructionTextFront.innerHTML = "SPACEBAR to select a card&nbsp;&nbsp;&nbsp;&nbsp;ESCAPE to start over";
		instructionTextFront.style.visibility = "visible";
		instructionTextFront.style.display = "block";
	} else {
		instructionTextBack.innerHTML = "SPACEBAR to select a card&nbsp;&nbsp;&nbsp;&nbsp;ESCAPE to start over";
		instructionTextBack.style.visibility = "visible";
		instructionTextBack.style.display = "block";
	}
}

// Hide initial instructions
function hideInstructions() {
	if (front) {
		instructionTextFront.style.display = "none";
	} else {
		instructionTextBack.style.display = "none";
	}
}

// Show initial instructions
function setInstructionsUnofficial() {
	if (front) {
		instructionTextFront.innerHTML = "(Unofficial)";
		instructionTextFront.style.visibility = "visible";
		instructionTextFront.style.display = "block";
	} else {
		instructionTextBack.innerHTML = "(Unofficial)";
		instructionTextBack.style.visibility = "visible";
		instructionTextBack.style.display = "block";
	}
}

// Update recent indexes and returns new index
function getNewIndex(oldIndex) {
	// Record recent indexes
	oldIndex10.textContent = parseInt(oldIndex09.textContent);
	oldIndex09.textContent = parseInt(oldIndex08.textContent);
	oldIndex08.textContent = parseInt(oldIndex07.textContent);
	oldIndex07.textContent = parseInt(oldIndex06.textContent);
	oldIndex06.textContent = parseInt(oldIndex05.textContent);
	oldIndex05.textContent = parseInt(oldIndex04.textContent);
	oldIndex04.textContent = parseInt(oldIndex03.textContent);
	oldIndex03.textContent = parseInt(oldIndex02.textContent);
	oldIndex02.textContent = parseInt(oldIndex01.textContent);
	oldIndex01.textContent = oldIndex;

	newIndex = Math.floor(Math.random() * (dataLength - 1)) + 1;

	// Prevent nearby duplicates
	while ([parseInt(oldIndex10.textContent), 
			parseInt(oldIndex09.textContent), 
			parseInt(oldIndex08.textContent), 
			parseInt(oldIndex07.textContent), 
			parseInt(oldIndex06.textContent), 
			parseInt(oldIndex05.textContent), 
			parseInt(oldIndex04.textContent), 
			parseInt(oldIndex03.textContent), 
			parseInt(oldIndex02.textContent), 
			parseInt(oldIndex01.textContent),
			0].includes(newIndex)) {
		newIndex = Math.floor(Math.random() * (dataLength - 1)) + 1;
	}

	return newIndex;
}

// Reset recent indexes and initialize deck
function initializeIndex() {
	// Clear recent indexes
	oldIndex10.textContent = -1;
	oldIndex09.textContent = -1;
	oldIndex08.textContent = -1;
	oldIndex07.textContent = -1;
	oldIndex06.textContent = -1;
	oldIndex05.textContent = -1;
	oldIndex04.textContent = -1;
	oldIndex03.textContent = -1;
	oldIndex02.textContent = -1;
	oldIndex01.textContent = -1;

	// Displaying a new card when the page loads
	newIndex = 0;
	return newIndex;
}

// Construct new card and display it
function displayCard(index) {
	if (index < 0 || index > dataLength) {
		index = initializeIndex();
	}

	// Stores the title of the respective card
	let cardTitle = data[index][0];

	// The title if no title is present
	if (!cardTitle) {
		cardTitle = "ERROR";
	}

	// Stores the text of the respective card
	let cardText = data[index][1];

	// The text if no text is present
	if (!cardText) {
		cardText = "ERROR";
	}

	// Stores whether the card is official
	let cardSource = data[index][2];

	// The source if no source is present
	if (!cardSource) {
		cardSource = "unofficial";
	}

	// Replacing the current card and the text with a new one
	if (front) {
		// Changing the front if back-side is displayed
		titleFront.innerHTML = copySpanStart + cardTitle + cardIcon + copyTooltip + copySpanEnd;
		textFront.innerHTML = copySpanStart + cardText + copyTooltip + copySpanEnd;
		initializeButtonFront.style.visibility = "visible";

		if (cardSource == "official") {
			if (index == 0) {
				initializeInstructions();
			} else {
				hideInstructions();
			}
		} else {
			setInstructionsUnofficial();
		}
	} else {
		// Changing the back if front-side is displayed
		titleBack.innerHTML = copySpanStart + cardTitle + cardIcon + copyTooltip + copySpanEnd;
		textBack.innerHTML = copySpanStart + cardText + copyTooltip + copySpanEnd;
		initializeButtonBack.style.visibility = "visible";

		if (cardSource == "official") {
			if (index == 0) {
				initializeInstructions();
			} else {
				hideInstructions();
			}
		} else {
			setInstructionsUnofficial();
		}
	}

	copyText = cardTitle + "\n" + cardText;

	front = !front;
}

// Randomly select and display new card
function showNewCard() {
	hideInstructions();

	// Rotating the Card Box
	blockBack.classList.toggle('rotateB');
	blockFront.classList.toggle('rotateF');
	
	// Displaying a random card when the page loads
	index = getNewIndex(index);
	displayCard(index);
}

// flip to the initial card
function initializePage() {
	initializeInstructions();

	// Rotating the Card Box
	blockBack.classList.toggle('rotateB');
	blockFront.classList.toggle('rotateF');
	
	// Displaying a new card when the page loads
	index = initializeIndex();
	displayCard(index);
}

// Adding an onclick listener to copy the card
function copyCard() {
	navigator.clipboard.writeText(copyText);
}

window.onload = function() {
	data[i++] = [
			"Whimsy Cards",
			"Whimsy Cards copyright &copy; 1987 Lion Rampant<br />(Used without permission.)",
			"official"
	];
	data[i++] = [
			"Abrupt Change Of Events",
			"Suddenly things are not happening the way they were a moment ago. Alliances switch, secrets are revealed, and new information surfaces.",
			"official"
	];
	data[i++] = [
			"Added Animosity",
			"The ill-will between characters grows past current levels. This animosity can be openly expressed or harbored secretly in the heart.",
			"official"
	];
	data[i++] = [
			"Bad Tidings",
			"Someone gets bad news. It might affect play or it might be news of distant and still important events.",
			"official"
	];
	data[i++] = [
			"Bizarre Coincidence",
			"Two or more things come together against incredible odds. Old friends (and enemies) run into you in the supermarket, you just happen to have the rare item you need in your closet, etc.",
			"official"
	];
	data[i++] = [
			"Change Of Heart",
			"A character's feelings change and alter a decision. Pirates spare prisoners and hassled innkeepers decide to make room for you after all.",
			"official"
	];
	data[i++] = [
			"Double Jeopardy",
			"Failure carries a double penalty. It could mean the normal penalty doubled, but it could also mean a penalty in addition to the normal one.",
			"official"
	];
	data[i++] = [
			"Draw a Blank",
			"_",
			"official"
	];
	data[i++] = [
			"Emotional Release",
			"Strong emotions are let out. What are the emotions, and what triggers their sudden eruption? Is it a healthy release or a wild tempest?",
			"official"
	];
	data[i++] = [
			"Envy",
			"Someone covets something that another person has. The envy could be expressed as an outright attempt to get the object of desire or something more subtle.",
			"official"
	];
	data[i++] = [
			"Erratic Behavior",
			"Someone or something exhibits wild, unexpected behavior. Could be party members, enemies, mounts, spells, or equipment.",
			"official"
	];
	data[i++] = [
			"Error Of Judgment",
			"Someone's better judgment fails. The trouble that ensues depends on the specific error that is made.",
			"official"
	];
	data[i++] = [
			"Extreme Caution",
			"Someone exercises extreme caution. Is the caution necessary, or is it exaggerated? What is the disadvantage from using so much caution?",
			"official"
	];
	data[i++] = [
			"Greed",
			"Desire for wealth diverts a character from normal activity. The object of this desire can be specific (e.g. a certain necklace) or general (e.g. gold!).",
			"official"
	];
	data[i++] = [
			"Horrible Failure",
			"What was a simple failure becomes a disaster. Attempts to persuade people backfire, arrows strike the wrong targets, and the wrong demons get conjured.",
			"official"
	];
	data[i++] = [
			"Inopportune Arrival",
			"Someone or something shows up to the chagrin or disadvantage of someone. Unwelcome relatives and hated enemies are possibilities.",
			"official"
	];
	data[i++] = [
			"Internal Conflict",
			"Conflicts arise within a person or within a group. How did these conflicts come about? How can they be resolved? Are they hidden? Poorly hidden?",
			"official"
	];
	data[i++] = [
			"Jealousy",
			"The green-eyed monster rears its ugly head. How does the jealousy show itself?",
			"official"
	];
	data[i++] = [
			"Joy",
			"Delight floods a character, making the world seem beautiful. What brings about this wonderful feeling?",
			"official"
	];
	data[i++] = [
			"Lasting Impression",
			"An impression is made, or an old one is reborn. Emotional experiences return to a character affecting actions or something happens that will leave an impression for years (e.g. a scar).",
			"official"
	];
	data[i++] = [
			"Malice",
			"Wrath rises in a character toward someone or something. Even if the anger can be held in check, it will affect the person's behavior.",
			"official"
	];
	data[i++] = [
			"Misguided Love",
			"Love affects a character in ways others fail to approve of. The character seems out of control. (To the lover of course, the love is true and wonderful; to others, it is misguided.)",
			"official"
	];
	data[i++] = [
			"Misplaced Trust",
			"Undeserved trust is or has been placed in someone or something. \"Faithful\" hirelings desert, \"sturdy\" ropes break, and politicians are believed.",
			"official"
	];
	data[i++] = [
			"Moral Dilemma",
			"A character is faced with a moral question. What should the character do? What are the personality traits or personal values that make the decision to difficult?",
			"official"
	];
	data[i++] = [
			"New Role",
			"You take over another character, either of a player or of the game moderator. The original owner can ask for it back and veto your actions while you have the new role.",
			"official"
	];
	data[i++] = [
			"Ominous Omen",
			"Something suggests future evil, an event that portends calamity, misfortune, or death. The players might not understand the significance of the omen.",
			"official"
	];
	data[i++] = [
			"Parting Of Ways",
			"People or things go their separate ways. The parting can be happy or sorrowful, anticipated or sudden. Depending on the circumstances, those who part might meet again.",
			"official"
	];
	data[i++] = [
			"Personality Clash",
			"The personalities of two characters come into conflict. The cause of the clash and the gravity are up to you. How could the conflict be resolved?",
			"official"
	];
	data[i++] = [
			"Pity",
			"Sympathetic sorrow for another person affects a character's actions. This pity might provoke action or merely set a mood.",
			"official"
	];
	data[i++] = [
			"Pivotal Decision",
			"Someone is faced with a decision that will affect something dramatically. A potential ally chooses sides, or a leader chooses a plan of action.",
			"official"
	];
	data[i++] = [
			"Second Chance",
			"Someone gets a second chance. Maybe that bullet missed the heart after all, or maybe the character realizes something that allows a second skill attempt. You must give the reason.",
			"official"
	];
	data[i++] = [
			"Sloth",
			"Someone is very lazy. Guards become lax, squires neglect their duties, and bartenders give you slow service.",
			"official"
	];
	data[i++] = [
			"Something Missing",
			"Something that should be here is not. The seriousness of the lack depends on what is missing. It could be your sword or a friend you were supposed to meet.",
			"official"
	];
	data[i++] = [
			"Special Circumstances",
			"Unusual conditions change the normal course of events for good or ill. The circumstances can be personal, such as character's mood, impersonal, such as the weather.",
			"official"
	];
	data[i++] = [
			"Spectacular Success",
			"What was a normal success becomes spectacular. Those rare, unexplainable feats are now possible. The game moderator must watch this card because it is easy to abuse.",
			"official"
	];
	data[i++] = [
			"Sudden Reversion",
			"Suddenly someone or something reverts to the way it used to be. People revert to earlier patterns of behavior and problems go back to the way they were at the beginning.",
			"official"
	];
	data[i++] = [
			"Tables Turn",
			"Something in the situation reverses, an advantage turns in to a disadvantage, a disadvantage turns into an advantage. It is a surprise to all.",
			"official"
	];
	data[i++] = [
			"Things Are Not As They Seem",
			"Characters have been deceived, perhaps without malicious intent. The truth need not be known now. A good card for a secret note to the game moderator.",
			"official"
	];
	data[i++] = [
			"Trade Places",
			"You take over the role of another character and the player who was running that character takes yours. Either of you can end the trade at any time.",
			"official"
	];
	data[i++] = [
			"Turn For The Worse",
			"Things were going well, but suddenly something comes up that changes things for the worse. What is the change? How can those affected overcome the new problem?",
			"official"
	];
	data[i++] = [
			"Ulterior Motive",
			"A character has motives besides those that are already known, and the ulterior motive can conflict with the surface motive. A good card for a secret note to the game moderator.",
			"official"
	];
	data[i++] = [
			"Unexpected Aid",
			"Much to your surprise, aid shows up. Aid could be anything from fog that helps you sneak into an enemy camp to the arrival of the cavalry. But does this aid have a price?",
			"official"
	];
	data[i++] = [
			"Unexplained Consequence",
			"Someone's actions have results that were not, perhaps could not have been, foreseen. The result can be good or bad, minor or extreme.",
			"official"
	];
	data[i++] = [
			"Unexplained Event",
			"Something happens. You don't know why.",
			"official"
	];
	data[i++] = [
			"Vivid Detail",
			"Break into the storyline to describe something in detail so the whole group can share the image. You cannot directly change the course of events, but you might inspire the game moderator.",
			"official"
	];
	data[i++] = [
			"Bad Company",
			"Someone's allies turn out to be not so nice after all. Even if their friendship is sincere, you are known by the company you keep.",
			"uofficial"
	];
	data[i++] = [
			"Bizarre Local Holiday",
			"Businesses are open or closed when they normally aren't. Special foods and costumes abound. The normal rules of behavior might be altered in surprising ways.",
			"uofficial"
	];
	data[i++] = [
			"Double or Nothing",
			"Things are going well. You can stop now, or go for broke. Are you willing to risk it?",
			"uofficial"
	];
	data[i++] = [
			"Hesitation",
			"He who hesitates is lost. But how long did he hesitate, and what did he lose?",
			"uofficial"
	];
	data[i++] = [
			"Just Desserts",
			"Someone gets what they so richly deserve. It might be good, it might be bad, or it might be ugly.",
			"uofficial"
	];
	data[i++] = [
			"No One Could Have Survived That!",
			"After an explosion, a collapsing structure, or some other spectacular disaster has spelled certain doom for someone, play this card to make their doom less certain.",
			"uofficial"
	];
	data[i++] = [
			"Omens & Portents",
			"A blood red moon, flocks of crows, and animal entrails all say something big is happening. What is it? Is it good? Is it bad?",
			"uofficial"
	];
	data[i++] = [
			"Unexplained Phenomenon",
			"Something happens. You don't know why.",
			"uofficial"
	];

	dataLength = i;

	buttonFront.addEventListener('click', showNewCard);
	buttonBack.addEventListener('click', showNewCard);

	initializeButtonFront.addEventListener('click', initializePage);
	initializeButtonBack.addEventListener('click', initializePage);
	
	// event = keyup or keydown
	document.addEventListener('keydown', (e) => {
		if (e.code === "Space") {
			if (front) {
				buttonFront.click();
			} else {
				buttonBack.click();
			}
		} else if (e.code === "Escape" || e.key === "Esc" || e.keyCode === 27) {
			if (front) {
				initializeButtonFront.click();
			} else {
				initializeButtonBack.click();
			}
		}
	});
}
