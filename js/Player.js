class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name=null;
  }

  getCount(){
    //refer to the playerCount in firebase
    var playerCountRef = database.ref('playerCount');
    //watch the value in playerCount
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    //update the playerCount in the main branch of the Firebase
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    //create the object for the player information
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      //save the name and the distance of the player
      name:this.name,
      distance: this.distance
    });

    
  }
  static getPlayerInfo(){
    //get the info for all the players
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}
