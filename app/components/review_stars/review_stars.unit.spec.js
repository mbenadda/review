describe('Component: review stars', function () {
  'use strict';

  var vm,
      scope,
      element;

  beforeEach(module('review.components.review-stars'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();

    element = '<review-stars rating="rating"></review-stars>';
    element = $compile(element)(scope);
    scope.$apply();

    vm = element.isolateScope().vm;
  }));

  it('compiles', function () {
    expect(vm).toBeTruthy();
    expect(element.html()).toContain('review-stars__star');
  });

  it('shows the 5 stars of our rating input', function () {
    expect(element[0].querySelectorAll('.review-stars__star').length).toEqual(5);
  });

  it('updates the bound rating when a star is clicked', function () {
    vm.set_rating(3);
    expect(vm.rating).toEqual(3);
  });

  it('updates the relevant stars to the full version when a rating is entered', function () {
    vm.rating = 3;
    scope.$apply();

    var stars = element[0].querySelectorAll('.review-stars__star');

    for (var i = 0; i < stars.length; i++) {
      // The first 3 stars are shown as full to express the currently selected rating
      if (i <= 2) { expect(stars[i].className).toContain('review-stars__star--full'); }
      // The remaining stars are left without the additional class
      else { expect(stars[i].className).not.toContain('review-stars__star--full'); }
    }
  });
});