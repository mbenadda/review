(function (app) {
  'use strict';

  app.directive('reviewForm', function () {
    return {
      restrict: 'E',
      scope: {},
      controllerAs: 'vm',
      controller: 'reviewFormCtrl',
      templateUrl: 'review/review.tpl.jade'
    };
  });

  app.controller('reviewFormCtrl', function ($scope) {
    var vm = this;

    vm.submit = function () {
      if (vm.review_form.$valid) {
        // NB: No specifications were made as to form handling.
        // Just log for proof everything went as planned.
        console.log([
          'Form submitted!\n',
          'Rating: ', vm.rating, '\n',
          'Email: ', vm.email, '\n',
          'Comment: ', vm.comment || 'n/a', '\n'
        ].join(''));
      }
    };
  });

})(angular.module('review', [
  'review/review.tpl.jade',
  'review.components.review-stars',
  'ngMessages'
]));