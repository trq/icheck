(function () {
    /**
     * Create a new module for icheck so that it can be injected into an existing
     * angular program easily.
     */
    angular.module('ui.check', [])
        .directive('icheck', function ($timeout, $parse) {
            return {
                link: function($scope, element, $attrs) {
                    return $timeout(function() {
                        var ngModelGetter, value;
                        ngModelGetter = $parse($attrs['ngModel']);
                        value = $parse($attrs['ngValue'])($scope);
                        return $(element).icheck({
                            checkboxClass: 'icheckbox_square-blue',
                            radioClass: 'iradio_square-blue'
                        }).on('ifChanged', function(event) {
                            if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                                $scope.$apply(function() {
                                    return ngModelGetter.assign($scope, event.target.checked);
                                });
                            }
                            if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                                return $scope.$apply(function() {
                                    return ngModelGetter.assign($scope, value);
                                });
                            }
                        });
                    });
                }
            };
        });
})();