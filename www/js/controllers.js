angular.module('starter.controllers', ['ngCordova'])

.controller('homeCtrl', function($scope, $cordovaMedia, $ionicLoading) {

  var src = "/au/trova.mp3";
  var media = null;
  var audActual = 0;
  var ingre     = 4;
  $scope.idActual = audActual;
  $scope.activaBoton = false;

  $scope.pubHomeArray = [
      {
        id:1,
        nombre:"Farez Prieto",
        img:'',
        perf:'img/farez.jpg',
        tiempo:'20 S',
        audio:'http://www.wannabe.com.co/uiu.mp3',
        text:'Creo que voy a dejar esta bella vocesita como ringtone en mi celular.',
        int:'200',
        com:'1000'
      },
      {
        id:2,
        nombre:"Adam Sandler",
        img:'',
        perf:'img/adam.jpg',
        tiempo:'5 S',
        audio:'http://www.wannabe.com.co/trova.mp3',
        text:'Ahí les dejo un pedacito de una canción para que hagan trovas y se diviertan con sus amigos.',
        int:3,
        com:'0'
      },
      {
        id:3,
        nombre:"Ben Stiller",
        img:'',
        perf:'img/ben.png',
        tiempo:'59 S',
        audio:'',
        text:'Tus besos sooooon los que me dan alegriiiiiaaa #diciembre',
        int:'0',
        com:'0'
      },
      {
        id:4,
        nombre:"Farez Prieto",
        img:'img/img2.jpg',
        perf:'img/farez.jpg',
        tiempo:'20 S',
        audio:'http://www.wannabe.com.co/uiu.mp3',
        text:'Creo que voy a dejar esta bella vocesita como ringtone en mi celular.',
        int:'2',
        com:'0'
      }
  ];

  $scope.refreshHome = function() {
    $scope.$broadcast('scroll.refreshComplete');
  };
  $scope.refreshHomeBottom = function() 
  {
    $ionicLoading.show({template: 'Buscando publicaciones, espere...'});
    ingre++;
    $scope.pubHomeArray.push({
        id:ingre,
        nombre:"Farez Prieto",
        img:'img/img1.jpg',
        perf:'img/farez.jpg',
        tiempo:'20 S',
        audio:'http://www.wannabe.com.co/uiu.mp3',
        text:'Un viaje que siempre habiamos querido realizar. Nada más ni nada menos que a Londres. :)',
        int:'50',
        com:'2'
      });
    $scope.$broadcast('scroll.infiniteScrollComplete');
    $ionicLoading.hide();
  };

   $scope.play = function(src,idActual) 
   {
      audActual = idActual;
      //alert($scope.idActual);
      if(media == null)
      {
         media = new Media(src, null, null, mediaStatusCallback);
      }
      else
      {
         media.stop();
         media = new Media(src, null, null, mediaStatusCallback);
      }
      $cordovaMedia.play(media);
   }

    $scope.stop = function()
    {
        $scope.activaBoton = false;
        //$scope.idActual    = 0;
        media.stop();
    }

    $scope.parar = function()
    {
        $scope.idActual    = 0;
        $scope.$digest();
        media.stop();
    }
 
    var mediaStatusCallback = function(status) {
        //$ionicLoading.show({template: status});
        if(status == 1)//cargando en buffer
        {
          $scope.activaBoton = false;
          $ionicLoading.show({template: 'Cargando audio, espere...'});
        } 
        else if(status == 2)//sonando
        {
          $scope.idActual = audActual;
          $scope.$digest();
          $ionicLoading.hide();
        }
        else if(status == 4)//terminado
        {
          $scope.activaBoton = false;
          $scope.idActual    = 0;
          $scope.$digest();
          //debo dejar los botones como estaban
          $ionicLoading.hide();
        }
    }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
