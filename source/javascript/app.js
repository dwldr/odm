var ODMsections = [
  { 'section_name': 'Driving in Oregon',
    'section_num': 'O1',
    'pages': [
      {'route': '/01/driving-is-a-privilege', 'title': 'Driving is a Privilege', 'time': '2'},
      {'route': '/01/fee-schedules', 'title': 'Fee Schedules', 'time': '2'},
      {'route': '/01/driving-privileges-and-identification-cards', 'title': 'Driving Privileges and Identification Cards', 'time': '2'},
      {'route': '/01/how-to-apply', 'title': 'How to Apply', 'time': '2'},
      {'route': '/01/examinations', 'title': 'Examinations', 'time': '2'}
    ]
  },
  { 'section_name': 'Signs, Signals, and Markings',
    'section_num': 'O2',
    'pages': [
      {'route': '/02/signs', 'title': 'Signs', 'time': '2'},
      {'route': '/02/regulatory-signs-prohibitive', 'title': 'Regulatory Signs - Prohibitive', 'time': '2'},
      {'route': '/02/regulatory-signs-other', 'title': 'Regulatory Signs - Other', 'time': '2'}
    ]
  }
];

function ODMwhen(current, previous, next) {
  currentP = ODMsections[current[0]].pages[current[1]];
  nextP = ODMsections[next[0]].pages[next[1]];
  previousP = ODMsections[previous[0]].pages[previous[1]];
  return { 
    templateUrl: 'pages' + currentP.route + '.html',
    controller: 'mainController',
    title: currentP.title,
    nextTitle: nextP.title,
    nextRoute: nextP.route,
    prevRoute: previousP.route,
    secNum: ODMsections[current[0]].section_num,
    secTitle: ODMsections[current[0]].section_name,
    time: currentP.time,
    thisRoute: currentP.route
  };
}

var ODM = angular.module('ODM', ['ngRoute']);

ODM.config(function($routeProvider) {
  $routeProvider.when('/', { redirectTo: ODMsections[0].pages[0].route });
  var allPages = [];
  angular.forEach(ODMsections, function(section, j) {
    angular.forEach(section.pages, function(page, k) {
      allPages.push([j, k]);
    }, this);
  });
  angular.forEach(allPages, function(page, i) {
    var l = allPages.length;
    var current = allPages[i];
    var previous = allPages[(i+l-1)%l];
    var next = allPages[(i+1)%l];
    $routeProvider.when(ODMwhen(current, previous, next).thisRoute, ODMwhen(current, previous, next));
  }, this);
});

ODM.controller('mainController', function($scope, $location, $window) {
  $scope.$on('$routeChangeStart', function (event, data) {
    NProgress.start();
    $("#content-wrapper").removeClass("blur");
    $("body").removeClass("overflow-hidden");
    $("#navbar-menu-toggle").removeClass("is-active");
    $("#overlay").hide();
    $("#nav-sections").collapse('hide');
    window.scrollTo(0, 0);
  });
  $scope.$on('$routeChangeSuccess', function (event, data) {
    $scope.pageTitle = data.title;
    $scope.pageNextTitle = data.nextTitle;
    $scope.nextRoute = data.nextRoute;
    $scope.prevRoute = data.prevRoute;
    $scope.readingTime = data.time;
    $scope.secNum = data.secNum;
    $scope.secTitle = data.secTitle;
    $scope.secPages = ODMsections;
    $scope.thisRoute = data.thisRoute;
    NProgress.done();
  });
  $scope.isActive = function(viewLocation) {
    var active = (viewLocation === $location.path());
    return active;
  };
  $scope.isActiveSection = function(viewLocation) {
    var active = (viewLocation === $location.path().substring(0,3));
    return active;
  };
});
