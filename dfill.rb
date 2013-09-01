require 'sinatra'
require 'haml'
require 'data_mapper'
require 'dm-sqlite-adapter'
require 'json'



# DB

DataMapper::setup(:default, "sqlite3://#{Dir.pwd}/dfill.db")

class Line
    include DataMapper::Resource
    property :id, Serial
    property :content, Text, :required => true, :length => 255
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

range = {
    :min => 1,
    :max => 100,
    :value => 10
}

get '/' do
    @range = range
    haml :index
end

get '/api/:count' do
    count = params[:count].to_i

    unless (count >= range[:min] && count <= range[:max]) then
        halt 400
    end

    lines = Line.all.map(&:content)

    while (lines.length < count) do
        lines.concat(lines)
    end

    lines.shuffle!.slice!(0, lines.length - count)

    content_type :json
    lines.to_json
end



# ROUTES - Back-end

get '/admin' do
    protected!
    @range = range
    @lines = Line.all :order => :id.desc

    haml :admin
end

post '/admin' do
    protected!
    (1..range[:value]).each do |counter|
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