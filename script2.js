angular.module('docsSimpleDirective', [])
  .controller('Ctrl', function($scope) {

	$scope.data=[
		{letter:	"A", frequency:0.08167},
		{letter:	"B", frequency:0.01492},
		{letter:	"C", frequency:0.02782},
		{letter:	"D", frequency:0.04253},
		{letter:	"E", frequency:0.62702},
		{letter:	"F", frequency:0.02288},
		{letter:	"G", frequency:0.02015},
		{letter:	"H", frequency:0.06094},
		{letter:	"I", frequency:0.06966},
		{letter:	"J", frequency:0.00153},
		{letter:	"K", frequency:0.00772},
		{letter:	"L", frequency:0.04025},
		{letter:	"M", frequency:0.02406},
		{letter:	"N", frequency:0.06749},
		{letter:	"O", frequency:0.07507},
		{letter:	"P", frequency:0.01929},
		{letter:	"P", frequency:0.00095},
		{letter:	"R", frequency:0.05987},
		{letter:	"S", frequency:0.06327},
		{letter:	"T", frequency:0.09056},
		{letter:	"U", frequency:0.02758},
		{letter:	"X", frequency:0.00150},
		{letter:	"Y", frequency:0.01974},
		{letter:	"Z", frequency:0.00074}
    ]

	//2000
    setTimeout(function(){
	    $scope.$apply(function(){
			$scope.data[0].frequency=0.01167;
			$scope.data[1].frequency=0.02167;
			$scope.data[2].frequency=0.03167;
			$scope.data[3].frequency=0.04167;
			$scope.data[4].frequency=0.05167;
			$scope.data[5].frequency=0.06167;
		});
    },2000);

	//4000
    setTimeout(function(){
	    $scope.$apply(function(){
			$scope.data=[
				{letter:	"U", frequency:0.02758},
				{letter:	"X", frequency:0.00150},
				{letter:	"Y", frequency:0.01974},
				{letter:	"Z", frequency:0.00074}
			];
		});
    },4000)

  })

  .directive('myCustomer', function() {
    return {
      scope:{
          data:"="
      },
	  controller:function($scope,$element){
		$scope.svg="1200";

		var margin = {top: 20, right: 20, bottom: 30, left: 40},
		    width = 960 - margin.left - margin.right,
		    height = 500 - margin.top - margin.bottom;

		
		var x = d3.scale.ordinal()
		    .rangeRoundBands([0, width], .1);
		
		var y = d3.scale.linear()
		    .range([height, 0]);
		
		var xAxis = d3.svg.axis()
		    .scale(x)
		    .orient("bottom");
		
		var yAxis = d3.svg.axis()
		    .scale(y)
		    .orient("left")
		    .ticks(10, "%");//на сколько частей бьем
		
		//добавим SVG
		var svg = d3.select($element[0]).append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");		

		$scope.svg="12";

//========================================================//

			var bar=svg.selectAll(".bar");
			bar.data($scope.data);
	
			//сдесь будем хранить подписчики
			var watchFunc=[];	
	
	        //реакция на добавлние новых столбцов
			$scope.$watch('data',function(){
	
	          //удалим старые watchers
			  watchFunc.forEach(function(f){ f() });
			  watchFunc=[];
	
			  //удалим элементы с экрана
			  svg.selectAll(".bar").remove();
			  svg.selectAll(".axis").remove();
	
			  x.domain($scope.data.map(function(d) { return d.letter; }));
			  y.domain([0, d3.max($scope.data, function(d) { return d.frequency; })]);
			
			  //рисуем xAxis
			  svg.append("g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + height + ")")
			      .call(xAxis);
			
			  //рисуем yAxis
			  svg.append("g")
			      .attr("class", "y axis")
			      .call(yAxis)
			    //текст вдоль оси Y
			    .append("text")
			      .attr("transform", "rotate(-90)")
			      .attr("y", 6)
			      .attr("dy", ".71em")
			      .style("text-anchor", "end")		
			      .text("Frequency");
	
				renderBar(bar);
						    
	        });//watch data;	

			/**
			 * @name bar
			 * Рисуем бары
			 */
			function renderBar(bar){
				//рисуем bar
		      	bar.data($scope.data)
			    .enter().append("rect")
				.each(function(a,b,c) { 
					var sel=d3.select(this)
					    .attr("y", function(d) { return height})
					    .attr("height", 0)
						.attr("class", "bar")
					    .attr("x", function(d) { return x(d.letter); })
					    .attr("width", x.rangeBand());
	
					watchFunc.push( 
						$scope.$watchCollection('data['+b+']',function(){
							sel.transition().duration(250)
							    .attr("y", function(d) { return y(d.frequency); })
							    .attr("height", function(d) { return height - y(d.frequency); })
						})								
					)//push
	
				});//each			
			}	


//========================================================//


      }
		
	}
  })


  .directive('bar', function() {	
	return {
		restrict: 'E',
		scope:{
			svg:"="
		},
		require: '^myCustomer',

//		transclude: true,

		controller:function($scope){

			$scope.$watch('svg',function(){
				console.log($scope.svg);
			});

	
	
			//бары

	
		}
	}
  })