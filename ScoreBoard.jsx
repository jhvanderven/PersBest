ScoreBoard=ReactMeteor.createClass({
  templateName:"ScoreBoard",
  startMeteorSubscriptions: function() {
    Meteor.subscribe("sports");
  },
  getMeteorState:function(){
    // console.log("Finding the sports");
    return {
      sports: Sports.find({}).fetch()
    };
  },
  getInitialState:function(){
    return({addSport:false});
  },
  addSport:function(){
    this.setState({addSport:true});
  },
  onPictureTaken:function(data){
    console.log("Photo taken");
  },
  onDeleteSport:function(sport_id){
    Meteor.call("deleteSport", sport_id);
  },
  newSport:function(sport, canceled){
    // called from NewSportForm
    console.log(sport);
    console.log(canceled);
    if(!canceled){
      Meteor.call("addSport", sport);
    }
    this.setState({
      addSport:false
    });
  },
  render: function(){
    // console.log("Rendering scoreboard");
    var children = [];
    var that = this;
    this.state.sports.forEach(function(sport){
      children.push(
        <Sport sport={sport} key={sport._id} onDeleteSport={that.onDeleteSport}/>
      );
    });
    if(this.state.addSport===false){
      return(
        <div>
          {children}
          <hr/>
          <img src='Add-New.png' title="Add a new sport" className="mouseChange" onClick={this.addSport}/>
          <Photo onPictureTaken={this.onPictureTaken}/>
        </div>
      );
    }else{
      return(
        <div>
          {children}
          <hr/>
          <NewSportForm newSportCallback={this.newSport}/>
        </div>
      );
    }
  }
});
