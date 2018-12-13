'use strict';

angular.module('CoumadinApp').directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'src(' + url +')',
            'background-size' : 'cover'
        });
    };
})