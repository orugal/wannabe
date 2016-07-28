angular.module('starter.controllers', ['ngCordova'])

.controller('homeCtrl', function($scope, $cordovaMedia, $ionicLoading) {

  var src = "/au/trova.mp3";
  var media = null;
  var audActual = 0;

  $scope.pubHomeArray = [
      {
        id:1,
        nombre:"Farez Prieto",
        img:'img/img2.jpg',
        perf:'img/farez.jpg',
        tiempo:'20 S',
        audio:'http://www.wannabe.com.co/uiu.mp3',
        text:'Creo que voy a dejar esta bella vocesita como ringtone en mi celular.'
      },
      {
        id:2,
        nombre:"Adam Sandler",
        img:'img/img1.jpg',
        perf:'img/adam.jpg',
        tiempo:'5 S',
        audio:'http://www.wannabe.com.co/trova.mp3',
        text:'Ahí les dejo un pedacito de una canción para que hagan trovas y se diviertan con sus amigos.'
      },
      {
        id:3,
        nombre:"Ben Stiller",
        img:'img/img2.jpg',
        perf:'img/ben.png',
        tiempo:'59 S',
        audio:'http://www.wannabe.com.co/trova.mp3',
        text:''
      }
  ];

  $scope.refreshHome = function() {
    $scope.$broadcast('scroll.refreshComplete');
  };

   $scope.play = function(src,idActual) 
   {
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
        media.stop();
    }
 
    var mediaStatusCallback = function(status) {
        $ionicLoading.show({template: status});
        if(status == 1)//cargando en buffer
        {
          $ionicLoading.show({template: 'Cargando...'});
        } 
        else if(status == 2)//sonando
        {
          $ionicLoading.hide();
        }
        else if(status == 4)//terminado
        {
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
