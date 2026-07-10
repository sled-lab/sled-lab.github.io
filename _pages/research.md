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
  article p:has(+ ul) {
    margin-bottom: 0.25rem;
  }

  /* Text-left / figure-right rows. `no-gutters` keeps the row inside the
     930px article width. The theme grid only ships col-sm-{2,3,4,6,8,9,10,12},
     so the 7/5 split is defined here (page styles are unlayered and win over
     the gem's @layer rules); padding-right restores the gutter between columns. */
  .research-area .row {
    align-items: center;
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
      padding-right: 1.5rem;
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

SLED Lab builds system software for the layer where computing meets the physical world — processors, batteries, power, and heat — on edge devices from smartphones to electric vehicles. Today this software follows rules fixed at design time, blind to each device's workload, user, and environment; we replace those rules with run-time learning, grounded in scheduling theory and domain expertise. Our results range from DVFS governors that learn their thermal surroundings (ICCAD 2025) to smartphone batteries that cut users' low-battery time (MobiSys 2023) and schedulers that more than double battery lifespan (RTSS 2019); we are now bringing the same principles to AI agents and LLM serving.

#### **A. Learning-based system optimization**

<p class="keywords">
  <strong>Keywords:</strong> reinforcement learning · on-device AI · healthcare
</p>

<div class="research-area">
  <div class="row no-gutters">
    <div class="col-sm-7">
      <p>
        Rule-based system software — DVFS governors, thermal throttling — is tuned by vendors for universal use
        cases, so it cannot adapt to each app's workload or the device's thermal environment.
        <strong>EarDVFS</strong> (ICCAD 2025) is a reinforcement-learning DVFS governor that steers, rather than
        replaces, the vendor-tuned governor, improving power efficiency by <strong>21.6% on average</strong>.
        The same learning-driven approach powers on-device applications, from contactless arrhythmia diagnosis
        with radar (<strong>mCardiacDx</strong>, JTEHM 2026) to real-time per-app energy prediction
        (<strong>Serenus</strong>, UIST 2024).
      </p>
      <p class="rep-pubs">
        <strong>Representative:</strong><br>
        <a href="{{ '/assets/pdf/25-eardvfsenvironment.pdf' | relative_url }}">EarDVFS: Environment-Adaptable RL-based DVFS… (ICCAD 2025)</a><br>
        <a href="{{ '/assets/pdf/26-mcardiacdxradar.pdf' | relative_url }}">mCardiacDx: Radar-Driven Contactless Monitoring… (JTEHM 2026)</a><br>
        <a href="{{ '/assets/pdf/24-serenusalleviating.pdf' | relative_url }}">Serenus: Alleviating Low-Battery Anxiety… (UIST 2024)</a>
      </p>
    </div>
    <div class="col-sm-5">
      {%
        include figure.liquid
        path="assets/img/research/a-eardvfs.png"
        class="img-fluid rounded z-depth-1"
        alt="EarDVFS reinforcement learning loop"
        caption="EarDVFS learns the environment and steers the vendor-tuned DVFS governor."
        sizes="(min-width: 576px) 360px, 92vw"
        loading="lazy"
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
        A battery's real capability is set not only by its chemistry but by the system software that charges,
        discharges, and combines its cells. <strong>MixMax</strong> (MobiSys 2023) mixes three complementary
        battery types on a smartphone and co-optimizes their ratio and charge/discharge policies, cutting
        users' low-battery time by <strong>up to 24.6%</strong>. The same system-level approach extends to
        large-scale battery systems and EV infrastructure, from reconfiguration-assisted charging (TII 2024)
        to wait-time-guaranteed battery swap stations (RTAS 2025).
      </p>
      <p class="rep-pubs">
        <strong>Representative:</strong><br>
        <a href="{{ '/assets/pdf/23-mixmaxleveraging.pdf' | relative_url }}">MixMax: Leveraging Heterogeneous Batteries… (MobiSys 2023)</a><br>
        <a href="{{ '/assets/pdf/25-leveragingcustomized.pdf' | relative_url }}">Leveraging Customized Heterogeneous Batteries… (TSUSC 2025)</a><br>
        <a href="{{ '/assets/pdf/25-schedulingev.pdf' | relative_url }}">Scheduling EV Battery Swap/Charge Operations (RTAS 2025)</a><br>
        <a href="{{ '/assets/pdf/24-racsupporting.pdf' | relative_url }}">RAC+: Supporting Reconfiguration-Assisted Charging… (TII 2024)</a>
      </p>
    </div>
    <div class="col-sm-5">
      {%
        include figure.liquid
        path="assets/img/research/c-mixmax.png"
        class="img-fluid rounded z-depth-1"
        alt="MixMax overview"
        caption="MixMax co-optimizes battery composition and charge/discharge policies."
        sizes="(min-width: 576px) 360px, 92vw"
        loading="lazy"
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
        Scheduling shapes the physical behavior of a system, not just its deadlines. We showed that task
        scheduling systematically affects battery aging (<strong>RTSS 2019</strong>): our
        <strong>RET (Reserved Execution Time)</strong> framework keeps offline timing guarantees intact while
        runtime heuristics flatten the power draw, extending battery lifespan by <strong>up to 144.4%</strong>.
        We are now carrying these principles to AI-agent workloads: <strong>cache- and
        microarchitecture-aware CPU affinity management</strong> speeds up concurrently running AI agents
        (under submission), a first step toward power- and thermal-aware scheduling for LLM-serving systems.
      </p>
      <p class="rep-pubs">
        <strong>Representative:</strong><br>
        <a href="{{ '/assets/pdf/19-batteryagingdeceleration.pdf' | relative_url }}">Battery Aging Deceleration… (RTSS 2019)</a><br>
        <a href="{{ '/assets/pdf/20-nonpreemptive.pdf' | relative_url }}">Non-Preemptive Real-Time Multiprocessor Scheduling… (RTSS 2020)</a><br>
        <a href="{{ '/assets/pdf/23-batteryagingaware.pdf' | relative_url }}">Battery-Aging-Aware Run-Time Slack Management… (JSA 2023)</a>
      </p>
    </div>
    <div class="col-sm-5">
      {%
        include figure.liquid
        path="assets/img/research/d-ret.png"
        class="img-fluid rounded z-depth-1"
        alt="RET framework key idea"
        caption="RET controls execution start times within reserved windows to flatten power draw."
        sizes="(min-width: 576px) 360px, 92vw"
        loading="lazy"
        zoomable=true
      %}
    </div>
  </div>
</div>
<!-- 
See the full list on the [Publications]({{ '/publications/' | relative_url }}) page. -->
