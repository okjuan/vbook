module PostSeriesLinks
  class PostSeriesLinksGenerator < Jekyll::Generator
    safe true

    def generate(site)
      post_series = {}
      site.posts.docs.each do |post|
        match_data = post.data['title'].match(/^(.*?)(?:\s*#(\d+))?\s*$/)

        # e.g. 'how to tell a story #3' => 'how to tell a story'
        series_title = match_data[1].strip

        # e.g. 'how to tell a story #3' => 3
        # e.g. 'how to tell a story' => 1
        post_number = match_data[2] ? match_data[2].to_i : 1

        if post_series.key?(series_title)
          if post_series[series_title].key?(post_number)
            error_message = <<~ERROR
              There should only be one post per series #number but found two:
              1) #{post.data['title']}
              2) #{post_series[series_title][post_number].data['title']}
            ERROR
            raise error_message
          end

          post_series[series_title][post_number] = post
          post.data['number_in_series'] = post_number
        else
          post_series[series_title] = {post_number => post}
        end
      end

      post_series.each do |series_title, posts|
        posts.each do |post_number, post|
          post.data['in_post_series'] = true
          post.data['number_in_series'] = post_number
          post.data['series_total'] = posts.size
          post.data['series_name'] = series_title
          post.data['prev_post_in_series'] = posts[post_number - 1]
          post.data['next_post_in_series'] = posts[post_number + 1]
        end
      end
    end
  end
end