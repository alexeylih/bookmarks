function BookmarksCtrl($scope, $http, $interval) {
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

        var tmpUrlToAdd = this.urlToAdd;
        this.urlToAdd = "";

        $http({
            method: 'POST',
            url: '/api/bookmarks/',
            data: $.param({url: tmpUrlToAdd}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(function(response){
                var bookmark = response.data;
                if (bookmark.type == "YoutubeBookmark"){
                    bookmark.loadingPromise = $interval(function() { getYoutubeBookmarkInfo(bookmark.id) }, 1000);
                    bookmark.isLoading = true;
                }

                $scope.bookmarks.push(bookmark);

            }, function(response){
                if (response.status == "422")
                    alert("Failed to add, url format is invalid"); 
                else
                    alert("Failed to add url"); 
            })
    };

    $scope.removeUrl = function(bookmarkIndex) {
        var bookmark = $scope.bookmarks[bookmarkIndex];
        
        if (bookmark.loadingPromise){
            $interval.cancel(bookmark.loadingPromise);    
        }
        
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
            if ($scope.bookmarks[i].isSelected){
                selectedBookmarkIds.push($scope.bookmarks[i].id);
            }
            else {
                newBookmarks.push($scope.bookmarks[i]);
            }
        }
        if (selectedBookmarkIds.length > 0) {
            $scope.bookmarks = newBookmarks;
            deleteBookmarks(selectedBookmarkIds.join());    
        }
    };

    function getYoutubeBookmarkInfo(id) {
        console.log(id);
        return $http.get('/api/bookmarks/'+id).then(function (response) {
            var updatedBookmark = response.data;
            if (updatedBookmark.title != ""){
                for (var i=0; i < $scope.bookmarks.length; i++){
                    if ($scope.bookmarks[i].id == updatedBookmark.id){
                        //cancel timer after item was updated
                        $interval.cancel($scope.bookmarks[i].loadingPromise);
                        $scope.bookmarks[i] = updatedBookmark;
                        $scope.bookmarks[i].isLoading = false;
                    }
                }
            }
        },
        function (response) {
            alert("Failed to retrieve youtube data")
        });
    };  
    

}

