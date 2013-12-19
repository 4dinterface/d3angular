/*  https://www.dashingd3js.com/svg-paths-and-d3js */

+function(module){	
    
    module.directive('paths', function() {	
        return {
            restrict: 'E',
            require: '^myCustomer',
            controller:function($scope){
                $scope.$watch('svg',function(){                        
                    var x=$scope.x;
                    var y=$scope.y;
                    new init(x,y,$scope,$scope.width,$scope.height,$scope.xAxis,$scope.yAxis);
                });			
            }
        }
    })	
	
    function init(x,y,$scope,width,height,xAxis,yAxis){            
        var me=this,
            svg=$scope.svg,
            bar=svg.selectAll(".bar");
                
        bar.data($scope.data);
        this.$scope=$scope;
		
        //сдесь будем хранить подписчики
        var watchFunc=[];	
		
         //реакция на добавлние новых столбцов
         $scope.$watch('data',function(){                		
            //удалим старые watchers
            watchFunc.forEach(function(f){ f() });
            //удалим точки с экрана
             svg.selectAll(".paths").remove();
            //удалим элементы с экрана                    
            watchFunc=me.renderPath(bar,height,x,y,watchFunc);
         });//watch data;			
    }
    var p=init.prototype;
        
    /**
     * @name bar
     * Рисуем бары
     */
     p.renderPath=function(bar,height,x,y){
        var watchFunc=[],
            $scope=this.$scope;
           
        //  line
        var line = d3.svg.line()
            .x(function(d) { return   x(d.letter)+x.rangeBand()/2; })
            .y(function(d) { return  y(d.frequency) } )            
            .interpolate('line');
            
       // path
        $scope.svg.append("path")
            .datum($scope.data).each(function(a,b,c){
                var sel=d3.select(this);
        
                sel.attr("class", "paths")
                   .attr("d", function(){
                       return 0;
                   })  
                   .attr("stroke", "red")
                   .attr("stroke-width", 2)
                   .attr("fill", "none");  
                
                watchFunc.push( 
                    $scope.$watchCollection('data['+b+']',function(){
                        sel.transition().duration(250)
                        .attr("d", line)                          
                    })
                )//push    
                      
            })                                
        return watchFunc;
    }		
}(docsSimpleDirective);



//$scope.$watch('data',function(){               
                //line
                /*var line = d3.svg.line()
                    .x(function(d) { return   x(d.letter); })
                    .y(function(d) { return  y(d.frequency) } )
                    .interpolate('basis-closed');
            
                //path
                svg.append("path")
                    .datum($scope.data)
                    .attr("class", "line2")
                    .attr("d", line)
                    /*.attr("d", function(d){
                        return line.tension(d)($scope.data);
                    })*/
                //    .style("stroke", d3.interpolateRgb("brown", "steelblue"));
            
                
            


