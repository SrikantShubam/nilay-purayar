---
projects:
  - project_name: Marketing Mix Modeling & ROI Optimization – Energy Drink Brand
    short_description: 'Built a Marketing Mix Model in R to measure how much each of six media channels contributed to sales, with an R Shiny simulator to test budget allocations.'
    long_description: |-
      Domain: Marketing Analytics & ROI Measurement
      Tools: R, R Shiny, Log-Log Regression, Adstock Modeling
      Overview: Estimated the sales contribution and ROI of six marketing channels for an energy drink brand using 104 weeks of sales and media spend data.
      Highlights:
      Built an adstock-adjusted, elasticity-based log-log model that captures lag effects across TV, POS Display, Out-of-Home, Google Search, YouTube and Sports Sponsorship.
      Developed an R Shiny budget-allocation simulator to compare spend scenarios.
      Identified POS Display and Out-of-Home as the highest-ROI channels.
      Outcome: Recommendations to reallocate budget toward the channels with the best return.
  - project_name: Predictive Modeling for Marketing Optimization – VS Bank
    short_description: Built and compared 7 machine learning models in SAS Viya on about 1M customer records to predict which customers would respond to a banking campaign.
    long_description: |-
      Domain: Predictive Analytics & Campaign Targeting
      Tools: SAS Viya, Gradient Boosting, Random Forest, Logistic Regression, GAM, Neural Networks
      Overview: Built a predictive analytics pipeline to forecast customer purchase likelihood for a bank's marketing campaign, using about 1M customer records and 24 variables.
      Highlights:
      Prepared the data with a 70/30 stratified split, decision-tree imputation for variables under 50% missing, and feature screening.
      Compared 7 algorithms (Logistic Regression, GAM, Decision Tree, Random Forest, Neural Network, Gradient Boosting and a Bayesian model) with hyperparameter tuning and cross-validation.
      Selected Gradient Boosting as the champion model (KS 0.6077, AUC 0.8823, accuracy 85.8%).
      Identified the top 3 of 24 predictors: RFM7, Income Tier and Behavioral Category.
      Learned SAS Viya from scratch for this project.
      Outcome: Customer segments built from the model scores to target the campaign and improve its ROI.
  - project_name: Relational Database Design – Airline & Hotel Booking System
    short_description: 'Designed a normalized PostgreSQL database for a travel booking platform and used SQL to analyze travel trends, pricing and customer segments.'
    long_description: |-
      Domain: Database Design & SQL Analytics
      Tools: PostgreSQL, SQL, ER Modeling, Normalization (3NF)
      Overview: Designed and built a relational database for a travel booking platform managing customer, trip, flight and hotel data.
      Highlights:
      Modeled the system in an ER diagram and built 10 integrated tables (Customer, Trip, Flight, Hotel, Review and more) normalized to 3NF.
      Defined functional dependencies and enforced referential integrity.
      Wrote SQL with joins, aggregations, sub-queries, window functions and views, including analyses of the busiest airports, top destinations and flight pricing trends.
      Analyzed travel trends across 31 customer countries and 790+ destination cities, with pricing analysis and customer segmentation.
      Outcome: A clean, consistent database ready for reporting and travel analytics.
  - project_name: Multi-Emission Environmental Impact Analysis & Forecasting (EU)
    short_description: 'Analyzed and forecast greenhouse-gas emissions across 27 EU countries from 1990 to 2022 using clustering, ARIMA and LSTM, with Power BI dashboards showing emission hotspots.'
    long_description: |-
      Domain: Environmental Data Science & Forecasting
      Tools: Python, Pandas, Scikit-learn, K-Means, ARIMA, LSTM, Power BI
      Overview: Analyzed 7 greenhouse-gas pollutants (including CO₂, CH₄, N₂O, HFCs and SF₆) across EU countries over 32 years (1990-2022) to forecast emission trends and draw policy insights, combining statistical modeling and machine learning.
      Highlights:
      Built a Python ETL pipeline to clean and combine large EU datasets.
      Clustered 27 EU countries into 3 groups with K-Means.
      Forecast emissions with ARIMA and LSTM, including 10-year forecasts for CO₂ and CH₄.
      Integrated GDP and population data to explore links between economic activity and emissions.
      Built Power BI dashboards with consistent KPI definitions to show emission hotspots.
      Outcome: Insights for EU climate neutrality planning and energy policy.
  - project_name: Data-Driven Marketing Strategy – L'Oréal Cell BioPrint
    short_description: 'Built customer personas and pricing models for L''Oréal''s AI skincare device, using clustering and regression to support its market-entry strategy.'
    long_description: |-
      Domain: Marketing Analytics & Pricing Strategy
      Tools: Python (Clustering & Regression), SPSS, Excel, Tableau
      Overview: Designed a data-driven segmentation and pricing framework for Cell BioPrint, L'Oréal's AI-powered skincare device.
      Highlights:
      Segmented consumers into 4 actionable personas using cluster analysis.
      Built price elasticity models to set one-time (€230-€250) and subscription (€65-€100) price ranges.
      Simulated one-time purchase versus subscription pricing in Excel.
      Developed persona-based marketing strategies that balance the device's AI features with affordability.
      Outcome: A market-entry pricing and positioning strategy for a tech-based product launch.
  - project_name: Perishable Inventory Optimization with Shelf-Life Constraints
    short_description: 'Used reinforcement learning to find reorder policies for perishable stock, reaching 96% of the optimal benchmark, with a Streamlit dashboard for simulation.'
    long_description: |-
      Domain: Supply Chain Analytics & Reinforcement Learning
      Tools: Python, Reinforcement Learning, Gymnasium, Streamlit
      Overview: Modeled perishable inventory as a Markov Decision Process with FEFO (first-expired, first-out) dynamics to decide how much stock to reorder under shelf-life constraints.
      Highlights:
      Implemented and compared 5 agents: Value Iteration, Q-Learning, SARSA, Monte Carlo and Linear Function Approximation.
      Trained over 3,000 episodes, with SARSA reaching 96% of the dynamic-programming optimum (1,243 vs 1,295).
      Built a Streamlit dashboard for policy simulation and cost sensitivity analysis.
      Outcome: A repeatable way to test replenishment policies before applying them.
  - project_name: Corporate Financial Analysis – Airbus SE
    short_description: 'Financial and strategic analysis of Airbus SE (2018-2023), with DCF, NPV/IRR and WACC valuation and a benchmark against Boeing and COMAC.'
    long_description: |-
      Domain: Corporate Finance & Strategic Valuation
      Tools: Excel, Power BI, DCF, NPV/IRR Modeling, WACC, Ratio Analysis
      Overview: Analyzed Airbus SE's profitability, liquidity, solvency and shareholder value creation between 2018 and 2023.
      Highlights:
      Built a DCF valuation showing an IRR of 11.8% against a WACC of 6.59%, confirming value creation.
      Analyzed capital structure, free cash flow and ROIC versus WACC.
      Benchmarked Airbus against Boeing and COMAC for strategic positioning.
      Built dashboards to track profitability and liquidity trends.
      Outcome: Investment insights combining financial modeling with ESG and innovation strategy analysis, presented to a faculty panel.
---

