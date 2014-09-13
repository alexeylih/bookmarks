class Api::V1::BookmarksController < ApplicationController
	respond_to :json
	before_filter :authenticate_user!

	def index
		respond_with current_user.bookmarks
	end

	def show
	end

	def create
		@bookmark = Bookmark.new(url: params[:url])
		@bookmark.user = current_user

		if @bookmark.save
        	respond_with @bookmark, :location => api_bookmarks_path
	    else        
        	render :json => { :errors => @bookmark.errors }, :status => 433  
    	end
	end

	def destroy
    	respond_with :api, Bookmark.where(id: params[:id].split(',')).destroy_all
  	end

	private

	def bookmark_params
		params.require(:url)
	end
end
