describe('Review module', function () {
  'use strict';

  var vm,
      scope,
      element;

  beforeEach(module('review'));

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();

    element = '<review-form></review-form>';
    element = $compile(element)(scope);
    scope.$apply();

    vm = element.isolateScope().vm;
  }));

  it('compiles', function () {
    expect(vm).toBeTruthy();
    expect(element.html()).toContain('Review', 'Rating', 'Email Address', 'Comment');
  });

  it('does not display any error message until the form is submitted', function () {
    expect(element.html()).not.toContain('Please select a rating');
    expect(element.html()).not.toContain('Please enter an email address');
    expect(element.html()).not.toContain('This is not a valid email address');
  });

  it('displays "required" error messages for the email & rating when the form is submitted', function () {
    vm.review_form.$submitted = true;
    scope.$apply();

    expect(element.html()).toContain('Please select a rating');
    expect(element.html()).toContain('Please enter an email address');
  });

  it('displays an "invalid" error message for the email if some invalid string was entered', function () {
    vm.email = 'not-an-email';
    vm.review_form.$submitted = true;
    scope.$apply();

    expect(element.html()).not.toContain('Please enter an email address');
    expect(element.html()).toContain('This is not a valid email address');
  });

  it('does not display any error message if the form is entirely valid', function () {
    vm.rating = 3;
    vm.review_form.$submitted = true;

    [ 'johndoe@test.com', 'johndoe@test', 'john.doe@test.com', 'john.doe@test' ].forEach(function (email) {
      vm.email = email;
      scope.$apply();

      expect(element.html()).not.toContain('Please enter an email address');
      expect(element.html()).not.toContain('This is not a valid email address');
    });
  });

  describe('.submit()', function () {
    beforeEach(function () {
      spyOn(console, 'log');
    });

    it('logs the form output if the form is valid', function () {
      vm.review_form.$valid = true;
      vm.rating = 3;
      vm.email = 'me@mbenadda.com';
      vm.comment = 'Some comment.';

      vm.submit();
      expect(console.log).toHaveBeenCalled();
      expect(console.log.calls.argsFor(0)[0]).toContain('3', 'me@mbenadda.com', 'Some comment.');
    });

    it('does not do anything if the form is invalid', function () {
      vm.submit();
      expect(console.log).not.toHaveBeenCalled();
    });
  });
});