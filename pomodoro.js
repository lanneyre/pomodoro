// je déclare et initialise les variables dont je vais avoir besoin
var TimeTravail = 25;
var TimePause = 5;
var nbPhase = 4;
var Phase = "Travail";
var timer;

// La fonction decompte sert à faire le chronomètre
function decompte(){
	// Je récupère les éléments dans mon html
	var h = parseInt(document.getElementById("h").innerText);
	var m = parseInt(document.getElementById("m").innerText);
	var s = parseInt(document.getElementById("s").innerText);
	// Si je n'ai pas atteint le nombre de phase travail + repos définis au debut
	if(nbPhase > 0){
		// Si le temp de travail ou le temps de pause est atteint
		if((m==TimeTravail && Phase == "Travail") || (m==TimePause && Phase == "Pause")){
			// je change la phase
			if(Phase == "Travail"){
				Phase = "Pause";
			} else {
				Phase = "Travail";
			}
			// Je réduit de 1 le nombre de phases réstantes
			nbPhase--;
			// Je remet à 0 le chrono
			h=0;
			m=0;
			s=0;
		} else {
			// J'augmente les secondes
			s++;
			// je met à jours l'affichage afin d'éviter des trucs du genre 00:00:85
			if(s==60){
				s=0;
				m++;
			}
			if (m==60) {
				m=0;
				h++;
			}
		}
		// J'affiche la phase dans laquelle je me trouve
		document.getElementById("legend").innerText = "Pomodoro : " + Phase;
		// Si les minutes ou les secondes sont inférieures à 10 alors je rajoute un 0 devant afin de garder un affichage claire
		if(s<10){s = "0" + s;}
		if(m<10){m = "0" + m;}
		if(h<10){h = "0" + h;}
		// je met à jour l'affichage
		document.getElementById("h").innerText = h;
		document.getElementById("m").innerText = m;
		document.getElementById("s").innerText = s;
	} else {
		// Si toutes les phases ont été réalisées, j'affiche que c'est fini
		document.getElementById("decompte").innerHTML = "C'est fini";
		document.getElementById("legend").innerText = "Pomodoro : Fin" ;
	}
}

// Fonction appellé lorsqu'on clique sur le bouton start
function pomodoro(){
	// Je désactive le bouton start et active le bouton pause
	document.getElementById("start").setAttribute("disabled", "");
	document.getElementById("pause").removeAttribute("disabled");
	// Je lance toutes les secondes la fonction decompte()
	timer = setInterval(decompte, 10);
}
// Fonction appellé lorsqu'on clique sur le bouton pause
function pausePomodoro(){
	// Je désactive le bouton pause et active le bouton start
	document.getElementById("pause").setAttribute("disabled", "");
	document.getElementById("start").removeAttribute("disabled");
	// J'arrète le compteur
	clearInterval(timer);
}
// Fonction appellé lorsqu'on clique sur le bouton reset
function resetPomodoro(){
	// J'arrète le compteur en appelant la fonction pause
	pausePomodoro();
	// Je remet à 0 Tout les éléments
	document.getElementById("legend").innerText = "Pomodoro : Start";
	document.getElementById("h").innerText = "00";
	document.getElementById("m").innerText = "00";
	document.getElementById("s").innerText = "00";
}

// je définis ici les évenements des boutons
document.getElementById('start').addEventListener("click", pomodoro);
document.getElementById('pause').addEventListener("click", pausePomodoro);
document.getElementById('reset').addEventListener("click", resetPomodoro);