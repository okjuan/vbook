module Redirects
    class RedirectPageGenerator < Jekyll::Generator
      safe true

      def generate(site)
        all_redirects = {}
        site.posts.docs.each do |post|
          if post.data['redirect_from']
            post.data['redirect_from'].each do |redirect|
              from_path = redirect
              to_path = "#{site.baseurl}#{post['permalink']}"
              if all_redirects.key?(from_path)
                error_message = <<~ERROR
                    Duplicate redirect found: '#{from_path}'
                    Can't redirect '#{from_path}' to '#{to_path}' because there is already a redirect from '#{from_path}' to '#{all_redirects[from_path]}'
                ERROR
                raise error_message
              end
              all_redirects[from_path] = to_path
              site.pages << RedirectPage.new(site, from_path, to_path)
            end
          end
        end
      end
    end

  class RedirectPage < Jekyll::Page
    def initialize(site, from_path, to_path)
      @site = site             # the current site instance.
      @base = site.source      # path to the source directory.
      @dir  = from_path        # the directory the page will reside in.

      # All pages have the same filename, so define attributes straight away.
      @basename = 'index'      # filename without the extension.
      @ext      = '.html'      # the extension.
      @name     = 'index.html' # basically @basename + @ext.

      # Initialize data hash with a key pointing to redirect destination.
      # This allows the redirect_page.html template to access `page.to_path`.
      @data = {
        'to_path' => to_path,
        'layout' => 'redirect_page'
      }
    end

    # Placeholders that are used in constructing page URL.
    def url_placeholders
      {
        :path       => @dir,
        :basename   => basename,
        :output_ext => output_ext,
      }
    end
  end
end