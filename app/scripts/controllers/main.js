'use strict';


var addBook = {};
addBook.webdb = {};
addBook.webdb.db = null;
var AddressBook = addBook.webdb;


angular.module('JavascriptAddressBookApp')
  .controller('MainCtrl', function ($scope) {

    	$scope.WelcomeText = "Javascript Address Book";

		AddressBook.open = function(){
			var size = 5*1024*1024;
			AddressBook.db = openDatabase("AddressBook", "1.0", "A Javascript based Address Book", size);
		}

		AddressBook.onError = function(tx, e) {
		  alert("There has been an error in database access: " + e.message);
		}

		AddressBook.onSuccess = function(tx, r) {
		  // re-render the data.
		  console.log("Database connection successful.")
		}

		AddressBook.createTable = function() {
		  var db = AddressBook.db;
		  db.transaction(function(tx) {
		    tx.executeSql("CREATE TABLE IF NOT EXISTS addressBook(id INTEGER PRIMARY KEY ASC, name VARCHAR, address TEXT, addDate DATETIME)", []);
		  });
		}

		AddressBook.addEntry = function(person) {
			var db = AddressBook.db;
			db.transaction(function(tx){
    			var addDate = new Date();
    			tx.executeSql("INSERT INTO addressBook(name, address, addDate) VALUES (?, ?, ?)",[person.name, person.address, addDate], AddressBook.onSuccess, AddressBook.onError);
			});
			return 0;
		}

		AddressBook.removeEntry = function(id){
			var db = AddressBook.db;
			db.transaction(function(tx){
				tx.executeSql("DELETE FROM addressBook WHERE id=?", [person.id], AddressBook.onError);
			});
		}

		AddressBook.getAll = function(){
			var db = AddressBook.db;

			db.transaction(function(tx){
				tx.executeSql("SELECT * FROM addressBook", [], showResults, AddressBook.onError);
				});

			var showResults = function(tx, results){
				var len = results.rows.length, i;
				console.log("Found "+len+" rows.");
				for(var i=0; i<len; i++)
					console.log(results.rows.item(i).id + results.rows.item(i).name + results.rows.item(i).address + results.rows.item(i).addDate);
			}
		}
		
		$scope.init = function(){
			console.log("Initializing");
			AddressBook.open();
			AddressBook.createTable();
			AddressBook.getAll();
			console.log("Done");
		}

		$scope.init();
    
    	$scope.persons = [];

    	$scope.addPerson = function(){
    		var person = {};
    		person.name = $scope.name;
    		person.address = $scope.address;
    		person.id = $scope.persons.length + 1;
    		var entrySuccess = addEntry(person);
    		$scope.persons.push(person);
    	}

    	$scope.removePerson = function(person){
    		var index=$scope.persons.indexOf(person)
  			$scope.persons.splice(index,1);
    	}
  });
