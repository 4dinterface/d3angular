docsSimpleDirective
  .controller('Ctrl2', function($scope) {
    console.log('superScope',$scope);
  })

  .controller('Ctrl', function($scope) {
      function f1(){
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
		{letter:	"R", frequency:0.05987},
		{letter:	"S", frequency:0.06327},
		{letter:	"T", frequency:0.09056},
		{letter:	"U", frequency:0.02758},
		{letter:	"X", frequency:0.00150},
		{letter:	"Y", frequency:0.01974},
		{letter:	"Z", frequency:0.00074}
        ]
        setTimeout(f2,2000);
    }
    
    function f2(){//2000
        
            $scope.$apply(function(){
                $scope.data[0].frequency=0.01167;
                $scope.data[1].frequency=0.02167;
                $scope.data[2].frequency=0.03167;
                $scope.data[3].frequency=0.04167;
                $scope.data[4].frequency=0.05167;
                $scope.data[5].frequency=0.06167;
            });
            //setTimeout(f3,2000);        
    }
    
    function f3(){
            $scope.$apply(function(){
                $scope.data=[
                    {letter:	"U", frequency:0.02758},
                    {letter:	"X", frequency:0.00150},
                    {letter:	"Y", frequency:0.01974},
                    {letter:	"Z", frequency:0.00074}
                ];
            });
            setTimeout(f1,1000);                    
    }
    
    f1();
    
    $scope.onClick=function(e){                        
        $scope.$apply(function(){
            e.frequency+=0.05;
        });
    }
  })


