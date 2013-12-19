+function(module){	
    
    module.directive('points', function() {	
        return {
            restrict: 'E',
            require: '^myCustomer',
            controller:function($scope,$attrs){
                $scope.$watch('svg',function(){                        
                    var x=$scope.x;
                    var y=$scope.y;
                    new init(x,y,$scope.width,$scope.height,$scope,$attrs);
                });			
            }
        }
    })	
	
    function init(x,y,width,height,$scope,$attrs){            
        var me=this,
            svg=$scope.svg;
            //bar=svg.selectAll(".bar");
                
        //xbar.data($scope.data);
        this.$scope=$scope;
        this.$attrs=$attrs;
		
        //сдесь будем хранить подписчики
        var watchFunc=[];	
		
         //реакция на добавлние новых столбцов
         $scope.$watch('data',function(){                		
            //удалим старые watchers
            watchFunc.forEach(function(f){ f() });
            //удалим точки с экрана
            svg.selectAll(".circle").remove();
            //удалим элементы с экрана                    
            watchFunc=me.renderBar(height,x,y,watchFunc);
         });//watch data;			
    }
    var p=init.prototype;
        
    /**
     * @name bar
     * Рисуем бары
     */
     p.renderBar=function(height,x,y){
        var  me=this,
             watchFunc=[],
             $scope=this.$scope;
             
        
        var circle = $scope.svg.selectAll("circle").data($scope.data);                                
        circle.enter().append("circle")
        
        .each(function(a,b,c) { 
            var sel=d3.select(this)                                
                .attr("cx", function(d) { return  x(d.letter)+x.rangeBand()/2; }  )
                .attr("cy", function(d) { return  height } )                
                .attr("r", 4);
        
            me.makeAttr(sel,me.$attrs);
    
            watchFunc.push( 
                $scope.$watchCollection('data['+b+']',function(){
                    sel.transition().duration(250)
                    .attr("cx", function(d) { return  x(d.letter)+x.rangeBand()/2; }  )
                    .attr("cy", function(d) { return  y(d.frequency) } )                    
                })
            )//push    
        })          
                
        return watchFunc;
    }	
    
    //атрибуты
    p.makeAttr=function(element,$attrs){
        //атрибут класс
        element.attr("class", "circle "+this.$attrs['class']||"")                
    }
    
}(docsSimpleDirective);            