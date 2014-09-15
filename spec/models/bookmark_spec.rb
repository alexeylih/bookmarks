require 'spec_helper'

describe Bookmark do
  it "has a valid factory" do
    expect(build(:bookmark)).to be_valid
  end

  let(:bookmark) { create(:bookmark) }

  describe "ActiveModel validations" do
    context "Basic validations" do
      it { should validate_presence_of :user }
      it { should validate_presence_of :url }
      it { should belong_to :user }
  	end

	context "Url validations" do
      it { should_not allow_value("not a url").for(:url)}
      it { should_not allow_value("www.test.com").for(:url)}
      it { should allow_value("http://www.test.com").for(:url)}
    end
  end

end