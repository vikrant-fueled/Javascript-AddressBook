"use strict";angular.module("JavascriptAddressBookApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("JavascriptAddressBookApp").controller("MainCtrl",["$scope",function(a){a.WelcomeText="Javascript Address Book",a.init=function(){console.log("Initializing localStorage...."),"undefined"!=typeof localStorage?(a.persons="undefined"==localStorage.getItem("persons")?[]:JSON.parse(localStorage.getItem("persons")),console.log("Done !"),a.addPerson=function(){var b={};b.name=a.name,b.address=a.address,b.id=a.persons.length+1,a.persons.push(b),localStorage.setItem("persons",JSON.stringify(a.persons))},a.removePerson=function(b){var c=a.persons.indexOf(b);a.persons.splice(c,1),console.log(a.persons),localStorage.setItem("persons",JSON.stringify(a.persons))}):alert("localStorage is not supported in your browser.")},a.init()}]);