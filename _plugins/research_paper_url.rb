require "jekyll/scholar"

module SledLab
  # Keep representative paper links in sync with the Publications bibliography.
  class ResearchPaperUrl < Liquid::Tag
    include Jekyll::Scholar::Utilities
    include Jekyll::Filters

    def initialize(tag_name, key, tokens)
      super
      @key = key.strip
      @config = Jekyll::Scholar.defaults.dup
    end

    def render(context)
      set_context_to(context)
      update_dependency_tree
      entry = bibliography[@key]
      fallback = entry ? "/publications/##{@key}" : "/publications/"
      return relative_url(fallback) unless entry

      %i[paper pdf].each do |field|
        path = entry[field].to_s.strip
        next if path.empty?
        return path if path.match?(%r{\Ahttps?://}i)

        path = "/assets/pdf/#{path.delete_prefix('/')}" unless path.start_with?("/assets/pdf/")
        return relative_url(path) if site.static_files.any? { |file| file.relative_path == path }
      end

      relative_url(fallback)
    end
  end
end

Liquid::Template.register_tag("research_paper_url", SledLab::ResearchPaperUrl)
