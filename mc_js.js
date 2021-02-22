		//chronometre
			var startTime = 0
			var start = 0
			var end = 0
			var diff = 0
			var timerID = 0
			function chrono(){
				end = new Date()
				diff = end - start
				diff = new Date(diff)
				var msec = diff.getMilliseconds()
				var sec = diff.getSeconds()
				var min = diff.getMinutes()
				var hr = diff.getHours()-1
				if (min < 10){
					min = "0" + min
				}
				if (sec < 10){
					sec = "0" + sec
				}
				if(msec < 10){
					msec = "00" +msec
				}
				else if(msec < 100){
					msec = "0" +msec
				}
				document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + sec + ":" + msec
				timerID = setTimeout("chrono()", 10)
			}
			function chronoStart(){
				document.pile.onclick = chronoStop
				start = new Date()
				chrono()
			}
			function chronoContinue(){
				document.pile.onclick = chronoStop
				start = new Date()-diff
				start = new Date(start)
				chrono()
			}
			function chronoReset(){
				document.getElementById("chronotime").innerHTML = "0:00:00:000"
				start = new Date()
			}

			function chronoStopReset(){
				document.getElementById("chronotime").innerHTML = "0:00:00:000"
				document.pile.onclick = chronoStart
			}
			function chronoStop(){
				document.pile.onclick = chronoContinue
				clearTimeout(timerID)
			}	
		
//______________________________________________________________________________________________________________________________________//		
                        
          
			var score=0;
			var pts=2;
			var result=document.getElementById("score");
			var isStarted=false;
            var cartevent=null;
			var carte1=null;
            var carte2=null;
			var game=document.getElementsByTagName("div");
			
            const cards = document.querySelectorAll('.memory-card');
                        
               
                for(i=0;i<game.length;i++)
				{
					game[i].addEventListener("click",function(event){
							cartePositionManager(event);							
							result.innerHTML=score;						
					});	
				}
	          
                async function cartePositionManager(event)
				{
                            if(carte1 === null){
                                carte1 = flipCard(event);
								console.log(event)
								if(isStarted===false){
									chronoStart();
									isStarted=true;
								}
                                cartevent=event;
                            }
                            else{
                                carte2 = flipCard(event);
                            }
			
                            if(carte1 === carte2){								
								score+=pts;
                                resetBoard(); 
                            }
                            else if(carte1 !== null && carte2 !== null && carte1!==carte2){
                                await sleep(1000);
                                flipCard(event);
                                flipCard(cartevent);
                                resetBoard(); 
                            }
							
							if(score===18){
							    result.innerHTML=score;
								chronoStop();
								alert("Felicitations, vous avez gagné");
							}							
				}
             			 
                function resetBoard()
				{
                   carte1 =null;
                   carte2 =null;
                   cartevent=null;
                }				
               
               function sleep(ms) 
			   {
                  return new Promise(resolve => setTimeout(resolve, ms));
               }
				               
                function flipCard(event){
                    var etats = event.target.offsetParent.children;
                    for(i=0 ; i<etats.length ; i++){
						if(etats[i].style.visibility === "visible"){
							etats[i].style.visibility = "hidden";
						}
						else{
							etats[i].style.visibility = "visible";
						}
                    }
                    return event.target.getAttribute("alt");
                }
				
				
				 (function shuffle() {
					   cards.forEach(card => {
						 let ramdomPos = Math.floor(Math.random()*18);
						 card.style.order = ramdomPos;
					   });
					 })();