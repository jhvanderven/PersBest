NewSportForm = ReactMeteor.createClass({
  getInitialState:function(){
    return{
      sport:{
        name:''
        , sportIcon:'Athletics'
        , measureIcon:'Stopwatch'
        , betterIcon:'Lower'
        , useHours:false
        , useMinutes:false
        , useSeconds:false
        , useMillis2:false
        , useMillis3:false
      }
    };
  },
  onChange:function(id, value){
    console.log(id, value);
    var newSport = this.state.sport;
    if(id==='newName'){
      newSport.name = value;
    }else if(id==='newSportIcon'){
      newSport.sportIcon = value;
    }else if(id==='newMeasureIcon'){
      newSport.measureIcon = value;
    }else if(id==='newBetterIcon'){
      newSport.betterIcon = value;
    }else if(id==='newDisplayFormatHours'){
      newSport.useHours = value;
    }else if(id==='newDisplayFormatMinutes'){
      newSport.useMinutes = value;
    }else if(id==='newDisplayFormatSeconds'){
      newSport.useSeconds = value;
    }else if(id==='newDisplayFormatMillis2'){
      newSport.useMillis2 = value;
    }else if(id==='newDisplayFormatMillis3'){
      newSport.useMillis3 = value;
    }
    this.setState({
      sport:newSport
    });
  },
  cancel:function(){
    this.props.newSportCallback(this.state.sport, true);
  },
  submit:function(){
    this.props.newSportCallback(this.state.sport, false);
    // Reset the fields to default values
    var resetSport = this.getInitialState();
    this.setState(resetSport);
  },
  render:function(){
    if(this.props.visible===false){
      return(
        <div/>
      );
    }
    return(
      <form className={this.props.visible}>
        <div className="firstEntry">
          <label htmlFor="newName"><img src="Victory.png" alt="score"/></label>
          <ControlledInput 
            id="newName" 
            type="text"
            value={this.state.sport.name}
            onChange={this.onChange}
            autoFocus={true}
            autoSubmit={false} />
        </div>
        <div>
          <label htmlFor="newSportIcon"><img src="Sports.png"/></label>
          <ControlledRadio
            id="newSportIcon" 
            radioName="sport"
            className="inlineImgLabel"
            value={this.state.sport.sportIcon}
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false}          
            options={[
              {
                value:'Athletics',
                img:'Athletics.png'
              },
              {
                value:'Badminton',
                img:'Badminton.png'
              },
              // {
              //   value:'Baseball',
              //   img:'Baseball.png'
              // },
              // {
              //   value:'Basketball',
              //   img:'Basketball.png'
              // },
              {
                value:'Bike-Racing',
                img:'Bike-Racing.png'
              },
              {
                value:'Bowling',
                img:'Bowling.png'
              },
              {
                value:'Car-Racing',
                img:'Car-Racing.png'
              },
              {
                value:'Cards',
                img:'Cards.png'
              },
              {
                value:'Chess',
                img:'Chess.png'
              },
              {
                value:'Cycle-Race',
                img:'Cycle-Race.png'
              },
              {
                value:'Darts',
                img:'Darts.png'
              },
              {
                value:'Golf',
                img:'Golf.png'
              },
              {
                value:'Gymnastics',
                img:'Gymnastics.png'
              },
              {
                value:'High-Jump',
                img:'High-Jump.png'
              },
              // {
              //   value:'Hockey',
              //   img:'Hockey.png'
              // },
              {
                value:'Hurdling',
                img:'Hurdling.png'
              },
              {
                value:'Javelin-Throw',
                img:'Javelin-Throw.png'
              },
              {
                value:'Long-Jump',
                img:'Long-Jump.png'
              },
              {
                value:'Run',
                img:'Run.png'
              },              
              {
                value:'Skating',
                img:'Skating.png'
              },
              {
                value:'Shoe',
                img:'Shoe.png'
              },
              {
                value:'Ski',
                img:'Ski.png'
              },
              // {
              //   value:'Soccer',
              //   img:'Soccer.png'
              // },
              {
                value:'Swim',
                img:'Swim.png'
              },
              {
                value:'Table-Tennis',
                img:'Table-Tennis.png'
              },
              {
                value:'Tennis',
                img:'Tennis.png'
              },
              {
                value:'Weight-Lifting',
                img:'Weight-Lifting.png'
              }
            ]}
          />
        </div>
        <div>
          <label htmlFor="newMeasureIcon"><img src="Position.png"/></label>
          <ControlledRadio
            id="newMeasureIcon" 
            radioName="measurement"
            className="inlineImgLabel"
            value={this.state.sport.measureIcon}
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false}          
            options={[
              {
                value:'Stopwatch',
                img:'Stopwatch.png'
              },
              {
                value:'Measuring-Tape',
                img:'Measuring-Tape.png'
              },
              {
                value:'Points',
                img:'Points.png'
              },
              {
                value:'Weight',
                img:'Weight.png'
              },
              {
                value:'Soccer',
                img:'Soccer.png'
              }
            ]}
          />
        </div>
        <div>
          <label htmlFor="newBetterIcon"><img src="Thumbs-Up.png"/></label>
          <ControlledRadio
            id="newBetterIcon" 
            radioName="better"
            className="inlineImgLabel"
            value={this.state.sport.betterIcon}
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false}          
            options={[
              {
                value:'Higher',
                img:'Higher.png'
              },
              {
                value:'Lower',
                img:'Lower.png'
              },
              {
                value:'Soccer',
                img:'Soccer.png'
              }
            ]}
          />
        </div>
        <div>
          <label htmlFor="newDisplayFormatHours"><img src="Stopwatch.png"/></label>
          <ControlledCheckbox
            id="newDisplayFormatHours" 
            name="displayFormat"
            checked={this.state.sport.useHours}
            text="HH"
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false}          
          />
          <ControlledCheckbox
            id="newDisplayFormatMinutes" 
            name="displayFormat"
            checked={this.state.sport.useMinutes}
            text="mm"
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false}          
          />
          <ControlledCheckbox
            id="newDisplayFormatSeconds" 
            name="displayFormat"
            checked={this.state.sport.useSeconds}
            text="ss"
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false}          
          />
          <ControlledCheckbox
            id="newDisplayFormatMillis2" 
            name="displayFormat"
            checked={this.state.sport.useMillis2}
            text="SS"
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false}          
          />
          <ControlledCheckbox
            id="newDisplayFormatMillis3" 
            name="displayFormat"
            checked={this.state.sport.useMillis3}
            text="SSS"
            onChange={this.onChange}
            autoFocus={false}
            autoSubmit={false}          
          />
        </div>
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
