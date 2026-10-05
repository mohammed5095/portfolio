/**
 * MOHAMMED EID GABER ABBAS — PROFESSIONAL PORTFOLIO
 * Core Script: Interactivity, Dynamic Case Studies, Themes & Recruiter Tools
 * Author: Senior Frontend Engineer
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initScrollSpy();
  initHeroViewSwitcher();
  initInteractiveHeroDashboard();
  initProjectInteractiveMockups();
  initCaseStudyModal();
  initCvModal();
  initContactForm();
  initCopyUtilities();
  initSmoothScroll();
});

/* ==========================================================================
   1. THEME MANAGEMENT (DARK / LIGHT)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('theme-preference');

  // Default to dark theme for executive BI feel unless previously set
  const initialTheme = storedTheme || 'dark';
  document.documentElement.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme-preference', targetTheme);
      showToast(`Switched to ${targetTheme === 'dark' ? 'Executive Dark' : 'Clean Light'} theme`);
    });
  }
}

/* ==========================================================================
   2. NAVIGATION & MOBILE DRAWER
   ========================================================================== */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   3. SCROLL SPY (ACTIVE NAV LINK)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ==========================================================================
   3B. HERO VIEW SWITCHER (PORTRAIT PROFILE VS. BI DASHBOARD)
   ========================================================================== */
function initHeroViewSwitcher() {
  const tabPortrait = document.getElementById('tab-hero-portrait');
  const tabBi = document.getElementById('tab-hero-bi');
  const portraitView = document.getElementById('hero-portrait-container');
  const biView = document.getElementById('hero-bi-container');

  if (tabPortrait && tabBi && portraitView && biView) {
    tabPortrait.addEventListener('click', () => {
      tabPortrait.classList.add('active');
      tabBi.classList.remove('active');
      portraitView.style.display = 'flex';
      biView.style.display = 'none';
    });

    tabBi.addEventListener('click', () => {
      tabBi.classList.add('active');
      tabPortrait.classList.remove('active');
      portraitView.style.display = 'none';
      biView.style.display = 'block';
    });
  }
}

/* ==========================================================================
   4. INTERACTIVE HERO DASHBOARD SHOWCASE
   ========================================================================== */
