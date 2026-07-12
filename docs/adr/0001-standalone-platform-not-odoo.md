# Standalone platform, no Odoo integration

Despite the repo name and the hackathon's Odoo framing, EcoSphere is a fully standalone platform — no Odoo modules, no external ERP integration. The "Purchase / Manufacturing / Expense / Fleet records" that feed Auto Emission Calculation live in our own database as **Operation** records, entered via manual forms and CSV import (both feed the same pipeline: operation × emission factor → carbon transaction). Chosen because the judging criteria reward a from-scratch backend with its own Postgres schema over an Odoo addon.
