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

SLED Lab, the <u>S</u>ystems & <u>L</u>earning for <u>E</u>dge Devices <u>L</u>aboratory, explores where system software meets the physical world — processors, microarchitecture, batteries, power, and heat. We replace hand-tuned rules with learning, domain expertise, and scheduling theory, validated on edge devices from smartphones to electric vehicles.

**We are always looking for motivated students to join us — please see [Contact]({{ '/contact/' | relative_url }}).**

<div class="section-divider"></div>

<h4>
  <a class="home-section-link" href="{{ '/research/' | relative_url }}"><b>Research areas</b></a>
</h4>

A. Learning-based system management\
B. Battery/power management in mobile systems\
C. System-level supports for mobile user experience\
D. Novel scheduling algorithm & framework

<div class="row research-area-grid">
  <div class="col-sm-3">
    {%
      include figure.liquid
      path="assets/img/research/a.jpg"
      class="img-fluid rounded z-depth-1"
      alt="Learning-based system management"
      caption="A. EarDVFS (ICCAD 2025)"
      sizes="(min-width: 576px) 200px, 45vw"
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
      sizes="(min-width: 576px) 200px, 45vw"
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
      sizes="(min-width: 576px) 200px, 45vw"
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
      sizes="(min-width: 576px) 200px, 45vw"
      loading="lazy"
      zoomable=true
    %}
  </div>
</div>
