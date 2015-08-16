/**
 * Port of the Personal Best app to use React for rendering.
 *
 * This directive is necessary to enable preprocessing of JSX tags:
 * @jsx React.DOM
 */
Scores = new Meteor.Collection('scores');
Sports = new Meteor.Collection('sports');

if (Meteor.isServer) {
  Meteor.startup(function () {
    var names = [{name:"60m", step:0.01, scoreFormat: 'mm:ss.SSS', displayFormat: 'ss.SS'},
                 {name:"100m",step:0.01, scoreFormat: 'mm:ss.SSS', displayFormat: 'ss.SS'},
                 {name:"400m",step:0.1, scoreFormat: 'mm:ss.SSS', displayFormat: 'mm:ss.SS'},
                 {name:"800m",step:0.1, scoreFormat: 'mm:ss.SSS', displayFormat: 'mm:ss'},
                 {name:"1500m",step:1, scoreFormat: 'mm:ss', displayFormat: 'mm:ss'},
                 {name:"5000m",step:1, scoreFormat: 'HH:mm:ss.SSS', displayFormat: 'hh:mm:ss'}];
    if (Sports.find().count() === 0){
      console.log("adding sports");
      for (var i = 0; i < names.length; i++) {
        Sports.insert({
          name:names[i].name,
          sportIcon:'Shoe.png',
          measureIcon:'Stopwatch.png',
          betterIcon:'Lower.png',
          sport:'running',
          measure:'time',
          betterIsLess: true,
          scoreFormat: names[i].scoreFormat,
          displayFormat: names[i].displayFormat,
          step:names[i].step
          // more fields here like world records, what is better, unit, etc
        });
      }
    }
  });

  // Publish the scores and the sports
  // TODO: On a per logged in user basis
  Meteor.publish("scores", function() {
    return Scores.find({});
  });
  Meteor.publish("sports", function(){
    return Sports.find({});
  });
}

Meteor.methods({
  addScore:function(sport_id, score, score_id){
    var update = false;
    if(score_id===undefined || score_id === null){
      console.log("Adding a score to " + sport_id);
    }else{
      console.log("Editing score: " + score_id);
      update = true;
    }
    if(typeof score.date === "string"){
      // we got to get the millis of this string
      score.date = new Date(score.date).getTime();
    }
    if(typeof score.time === "string"){
      // we got to get the millis of this string
      score.time = moment.duration(score.time).asMilliseconds();
    }
    console.log(score);
      Scores.upsert(
        {
          _id:score_id
        },
        {
          $set:
          {
            sport_id: sport_id,
            score: score.score,
            weather: score.weather,
            location:score.location,
            opponent:score.opponent,
            date:score.date,
            time:score.time,
            position: score.position,
            wind:score.wind,
            photo:score.photo
          }
        }
      );
    // }
  },
  addSport:function(sport){
    console.log("Adding a sport");
    console.log(sport);
    var betterIsLess = (sport.betterIcon==='Lower')?true:false;
    var doc = {
        name:sport.name,
        sportIcon:sport.sportIcon+".png",
        measureIcon:sport.measureIcon+".png",
        betterIcon:sport.betterIcon+".png",
        betterIsLess:betterIsLess
    };
    if(sport.measureIcon==='Stopwatch'){
      doc.measure='time';
      doc.type='time';
      doc.step = 1; // will be overridden below
    }else if(sport.measureIcon==='Measuring-Tape'){
      doc.measure='length';
      doc.type='number';
      doc.step = 0.01;
    }else if(sport.measureIcon==='Points'){
      doc.measure='points';
      doc.type='number';
      doc.step = 1;
    }else if(sport.measureIcon==='Soccer'){
      doc.measure='result'; // pffff
      doc.type='text';
    }else if(sport.measureIcon==='Weight'){
      doc.measure='weight';
      doc.type='number'
      doc.step=1;
    }
    if(doc.measure==='time'){
      var displayFormat='', scoreFormat='hh:mm:ss.', step;
      // construct the format strings and the step based on the check boxes
      if(sport.useHours){
        displayFormat+='hh:';
        step = 60*60;
      }
      if(sport.useMinutes){
        displayFormat+='mm:';
        step = 60;
      }
      if(sport.useSeconds){
        displayFormat+='ss.';
        step = 1
      }
      if(sport.useMillis2){
        displayFormat+='SS.';
        scoreFormat+='SS.';
        step = .01
      }
      if(sport.useMillis3){
        displayFormat+='SSS.';
        scoreFormat+='SSS.';
        step = .001
      }
      doc.displayFormat = displayFormat.slice(0,-1); // remove last character
      doc.scoreFormat = scoreFormat.slice(0,-1); // remove last character
      doc.step = step;
    }
    // a document tailored to the settings
    console.log(doc);
    Sports.insert(doc);    
  },
  deleteSport:function(sport_id){
    console.log("Removing sport");
    console.log(sport_id);
    // first remove the scores
    Scores.remove({
      sport_id:sport_id
    });
    // then remove the sport itself
    Sports.remove({
      _id:sport_id
    });
  },
  deleteScore:function(score_id){
    console.log("Deleting score " + score_id);
    Scores.remove({
      _id:score_id
    });
  }
});

if(Meteor.isClient){
  Meteor.startup(function(){
    moment.locale("nl");
  });
}
