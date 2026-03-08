You are an expert in **AI systems architecture, energy economics, and public policy analytics**.

Design a complete technical system for a platform called **EquiGrid Kenya**.

EquiGrid Kenya is an **AI-powered energy equity and tariff policy simulation platform** designed to help electricity regulators design fair electricity tariffs.

The platform will be used by regulators like the **Energy and Petroleum Regulatory Authority** and utilities like **Kenya Power and Lighting Company**.

The system should combine **energy poverty mapping and AI-based tariff simulations** to help policymakers test electricity pricing policies before implementation.

---

## Background Problem

In Kenya, electricity tariffs are mainly based on **consumption levels rather than household income**, which creates inequitable pricing.

Example problems include:

• Low-income households may consume more electricity for basic needs and fall into higher tariff bands
• Wealthier households may use solar and consume less grid electricity, paying lower tariffs
• Policymakers lack tools to predict the **social impact of tariff changes**
• Energy poverty is not clearly mapped geographically

EquiGrid Kenya will address these challenges.

---

# System Requirements

Design the platform with the following modules.

---

# 1. Energy Poverty Index Engine

The system must calculate an **Energy Poverty Index (EPI)** for households:

EPI = Electricity Cost / Household Income

Classification:

0–5% → Affordable
5–10% → Moderate burden
10–20% → Energy poverty

> 20% → Severe energy poverty

Explain:

• how this calculation is implemented
• how large-scale datasets are processed
• how results are stored

---

# 2. Energy Poverty Mapping System

Design a **geospatial analytics module** that:

• aggregates household data by region
• produces **interactive heatmaps of energy affordability**
• highlights regions with severe energy poverty

Explain:

• data aggregation techniques
• GIS tools used
• map visualization methods

---

# 3. AI Tariff Policy Simulator

Design a **machine learning simulation engine** that predicts the impact of tariff changes.

Example policies to simulate:

• Increase lifeline tariff threshold (30 kWh → 50 kWh)
• Reduce fixed electricity charges
• Introduce regional subsidies
• Introduce income-based tariffs

The system should predict:

• number of households benefiting
• change in energy poverty levels
• revenue impact on utilities
• subsidy cost

Explain the **machine learning models used**, such as:

• regression models
• scenario simulations
• demand elasticity models

---

# 4. Data Architecture

Design the full data architecture including:

Data sources:

• electricity consumption data
• household income statistics
• population and demographic data
• electricity tariff structures

Explain:

• data ingestion pipelines
• storage systems
• data cleaning and preprocessing

---

# 5. System Architecture

Provide a **complete system architecture** with the following layers:

1. Data Layer
2. Processing Layer
3. AI/Simulation Layer
4. API Layer
5. Visualization Layer

Explain the technologies used in each layer.

Example technologies:

• Python
• Pandas
• NumPy
• Scikit-learn
• Postgres
• Streamlit
• Plotly
• Leaflet maps

---

# 6. Dashboard Design

Design an **interactive policy dashboard** that allows regulators to:

• view energy poverty maps
• adjust tariff parameters
• simulate policy scenarios
• see predicted outcomes

Explain the UI components.

---

# 7. Prototype Design for Hackathon

Design a **simplified prototype** that can be built in 1–2 days using simulated data.

Include:

• sample dataset structure
• basic energy poverty calculator
• interactive map
• tariff simulation controls

---

# 8. Expected Policy Impact

Explain how EquiGrid Kenya could help:

• policymakers design fair tariffs
• reduce energy poverty
• maintain financial sustainability for utilities
• improve targeted subsidies

---

# Output Format

The final response should include:

1. Detailed system architecture
2. Data pipeline design
3. Machine learning model explanation
4. Prototype implementation plan
5. Dashboard design
6. Example dataset schema
