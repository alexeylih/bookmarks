require 'spec_helper'
require 'rspec_api_documentation/dsl'

resource 'Bookmark' do

	let(:user) { create(:user) }

	get "/api/bookmarks" do
		example_request "Getting bookmarks without authorization" do
			expect(status).to eq 401
		end
	end


	get "/api/bookmarks" do
		include Warden::Test::Helpers

		before (:each) do
      		login_as user, scope: :user
    	end

		example_request "Getting bookmarks with authorization" do
			expect(status).to eq 200
		end
	end

	get "/api/bookmarks" do
		include Warden::Test::Helpers

		before (:each) do
      		login_as user, scope: :user
    	end

		example_request "Getting empty bookmarks list" do
			expect(response_body).to be_json_eql([].to_json)
		end
	end

	get "/api/bookmarks" do
		include Warden::Test::Helpers

		let(:bookmarks_owner) { create(:user) }
		
		before (:each) do
      		login_as bookmarks_owner, scope: :user
    	end

		example "Getting bookmarks that belong only to logged user" do

			create_list(:bookmark, 5, user: bookmarks_owner)
			create_list(:bookmark, 5)

			do_request

			result = JSON.parse(response_body)
			expect(result.count).to eq 5
			result.each { |bookmark| expect(bookmark["user_id"]).to eq bookmarks_owner.id  }			

		end
	end


	get "/api/bookmarks/:id" do
		include Warden::Test::Helpers

		let(:bookmarks_owner) { create(:user) }
		let(:url) { "https://www.wendys.com" }
		
		before (:each) do
      		login_as bookmarks_owner, scope: :user
    	end

    	example "Getting a single bookmark by id" do
    		bookmark = create(:bookmark, user: bookmarks_owner, url: url)
			do_request(id: bookmark.id)
    		expect(status).to eq 200
    	end

    	example "Getting a single bookmark by non exisiting id" do
    		bookmark = create(:bookmark, user: bookmarks_owner, url: url)
			do_request(id: bookmark.id + 1)
    		expect(status).to eq 404
    	end
	end

	post "/api/bookmarks" do
		include Warden::Test::Helpers
		parameter :url, "url", required: true
		let(:url) { "http://www.test.com" }

		before (:each) do
      		login_as user, scope: :user
    	end

		example_request "Creating new bookmark" do
			expect(status).to eq 201
			bookmark = JSON.parse(response_body)
			expect(bookmark["url"]).to eq url
			expect(bookmark["type"]).to be_nil
		end
	end

	post "/api/bookmarks" do
		include Warden::Test::Helpers
		parameter :url, "url", required: true
		let(:url) { "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }

		before (:each) do
      		login_as user, scope: :user
    	end

		example_request "Creating new bookmark with youtube url" do
			bookmark = JSON.parse(response_body)
			expect(bookmark["type"]).to eq "YoutubeBookmark"
		end
	end

	post "/api/bookmarks" do
		include Warden::Test::Helpers
		parameter :url, "url", required: true
		let(:url) { "1nv@l1d_Url" }

		before (:each) do
      		login_as user, scope: :user
    	end

		example_request "Creating new bookmark with invalid url" do
			expect(status).to eq 433
		end
	end

	delete "/api/bookmarks/:id" do
		include Warden::Test::Helpers

		let(:bookmarks_owner) { create(:user) }
		
		before (:each) do
      		login_as bookmarks_owner, scope: :user
    	end

    	example "Deleting a single bookmark" do
    		bookmark = create(:bookmark, user: bookmarks_owner)
			do_request(id: bookmark.id)
    		expect(status).to eq 204
    		expect(Bookmark.all.count).to eq 0
    	end

    	example "Deleting multiple bookmarks, with coma separted id's" do
    		bookmarks = create_list(:bookmark, 5, user: bookmarks_owner)

			do_request(id: bookmarks.map {|b| b.id}.join(','))
    		expect(status).to eq 204
    		expect(Bookmark.all.count).to eq 0

    	end

	end



end


