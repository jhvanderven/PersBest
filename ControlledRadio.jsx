ControlledRadio = ReactMeteor.createClass({
  getInitialState:function(){
    return{
      value: this.props.value || ''
    };
  },

  render: function() {
    var options=[];
    var that=this;
    // make the radio go away and use the picture
    // see the css for necessary functionality:
    /*
      label>input{
        visibility: hidden;
        position: absolute;
      }

      label > input:checked + img{
        background-color: lightblue;
      }
    */

    this.props.options.forEach(function(option){
      var checked = that.state.value === option.value;
      options.push(
        <label key={option.value}>
          <input
            type="radio" 
            name={that.props.radioName} 
            value={option.value} 
            defaultChecked={checked}/>
          <img src={option.img}/>
        </label>
        );
    });
    return (
      <div
        className={this.props.className}
        id={this.props.id}
        value={this.state.value}
        autoFocus={this.props.autoFocus}
        autoSubmit={this.props.autoSubmit}
        onChange={this._onChange}>
          {options}
      </div>
    );
  },

  _onChange: function(/*object*/ event) {
    // directly save the change as this is a "complete" event, unlike entering text
    console.log(event.target.value);
    this.props.onChange(this.props.id, event.target.value);
    this.setState({
      value: event.target.value
    });
  },
});
