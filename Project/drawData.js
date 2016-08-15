	var context,canvas;
	var bodies  = [];
	var springs = [];
	var gravity = 1;
	var deltaT  = 0.5;
	var timer   = null;
	var counter = 0;
	var alpha = 0.005;
  	var R1 = (1+alpha*deltaT/2); R2 = (1-alpha*deltaT/2);
	var criticalDistance = 75;
	var color2;
	var cityData = [];
	var cityCount = 0;
	var protectedNode = [3,7];
	var attackedNode = [];
	var defenderPayoff = 0;
	var attackerPayoff = 0;

	window.onload=getCanvas;    
	function getCanvas(){
		canvas = document.getElementById("myCanvas");
		context=canvas.getContext("2d");
		//DrawBox(0,0,canvas.width,canvas.height);
		createMesh(7,3);
		canvas.addEventListener('click',pickParticle);
	}

	function createMesh(n, m){
		var index = [22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
		var radius = 15;
		var space = criticalDistance-10;
		var x = 10;
		var y = 10;
		var fixedFlag = 1;
		var count = 0;
		for (var i = 0; i < n; i++) {
			x += space;
			y = 10;
			for (var j = 0; j < m; j++) {
				y += space;
				bodies.push(Particle(Vector(x, y),radius,Vector(0,0),Vector(0,0),fixedFlag,index[count]));
				//console.log(bodies);
				count++;
			}
		}
		//x += space;
		//bodies.push(Particle(Vector(x, y),radius,Vector(0,0),Vector(0,0),fixedFlag,index[count]));
		//count++;
		console.log("count = " + count);
		bodies.forEach(checkForContacts);
	}
	
	function pickParticle(e){
		console.log("X coords: " + e.x + ", Y coords: " + e.y);
		var xMin = e.x - criticalDistance/2;
		var xMax = e.x + criticalDistance/2;
		var yMin = e.y - criticalDistance/2;
		var yMax = e.y + criticalDistance/2;

   		for(var i in bodies){
   			if((bodies[i].pos.x > xMin) && (bodies[i].pos.x < xMax) && (bodies[i].pos.y > yMin) && (bodies[i].pos.y < yMax)){
     			for(var j in springs){
     				if(springs[j].masses[0]===bodies[i] || springs[j].masses[1]===bodies[i]){
     					delete(springs[j]);
     				}
     			}
   			}
   		}
	}

	var checkForContacts = function(body,i){ // only check j > i
		for(var j = i+1;j< bodies.length;j++){
			if(noSpring(body,bodies[j])){ // check we don't already have a spring
				if(body.pos.distance(bodies[j].pos) < criticalDistance){
					springs.push(Spring(body,bodies[j]));
				}
			}
		}
	};

	var noSpring = function(body0,body1){
	  var n = springs.length;
	  for(var i=0;i<n;i++){ // check spring body0 to body1 or body1 to body0
	    if(springs[i].masses[0]===body0 && springs[i].masses[1]===body1) return false;
	    if(springs[i].masses[0]===body1 && springs[i].masses[1]===body0) return false;
	  }
	  return true;
	};

	function updateDestroy(){
		var randomNum = Math.floor(Math.random() * 21) + 1;
		
		if(cityData.indexOf(randomNum) >= 0) {
			console.log("Destroy = " + randomNum + " index = " + cityData.indexOf(randomNum));
			var i = cityData.indexOf(randomNum);
			bodies.splice(randomNum,1);	
			//defenderPayoff = defenderPayoff - 0;
			attackerPayoff = attackerPayoff - 50;
		} else {
			setTimeout(updateDestroy,10);
		}
		context.clearRect(0, 0, canvas.width,canvas.height);
		bodies.forEach(drawBody);
		springs.forEach(drawSpring);
	}

	function updateDefend(){
		var randomNum = Math.floor(Math.random() * 21) + 1;
		//console.log("randomNum=" + randomNum);
		if(protectedNode.indexOf(randomNum) < 0) {
			protectedNode.push(randomNum);
			protectedNode = protectedNode.filter(unique);
			defenderPayoff = defenderPayoff - 30;
			//attackerPayoff = attackerPayoff - 1;
		} else{
			setTimeout(updateDefend,10);
		}
		
		updateParticles(randomNum);
	}

	function updateDetect(){
		console.log("inside updateDetect");
		for (var i = 0; i < bodies.length; i++) {
			//console.log("bodies[i].color = " + bodies[i].color);
			if(bodies[i].color === 'rgba(255, 0, 0, 1)') {
				
				if(cityData.indexOf(bodies[i].number) >= 0) {
					console.log("Found Red = " + bodies[i].number + " length = " + cityData[cityData.indexOf(bodies[i].number)]);
					var index1 = cityData.indexOf(bodies[i].number);
					protectedNode.push(bodies[i].number);
					defenderPayoff = defenderPayoff - 50;
					//attackerPayoff = attackerPayoff - 1;
				}
				
				updateParticles(bodies[i].number);
				break;
			}	
		}
		
	}

	function updateSpread(){
		var randomNum = Math.floor(Math.random() * 21) + 1;
		//console.log("randomNum=" + randomNum);
		if(protectedNode.indexOf(randomNum) < 0) {
			cityData.push(randomNum);	
			cityData = cityData.filter(unique); 	
			//defenderPayoff = defenderPayoff - 0;
			attackerPayoff = attackerPayoff - 30;
		} else{
			setTimeout(updateSpread,10);
		}
		//console.log("attackedNode=" + cityData);

		updateParticles(randomNum);
	}

	function updateParticles(city){
		//console.log("Inside updateParticles = " + city);
		counter++;
		context.clearRect(0, 0, canvas.width,canvas.height);
		//DrawBox(0,0,canvas.width,canvas.height);
		
		if(city > 0 && city !== null){
			if(protectedNode.indexOf(city) < 0) {
				cityData.push(city);
				cityData = cityData.filter(unique);
			}
		}
		console.log("Protected Nodes =" + protectedNode);
		console.log("Infected Nodes = " + cityData);
		//console.log("CityData = " + cityData);
		bodies.forEach(drawBody);
		springs.forEach(drawSpring);
		document.getElementById("attackerPayoff").value = attackerPayoff;
		document.getElementById("defenderPayoff").value = defenderPayoff;
		if(cityData.length >= 4){
			attackerPayoff = attackerPayoff + 500;
			window.alert("Game Over: Attacker Won with payoff = " + attackerPayoff);
		}
		if(protectedNode.length >= 6){
			defenderPayoff = defenderPayoff + 0;
			window.alert("Game Over: Defender Won with payoff = " + defenderPayoff);
		}
		//bodies.forEach(checkForContacts); // if bodies are close put in spring
	}
	
	function Particle(pos,radius,velocity,force,fixedFlag,city){
		return {pos:pos,radius:radius,velocity:velocity,
			force:force,fixedFlag:fixedFlag, city:city};
	}

	// A spring is updated by the motion of its particles
  	// 2 particles passed in as parameters
	function Spring(p0,p1){
	  	var masses = [p0,p1];
	  	var stiffness = 1 + Math.random()*2;
	   	var originalLength = p1.pos.minus(p0.pos).abs();
	   	//originalLength = criticalDistance;
	   	var color = 'rgb(0,0,200)';
	  	return {masses:masses, stiffness:stiffness, originalLength:originalLength, color:color};
	}

	function drawBody(body){
		
		
		var len = cityData.length;
		var varData = body.city;
		var idNumber;
		
		if(len === 0){
			//console.log("City in this run = " + varData);
			color2 = 'rgba(0, 0, 0, 0.5)';
			DrawCircle(body.pos.x,body.pos.y,body.radius,color2);
			if (protectedNode.indexOf(varData) >= 0) {
				//console.log("Protected city = " + varData);
				color2 = 'rgba(0, 255, 0, 1)';
				body.number = varData;
				body.color = color2;
				DrawCircle(body.pos.x,body.pos.y,body.radius,color2);
			}
		} else {
			//for(var info=0; info < cityData.length; info++){
				//console.log("cityData[info] = " + contains(cityData,varData));
				if (protectedNode.indexOf(varData) >= 0) {
					//console.log("Protected = " + varData);
					color2 = 'rgba(0, 255, 0, 1)';
				} else if(!contains(cityData,varData)){
					//console.log("Not Hit = " + varData);
					color2 = 'rgba(0, 0, 0, .5)';
				} else if (contains(cityData,varData)) {
					//console.log("Hit = " + varData);
					color2 = 'rgba(255, 0, 0, 1)';
				} 
				body.number = varData;
				body.color = color2;
				DrawCircle(body.pos.x,body.pos.y,body.radius,body.color);
			//}

		}
	}

	function contains(a, obj) {
	    for (var i = 0; i < a.length; i++) {

	        if (parseInt(a[i]) === parseInt(obj)) {
	        	//console.log("Contains = " + a[i] + " obj = " + obj);
	            return true;
	        }
	    }
	    return false;
	}

	function drawSpring(spring){
		DrawLine(spring.masses[0].pos,spring.masses[1].pos,spring.color);
	}

	function DrawCircle(x,y,radius,color){
		context.fillStyle = color;
		context.beginPath();
		context.arc(x, y, radius, 0, Math.PI*2, true);
		context.closePath();
		context.fill();
	}

	function DrawBox(x,y,width,height){
		context.beginPath();
		context.rect(x,y,width,height);
		context.stroke();
		context.closePath();
	}

	function DrawLine(pos0,pos1,color){
	  context.strokeStyle = color; // red
	  context.fillStyle   = color; // blue
	  context.lineWidth   = 2;
	  context.beginPath();
	  context.moveTo(pos0.x,pos0.y);
	  context.lineTo(pos1.x,pos1.y);
	  context.stroke();
	  context.closePath();
	}

	function RunPhysics(){
		timer = setInterval(updateParticles(null),20);
  	}
  	
  	function ResetTimer(){
	    if(timer!== null){
	      clearInterval(timer); 
	      timer = null;
	    }
  	}

  	
	function unique(value, index, self) { 
	//console.log("self=" + self + " index=" + index + " value=" + value);
	//console.log("self.indexOf(value) = " + self.indexOf(value));
	//console.log(self.indexOf(value) === index);
    return self.indexOf(value) === index;
	}
