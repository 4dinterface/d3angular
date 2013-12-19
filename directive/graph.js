var docsSimpleDirective=angular.module('docsSimpleDirective', [])
  .directive('myCustomer', function($compile) {
    return {
	restrict: 'E',

        scope:{
            data:"="
        },
        
	transclude: true,

	compile: function(tElement, tAttrs, transclude){
            return{
                post: function postLink(scope, iElement, iAttrs, controller){	          
                    transclude(scope);
	        }
            };
	},

	controller:function($scope,$element){            

            var margin = {top: 20, right: 20, bottom: 30, left: 40},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

		
            var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .1);
		
            var y = d3.scale.linear()
                    .range([height, 0]);
		            	
            //добавим SVG
            var svg = d3.select($element[0]).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
	  	.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");		
        
            //Изменились данные для отображения пересчитаем ось
            $scope.$watch('data',function(){
                x.domain($scope.data.map(function(d) { return d.letter; }));
                y.domain([0, d3.max($scope.data, function(d) { return d.frequency; })]);				                    		      
            });
		
            //экспортируем данные в scope
            $scope.x=x; //ось X
            $scope.y=y; //ось Y               		
            $scope.width=width;
            $scope.height=height;		
            $scope.svg=svg; //контекст в котором рисуем		            
            
        }		
    }
})


