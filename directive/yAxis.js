+function(module){
    module.directive('yaxis', function() {	
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
        $scope.svg.selectAll(".y.axis").remove();
        
        var yAxis = d3.svg.axis()
            .scale($scope.y)
            .orient("left")
            //.orient("right")
    
        //рисуем yAxis
        $scope.svg.append("g")
            .attr("class", "y axis")
            //.attr("transform", "translate("+$scope.width+",0)")
            .call(yAxis);	                    
    };    
    
}(docsSimpleDirective);