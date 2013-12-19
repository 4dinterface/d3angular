+function(module){
    var countElement=0;    
    
    module.directive('xaxis', function() {	
        return {
            restrict: 'E',
            require: '^myCustomer',
            controller:function($scope){
                //код внутр watch по сути конструктор
                $scope.$watch('svg',function(){                    
                    setTimeout( function(){
                        new init($scope);
                    },1);
                });			
            }
        }
    })
    
    function init($scope){                
        var me=this;
        this.$scope=$scope;
        this.id="axis"+(countElement++);                
        
        $scope.$watch('data',function(){            
            me.render($scope);
        }); 
        me.render();
    }
    
    var p=init.prototype;    
    
    //перерисуем axis
    p.render=function(){                
        var $scope=this.$scope;
        //удалим старый axis
        $scope.svg.selectAll(".axis."+this.id).remove();
        
        var axis = d3.svg.axis()
            .scale($scope.x)
            .orient("bottom");
    
        //рисуем xAxis
        $scope.svg.append("g")
            .attr("class", "axis "+this.id)
            .attr("transform", "translate(0," + $scope.height + ")")
            .call(axis);
        
    };        
}(docsSimpleDirective);


                //рисуем yAxis
/*                svg.append("g")
                        .attr("class", "y axis")
                        .call(yAxis)
			//текст вдоль оси Y
                        .append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", ".71em")
                        .style("text-anchor", "end")		
                        .text("Frequency");
*/                  