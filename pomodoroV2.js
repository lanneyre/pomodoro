// je créé une fonction anonyme pour lancer automatiquement mon code 
(function(){
	// J'initialise mon timer
	var timer;

	// Je créé une fonction permettant de récupérer le contenant de mon champ input et le mettre dans mon block decompte
	var getTimer = function(){
		// je récupère la valeur rentrée dans mon champ input
		timer = Number(document.getElementById("input").value);
		// Si timer est inférieur à 10 je rajoute un 0 devant puis le l'insère dans mon html
		if(timer < 10)
			document.getElementById("decompte").innerHTML = "0"+timer+":00";
		else
			document.getElementById("decompte").innerHTML = timer+":00";
	}

	// j'appelle la fonction pour initialiser le timer
	getTimer();
	// je déclare mes variable
	// Minuteur contiendra l'id de mon timerOut
	var minuteur;
	// Start me permettra de savoir si le compteur est lancé ou pas
	var start = false;
	// je détecte les click sur mes boutons + et - et je met à jour mon champ input et l'affichage
	document.getElementById("plus").addEventListener("click", function(){
		document.getElementById("input").value = ++timer;
		getTimer();
	});
	document.getElementById("moins").addEventListener("click", function(){
		if(timer > 0){
			document.getElementById("input").value = --timer;
			getTimer();
		}
	});

	// Je détecte les frappes dans mon champs input afin de mettre à jour l'affichage du timer
	document.getElementById("input").addEventListener("keyup", getTimer);

	// ma fonction de décompte/timer
	var decompte = function(){
		// J'informe tout le monde que mon décompte est lancé
		start = true;
		//Je désactive le bouton start et active le bouton pause
		document.getElementById("start").setAttribute("disabled", "");
		document.getElementById("pause").removeAttribute("disabled");
		// Je  récupère les minutes et les secondes que je met dans un tableau grace à la fonction split
		var compteur = document.getElementById("decompte").innerHTML.split(":");
		compteur[0] = parseInt(compteur[0]);
		compteur[1] = parseInt(compteur[1]);

		// J'enlève 1 aux secondes et je met à jours l'affichage afin d'éviter des trucs du genre 25:-5
		compteur[1]--;
		if(compteur[1]==-1){
			compteur[0]--;
			compteur[1] = 59;
		}
		// Si les minutes ou les secondes sont inférieures à 10 alors je rajoute un 0 devant afin de garder un affichage claire
		if(compteur[0]<10){
			compteur[0] = "0"+compteur[0];
		}
		if(compteur[1]<10){
			compteur[1] = "0"+compteur[1];
		}
		// Je rassemble le tableau en chaine de caractère
		var rendu = compteur.join(":");
		// je met à jour l'affichage
		document.getElementById("decompte").innerHTML = rendu;
		// si le decompte n'est pas fini 
		if(rendu != "00:00")
		{
			// alors je relance ma fonction après 1 seconde d'attente
			minuteur = setTimeout(decompte, 1000);
			//console.log(minuteur);
		}
		else{
			// Sinon je préviens que c'est fini
			alert("C'est l'heure de la fin !");
			getTimer();
		}
	};

	// lorsqu'on clique sur le bouton start je lance la fonction decompte
	document.getElementById("start").addEventListener("click", decompte);
	// Lorsqu'on clique sur le bouton pause je vérifie si le decompte est lancé et si c'est le cas je l'arrète sinon je le relance (même si c'est inutile puisque le bouton sera désactivé)
	document.getElementById("pause").addEventListener("click", function(){
		document.getElementById("pause").setAttribute("disabled", "disabled");
		document.getElementById("start").removeAttribute("disabled");
		if(start){
			start = false;
			clearTimeout(minuteur);
		} else {
			minuteur = setTimeout(decompte, 1000);
		}
	});
	// Lorsqu'on clique sur le bouton reset on arrete le timer et on remet à 0 le décompte
	document.getElementById("reset").addEventListener("click", function(){
		if(typeof minuteur == "number"){
			document.getElementById("pause").setAttribute("disabled", "disabled");
			document.getElementById("start").removeAttribute("disabled");
			clearTimeout(minuteur);
			getTimer();
		} 
	});
})();