---
layout: page
permalink: /research/
title: Research
description:
nav: true
nav_order: 1
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
---


<h3 class="section-divider"></h3>

SLED Lab builds system software for the layer where computing meets the physical world — processors, batteries, power, and heat — on edge devices from smartphones to electric vehicles. Today this software follows rules fixed at design time, blind to each device's workload, user, and environment; we replace those rules with run-time learning, grounded in scheduling theory and domain expertise. Our results range from DVFS governors that learn their thermal surroundings (ICCAD 2025) and battery swap stations that guarantee EV wait times (RTAS 2025), to heterogeneous smartphone batteries that cut users' low-battery time (MobiSys 2023) and real-time schedulers that more than double battery lifespan (RTSS 2019).

#### **A. Learning-based system management**

<div class="research-area">
  <div class="row no-gutters">
    <div class="col-sm-7">
      <p>
        Rule-based system software — DVFS governors, thermal throttling — is tuned by vendors for universal use
        cases, so it cannot adapt to each app's workload or the device's thermal environment.
        <strong>EarDVFS</strong> (ICCAD 2025) is a reinforcement-learning DVFS governor that steers, rather than
        replaces, the vendor-tuned governor, improving power efficiency by
        <strong>21.6% on average (up to 49.6%)</strong> across devices, apps, and ambient temperatures.
      </p>
      <p class="rep-pubs">
        <strong>Representative:</strong><br>
        <a href="{{ '/assets/pdf/25-eardvfsenvironment.pdf' | relative_url }}">EarDVFS: Environment-Adaptable RL-based DVFS… (ICCAD 2025)</a>
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

#### **B. Battery/power management in mobile systems**

<div class="research-area">
  <div class="row no-gutters">
    <div class="col-sm-7">
      <p>
        Battery swap stations replace a discharged EV battery pack in minutes, yet give drivers no guarantee on
        how long they will wait. We made the first real-time scheduling formulation of swap/charge operations
        (<strong>RTAS 2025</strong>) and developed <strong>battery swap station management (BSSM)</strong> policies
        that guarantee each EV's wait time under real-world arrival patterns.
      </p>
      <p class="rep-pubs">
        <strong>Representative:</strong><br>
        <a href="{{ '/assets/pdf/25-schedulingev.pdf' | relative_url }}">Scheduling EV Battery Swap/Charge Operations (RTAS 2025)</a><br>
        <a href="{{ '/assets/pdf/24-racsupporting.pdf' | relative_url }}">RAC+: Supporting Reconfiguration-Assisted Charging… (TII 2024)</a><br>
        <a href="{{ '/assets/pdf/19-minimizingcapacity.pdf' | relative_url }}">Minimizing Capacity Degradation of Heterogeneous Batteries… (ESL 2019)</a>
      </p>
    </div>
    <div class="col-sm-5">
      {%
        include figure.liquid
        path="assets/img/research/b-bssm.png"
        class="img-fluid rounded z-depth-1"
        alt="Overview of a battery swap station"
        caption="Swapping machines, chargers, and spare packs are co-scheduled for wait-time guarantees."
        sizes="(min-width: 576px) 360px, 92vw"
        loading="lazy"
        zoomable=true
      %}
    </div>
  </div>
</div>

#### **C. System-level supports for mobile user experience**

<div class="research-area">
  <div class="row no-gutters">
    <div class="col-sm-7">
      <p>
        Starting from <strong>19,855 hours</strong> of battery usage from 100 real users,
        <strong>MixMax</strong> (MobiSys 2023) mixes three complementary battery types and co-optimizes their
        ratio and charge/discharge policies. It cuts users' low-battery time by <strong>up to 24.6%</strong> —
        without changing capacity, volume, weight, or how users charge — and runs on a real smartphone prototype.
      </p>
      <p class="rep-pubs">
        <strong>Representative:</strong><br>
        <a href="{{ '/assets/pdf/23-mixmaxleveraging.pdf' | relative_url }}">MixMax: Leveraging Heterogeneous Batteries… (MobiSys 2023)</a><br>
        <a href="{{ '/assets/pdf/25-leveragingcustomized.pdf' | relative_url }}">Leveraging Customized Heterogeneous Batteries… (TSUSC 2025)</a><br>
        <a href="{{ '/assets/pdf/24-serenusalleviating.pdf' | relative_url }}">Serenus: Alleviating Low-Battery Anxiety… (UIST 2024)</a><br>
        <a href="{{ '/assets/pdf/26-mcardiacdxradar.pdf' | relative_url }}">mCardiacDx: Radar-Driven Contactless Monitoring… (JTEHM 2026)</a>
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

#### **D. Novel scheduling algorithm & framework**

<div class="research-area">
  <div class="row no-gutters">
    <div class="col-sm-7">
      <p>
        Scheduling shapes the physical behavior of a system, not just its deadlines. We showed that task
        scheduling systematically affects battery aging (<strong>RTSS 2019</strong>): our
        <strong>RET (Reserved Execution Time)</strong> framework keeps offline timing guarantees intact while
        runtime heuristics flatten the power draw, extending battery lifespan by <strong>up to 144.4%</strong>.
      </p>
      <p class="rep-pubs">
        <strong>Representative:</strong><br>
        <a href="{{ '/assets/pdf/19-batteryagingdeceleration.pdf' | relative_url }}">Battery Aging Deceleration… (RTSS 2019)</a><br>
        <a href="{{ '/assets/pdf/20-nonpreemptive.pdf' | relative_url }}">Non-Preemptive Real-Time Multiprocessor Scheduling… (RTSS 2020)</a><br>
        <a href="{{ '/assets/pdf/23-batteryagingaware.pdf' | relative_url }}">Battery-Aging-Aware Run-Time Slack Management… (JSA 2023)</a><br>
        <a href="{{ '/assets/pdf/19-coverttimingchannel.pdf' | relative_url }}">Covert Timing Channel Design… (PDCAT 2019)</a>
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

See the full list on the [Publications]({{ '/publications/' | relative_url }}) page.
