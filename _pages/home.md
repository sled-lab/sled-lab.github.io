---
layout: about
title: Home
permalink: /
subtitle: Systems & Learning for Edge Devices

# profile:
#   align: right
#   image: prof_pic.jpg
#   image_circular: false # crops the image to make it circular
#   more_info: >
#     <p>555 your office number</p>
#     <p>123 your address street</p>
#     <p>Your City, State 12345</p>

selected_papers: true # includes a list of papers marked as "selected={true}"
social: false # includes social icons at the bottom of the page

announcements:
  enabled: true # includes a list of news items
  scrollable: true # adds a vertical scroll bar if there are more than 3 news items
  limit: 5 # leave blank to include all the news in the `_news` folder

latest_posts:
  enabled: false
  scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
  limit: 3 # leave blank to include all the blog posts
---

<div class="section-divider"></div>

SLED Lab, the <u>S</u>ystems & <u>L</u>earning for <u>E</u>dge Devices <u>L</u>aboratory, explores where systems meet the physical world — power, heat, batteries, microarchitecture, and processors. We replace hand-tuned rules with learning, domain expertise, and scheduling theory, validated on edge devices from smartphones to electric vehicles.

**We are always looking for motivated students to join us — please see [Contact]({{ '/contact/' | relative_url }}).**

<div class="section-divider"></div>

{% assign research_url = '/research/' | relative_url %}

<h4>
  <a class="home-section-link" href="{{ research_url }}"><b>Research areas</b></a>
</h4>

<a class="research-area-summary-link" href="{{ research_url }}">A. Learning-based system optimization</a>\
<a class="research-area-summary-link" href="{{ research_url }}">B. System-level support for battery & energy</a>\
<a class="research-area-summary-link" href="{{ research_url }}">C. Novel resource management framework</a>

<div class="row research-area-grid">
  <div class="col-sm-4">
    <a
      class="research-area-card-link"
      href="{{ research_url }}"
      aria-label="View research area A: Learning-based system optimization"
    >
      {%
        include figure.liquid
        path="assets/img/research/a.jpg"
        class="img-fluid rounded z-depth-1"
        alt="Learning-based system optimization"
        caption="A. EarDVFS (ICCAD 2025)"
        sizes="(min-width: 576px) 250px, 45vw"
        loading="lazy"
      %}
    </a>
  </div>

  <div class="col-sm-4">
    <a
      class="research-area-card-link"
      href="{{ research_url }}"
      aria-label="View research area B: System-level support for battery and energy"
    >
      {%
        include figure.liquid
        path="assets/img/research/c.jpg"
        class="img-fluid rounded z-depth-1"
        alt="Battery and power management"
        caption="B. MixMax (MobiSys 2023)"
        sizes="(min-width: 576px) 250px, 45vw"
        loading="lazy"
      %}
    </a>
  </div>

  <div class="col-sm-4">
    <a
      class="research-area-card-link"
      href="{{ research_url }}"
      aria-label="View research area C: Novel resource management framework"
    >
      {%
        include figure.liquid
        path="assets/img/research/d.jpg"
        class="img-fluid rounded z-depth-1"
        alt="Scheduling algorithms and frameworks"
        caption="C. RET (RTSS 2019)"
        sizes="(min-width: 576px) 250px, 45vw"
        loading="lazy"
      %}
    </a>
  </div>
</div>
