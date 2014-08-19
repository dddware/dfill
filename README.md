# DFILL

_Generate placeholder text with song lyrics_

## Install

    // Clone the repository
    $ git clone git@github.com:dddware/dfill.git
    $ cd dfill

    // Install dependencies
    $ bundle install

    // Run application
    // Run sass watch for integration
    $ sass --watch stylesheets/style.sass:public/stylesheets.style.css
    $ bundle exec ruby dfill.rb -p 3002

## Administration

Create a `config.rb` file at the application root with the following contents :

    $config = {
        :login => 'dfill',
        :password => 'yourpassword'
    }

You will then be able to reach `/admin` and manage the shit out of your lines.
