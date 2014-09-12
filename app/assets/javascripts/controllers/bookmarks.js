function BookmarksCtrl($scope, $http, $attrs) {
    $scope.bookmarks = [];
    getBookmarks();

    function getBookmarks() {
        return $http.get('/api/bookmarks/').then(function (response) {
            $scope.bookmarks = response.data;
      }, 

      function (response) {
        alert("Failed to retrieve bookmarks")
      });
    };  

    $scope.addUrl = function() {
        if (!this.urlToAdd)
                return;
            
        var url_to_post = this.urlToAdd;
        this.urlToAdd = "";

        $http({
        method: 'POST',
        url: "/api/bookmarks/",
        data: $.param({url: url_to_post}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then(function(response){
            $scope.bookmarks.push(response.data);
        }, function(response){
            alert("Failed to add url: " + response.data.errors);
        })
    };
}