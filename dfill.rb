require 'sinatra'
require 'haml'
require 'data_mapper'
require 'dm-sqlite-adapter'



# DB

DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/dfill.db")

class Line
    include DataMapper::Resource
    property :id, Serial
    property :content, Text, :required => true
end

DataMapper.finalize.auto_upgrade!



# HTTP auth

helpers do
    def protected!
        return if authorized?
        headers['WWW-Authenticate'] = 'Basic realm="Restricted Area"'
        halt 401, "Not authorized\n"
    end

    def authorized?
        @auth ||=  Rack::Auth::Basic::Request.new(request.env)
        @auth.provided? and @auth.basic? and @auth.credentials and @auth.credentials == ['admin', 'admin']
    end
end



# ROUTES - Front-end

get '/' do
    @message = 'Ma teub'
    haml :index
end



# ROUTES - API

#



# ROUTES - Back-end

get '/admin' do
    protected!
    @lines = Line.all :order => :id.desc
    haml :admin
end

post '/admin' do
    protected!
    (1..5).each do |counter|
        line = Line.new
        line.content = params["line#{counter}"]
        line.save
    end

    redirect '/admin'
    nil
end

get '/admin/delete/:id' do
    protected!
    line = Line.get params[:id]
    line.destroy

    redirect '/admin'
    nil
end