module PostSeriesLinks
  class PostSeriesLinksGenerator < Jekyll::Generator
    safe true

    def generate(site)
      post_series = {}
      site.posts.docs.each do |post|
        # e.g. 'how to tell a story #3' => 'how to tell a story'
        series_title = post.data['title'].sub(/\s*#\d+\s*$/, '')
        # if series_title != post.data['title']
          # puts "#{post.data['title']} => #{series_title}"
        # end
        if post_series.key?(series_title)
          puts "Putting post '#{post.data['title']}' in series '#{series_title}'"

          # page.in_post_series
          post_series[series_title][0].data['in_post_series'] = true
          post.data['in_post_series'] = true

          # post.number_in_series
          # post.series_total
          # post.series_name
          # post.prev_post_in_series
          # post.next_post_in_series

          post_series[series_title] << post
        else
          post_series[series_title] = [post]
        end
      end
    end
  end
end