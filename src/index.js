        "use strict";
        const canvasWidth = 600, canvasHeight = 500;
        let ctx;
        
        let maxIterationSlider, maxIterationOutput, divergenceSlider, divergenceOutput, cSlider, cOutput, fpsSlider, fpsOutput;
        
        let flowers=[];

        let colorStyle = "green";
        let backgroundColor = "black";
        
        let fps = 120;
        let maxIterations, divergence, c;
        
        window.onload = init;
        
        function init(){
            ctx = canvas.getContext("2d");
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            
            ctx.fillRect(0,0,canvasWidth,canvasHeight);
            
            
            maxIterationSlider = document.querySelector("#maxIterationRange");
            maxIterationOutput = document.querySelector("#maxIterations");
            maxIterationOutput.innerHTML = maxIterationSlider.value;
            
            maxIterationSlider.oninput = function() {
                maxIterationOutput.innerHTML = this.value;
                maxIterations = this.value;
            }
            
            divergenceSlider = document.querySelector("#divergenceRange");
            divergenceOutput = document.querySelector("#divergence");
            divergenceOutput.innerHTML = divergenceSlider.value;
            divergenceSlider.oninput = function() {
                divergenceOutput.innerHTML = this.value;
                divergence = this.value;
            }
            
            cSlider = document.querySelector("#cRange");
            cOutput = document.querySelector("#c");
            cOutput.innerHTML = cSlider.value;
            cSlider.oninput = function() {
                cOutput.innerHTML = this.value;
                c = this.value;
            }
            
            fpsSlider = document.querySelector("#fpsRange");
            fpsOutput = document.querySelector("#fps");
            fpsOutput.innerHTML = fpsSlider.value;
            fpsSlider.oninput = function() {
                fpsOutput.innerHTML = this.value;
                fps = this.value;
            }
            
            document.querySelector("#chooserBackgroundColor").onchange = function(e){
                backgroundColor = this.value;
                updateBackground(backgroundColor);
                console.log("changed background to " + backgroundColor);
            };
            
            document.querySelector("#chooserColorStyle").onchange = function(e){
                colorStyle = this.value;
                console.log("changed color to " + colorStyle);
            };
            
            canvas.addEventListener('mousemove', function(evt) {
                var mousePos = getMousePos(canvas, evt);
                var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
                //console.log(message);
                
              }, false);
            
            loop();
            canvas.onclick = canvasClicked;
		}

        function canvasClicked(e){
            let rect = e.target.getBoundingClientRect();
            let mouseX = e.clientX - rect.x;
            let mouseY = e.clientY - rect.y;
            console.log(mouseX,mouseY);
            
            
            //Add canvas click logic here
            
            flowers.push(new Botany(mouseX, mouseY, maxIterations, colorStyle, fps, divergence, c));
            
            
        }
        
        function updateBackground(color)
        {
            ctx.save();
            ctx.fillStyle = color;
            ctx.fillRect(0,0,canvasWidth,canvasHeight);
            ctx.restore();
        }
        
        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
              x: evt.clientX - rect.left,
              y: evt.clientY - rect.top
            };
          }

        class Botany{
            constructor(x,y,maxInterations = 100, color = "green", fps = 120, divergence = 5, c = 4){
                this.x = Number(x);
                this.y = Number(y);
                this.color = color;
                this.maxInterations = Number(maxInterations);
                this.n = 0;
                this.fps = fps;
                
                this.counter = 0; //angle
                this.divergence = divergence;
                this.c = c;
            }
        
            getColorAlgorithm(){
                if(this.color == "hsl")
                    {
                        let aDegrees = (this.n * this.divergence) % 361;
                        return `hsl(${aDegrees},100%,50%)`;
                    }
                else
                    {
                        return this.color;
                    }
            }
            
            drawBotany()
            {
                
                let a = this.n * abcLIB.dtr(this.divergence);
                let r = this.c * Math.sqrt(this.n);
                //console.log(a,r);
                // now calculate the `x` and `y`
                let x = r * Math.cos(a) + this.x;
                let y = r * Math.sin(a) + this.y;
                //console.log(x,y);

                //drawCircle(ctx,x,y,2,"white");
                //let color = `rgb(${n % 256},0,255)`;

                let color = this.getColorAlgorithm();
                abcLIB.drawCircle(ctx,x,y,2,color);
                
                //console.log("print " + this.n);
                this.n++;
            }

    }
        
        function loop(){

            for(var i = 0; i < flowers.length; i++)
                {
                    if (flowers[i].n < flowers[i].maxInterations)
                        {
                            flowers[i].drawBotany();
                        }
                }
            
            setTimeout(loop, 1000/fps);      
        }
