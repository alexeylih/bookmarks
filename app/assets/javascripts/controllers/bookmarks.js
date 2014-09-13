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

    $scope.removeUrl = function(bookmarkIndex) {
        var bookmark = $scope.bookmarks[bookmarkIndex];
        $scope.bookmarks.splice(bookmarkIndex, 1);
        deleteBookmarks(bookmark.id);        
    };

    function deleteBookmarks(bookmarkIds){
        $http.delete('/api/bookmarks/' + bookmarkIds).then(function (response) {}, 
          function (response) {
            alert("Failed to delete bookmark")
        });
    }

    $scope.toggleSelection = function(bookmarkIndex) {
        var bookmark = $scope.bookmarks[bookmarkIndex];
        // attach to bookmark isSelectedProperty
        bookmark.isSelected = !bookmark.isSelected;
    };

    $scope.removeSelectedUrls = function() {
        var selectedBookmarkIds = [];
        var newBookmarks = [];
        
    // build selected Id's array and non-selected bookmarks for the new model
    for (var i=0; i < $scope.bookmarks.length; i++){
        if ($scope.bookmarks[i].isSelected)
        {
            selectedBookmarkIds.push($scope.bookmarks[i].id);
        }
        else
        {
            newBookmarks.push($scope.bookmarks[i]);
        }
    }

    $scope.bookmarks = newBookmarks;

    deleteBookmarks(selectedBookmarkIds.join());
};


}

