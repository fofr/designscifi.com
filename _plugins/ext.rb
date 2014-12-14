require "jekyll-assets"

# via https://github.com/ixti/jekyll-assets/blob/master/README.md
# bootstrap requires minimum precision of 10, see https://github.com/twbs/bootstrap-sass/issues/409
::Sass::Script::Number.precision = [10, ::Sass::Script::Number.precision].max

require "jekyll-assets/bootstrap"
