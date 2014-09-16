describe('BookmarksCtrl', function() {
	var $scope, $rootScope, $httpBackend, createController;

	var oneBookmark = [{"id":225,"url":"http://www.reddit.com/","created_at":"2014-09-16T20:25:44.649Z","updated_at":"2014-09-16T20:25:44.649Z","user_id":22,"thumbnail_url":null,"title":null,"removed":false,"type":null}];
	var bookmarksUrl = '/api/bookmarks/';
	var invalidUrl = "!Not a url!";

	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$httpBackend = $injector.get('$httpBackend');
		$scope = $rootScope.$new();

		var $controller = $injector.get('$controller');

		createController = function() {
			return $controller('BookmarksCtrl', {
				'$scope': $scope
			});
		};
	}));

	// initialization

	it('should contain empty bookmark list on creation', function() {
		var controller = createController();
		expect($scope.bookmarks).toEqual([]);
	});

	it("should load user's bookmark list during creation", function() {

		$httpBackend.whenGET(bookmarksUrl).respond(oneBookmark);
		var controller = createController();
		$httpBackend.flush();

		expect($scope.bookmarks).toEqual(oneBookmark);
	});

	it("should alert on failure while loading bookmarks and bookmarks should be empty", function() {
		$httpBackend.whenGET(bookmarksUrl)
			.respond(403, '');

		var controller = createController();

		spyOn(window, 'alert');		
		$httpBackend.flush();

		expect(alert).toHaveBeenCalledWith("Failed to retrieve bookmarks");
		expect($scope.bookmarks).toEqual([]);
	});

	// adding url

	it("should not add empty url", function() {
		var controller = createController();
		$scope.bookmarks = oneBookmark;

		$scope.addUrl('');

		expect($scope.bookmarks).toEqual(oneBookmark);

	});

	it("should not add bookmark if server error occurred while adding bookmark", function() {
		var controller = createController();
		$scope.bookmarks = oneBookmark;

		$httpBackend.whenPOST(bookmarksUrl).respond(422, '');
		$httpBackend.whenGET(bookmarksUrl).respond(oneBookmark);

		$scope.addUrl(invalidUrl);
		$httpBackend.flush();

		expect($scope.bookmarks).toEqual(oneBookmark);

	});

	it("should alert if server error occurred while adding bookmark", function() {
		
	});

});