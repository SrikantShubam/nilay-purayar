---
projects:
  - project_name: Marketing Mix Modeling & ROI Optimization – Energy Drink Brand
    short_description: 'Built a Marketing Mix Model in R to measure how much each of six media channels contributed to sales, with an R Shiny simulator to test budget allocations.'
    domain: Marketing Analytics & ROI Measurement
    tools: 'R, R Shiny, Log-Log Regression, Adstock Modeling'
    overview: Estimated the sales contribution and ROI of six marketing channels for an energy drink brand using 104 weeks of sales and media spend data.
    highlights:
      - 'Built an adstock-adjusted, elasticity-based log-log model that captures lag effects across TV, POS Display, Out-of-Home, Google Search, YouTube and Sports Sponsorship.'
      - Developed an R Shiny budget-allocation simulator to compare spend scenarios.
      - Identified POS Display and Out-of-Home as the highest-ROI channels.
    outcome: Recommendations to reallocate budget toward the channels with the best return.
  - project_name: Predictive Modeling for Marketing Optimization – VS Bank
    short_description: Built and compared 7 machine learning models in SAS Viya on about 1M customer records to predict which customers would respond to a banking campaign.
    domain: Predictive Analytics & Campaign Targeting
    tools: 'SAS Viya, Gradient Boosting, Random Forest, Logistic Regression, GAM, Neural Networks'
    overview: 'Built a predictive analytics pipeline to forecast customer purchase likelihood for a bank''s marketing campaign, using about 1M customer records and 24 variables.'
    highlights:
      - 'Prepared the data with a 70/30 stratified split, decision-tree imputation for variables under 50% missing, and feature screening.'
      - 'Compared 7 algorithms (Logistic Regression, GAM, Decision Tree, Random Forest, Neural Network, Gradient Boosting and a Bayesian model) with hyperparameter tuning and cross-validation.'
      - 'Selected Gradient Boosting as the champion model (KS 0.6077, AUC 0.8823, accuracy 85.8%).'
      - 'Identified the top 3 of 24 predictors: RFM7, Income Tier and Behavioral Category.'
      - Learned SAS Viya from scratch for this project.
    outcome: Customer segments built from the model scores to target the campaign and improve its ROI.
  - project_name: Relational Database Design – Airline & Hotel Booking System
    short_description: 'Designed a normalized PostgreSQL database for a travel booking platform and used SQL to analyze travel trends, pricing and customer segments.'
    domain: Database Design & SQL Analytics
    tools: 'PostgreSQL, SQL, ER Modeling, Normalization (3NF)'
    overview: 'Designed and built a relational database for a travel booking platform managing customer, trip, flight and hotel data.'
    highlights:
      - 'Modeled the system in an ER diagram and built 10 integrated tables (Customer, Trip, Flight, Hotel, Review and more) normalized to 3NF.'
      - Defined functional dependencies and enforced referential integrity.
      - 'Wrote SQL with joins, aggregations, sub-queries, window functions and views, including analyses of the busiest airports, top destinations and flight pricing trends.'
      - 'Analyzed travel trends across 31 customer countries and 790+ destination cities, with pricing analysis and customer segmentation.'
    outcome: 'A clean, consistent database ready for reporting and travel analytics.'
  - project_name: Multi-Emission Environmental Impact Analysis & Forecasting (EU)
    short_description: 'Analyzed and forecast greenhouse-gas emissions across 27 EU countries from 1990 to 2022 using clustering, ARIMA and LSTM, with Power BI dashboards showing emission hotspots.'
    domain: Environmental Data Science & Forecasting
    tools: 'Python, Pandas, Scikit-learn, K-Means, ARIMA, LSTM, Power BI'
    overview: 'Analyzed 7 greenhouse-gas pollutants (including CO₂, CH₄, N₂O, HFCs and SF₆) across EU countries over 32 years (1990-2022) to forecast emission trends and draw policy insights, combining statistical modeling and machine learning.'
    highlights:
      - Built a Python ETL pipeline to clean and combine large EU datasets.
      - Clustered 27 EU countries into 3 groups with K-Means.
      - 'Forecast emissions with ARIMA and LSTM, including 10-year forecasts for CO₂ and CH₄.'
      - Integrated GDP and population data to explore links between economic activity and emissions.
      - Built Power BI dashboards with consistent KPI definitions to show emission hotspots.
    outcome: Insights for EU climate neutrality planning and energy policy.
  - project_name: Data-Driven Marketing Strategy – L'Oréal Cell BioPrint
    short_description: 'Built customer personas and pricing models for L''Oréal''s AI skincare device, using clustering and regression to support its market-entry strategy.'
    domain: Marketing Analytics & Pricing Strategy
    tools: 'Python (Clustering & Regression), SPSS, Excel, Tableau'
    overview: 'Designed a data-driven segmentation and pricing framework for Cell BioPrint, L''Oréal''s AI-powered skincare device.'
    highlights:
      - Segmented consumers into 4 actionable personas using cluster analysis.
      - Built price elasticity models to set one-time (€230-€250) and subscription (€65-€100) price ranges.
      - Simulated one-time purchase versus subscription pricing in Excel.
      - Developed persona-based marketing strategies that balance the device's AI features with affordability.
    outcome: A market-entry pricing and positioning strategy for a tech-based product launch.
  - project_name: Perishable Inventory Optimization with Shelf-Life Constraints
    short_description: 'Used reinforcement learning to find reorder policies for perishable stock, reaching 96% of the optimal benchmark, with a Streamlit dashboard for simulation.'
    domain: Supply Chain Analytics & Reinforcement Learning
    tools: 'Python, Reinforcement Learning, Gymnasium, Streamlit'
    overview: 'Modeled perishable inventory as a Markov Decision Process with FEFO (first-expired, first-out) dynamics to decide how much stock to reorder under shelf-life constraints.'
    highlights:
      - 'Implemented and compared 5 agents: Value Iteration, Q-Learning, SARSA, Monte Carlo and Linear Function Approximation.'
      - 'Trained over 3,000 episodes, with SARSA reaching 96% of the dynamic-programming optimum (1,243 vs 1,295).'
      - Built a Streamlit dashboard for policy simulation and cost sensitivity analysis.
    outcome: A repeatable way to test replenishment policies before applying them.
  - project_name: Corporate Financial Analysis – Airbus SE
    short_description: 'Financial and strategic analysis of Airbus SE (2018-2023), with DCF, NPV/IRR and WACC valuation and a benchmark against Boeing and COMAC.'
    domain: Corporate Finance & Strategic Valuation
    tools: 'Excel, Power BI, DCF, NPV/IRR Modeling, WACC, Ratio Analysis'
    overview: 'Analyzed Airbus SE''s profitability, liquidity, solvency and shareholder value creation between 2018 and 2023.'
    highlights:
      - 'Built a DCF valuation showing an IRR of 11.8% against a WACC of 6.59%, confirming value creation.'
      - 'Analyzed capital structure, free cash flow and ROIC versus WACC.'
      - Benchmarked Airbus against Boeing and COMAC for strategic positioning.
      - Built dashboards to track profitability and liquidity trends.
    outcome: 'Investment insights combining financial modeling with ESG and innovation strategy analysis, presented to a faculty panel.'
  - project_name: Strategy & Management – Stellantis Post-Merger Analysis
    short_description: 'Analyzed Stellantis'' post-merger integration and EV transition using SWOT, PESTEL, VRIO and Porter''s 5 Forces, and proposed a roadmap of governance and innovation reforms.'
    domain: Strategic Management & Business Transformation
    tools: 'SWOT, PESTEL, VRIO, Porter''s 5 Forces, Competitive Benchmarking'
    overview: Assessed the post-merger performance of Stellantis (FCA + PSA) to identify integration challenges and strategic bottlenecks in its shift to electric vehicles.
    highlights:
      - 'Diagnosed cultural misalignment, brand dilution across 14 brands and R&D underinvestment compared with EV-focused peers.'
      - 'Evaluated EV rollout delays, market share erosion and governance weaknesses.'
      - 'Benchmarked governance, R&D intensity, brand architecture and EV readiness against competitors.'
      - 'Proposed an EV R&D spin-off, a brand clarity framework and cross-cultural integration programs.'
    outcome: A governance and innovation reform roadmap presented to a faculty panel.
  - project_name: Greenwashing Detection AI Agent – Hackathon
    short_description: Built an AI agent that checks companies' environmental claims against retrieved evidence using Retrieval-Augmented Generation.
    domain: Generative AI & ESG
    tools: 'Python, LLMs, RAG'
    overview: Self-initiated hackathon project to help spot greenwashing by testing companies' sustainability claims against evidence.
    highlights:
      - Built an AI agent that retrieves relevant evidence for a company's environmental claims.
      - Used Retrieval-Augmented Generation so the model judges each claim against that evidence.
  - project_name: Urban Heat Island Risk Assessment using Satellite Imagery
    short_description: Scored urban cooling risk across Île-de-France from satellite imagery with classical computer vision. The score correlated at r = 0.762 with measured land surface temperature.
    domain: Computer Vision & Climate Risk
    tools: 'Python, OpenCV, Google Earth Engine, Plotly Dash'
    overview: 'Assessed urban heat risk in Île-de-France from Sentinel-2 multispectral and Landsat-8 thermal imagery, without deep learning or labeled data.'
    highlights:
      - 'Extracted 8 interpretable features (including NDBI, NDVI, Sobel edges, Harris corners, SLIC superpixels and Otsu thresholding) and combined them into a weighted Cooling Risk Score from 0 to 100.'
      - 'Reached a Pearson correlation of 0.762 with ground-truth Land Surface Temperature across 1,767 points.'
      - 'Validated the score on known heat traps (La Défense, Orly Airport) and cooling zones (Bois de Boulogne, Bois de Vincennes).'
      - Built an interactive Plotly Dash dashboard to explore the results.
  - project_name: Automated Financial Reports Generator
    short_description: 'Built a Python tool that fetches, analyzes and visualizes company financial statements through an API, replacing a manual reporting task.'
    domain: Python Programming & Financial Automation
    tools: 'Python, Pandas, Matplotlib, Flask, Tkinter, Financial Modeling Prep API'
    overview: 'Full-stack Python tool that fetches, analyzes and visualizes the financial statements (income statement, balance sheet and cash flow) of listed companies.'
    highlights:
      - Designed a modular pipeline that goes from API data retrieval to ratio computation and visualization.
      - Built a Tkinter desktop interface and a Flask web dashboard.
      - 'Calculated key ratios in real time, including ROE, ROA, EBITDA, Profit Margin, Current Ratio and Debt-to-Equity.'
    outcome: 'Replaced a recurring manual reporting task with clear, visual reports for investors.'
  - project_name: Financial Predictive Modeling – Equity Trend Forecasting
    short_description: 'Built Python models to forecast stock-price trends from historical market data for an early-stage trading firm, with dashboards to track market signals.'
    domain: Financial Analytics & Forecasting
    tools: 'Python, Predictive Modeling, Feature Engineering'
    overview: Forecast stock-price trends from historical market data to support investment decisions at an early-stage trading firm.
    highlights:
      - Built and evaluated predictive models with feature engineering.
      - Set up automated dashboards and KPI tracking that surfaced market signals.
    outcome: A data-driven view of market signals to support investment decisions.
  - project_name: Pawpoy – Pet Health Wearable with AI Triage
    short_description: 'A pet-health app concept, "a Fitbit for pets with an AI triage nurse". My part was the machine learning and GenAI layer.'
    domain: Health Tech & Generative AI
    tools: 'Python, FastAPI, Machine Learning, GenAI'
    role: Machine learning and GenAI layer
    overview: Class hackathon pitch for a pet-health wearable that tracks health data and uses AI to help owners decide when their pet needs care.
    highlights:
      - Built the ML and GenAI layer on a Python FastAPI backend fed by a simulated wearable data stream.
  - project_name: 'X-Ray Security Screening: Classical Object Detection'
    short_description: 'Detected 6 classes of prohibited items in X-ray baggage images with a classical computer vision pipeline, without deep learning.'
    domain: Computer Vision & Security
    tools: 'Python, OpenCV, Scikit-learn'
    overview: Built an R-CNN-inspired detection pipeline using only classical methods.
    highlights:
      - 'Enhanced contrast with CLAHE, generated candidate regions with Selective Search and described them with HOG and LBP features.'
      - 'Trained a HistGradientBoosting classifier per class, with bounding-box regression and non-maximum suppression.'
      - Tested 3 pipeline variants.
---

