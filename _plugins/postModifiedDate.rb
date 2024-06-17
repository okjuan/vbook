require 'git'

module Jekyll
  class PostModifiedDate < Generator
    priority :highest

    def generate(site)
      g = Git.open(site.source)
      site.posts.docs.each do |post|
        path = post.path
        commit_date = g.log.path(path).first.date
        post.data['modified_date'] = commit_date
      end
    end
  end
end