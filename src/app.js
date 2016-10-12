import angular from "angular";
import uiRouter from "angular-ui-router";
import "./stylesheet.css";

import loginHtml from "./templates/login.html";
import loginCtrl from "./controllers/loginCtrl";

import homeHtml from "./templates/home.html";
import homeCtrl from "./controllers/homeCtrl";

import workoutHtml from "./templates/home/workout.html";
import workoutCtrl from "./controllers/home/workoutCtrl";

import routineHtml from "./templates/home/routine.html";
import routineCtrl from "./controllers/home/routineCtrl";

import scheduleHtml from "./templates/home/schedule.html";
import scheduleCtrl from "./controllers/home/scheduleCtrl";

import wingItHtml from "./templates/home/wingIt.html";
import wingItCtrl from "./controllers/home/wingItCtrl";

import sampleHtml from "./templates/home/sample.html";
import sampleCtrl from "./controllers/home/sampleCtrl";

angular.module( "myApp", [ uiRouter ] )
  .config( function( $stateProvider, $urlRouterProvider ) {
    $stateProvider
      .state( 'login', {
        controller: loginCtrl,
        url: '/',
        template: loginHtml
      } )
      .state( 'home', {
        controller: homeCtrl,
        url: '/home',
        template: homeHtml
      } )

      .state( 'workout', {
        controller: workoutCtrl,
        url: '/home/workout',
        template: workoutHtml
      } )
      .state( 'routine', {
        controller: routineCtrl,
        url: '/home/routine',
        template: routineHtml
      } )
      .state( 'schedule', {
        controller: scheduleCtrl,
        url: '/home/schedule',
        template: scheduleHtml
      } )
      .state( 'wingIt', {
        controller: wingItCtrl,
        url: '/home/wingIt',
        template: wingItHtml
      } )
      .state( 'sample', {
        controller: sampleCtrl,
        url: '/home/sample',
        template: sampleHtml
      } )

    $urlRouterProvider.otherwise( '/' );
  }
);
