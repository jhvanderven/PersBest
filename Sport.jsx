Sport=ReactMeteor.createClass({
  templateName:"Sport",
  startMeteorSubscriptions: function() {
    Meteor.subscribe("scores");
  },
  getMeteorState:function(){
    // console.log("Finding the scores for " + this.props.sport._id);
    return {
      // without the .fetch() meteor thinks nothing has changed
      scores: Scores.find({"sport_id":this.props.sport._id},{sort: {date:-1}}).fetch()
    };
  },
  getInitialState:function(){
    return({showScores:false, addScore:false, editScore:null});
  },
  deleteSport:function(){
    if(confirm("Delete " + this.props.sport.name + " and all scores?")){
      this.props.onDeleteSport(this.props.sport._id);
    }
  },
  showScores:function(){
    var showIt = !this.state.showScores;
    this.setState({showScores:showIt});
  },
  addScore:function(){
    this.setState({addScore:true});
  },
  editScore:function(id){
    this.setState({editScore:id});
  },
  newScore:function(score, canceled){
    // called from NewScoreForm
    if(!canceled){
      Meteor.call("addScore", this.props.sport._id, score, this.state.editScore);
    }
    this.setState({
      addScore:false,
      editScore:null
    });
  },
  mapScores:function(){
    var data = [];
    var that = this;
    this.state.scores.map(function(d){
      // TODO: convert score to something numeric
      var numericScore = d.score;
      var humanScore;
      if(that.props.sport.measure === "time"){
        var duration = moment.duration(d.score, that.props.sport.scoreFormat);
        humanScore = moment.utc(duration.asMilliseconds()).format(that.props.sport.displayFormat);
        numericScore = duration.valueOf();
      }else if(that.props.sport.measure === null){
        // tennis/soccer/etc...
        numericScore = Number(d.position);
        humanScore = d.score;
      }else{
        numericScore = Number(d.score);
        humanScore = d.score;
      }
      data.push({date:d.date, value:numericScore, human: humanScore});
    });
    return data;
  },
  render: function(){
    var scores = [];
    // console.log(this.state.scores.fetch());
    var that = this;
    if(this.state.showScores){
      this.state.scores.forEach(function(score){
        // console.log(score);
        scores.push(
          <Score 
            key={score._id} 
            score={score} 
            sport={that.props.sport}
            editScore={that.editScore}>
          </Score> 
          );
      });
    }
    var showScoreClass = (this.state.showScores)?'':"donotshow";
    var showNewScore = (this.state.addScore)?'':"donotshow";
    return(
      <div className="padding">
        <img src='Add-New.png' className="mouseChange" onClick={this.addScore}/>
        <img src={this.props.sport.sportIcon}/>
        <img src={this.props.sport.measureIcon}/>
        <img src={this.props.sport.betterIcon}/>
        <img src="Delete.png" className="mouseChange" onClick={this.deleteSport}/>
        <h2 className="mouseChange" onClick={this.showScores}>{this.props.sport.name}</h2>
        <BarChart data={this.mapScores()} width={400} height={100} name={this.props.sport.name}/>
        <NewScoreForm
          visible={this.state.addScore || this.state.editScore!==null}
          sport={this.props.sport}
          newScoreCallback={this.newScore}
          editScore={this.state.editScore}
        />
        <table className={showScoreClass}>
          <tr>
            <th><img src={this.props.sport.measureIcon}/></th>
            <th><img src="Victory.png"/></th>
            <th><img src="Position.png"/></th>
            <th><img src="Opponent.png"/></th>
            <th><img src="GPS.png"/></th>
            <th><img src="Calendar.png"/></th>
            <th><img src="Weather.png"/></th>
            <th><img src="Wind.png"/></th>
            <th><img src="Camera.png"/></th>
            <th><img src="Delete-Gray.png"/></th>
          </tr>
          {scores}
        </table>
      </div>
    );
  }
});
