(function (app) {
  'use strict';

  app.directive('reviewStars', function () {
    return {
      restrict: 'E',
      scope: {},
      bindToController: {
        rating: '='
      },
      controllerAs: 'vm',
      controller: 'reviewStarsCtrl',
      templateUrl: 'components/review_stars/review_stars.tpl.jade'
    };
  });

  app.controller('reviewStarsCtrl', function () {
    var vm = this;

    vm.set_rating = function (rating) { vm.rating = rating; };
  });

})(angular.module('review.components.review-stars', [
  'components/review_stars/review_stars.tpl.jade'
]));