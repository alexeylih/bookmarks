describe('BookmarksCtrl', function() {
	var $scope, $rootScope, $httpBackend, createController;

	/////

	var oneBookmark = {"id":225,"url":"http://www.reddit.com/","created_at":"2014-09-16T20:25:44.649Z","updated_at":"2014-09-16T20:25:44.649Z","user_id":22,"thumbnail_url":null,"title":null,"removed":false,"type":null};
	var oneBookmarkArray = [oneBookmark];
	var oneBookmarkUrl = "http://www.reddit.com/";
	var youtubeBookmark = {"id":226,"url":"https://www.youtube.com/watch?v=x7MCbis75wk","created_at":"2014-09-16T20:25:44.649Z","updated_at":"2014-09-16T20:25:44.649Z","user_id":22,"thumbnail_url":null,"title":null,"removed":false,"type":"YoutubeBookmark"};
	var youtubeBookmarkWithTitleAndThumbnail = {"id":226,"url":"https://www.youtube.com/watch?v=x7MCbis75wk","created_at":"2014-09-16T20:25:44.649Z","updated_at":"2014-09-16T20:25:44.649Z","user_id":22,"thumbnail_url":"xyz","title":"The Streets - Blinded By The Lights","removed":false,"type":"YoutubeBookmark"};
	var bookmarksUrl = '/api/bookmarks/';
	var invalidUrl = "!Not a url!";

	/////

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$httpBackend = $injector.get('$httpBackend');
		$intervalMock = $injector.get('$interval');
		$scope = $rootScope.$new();

		var $controller = $injector.get('$controller');

		createController = function() {
			return $controller('BookmarksCtrl', {
				'$scope': $scope,
				'$interval': $intervalMock
			});
		};
	}));

	function initController(){
		$httpBackend.whenGET(bookmarksUrl).respond(oneBookmarkArray);
		var controller = createController();
		$httpBackend.flush();
	}

	// initialization

	it('should contain empty bookmark list on creation', function() {
		var controller = createController();
		expect($scope.bookmarks).toEqual([]);
	});

	it("should load user's bookmark list during creation", function() {
		initController();
		expect($scope.bookmarks).toEqual(oneBookmarkArray);
	});

	describe("on failure while loading bookmarks", function(){ 
		beforeEach(function(){
			$httpBackend.whenGET(bookmarksUrl)
				.respond(403, '');

			var controller = createController();

			spyOn(window, 'alert');		
			$httpBackend.flush();
		});

		it("should alert with propet message", function() {
			expect(alert).toHaveBeenCalledWith("Failed to retrieve bookmarks");
		});

		it("bookmarks should stay empty", function() {
			expect($scope.bookmarks).toEqual([]);
		});

	});

	it("should not add empty url", function() {
		var controller = createController();
		$scope.bookmarks = oneBookmarkArray;

		$scope.urlToAdd = "";
		$scope.addUrl();

		expect($scope.bookmarks).toEqual(oneBookmarkArray);

	});

	describe("on server error while adding bookmark", function(){
		beforeEach(function(){
			initController();

			spyOn(window, 'alert');		
			$httpBackend.whenPOST(bookmarksUrl).respond(422, '');
			$scope.urlToAdd = invalidUrl;
			$scope.addUrl();
			$httpBackend.flush();	
		});

		it("should not add bookmark if server error occurred while ", function() {
			expect($scope.bookmarks).toEqual(oneBookmarkArray);
		});

		it("should alert if server error occurred while adding bookmark", function() {
			expect(alert).toHaveBeenCalledWith("Failed to add, url format is invalid");
		});

	});

	describe("on adding regular bookmark", function(){
		beforeEach(function(){
			initController();

			spyOn(window, 'alert');		
			$httpBackend.whenPOST(bookmarksUrl).respond(oneBookmark);
			$scope.urlToAdd = oneBookmarkUrl;
			$scope.addUrl();
			$httpBackend.flush();	
		});

		it("should add new item to bookmarks", function(){
			expect($scope.bookmarks.length).toBe(2);
		});

	});

	describe("on adding youtube bookmark", function(){
		beforeEach(function(){
			initController();

			spyOn(window, 'alert');		
			$httpBackend.whenPOST(bookmarksUrl).respond(youtubeBookmark);
			$scope.urlToAdd = youtubeBookmark;
			$scope.addUrl();
			$httpBackend.flush();	
		});

		it("should start loading", function(){
			expect($scope.bookmarks[1].isLoading).toBe(true);
		});
	});

	it("should delete bookmark", function(){
		initController();
		$scope.removeUrl(0);
		expect($scope.bookmarks).toEqual([]);
	})
});