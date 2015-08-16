// Barchart expects a data array with 3 columns:
// date: a date (will be shown as D/M)
// value: a numerical representation of the item to show
// human: a human readable representation of the item to show
//        can be the same as value
//        useful when the value is a duration, such as the time needed to run 400m
BarChart = React.createClass({
	componentDidMount: function(){
		var el = this.getDOMNode();
		var svg = d3.select(el)
			.append("svg")
			.attr("class", "svg"+this.props.name)
			.attr("width", this.props.width)
			.attr("height", this.props.height);
		this.updateChart(this.props);
	},
	componentWillUpdate:function(nextProps){
		this.updateChart(nextProps);
	},
	updateChart:function(props){
		var data = props.data;
		var maximum = Number.MIN_VALUE, minimum = Number.MAX_VALUE;
		data.forEach(function(item){
			if(item.value>maximum){
				maximum = item.value;
			}
			if(item.value<minimum){
				minimum = item.value;
			}
		});
		var yScale = d3.scale.linear()
			.domain([minimum, maximum])
			.range([0, props.height - 35]);
		var xScale = d3.scale.ordinal()
			.domain(d3.range(data.length))
			.rangeRoundBands([0,props.width], 0.05);
		var svg = d3.select(".svg" + this.props.name);
		var bars = svg.selectAll("rect")
			.data(data);
		bars.enter()
			.append("rect")
			.attr("fill", "orange");

		bars.transition()
			.duration(1000)
			.attr("x", function(d,i){
				return xScale(i);
			})
			.attr("y", function(d, i){
				return props.height - yScale(d.value) - 20;
			})
			.attr("width", xScale.rangeBand())
			.attr("height", function(d, i){
				return yScale(d.value);
			});

		bars.exit()
			.remove();

		var yLabels = svg.selectAll(".barchartylabel").data(data);
		yLabels.enter()
			.append("text")
			.attr("class", "barchartylabel")
			.style("stroke","white")
			.style("font-size", "10px")
			.attr("text-anchor","middle");

		yLabels.transition()
			.duration(1000)
			.attr("x", function(d, i){
				return xScale(i) + xScale.rangeBand()/2;
			})
			.attr("y", function(d, i){
				return props.height - yScale(d.value) - 25;
			})
			.text(function(d, i){
				return d.human;
			});
		yLabels.exit().remove();

		var xLabels = svg.selectAll(".barchartxlabel").data(data);
		xLabels.enter()
			.append("text")
			.attr("class", "barchartxlabel");

		xLabels.text(function(d, i){
				return moment(d.date).format("D/M");
			})
			.attr("text-anchor", "middle")
			.style("stroke","white")
			.style("fill", "white")
			.style("font-size", "10px")
			.attr("x", function(d, i){
				return xScale(i) + xScale.rangeBand()/2;
			})
			.attr("y", function(d, i){
				return props.height - 5;
			});
		xLabels.exit().remove();
	},
	render:function(){
		return(
			<div className="barchart"></div>
		);
	}
});
