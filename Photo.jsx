Photo=ReactMeteor.createClass({
	getInitialState:function(){
		return({
			photo:'Camera.png',
			photoClass:'mouseChange'
		});
	},
	takePicture:function(event){
		event.preventDefault(); // no refresh
	    var that = this;
	    MeteorCamera.getPicture({}, function(error,data){
	      if(error){
	        alert(error.error);
	      }else{
	        that.props.onPictureTaken(data);
	        that.setState({photo: data, photoClass:'pictureTaken'});
	      }
	    });
	},
	render:function(){
		return(
			<button>
	          <img src={this.state.photo} className={this.state.photoClass} onClick={this.takePicture}/>
	        </button>
        );
	}	
});
