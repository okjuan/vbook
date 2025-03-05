module Redirects
    class RedirectPageGenerator < Jekyll::Generator
      safe true

      def generate(site)
        puts "\n\nProcessing redirects!"
        site.data['redirects'].each do |redirect|
          puts "Processing redirect: #{redirect['from_path']} => #{redirect['to_path']}"
          # TODO: make sure this plugin runs at the end of the build, when all other posts and pages have been generated
          # TODO: check if 'to' exists
          site.pages << RedirectPage.new(site, redirect['from_path'], redirect['to_path'])
        end
        puts "Done processing redirects!\n\n"
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