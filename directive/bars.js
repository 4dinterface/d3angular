+function(module){	
    
    module.directive('bar', function() {	
        return {
            restrict: 'E',
            require: '^myCustomer',
            controller:function($scope){
                $scope.$watch('svg',function(){                        
                    var x=$scope.x;
                    var y=$scope.y;
                    console.log(x);
                    new init(x,y,$scope,$scope.width,$scope.height,$scope.xAxis,$scope.yAxis);
                });			
            }
        }
    })	
	
    function init(x,y,$scope,width,height,xAxis,yAxis){            
        var me=this,
            svg=$scope.svg,
            bar=svg.selectAll(".bar");
                
        //bar.data($scope.data);
        this.$scope=$scope;
		
        //сдесь будем хранить подписчики
        var watchFunc=[];	
		
         //реакция на добавлние новых столбцов
         $scope.$watch('data',function(){                		
            //удалим старые watchers
            watchFunc.forEach(function(f){ f() });
            //удалим бары с экрана
            svg.selectAll(".bar").remove();                                

            //удалим элементы с экрана                    
            watchFunc=me.renderBar(bar,height,x,y,watchFunc);
         });//watch data;			
    }
    var p=init.prototype;
        
    /**
     * @name bar
     * Рисуем бары
     */
     p.renderBar=function(bar,height,x,y){
        var watchFunc=[],
            $scope=this.$scope;
            
        //рисуем bar
        bar.data($scope.data)
            .enter().append("rect")
            //цикл срабатывает для каждого bar
            .each(function(a,b,c) { 
            var sel=d3.select(this)
                .attr("y", function(d) { return height})
                .attr("height", 0)
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.letter); })
                .attr("width", x.rangeBand());		
                        
            // слушаем массив data,одна ячейка, один столбец
            // изменилась ячейка изменился столбец
            watchFunc.push( 
            $scope.$watchCollection('data['+b+']',function(){
                sel.transition().duration(250)
                    .attr("y", function(d) { return y(d.frequency); })
                    .attr("height", function(d) { return height - y(d.frequency); })
                })
            )//push
		
        });//each	
                
        return watchFunc;
    }		
}(docsSimpleDirective);