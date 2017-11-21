'use strict';

angular.module('CoumadinApp').controller('CoumadinInfoController', function($rootScope, $scope, $location, data, navigation) {
	console.log('info controller loading');

	var currentIndex = null;

	$scope.information = [{
        title: 'What is Coumadin?',
        text: [
        	'Warfarin, also called Coumadin, is a prescription medication that prevents the formation of blood clots. This is called an "anticoagulant" or "blood thinner."'
        ]
    }, {
        title: 'What is Coumadin used for?',
        text: [
        	'Coumadin is used to treat various medical problems but most frequently used to prevent strokes and blood clots in veins and arteries.'
    	]
    }, {
        title: 'How is Coumadin monitored?',
        text: [
        	'A blood test called the International Normalized Ratio (PT/INR) is used to measure the effect of Coumadin.',
        	'In most cases, the PT/INR goal is between 2.0 and 3.0. Your doctor will tell you what your "goal" PT/INR range is.',
        	'If your PT/INR is below your goal, your blood is too thick and you are at risk of having a clot.',
        	'If your PT/INR is above your goal, your blood is too thin and you are at risk for bleeding.',
        	'It is extremely important that you go to all of your scheduled doctor or clinic appointments and PT/INR tests to make sure you are safe taking this medicine.'
        ]
    }, {
        title: 'What is the normal Coumadin dose?',
        text: [
        	'The dose is individualized and based on the results of your blood test or PT/INR.',
        	'Your dose may change and be different on various days of the week.',
        	'It is very important you follow the Coumadin dose schedule carefully and take it exactly as your doctor or clinic told you.',
        	'If you miss a dose, call your doctor or clinic to know what to do. Do not change the dose of Coumadin on your own to make up for a dose you missed.'
        ]
    }, {
        title: 'What are the most important side effects?',
        text: [
        	'Bleeding is the major side effect you need to watch. Signs of bleeding are:',
        	'1. Bleeding from the gums and nosebleeds.',
        	'2. Vomiting blood, blood in the urine and bloody or dark stools.',
        	'If you see any large amounts of blood that does not stop after a few minutes, you should call 911 or go to your nearest emergency room.'
        ]
    }, {
        title: 'What medicines get in the way of Coumadin?',
        text: [
        	'Many medicines can interfere with Coumadin including some over-the-counter medicines, herbal products, and antibiotics. It is very important to tell your doctor or pharmacist about all medicines you are taking and any changes made to them.',
        	'These medicines may change the PT/INR and your dose of Coumadin may need to be adjusted.'
        ]
    }, {
        title: 'What foods interact with Coumadin?',
        text: [
        	'Vitamin K is found in many foods and nutritional supplements. Vitamin K may cause Coumadin to be less effective (reduces your "PT/INR" and then your blood may be too thick)',
        	'While it is not necessary to avoid foods high on vitamin K, it is important to eat the same amounts every week and avoid large portions',
        	'Make sure to notify your doctor or clinic if you plan to make any changes in your diet.',
        	'If you have been taking drinks like Ensure® or Boost®, you may continue to take these items. Just drink the same amount you are used to drink.',
        	'Avoid drinking large amounts of cranberry juice or other cranberry products.',
        	'Alcohol can change how your body handles Coumadin. You should not drink alcohol or consume very small quantities when taking Coumadin. You should discuss this with your doctor or clinic.'
        ]
    }, 
    {
    	title: 'Does Coumadin interfere with pregnancy?',
    	text: [
    		'Doctors usually do not give Coumadin to pregnant women at least during the first trimester because it increases the risk of birth defects.',
			'A patient who becomes pregnant or plans to become pregnant while taking Coumadin should tell her doctor immediately.',
			'Even if Coumadin does not pass into breast milk, a woman who wishes to breastfeed while taking Coumadin should also tell her doctor.'
		]
    },
    {
    	title: 'Other special concerns when you are taking Coumadin',
    	text: [
    		'Avoid contact sports while taking Coumadin and prevent falls as these increase your risk of bleeding and bruising.',
			'Always keep a list of your medicines with you at all times.',
			'Carry an ID card or wear a medical alert bracelet to let any emergency caregiver know that you are taking Coumadin.'
		]
    }];
    $scope.currentItem = null;

    $scope.selectInfo = function(info) {
    	for (var i = 0; i < $scope.information.length; i++) {
    		if ($scope.information[i].title === info.title) {
    			currentIndex = i;
    			$scope.currentItem = $scope.information[currentIndex];
    		}
    	}
    }

    $scope.prevItem = function() {
    	if ($scope.hasPrevItem()) {
    		currentIndex--;
    		$scope.currentItem = $scope.information[currentIndex];
    	}
    };

    $scope.nextItem = function() {
    	if ($scope.hasNextItem()) {
    		currentIndex++;
    		$scope.currentItem = $scope.information[currentIndex];
    	}
    };

    $scope.hasPrevItem = function() {
    	return currentIndex !== null && currentIndex > 0;
    };

    $scope.hasNextItem = function() {
    	return currentIndex !== null && currentIndex < $scope.information.length - 1;
    };

    $scope.showList = function() {
    	currentIndex = null;
    	$scope.currentItem = null;
    }

    $scope.close = function() {
    	$rootScope.hideCoumadinInfoOverlay();
    };







	// console.log(configData);

	// $scope.playMiniGames = function() {
	// 	$location.path("/launch");
	// }

	// $scope.showInfo = function(item) {
	// 	$scope.selectedItem = item;
	// }

	// $scope.back = function() {
	// 	$scope.selectedItem = null;
	// }

	// $scope.info = $rootScope.information;
	// $rootScope.viewInfo = configData.helpText;








	


});

