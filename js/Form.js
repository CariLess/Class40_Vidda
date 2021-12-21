class Form {
  constructor() {
    //creating a log in interface for the player.
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h3');
    this.title = createElement('h2');
    this.reset= createButton('Reset');
  }

  hide() {
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }
  display() {

    this.title.html("Juego de Carreras de Autos");
    this.title.position(displayWidth/2 - 50, 0);



    this.input.position(displayWidth/2 - 40, displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.reset.position(displayWidth-100, 20);

    //event to hide the form when play button is pressed
    this.button.mousePressed(() => {
      this.button.hide();
      this.input.hide();

      //ingress the name of the player
      player.name = this.input.value();
      
      //increase the number of player 
      playerCount += 1;
      player.index = playerCount;
      //update the player information
      player.update();
      player.updateCount(playerCount);

      //greeting the player
      this.greeting.html("Hola " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });
    
    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
    })
  }
}
