'use strict';
var employeeApp = angular.module("employeeApp", []);


employeeApp
.factory('EmployeeDataOperations', ['$http', function ($http) {
  
      var urlBase = 'http://localhost:8080';
      var EmployeeDataOperations = {};
  
      EmployeeDataOperations.getEmployees = function () {
          return $http.get(urlBase+'/employees');
      };
  
      EmployeeDataOperations.addEmployee = function (stud) {
          return $http.post(urlBase + '/employees', stud);
      };

      EmployeeDataOperations.updateEmployee = function (stud, $index) {
        return $http.put(urlBase + '/employees/' + stud[$index].ids , stud[$index]);
      };

      EmployeeDataOperations.removeEmployee = function (stud, $index) {
        return $http.delete(urlBase + '/employees/' + stud[$index].ids , stud[$index]);
      };

      EmployeeDataOperations.searchEmployees = function (searchName) {
        return $http.get(urlBase + '/employees?firstName=' + searchName);
      };

      return EmployeeDataOperations;
  
      

  }]);


  employeeApp.controller('EmployeeController', function ($scope, EmployeeDataOperations) {
    $scope.status;
    $scope.employees;
    $scope.selectedFile = null;  
    $scope.msg = "";  

    getEmployees();

    function getEmployees() {
        EmployeeDataOperations.getEmployees()
            .success(function (studs) {
                $scope.employees = studs._embedded.employees;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

    function searchEmployees() {
        var searchName = $scope.name;
        EmployeeDataOperations.searchEmployees(searchName)
            .success(function () {
                $scope.employees = studs._embedded.employees;
                $scope.employees.push(searchName);
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

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
    
    $scope.loadFile = function (files) {          
        $scope.$apply(function () {          
            $scope.selectedFile = files[0];          
        });          
    };

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
                        alert('dataObjectsdsds'+dataObjects[0].email);   
                       
                        $scope.employees = dataObjects;                                                
    
                    } else {                         
                    }  
    
                };  
    
                //reader.readAsBinaryString(file);  
            }  
        }; 
   
});