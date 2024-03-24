require 'nokogiri'

module Jekyll
  class HoverCards < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
        # runs when entire site has been rendered, but before any files are written.
        # this prevents issues where linked_post.content for newer posts are still raw Markdown
        Jekyll::Hooks.register :site, :post_render do |site|
            site.posts.docs.each do |post|
                preserveParagraphs(post)
            end
            site.posts.docs.each do |post|
                insertHoverCards(post, site)
            end
        end
    end

    def preserveParagraphs(post)
        post.output = post.output.gsub(/<p>(.*?)<\/p>/m, '<div class="paragraph"><p>\1</p></div>')
    end

    def insertHoverCards(post, site)
        post.output = post.output.gsub(/<a id="(.*?)" class="internal-site-link"(.*?)<\/a>/) do
          id = $1
          restOfLink = $2
          linked_post = site.posts.docs.find { |post| post.id == id }
          title = linked_post.data['title']

          doc = Nokogiri::HTML::DocumentFragment.parse(linked_post.output)
          # Remove 'internal-site-link' class from all a tags
          doc.css('a.internal-site-link').each do |link|
              link['class'] = link['class'].split(' ').reject { |c| c == 'internal-site-link' }.join(' ')
          end

          # Remove all .hover-card-container divs and their descendants
          doc.search('.hover-card-container').remove

          content_match = doc.to_html.match(/<main class="page-content(.*?)>(.*?)<\/main>/m)
          content = content_match ? content_match[2] : ''
          "</p><a class='hover-link' #{restOfLink}</a><div class='hover-card-container'><div class='hover-card'>#{content}</div></div><p>"
        end
    end
  end
end