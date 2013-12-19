+function(module){	
    
    module.directive('bar', function() {	
        return {
            restrict: 'E',
            require: '^myCustomer',
            controller:function($scope,$attrs,$parse){
                $scope.$watch('svg',function(){                        
                    var x=$scope.x;
                    var y=$scope.y;
                    console.log(x);
                    new init(x,y,$scope,$scope.width,$scope.height,$scope.xAxis,$scope.yAxis,$attrs,$parse);
                });			
            }
        }
    })	
	
    function init(x,y,$scope,width,height,xAxis,yAxis,$attrs,$parse){            
        var me=this,
            svg=$scope.svg,
            bar=svg.selectAll(".bar");
    
        this.$attrs=$attrs    
        this.$parse=$parse;                                    
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
            $scope=this.$scope,
            me=this;
            
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
        
            me.makeEvent(sel)
                        
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
    
    //Эксперементальная реализация событий в BAR
    p.makeEvent=function(element){
        var $attrs=this.$attrs;
        var me=this;
        'click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'
        .split(' ').forEach(function(name,num){
            var ngName='ng'+name.charAt(0).toUpperCase() + name.slice(1);
            if ( $attrs[ ngName ]) {                
                element.on(name,function(){
                   me.$parse (me.$attrs[ ngName ])(me.$scope,{}); 
                });                
            }
        });
    }
    
}(docsSimpleDirective);