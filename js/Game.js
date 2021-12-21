class Game {
  constructor() { }

  //read de state of the game from the database
  getState() {

    var gameStateRef = database.ref('gameState');
    //watch de gameState from firebase
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  //Update the gamestate 
  update(state) {
    //update the reference of the database at the main branch.
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      //create new objects (players)
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form()
      form.display();
    }
    car1 = createSprite(100, 200);
    car1.addImage("car1", car1Img);
    car2 = createSprite(300, 200);
    car2.addImage("car2",car2Img);
    car3 = createSprite(500, 200);
    car3.addImage("car3",car3Img);
    car4 = createSprite(700, 200);
    car4.addImage("car4",car4Img);
    cars = [car1, car2, car3, car4];
  }



  play() {
    form.hide();

    Player.getPlayerInfo();

    if (allPlayers !== undefined) {
      background("#c668767");
      image(track, 0, -displayHeight*4, displayWidth, displayHeight*5);
      var index = 0;
      var x = 175;
      var y;

      //Follow the current player
      for (var plr in allPlayers) {
        
        index = index + 1;

        //increase x
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        //Color the current player in red and follow with the camera
        if (index === player.index) {
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index - 1].y;
        }
        // else
        // cars[index-1].shapeColor = black; 

        // textSize(15);
        // text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120, display_position);
      }
    }

    //move the car of the player
    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 50;
      player.update();
    }
    
    if(player.distance > 3860){
      gameState = 2;
    }
    drawSprites();
  }

  end(){
    console.log("Game ended");
  }
}
