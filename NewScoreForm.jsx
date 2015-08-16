NewScoreForm = ReactMeteor.createClass({
  getMeteorState:function(){
    // Nothing to do here, because we don't know
    // which record will be edited or created
  },
  getInitialState:function(){
    // a new empty record
    return{
      score:{
        score:'',
        date:moment().format('YYYY-MM-DD'),
        time:moment().format('HH:mm'),
        opponent:'',
        location:'',
        position:null,
        weather:'Sunny',
        wind:0,
      }
    };
  },
  onPictureTaken:function(data){
    console.log("Photo taken");
    var newScore = this.state.score;
    newScore.photo = data;
    this.setState({
      score:newScore
    });
  },
  onChange:function(id, value){
    var newScore = this.state.score;
    if(id==='newScore'){
      newScore.score=value;
    }else if(id==='newDate'){
      newScore.date=value;
    }else if(id==='newTime'){
      newScore.time=value;
    }else if(id==='newOpponent'){
      newScore.opponent=value;      
    }else if(id==='newLocation'){
      newScore.location=value;
    }else if(id==='newPosition'){
      newScore.position=value;
    }else if(id==='newWeather'){
      newScore.weather=value;
    }else if(id==='newWind'){
      newScore.wind=value;
    }
    this.setState({
      score:newScore
    });
  },
  componentWillReceiveProps(nextProps){
    if(nextProps.editScore){
      // TODO: Make sure the id is correct, error otherwise
      var score = Scores.findOne({_id:nextProps.editScore},{reactive:false});
      score.date = moment(score.date).format('YYYY-MM-DD');
      score.time = moment(score.time).format('HH:mm');
      this.setState({score:score});
    }
  },
  cancel:function(){
    this.props.newScoreCallback(this.state.score, true);
    // we might want to keep the last entries...
    this.resetScore();
  },
  resetScore:function(){
    var resetScore = this.getInitialState();
    this.setState(resetScore);
  },
  submit:function(){
    this.props.newScoreCallback(this.state.score, false);
    this.resetScore();
  },
  render:function(){
    if(this.props.visible===false){
      return(
        <div/>
      );
    }
    if(this.props.editScore && this.state.score.score===''){
      console.log("No data to edit, waiting for mongo... The id = " + this.props.editScore);
      return(
        <div/>
      );      
    }
    // I don't quite get the difference between Controlled and Uncontrolled
    // perhaps because I am using state anyway?
    return(
      <form className={this.props.visible}>
        <div className="firstEntry">
          <label htmlFor="newScore"><img src={this.props.sport.measureIcon} alt="score"/></label>
          <ControlledInput 
            id="newScore" 
            type={this.props.sport.type||this.props.sport.measure}
            step={this.props.sport.step} // defines the granularity
            value={this.state.score.score}
            onChange={this.onChange}
            autoFocus={true}
            autoSubmit={false} />
        </div>
        <div>
          <label htmlFor="newDate"><img src="Calendar.png" alt="date"/></label>
          <ControlledInput
            id="newDate" 
            className=""
            type="date"
            value={this.state.score.date}
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false} />
        </div>
        <div>
          <label htmlFor="newTime"><img src="Stopwatch.png" alt="time"/></label>
          <ControlledInput
            id="newTime" 
            className=""
            type="time"
            step={60} // only minutes, no seconds
            value={this.state.score.time}
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false} />
        </div>
        <div>
          <label htmlFor="newOpponent"><img src="Opponent.png" alt="opponent(s)"/></label>
          <ControlledInput
            className=""
            id="newOpponent" 
            type="text"
            value={this.state.score.opponent}
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false} />
        </div>
        <div>
          <label htmlFor="newLocation"><img src="GPS.png" alt="location"/></label>
          <ControlledInput
            className=""
            id="newLocation" 
            type="text"
            value={this.state.score.location}
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false} />
        </div>
        <div>
          <label htmlFor="newPosition"><img src="Position.png" alt="position"/></label>
          <ControlledInput
            id="newPosition" 
            type="number"
            min={1}
            step={1}
            value={this.state.score.position}
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false} />
        </div>
        <div>
          <label htmlFor="newWeather"><img src="Weather.png" alt="weather"/></label>
          <ControlledRadio
            id="newWeather" 
            radioName="weather"
            className="inlineImgLabel"
            value={this.state.score.weather}
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false}          
            options={[
              {
                value:'Sunny',
                img:'Sunny.png'
              },
              {
                value:'Cloud-Sun',
                img:'Cloud-Sun.png'
              },
              {
                value:'Cloudy',
                img:'Cloudy.png'
              },
              {
                value:'Rain',
                img:'Rain.png'
              },
              {
                value:'Snow',
                img:'Snow.png'
              },
              {
                value:'Thunder',
                img:'Thunder.png'
              },
              {
                value:'Tornado',
                img:'Tornado.png'
              }
            ]}
            />
        </div>
        <div>
          <label htmlFor="newWind"><img src="Wind.png" alt="wind"/></label>
          <ControlledInput
            id="newWind" 
            type="number"
            step="0.5"
            value={this.state.score.wind}
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false} />
        </div>
        <Photo onPictureTaken={this.onPictureTaken}/>
        <button>
          <img src="Save.png" onClick={this.submit}/>
        </button>
        <button>
          <img src="Delete.png" onClick={this.cancel}/>
        </button>
      </form>
    );
  }
});
