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

##### **Welcome to <u>S</u>ystems & <u>L</u>earning for <u>E</u>dge <u>D</u>evices Laboratory (SLED Lab)!**

SLED Lab advances learning-driven system software for efficient and intelligent edge devices. We build software and platforms that understand the interaction between computation, power, and hardware resources, enabling next-generation edge systems to adapt, optimize, and scale.


<div class="section-divider"></div>

<h4>
  <a class="home-section-link" href="{{ '/research/' | relative_url }}"><b>Research areas</b></a>
</h4>

A. Learning-based system management\
B. Batter/power management in mobile/mobility systems\
C. System-level supports for mobile user experience\
D. Nobel scheduling algorithm & framework

<div class="row">
  <div class="col-sm-3">
    {%
      include figure.liquid
      path="assets/img/research/a.jpg"
      class="img-fluid rounded z-depth-1"
      alt="Learning-based system management"
      caption="A. EarDVFS (ICCAD 2025)"
      sizes="(min-width: 576px) 200px, 95vw"
      loading="lazy"
      zoomable=true
    %}
  </div>

  <div class="col-sm-3">
    {%
      include figure.liquid
      path="assets/img/research/b.jpg"
      class="img-fluid rounded z-depth-1"
      alt="Battery and power management"
      caption="B. BSSM (RTAS 2025)"
      sizes="(min-width: 576px) 200px, 95vw"
      loading="lazy"
      zoomable=true
    %}
  </div>

  <div class="col-sm-3">
    {%
      include figure.liquid
      path="assets/img/research/c.jpg"
      class="img-fluid rounded z-depth-1"
      alt="Mobile user experience"
      caption="C. MixMax (MobiSys 2023)"
      sizes="(min-width: 576px) 200px, 95vw"
      loading="lazy"
      zoomable=true
    %}
  </div>

  <div class="col-sm-3">
    {%
      include figure.liquid
      path="assets/img/research/d.jpg"
      class="img-fluid rounded z-depth-1"
      alt="Scheduling algorithms and frameworks"
      caption="D. RET (RTSS 2019)"
      sizes="(min-width: 576px) 200px, 95vw"
      loading="lazy"
      zoomable=true
    %}
  </div>
</div>