function initInteractiveHeroDashboard() {
  const slicerBtns = document.querySelectorAll('.hero-visual-card .slicer-btn');
  const metricBoxes = document.querySelectorAll('.hero-visual-card .metric-box');
  const chartPath = document.getElementById('hero-chart-path');
  const chartArea = document.getElementById('hero-chart-area');
  const chartTitle = document.getElementById('hero-chart-title');

  const dashboardStates = {
    overview: {
      title: "Business Performance Metric Trends",
      metrics: [
        { label: "Sales Metric Index", value: "98.4%", meta: "+4.2% vs target", positive: true },
        { label: "Reporting Efficiency", value: "High", meta: "Real-time sync", positive: true },
        { label: "Monitored KPIs", value: "24", meta: "Executive level", positive: true },
        { label: "Variance Rate", value: "±1.8%", meta: "Within threshold", positive: false }
      ],
      pathD: "M 0 70 Q 75 40, 150 55 T 300 30 T 450 15",
      areaD: "M 0 70 Q 75 40, 150 55 T 300 30 T 450 15 L 450 100 L 0 100 Z"
    },
    sales: {
      title: "Sales Volume & Regional Distribution",
      metrics: [
        { label: "Top Product Line", value: "Tech Goods", meta: "Leading category", positive: true },
        { label: "Fulfillment Rate", value: "99.1%", meta: "On-time delivery", positive: true },
        { label: "Channel Count", value: "4 Regions", meta: "Balanced spread", positive: true },
        { label: "Return Frequency", value: "Low", meta: "Under benchmark", positive: true }
      ],
      pathD: "M 0 85 Q 90 60, 180 35 T 320 45 T 450 20",
      areaD: "M 0 85 Q 90 60, 180 35 T 320 45 T 450 20 L 450 100 L 0 100 Z"
    },
    financial: {
      title: "Financial Statement & Ratio Alignment",
      metrics: [
        { label: "Gross Margin Ratio", value: "Stable", meta: "Consistent trend", positive: true },
        { label: "Cost Allocation", value: "Optimized", meta: "Variance checked", positive: true },
        { label: "Reconciliation Status", value: "100%", meta: "Fully audited", positive: true },
        { label: "Working Capital Health", value: "Sound", meta: "Liquidity verified", positive: true }
      ],
      pathD: "M 0 50 Q 80 55, 160 40 T 310 25 T 450 10",
      areaD: "M 0 50 Q 80 55, 160 40 T 310 25 T 450 10 L 450 100 L 0 100 Z"
    }
  };

  slicerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      slicerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const view = btn.getAttribute('data-view');
      const state = dashboardStates[view];

      if (state) {
        if (chartTitle) chartTitle.textContent = state.title;

        // Update metric values
        metricBoxes.forEach((box, idx) => {
          if (state.metrics[idx]) {
            const labelEl = box.querySelector('.metric-label');
            const valEl = box.querySelector('.metric-value');
            const metaEl = box.querySelector('.metric-meta');

            if (labelEl) labelEl.textContent = state.metrics[idx].label;
            if (valEl) valEl.textContent = state.metrics[idx].value;
            if (metaEl) {
              metaEl.textContent = state.metrics[idx].meta;
              metaEl.className = `metric-meta ${state.metrics[idx].positive ? 'positive' : 'neutral'}`;
            }
          }
        });

        // Smoothly animate SVG path
        if (chartPath && chartArea) {
          chartPath.setAttribute('d', state.pathD);
          chartArea.setAttribute('d', state.areaD);
        }
      }
    });
  });
}

/* ==========================================================================
   5. PROJECT REAL SCREENSHOT SHOWCASE & LIGHTBOX INSPECTION
   ========================================================================== */
function initProjectInteractiveMockups() {
  // Project 1 Power BI sub-tabs (Report View, Data Model, KPI Target)
  const p1Tabs = document.querySelectorAll('#p1-mockup .mini-tab');
  const p1Img = document.getElementById('p1-displayed-img');
  const p1Trigger = document.getElementById('p1-img-trigger');
  const p1CaptionStrip = document.getElementById('p1-img-caption-strip');

  p1Tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      p1Tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const imgSrc = tab.getAttribute('data-img');
      const caption = tab.getAttribute('data-caption');

      if (p1Img && imgSrc) {
        p1Img.src = imgSrc;
        if (p1Trigger) {
          p1Trigger.setAttribute('data-zoom-img', imgSrc);
          p1Trigger.setAttribute('data-zoom-caption', caption);
        }
        if (p1CaptionStrip) {
          p1CaptionStrip.textContent = `View: ${tab.textContent.trim()}`;
        }
      }
    });
  });

  // Skills filter buttons
  const skillFilters = document.querySelectorAll('.skill-filter-btn');
  const skillCategories = document.querySelectorAll('.skill-category-card');

  skillFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-skill-filter');

      skillCategories.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Initialize Lightbox on clickable screenshot frames
  initLightbox();
}

