import { Product } from '../types';
import { COMPANY_DETAILS } from '../data/products';

export function downloadProductSpecPdf(product: Product) {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${product.name} - Technical Specification Sheet</title>
  <style>
    @page { size: A4; margin: 20mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      line-height: 1.5;
      margin: 0;
      padding: 24px;
      background: #ffffff;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0284c7;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }
    .logo {
      font-size: 24px;
      font-weight: 800;
      color: #0369a1;
      letter-spacing: -0.5px;
    }
    .tagline {
      font-size: 11px;
      color: #059669;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .meta-box {
      text-align: right;
      font-size: 11px;
      color: #64748b;
    }
    .meta-box strong {
      color: #0f172a;
    }
    h1 {
      font-size: 22px;
      color: #0f172a;
      margin: 0 0 6px 0;
    }
    .badge {
      display: inline-block;
      padding: 3px 8px;
      background: #e0f2fe;
      color: #0369a1;
      font-size: 11px;
      font-weight: 700;
      border-radius: 4px;
      margin-bottom: 12px;
    }
    .description {
      font-size: 13px;
      color: #334155;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 12px;
    }
    th, td {
      padding: 10px 12px;
      text-align: left;
      border-bottom: 1px solid #e2e8f0;
    }
    th {
      background: #f8fafc;
      color: #475569;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
    }
    td strong {
      color: #0f172a;
    }
    .features-list {
      margin: 0 0 24px 0;
      padding-left: 20px;
      font-size: 12px;
      color: #334155;
    }
    .features-list li {
      margin-bottom: 6px;
    }
    .footer-note {
      border-top: 1px solid #e2e8f0;
      padding-top: 16px;
      font-size: 10px;
      color: #94a3b8;
      display: flex;
      justify-content: space-between;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">Abhay Polyplast</div>
      <div class="tagline">Engineering Polymer Solutions • Est. 2012</div>
      <div style="font-size: 11px; color: #475569; margin-top: 4px;">
        Plot No. 7 & 8, Gokuldham Industrial Area, Near Kuvadva G.I.D.C, Rajkot - 360023
      </div>
    </div>
    <div class="meta-box">
      <div>GSTIN: <strong>${COMPANY_DETAILS.gstNumber}</strong></div>
      <div>Proprietor: <strong>${COMPANY_DETAILS.proprietor}</strong></div>
      <div>Phone: <strong>${COMPANY_DETAILS.phone}</strong></div>
      <div>Document Ref: <strong>SPEC-${product.id.toUpperCase()}-2026</strong></div>
    </div>
  </div>

  <span class="badge">${product.category} • ${product.standard}</span>
  <h1>${product.name}</h1>
  <p class="description">${product.description}</p>

  <h3 style="font-size: 14px; text-transform: uppercase; color: #0284c7; margin-bottom: 8px;">
    Technical Specifications & Parameters
  </h3>

  <table>
    <tbody>
      <tr>
        <td style="width: 30%;"><strong>Standard Compliance</strong></td>
        <td>${product.standard}</td>
      </tr>
      <tr>
        <td><strong>Raw Material Formulation</strong></td>
        <td>${product.material}</td>
      </tr>
      <tr>
        <td><strong>Size Range / Outer Diameter</strong></td>
        <td>${product.sizes}</td>
      </tr>
      <tr>
        <td><strong>Design Pressure Rating</strong></td>
        <td>${product.pressureRating}</td>
      </tr>
      <tr>
        <td><strong>Standard Factory Base Price</strong></td>
        <td><strong>${product.priceFormatted}</strong> (Ex-factory Rajkot)</td>
      </tr>
      <tr>
        <td><strong>Minimum Order Quantity (MOQ)</strong></td>
        <td>${product.moq}</td>
      </tr>
      <tr>
        <td><strong>Production Quality Verification</strong></td>
        <td>Continuous Hydrostatic Pressure, MFI, Carbon Black Dispersion, Elongation > 350%</td>
      </tr>
    </tbody>
  </table>

  <h3 style="font-size: 14px; text-transform: uppercase; color: #0284c7; margin-bottom: 8px;">
    Key Mechanical & Performance Characteristics
  </h3>

  <ul class="features-list">
    ${product.features.map(f => `<li>${f}</li>`).join('')}
  </ul>

  <div class="footer-note">
    <span>Certified True Specification • ISO 9001:2015 Registered Polymer Extrusion Works</span>
    <span>Issued on: ${new Date().toLocaleDateString('en-GB')} • Valid for Pan-India Quotations</span>
  </div>
</body>
</html>
`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Abhay_Polyplast_${product.id}_Specification_Sheet.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
