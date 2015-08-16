Score = ReactMeteor.createClass({
  delete:function(id){
    console.log("About to delete " + id);
    Meteor.call("deleteScore", id);
  },
  editScore:function(id){
    console.log("about to edit" + id);
    console.log(this.props);
    this.props.editScore(id);
  },
  render:function(){
    // I'd rather have date as days: use the fromNow() of moment to make it human
    var wind = (this.props.score.wind<3)?'right goodWind':'right badWind';
    var positionIcon;
    if(this.props.score.position===undefined||this.props.score.position===null){
      positionIcon = "Warning.png";
    }else{
      var position = Number(this.props.score.position);
      if(position===1){
        positionIcon = 'Medal.png';
      }else if(position<4){
        positionIcon="Victory.png";
      }else{
        positionIcon="Lower.png";            
      }
    }
    var score;
    if(this.props.sport.measure==='time'){
      var duration = moment.duration(this.props.score.score, this.props.sport.scoreFormat);
      score = moment.utc(duration.asMilliseconds()).format(this.props.sport.displayFormat);
    }else{
      score = this.props.score.score;
    }
    // var opponents = this.props.score.opponent;
    // var splittedOpponents = opponents.split(' ');
    // var opponentHTML='';
    // splittedOpponents.forEach(function(opp){
    //   opponentHTML=opponentHTML+opp
    // });
    var photoClass = (this.props.score.photo!==undefined&&this.props.score.photo!==null&&this.props.score.photo!=='Camera.png')?'pictureTaken':'';
    return(
      <tr key={this.props.score.date}>
        <td className="right"><div className="mouseChange" onClick={this.editScore.bind(null, this.props.score._id)}>{score}</div></td>
        <td className="center"><img src={positionIcon} /></td>
        <td className="center">{this.props.score.position}</td>
        <td>{this.props.score.opponent}</td>
        <td>{this.props.score.location}</td>
        <td>{moment(this.props.score.date).format('l')}<br/>{moment.utc(this.props.score.time).format('HH:mm')}</td>
        <td><img src={this.props.score.weather+".png"} alt={this.props.score.weather}/></td>
        <td className={wind}>{this.props.score.wind}</td>
        <td><img src={this.props.score.photo||"Camera.png"} className={photoClass}/></td>
        <td><img src='Delete.png' className="mouseChange" onClick={this.delete.bind(null, this.props.score._id)}/></td>
      </tr>
    );
  }
});