function initLightbox() {
  const lightboxModal = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const zoomTriggers = document.querySelectorAll('.project-screenshot-frame');

  if (!lightboxModal) return;

  function openLightbox(src, caption) {
    if (lightboxImg) lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || 'Project Screenshot';
    lightboxModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  zoomTriggers.forEach(frame => {
    frame.addEventListener('click', () => {
      const src = frame.getAttribute('data-zoom-img') || frame.querySelector('img').src;
      const caption = frame.getAttribute('data-zoom-caption') || frame.querySelector('img').alt;
      openLightbox(src, caption);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   6. CASE STUDY MODAL (STRUCTURED DEEP DIVE WITH REAL ARCHITECTURE)
   ========================================================================== */
const caseStudiesData = {
  project1: {
    tag: "Power BI Case Study",
    title: "Sales Store Analytics Dashboard",
    overview: "An enterprise-grade Power BI retail analytics dashboard engineered on top of a multi-table relational model (Kimball Star Schema). The dashboard visualizes sales volume ($575.46K Total Sales), profitability ($52K Total Profit), profit margin (9% actual, 12% target gauge), and cumulative running totals across time, categories, and geographic markets.",
    objective: "To eliminate fragmented multi-spreadsheet reporting and provide retail decision-makers with a single, consolidated BI source of truth for monitoring sales performance, evaluating margin distribution, and isolating underperforming product lines or territories.",
    tools: ["Power BI Desktop", "Kimball Star Schema Data Modeling", "DAX Calculated Measures", "Interactive Multi-level Slicers", "Donut & Gauge Visualizations"],
    analysis: "Constructed a relational Star Schema linking central transactional sales ('FOrders') to three dedicated dimension tables ('Dcustomer', 'Dproduct', 'Dcalendar') and a centralized calculation table ('keymeasure'). Developed DAX measures including Total Sales, Total Profit, Profit Margin %, Running Total by Month, and Year-over-Year Sales Growth %. Slicers enable cross-filtering by Year (2016-2020), Region (West, Central, East, South), and Segment (Consumer, Corporate, Home Office).",
    previewWalkthrough: [
      { name: "Executive KPI Cards & Target Gauge", desc: "Monitors Total Sales ($575.46K), Total Profit ($52K), Margin (9%), and 12% target gauge benchmark ($360K profit target on $2.90M sales)." },
      { name: "Kimball Star Schema Architecture", desc: "Fact table FOrders connected via 1-to-many relationships to Dcustomer, Dproduct, and Dcalendar with a dedicated keymeasure table." },
      { name: "Category & Monthly Trend Analysis", desc: "Comparative bar charts contrasting Technology, Office Supplies, and Furniture with monthly running total trajectory." },
      { name: "Regional Market Distribution", desc: "Interactive donut visual detailing regional share: West (35.05%), Central (24.75%), East (21.51%), and South (18.69%)." }
    ],
    insightsAvailable: "Reveals that Technology represents the primary profit driver while Furniture operates on tighter margin parameters. Geographic analysis highlights the West region as the highest contributor (35.05%), enabling leadership to adjust inventory allocation and marketing spend by territory.",
    businessValue: "Transforms raw transactional records into an intuitive decision support system. Gives executives immediate visibility into monthly progress toward revenue targets, margin preservation, and regional performance variations."
  },
  project2: {
    tag: "Microsoft Excel Case Study",
    title: "Excel Data Analysis & Reporting",
    overview: "A comprehensive Microsoft Excel business dashboard utilizing structured Pivot Tables, interactive slicers, and statistical formulas to analyze customer segmentation, monthly revenue trajectory, and category profitability margins.",
    objective: "To build a robust, dynamic operational workbook that allows business managers to filter transactions by corporate segment and territory, track seasonal monthly demand peaks, and evaluate margin health without complex database tools.",
    tools: ["Microsoft Excel", "Pivot Tables & Pivot Charts", "Interactive Slicers (Segment & Region)", "Advanced Formulas (SUMIFS, LOOKUP)", "Variance & Margin Modeling"],
    analysis: "Cleaned raw transaction datasets, categorized orders, and created linked Pivot Tables. Configured dynamic slicers filtering across Customer Segments (Consumer, Corporate, Home Office) and Regions (East, South, West). Modeled average profit margins showing Technology leading at 15.61%, Office Supplies at 13.80%, and Furniture at 3.88%. Tracked monthly sales revealing notable peak activity in November.",
    previewWalkthrough: [
      { name: "Interactive Slicers Panel", desc: "Allows one-click slicing by Segment (Consumer, Corporate, Home Office) and Region (East, South, West)." },
      { name: "Customer Segmentation Count", desc: "Evaluates customer distribution across business tiers (e.g., Corporate count: 510 clients)." },
      { name: "Monthly Sales Trend Curve", desc: "Visualizes sales progression across Jan-Dec, capturing seasonal peak velocity in November." },
      { name: "Category Profit Margin Comparison", desc: "Direct variance visual contrasting Technology (15.61%), Office Supplies (13.80%), and Furniture (3.88%)." }
    ],
    insightsAvailable: "Identifies strong Q4 seasonality with peak volume in November. Demonstrates that while Furniture generates substantial volume, its profit margin (3.88%) requires careful cost control compared to Technology (15.61%).",
    businessValue: "Demonstrates how core accounting and commercial logic can be automated within Excel to provide executive leadership with agile, auditable reporting that drives inventory and budgeting decisions."
  }
};

function initCaseStudyModal() {
  const modalBackdrop = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const footerCloseBtn = document.getElementById('modal-footer-close');
  const discussBtn = document.getElementById('modal-discuss-btn');

  // Trigger buttons
  const triggerBtns = document.querySelectorAll('.open-case-study-btn');

  function openModal(projectId) {
    const data = caseStudiesData[projectId];
    if (!data) return;

    // Populate modal fields
    document.getElementById('modal-tag').textContent = data.tag;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-overview').textContent = data.overview;
    document.getElementById('modal-objective').textContent = data.objective;
    document.getElementById('modal-analysis').textContent = data.analysis;
    document.getElementById('modal-insights').textContent = data.insightsAvailable;
    document.getElementById('modal-business-value').textContent = data.businessValue;

    // Populate tools badges
    const toolsContainer = document.getElementById('modal-tools-list');
    if (toolsContainer) {
      toolsContainer.innerHTML = data.tools.map(tool => 
        `<span class="tool-badge">${tool}</span>`
      ).join('');
    }

    // Populate walkthrough components
    const walkthroughContainer = document.getElementById('modal-walkthrough-grid');
    if (walkthroughContainer) {
      walkthroughContainer.innerHTML = data.previewWalkthrough.map(item => `
        <div class="case-box">
          <div class="case-box-title">${item.name}</div>
          <div class="case-box-text">${item.desc}</div>
        </div>
      `).join('');
    }

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      openModal(projId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (footerCloseBtn) footerCloseBtn.addEventListener('click', closeModal);

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  if (discussBtn) {
    discussBtn.addEventListener('click', () => {
      closeModal();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. CV DOWNLOAD & PREVIEW SYSTEM WITH LIVE PDF VIEWER
   ========================================================================== */
function initCvModal() {
  const cvButtons = document.querySelectorAll('.cv-download-trigger');
  const cvModal = document.getElementById('cv-modal');
  const cvCloseBtn = document.getElementById('cv-modal-close');
  const cvFooterClose = document.getElementById('cv-footer-close');
  const cvProceedDownload = document.getElementById('cv-proceed-download');
  const tabDrive = document.getElementById('tab-cv-drive');
  const tabPdf = document.getElementById('tab-cv-pdf');
  const tabSummary = document.getElementById('tab-cv-summary');
  const driveView = document.getElementById('cv-drive-view');
  const pdfView = document.getElementById('cv-pdf-view');
  const summaryView = document.getElementById('cv-summary-view');

  function switchCvTab(activeTab, activeView) {
    [tabDrive, tabPdf, tabSummary].forEach(t => { if (t) t.classList.remove('active'); });
    [driveView, pdfView, summaryView].forEach(v => { if (v) v.style.display = 'none'; });
    if (activeTab) activeTab.classList.add('active');
    if (activeView) activeView.style.display = 'block';
  }

  if (tabDrive) tabDrive.addEventListener('click', () => switchCvTab(tabDrive, driveView));
  if (tabPdf) tabPdf.addEventListener('click', () => switchCvTab(tabPdf, pdfView));
  if (tabSummary) tabSummary.addEventListener('click', () => switchCvTab(tabSummary, summaryView));

  function openCvModal() {
    if (cvModal) {
      cvModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCvModal() {
    if (cvModal) {
      cvModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  cvButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCvModal();
    });
  });

  if (cvCloseBtn) cvCloseBtn.addEventListener('click', closeCvModal);
  if (cvFooterClose) cvFooterClose.addEventListener('click', closeCvModal);
  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) closeCvModal();
    });
  }

  if (cvProceedDownload) {
    cvProceedDownload.addEventListener('click', () => {
      showToast("Downloading verified CV: Mohammed_Eid_Gaber_Abbas_CV.pdf");
    });
  }
}

/* ==========================================================================
   8. CONTACT FORM VALIDATION & DIRECT DISPATCH
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Validation
    if (!name || !email || !message) {
      showToast("Please fill out all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address.");
      return;
    }

    // Direct mailto link preparation (authentic client-side email dispatch)
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject || 'Data Analyst Inquiry'}: from ${name}`);
    const mailtoBody = encodeURIComponent(`Dear Mohammed Eid,\n\n${message}\n\nSender: ${name}\nEmail: ${email}`);
    const mailtoUrl = `mailto:mohammedeid5095@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Show feedback modal or prompt
    showContactSuccess(name, email, mailtoUrl);
  });
}

function showContactSuccess(name, senderEmail, mailtoUrl) {
  // Create clean notification modal
  const existingModal = document.getElementById('contact-success-modal');
  if (existingModal) existingModal.remove();

  const modalHtml = `
    <div class="modal-backdrop open" id="contact-success-modal">
      <div class="modal-container" style="max-width: 540px;">
        <div class="modal-header">
          <div class="modal-title-wrap">
            <span class="modal-tag">Inquiry Ready</span>
            <div class="modal-title">Ready to Send</div>
          </div>
          <button class="modal-close-btn" id="contact-success-close" aria-label="Close">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="modal-body" style="padding: 1.5rem 1.75rem;">
          <p class="case-study-text">Thank you, <strong>${escapeHtml(name)}</strong>! Your message has been structured for Mohammed Eid Gaber Abbas.</p>
          <div class="case-box" style="margin: 1rem 0;">
            <div class="case-box-title">Recipient:</div>
            <div class="case-box-text"><strong>mohammedeid5095@gmail.com</strong></div>
          </div>
          <p class="case-study-text" style="font-size: 0.85rem;">Click below to launch your email client with the message pre-filled, or copy Mohammed's email directly.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary btn-sm" id="contact-copy-email">Copy Email</button>
          <a href="${mailtoUrl}" class="btn btn-primary btn-sm" id="contact-open-mail">Launch Email Client</a>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('contact-success-modal');
  const close = document.getElementById('contact-success-close');
  const copyBtn = document.getElementById('contact-copy-email');

  close.addEventListener('click', () => modal.remove());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('mohammedeid5095@gmail.com');
    showToast("Email address copied to clipboard!");
  });
}

function escapeHtml(string) {
  const div = document.createElement('div');
  div.innerText = string;
  return div.innerHTML;
}

/* ==========================================================================
   9. QUICK COPY UTILITIES
   ========================================================================== */
function initCopyUtilities() {
  const copyTriggers = document.querySelectorAll('[data-copy-text]');

  copyTriggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = el.getAttribute('data-copy-text');
      const label = el.getAttribute('data-copy-label') || 'Information';

      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied ${label} to clipboard!`);
        }).catch(() => {
          fallbackCopyText(textToCopy, label);
        });
      } else {
        fallbackCopyText(textToCopy, label);
      }
    });
  });
}

function fallbackCopyText(text, label) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast(`Copied ${label} to clipboard!`);
  } catch (err) {
    showToast(`Could not auto-copy. Please copy: ${text}`);
  }
  document.body.removeChild(textArea);
}

/* ==========================================================================
   10. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  // Trigger show
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Remove after 3.2s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3200);
}

/* ==========================================================================
   11. SMOOTH SCROLL FOR IN-PAGE ANCHORS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
