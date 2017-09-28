'use strict';
var employeeApp = angular.module("employeeApp", []);

//Initializes the Angular App and creates the factory methods
employeeApp
.factory('EmployeeDataOperations', ['$http', function ($http) {
  
      var urlBase = 'http://localhost:8080';
      var EmployeeDataOperations = {}; //Factory
    
      //This returns all the employees
      EmployeeDataOperations.getEmployees = function () {
          return $http.get(urlBase+'/employees');
      };
  
      //This adds the employee details from view
      EmployeeDataOperations.addEmployee = function (stud) {
          return $http.post(urlBase + '/employees', stud);
      };

      //This updates the employee details based on the Id
      EmployeeDataOperations.updateEmployee = function (stud, $index) {
        return $http.put(urlBase + '/employees/' + stud[$index].ids , stud[$index]);
      };

      //This remove the employee selected 
      EmployeeDataOperations.removeEmployee = function (stud, $index) {
        return $http.delete(urlBase + '/employees/' + stud[$index].ids , stud[$index]);
      };

      //This searches the employee based on Name give by user
      EmployeeDataOperations.searchEmployees = function (searchName) {
        alert('searchName'+searchName);
        return $http.get(urlBase + '/employees?firstName=' + searchName);
      };

      return EmployeeDataOperations;
  
      

  }]);

 //Initialized the controller for the module and passes the factory
  employeeApp.controller('EmployeeController', function ($scope, EmployeeDataOperations) {
    $scope.status;
    $scope.employees = [];
    $scope.selectedFile = null;  
    $scope.msg = "";  

    //Lists all employees
    getEmployees();

    //To get all employees
    function getEmployees() {
        EmployeeDataOperations.getEmployees()
            .success(function (studs) {
                $scope.employees = studs._embedded.employees;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

    //To search employees based on Name
    $scope.searchEmployees = function searchEmployees() {
        var searchName = $scope.name;       
       
        EmployeeDataOperations.searchEmployees(searchName)
            .success(function (studs) {                             

               $scope.employees = [];
               studs._embedded.employees.forEach(function (entry) {
                   $scope.employees.push(entry);
               });
               $scope.$apply();
            })
            .error(function (error) {
                //$scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

    //To add employee
    $scope.addEmployee = function () {

        var stud = {
            firstName: $scope.name,
            email: $scope.email,
            designation:  $scope.designation,
            department: $scope.department,
            ids: 0
        };
        EmployeeDataOperations.addEmployee(stud)
            .success(function () {
                $scope.status = 'Inserted Employee! Refreshing Employee list.';
                $scope.employees.push(getEmployees());
            }).
            error(function (error) {
                $scope.status = 'Unable to insert Employee: ' + error.message;
            });
    };

    //To update selected employee
    $scope.updateEmployee = function ($index) {
               
        EmployeeDataOperations.updateEmployee($scope.employees, $index)
            .success(function () {
                $scope.status = 'Updated Employee! RefreshingEmployee list.';
                $scope.employees.push(getEmployees());
            }).
            error(function (error) {
                $scope.status = 'Unable to insert Employee: ' + error.message;
            });
    };

    //To remove employee
    $scope.removeEmployee = function ($index) {
        
            EmployeeDataOperations.removeEmployee($scope.employees, $index)
        .success(function () {
            $scope.status = 'Delete Employee! Refreshing Employee list.';
            $scope.employees.push(getEmployees());
        }).
        error(function (error) {
            $scope.status = 'Unable to delete Employee: ' + error.message;
        });
    };
    
    //To choose file
    $scope.loadFile = function (files) {          
        $scope.$apply(function () {          
            $scope.selectedFile = files[0];          
        });          
    };

    //To process file and convert to JSON
    $scope.handleFile = function () {  
        
            var file = $scope.selectedFile;      
            if (file) {   
               
                var reader = new FileReader();  
    
                reader.onload = function (e) {  
                    
                    var data = e.target.result;  
    
                    var workbook = XLSX.read(data, { type: 'binary' });  
    
                    var first_sheet_name = workbook.SheetNames[0];  
    
                    var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);                         
    
                    if (dataObjects.length > 0) {                           
                       
                        alert('Uploaded: '+dataObjects[0].firstName);                         
                        EmployeeDataOperations.addEmployee(JSON.stringify(dataObjects))
                        .success(function () {
                            $scope.status = 'Inserted Employee! Refreshing Employee list.';
                            $scope.employees.push(getEmployees());
                        }).
                        error(function (error) {
                            $scope.status = 'Unable to insert Employee: ' + error.message;
                        });
    
                    } else {                         
                    }  
    
                };  
    
                reader.readAsBinaryString(file);  
            }  
        }; 
   
});
