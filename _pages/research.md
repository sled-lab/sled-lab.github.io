---
layout: page
permalink: /research/
title: Research
description:
nav: true
nav_order: 1
images:
  medium_zoom: true
_styles: |
  /* Text-left / figure-right rows. `no-gutters` keeps the row inside the
     1024px article width. The theme grid only ships col-sm-{2,3,4,6,8,9,10,12},
     so the 7/5 split is defined here (page styles are unlayered and win over
     the gem's @layer rules); padding-right restores the gutter between columns. */
  .research-area .row {
    align-items: flex-start;
  }

  .research-area .col-sm-7,
  .research-area .col-sm-5 {
    width: 100%;
    min-height: 1px;
    position: relative;
  }

  @media (min-width: 576px) {
    .research-area .col-sm-7 {
      flex: 0 0 64.5%;
      max-width: 64.5%;
      padding-right: 1rem;
    }

    .research-area .col-sm-5 {
      flex: 0 0 35.5%;
      max-width: 35.5%;
    }
  }

  .research-area .caption {
    text-align: center;
    font-size: 0.9rem;
  }

  /* Keep enlarged diagrams above the fixed navigation (z-index: 1030). */
  .medium-zoom-overlay {
    z-index: 1040;
  }

  .medium-zoom-image--opened {
    z-index: 1041;
  }

  /* One line per paper: titles are pre-shortened with an ellipsis so the
     venue stays visible; this clamp is the fallback on narrower viewports. */
  .rep-pubs a {
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: bottom;
  }

  /* Keyword line right under each area title; body-size text, full article
     width, so every list stays on one line on desktop (~900px). */
  .keywords {
    color: var(--global-text-color-light);
    margin-bottom: 0.75rem;
  }
---

<h3 class="section-divider"></h3>

SLED Lab develops system software for computing platforms that interact with the physical world. We combine learning, scheduling, and domain knowledge to make edge, battery-powered, and AI systems more adaptive, efficient, and reliable.

#### **A. Learning-based system optimization**

<p class="keywords">
  <strong>Keywords:</strong> reinforcement learning · on-device AI · healthcare
</p>

<div class="research-area">
  <div class="row no-gutters">
    <div class="col-sm-7">
      <p>
        We develop learning-based systems that adapt to changing workloads and environments. Our work spans resource
        management and on-device applications, including power control, energy
        prediction, and contactless health monitoring. These methods support adaptive operation across mobile and
        embedded platforms.
      </p>
      <p class="rep-pubs">
        <strong>Representative:</strong><br>
        <a href="{% research_paper_url kwak2025iccad %}">EarDVFS: Environment-Adaptable RL-based DVFS… (ICCAD 2025)</a><br>
        <a href="{% research_paper_url kumar2026jtehm %}">mCardiacDx: Radar-Driven Contactless Monitoring… (JTEHM 2026)</a><br>
        <a href="{% research_paper_url lee2024serenus %}">Serenus: Alleviating Low-Battery Anxiety… (UIST 2024)</a>
      </p>
    </div>
    <div class="col-sm-5">
      <!-- Use the original diagram resolution so medium-zoom can enlarge it. -->
      {%
        include figure.liquid
        path="assets/img/research/a-eardvfs.png"
        class="img-fluid rounded z-depth-1"
        alt="EarDVFS reinforcement learning loop"
        caption="EarDVFS learns the environment and steers the vendor-tuned DVFS governor."
        loading="lazy"
        avoid_scaling=true
        zoomable=true
      %}
    </div>
  </div>
</div>

#### **B. System-level support for battery & energy**

<p class="keywords">
  <strong>Keywords:</strong> battery management systems · embedded systems · energy efficiency
</p>

<div class="research-area">
  <div class="row no-gutters">
    <div class="col-sm-7">
      <p>
        We design system-level methods that improve how batteries are configured, charged, and used across diverse
        applications. Our work supports efficient, reliable operation in mobile devices, large-scale battery systems,
        and electric-vehicle infrastructure.
      </p>
      <p class="rep-pubs">
        <strong>Representative:</strong><br>
        <a href="{% research_paper_url kwak2023mixmax %}">MixMax: Leveraging Heterogeneous Batteries… (MobiSys 2023)</a><br>
        <a href="{% research_paper_url kwak2025tsusc %}">Leveraging Customized Heterogeneous Batteries… (TSUSC 2025)</a><br>
        <a href="{% research_paper_url kwak2025rtas %}">Scheduling EV Battery Swap/Charge Operations (RTAS 2025)</a><br>
        <a href="{% research_paper_url kim2024rac %}">RAC+: Supporting Reconfiguration-Assisted Charging… (TII 2024)</a>
      </p>
    </div>
    <div class="col-sm-5">
      {%
        include figure.liquid
        path="assets/img/research/c-mixmax.png"
        class="img-fluid rounded z-depth-1"
        alt="MixMax overview"
        caption="MixMax co-optimizes battery composition and charge/discharge policies."
        loading="lazy"
        avoid_scaling=true
        zoomable=true
      %}
    </div>
  </div>
</div>

#### **C. Novel resource management framework**

<p class="keywords">
  <strong>Keywords:</strong> scheduling algorithms · AI agents · LLM serving
</p>

<div class="research-area">
  <div class="row no-gutters">
    <div class="col-sm-7">
      <p>
        We develop scheduling and resource-management frameworks that provide predictable performance while
        improving energy efficiency and system lifetime. We are extending these ideas to emerging AI-agent and
        LLM-serving workloads.
      </p>
      <p class="rep-pubs">
        <strong>Representative:</strong><br>
        <a href="{% research_paper_url kwak2019battery %}">Battery Aging Deceleration… (RTSS 2019)</a><br>
        <a href="{% research_paper_url baek2020non %}">Non-Preemptive Real-Time Multiprocessor Scheduling… (RTSS 2020)</a><br>
        <a href="{% research_paper_url kwak2023battery %}">Battery-Aging-Aware Run-Time Slack Management… (JSA 2023)</a><br>
        <a href="{% research_paper_url ha2026iccad %}">CoRT: Supporting Hard and Soft Real-Time Tasks… (ICCAD 2026)</a>
      </p>
    </div>
    <div class="col-sm-5">
      {%
        include figure.liquid
        path="assets/img/research/d-ret.png"
        class="img-fluid rounded z-depth-1"
        alt="RET framework key idea"
        caption="RET controls execution start times within reserved windows to flatten power draw."
        loading="lazy"
        avoid_scaling=true
        zoomable=true
      %}
    </div>
  </div>
</div>
<!-- 
See the full list on the [Publications]({{ '/publications/' | relative_url }}) page. -->
