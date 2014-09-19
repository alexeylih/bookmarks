class Api::V1::BookmarksController < ApplicationController
	respond_to :json
	before_filter :authenticate_user!
	protect_from_forgery :except => [:delete, :create]


	def index
		respond_with current_user.bookmarks
	end

	def show
		respond_with current_user.bookmarks.find(params[:id])
	end

	def create
		@bookmark = BookmarkFactory.create(params[:url])
		@bookmark.user = current_user
		
		@bookmark.save!
		@bookmark.load_extra_info
		respond_with @bookmark, :location => api_bookmarks_path
	end

	def destroy
		respond_with :api, current_user.bookmarks.where(id: params[:id].split(',')).destroy_all
	end

	private

	def bookmark_params
		params.require(:url)
	end

end
