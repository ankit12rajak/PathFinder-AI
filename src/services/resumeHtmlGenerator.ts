/**
 * Resume HTML Generator
 * Converts resume data directly to formatted HTML for PDF generation
 * Bypasses complex LaTeX parsing for clean, reliable output
 */

import { ResumeData } from "./latexTemplates";

export interface ResumeTemplate {
  name: string;
  generateHtml: (data: ResumeData) => string;
}

/**
 * Modern Resume Template - Clean, professional design
 */
export const modernTemplate: ResumeTemplate = {
  name: "Modern",
  generateHtml: (data: ResumeData) => {
    return `
      <div style="max-width: 800px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; font-size: 10px; line-height: 1.4; color: #333;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 15px; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
          <h1 style="margin: 0; font-size: 20px; color: #0066cc;">${escapeHtml(data.fullName)}</h1>
          <p style="margin: 5px 0; font-size: 9px; color: #666;">
            ${data.email ? `${escapeHtml(data.email)}` : ""} 
            ${data.phone ? `• ${escapeHtml(data.phone)}` : ""} 
            ${data.location ? `• ${escapeHtml(data.location)}` : ""}
          </p>
        </div>

        <!-- Professional Summary -->
        ${data.summary ? `
          <div style="margin-bottom: 12px;">
            <h3 style="margin: 0 0 5px 0; font-size: 11px; font-weight: bold; color: #0066cc; border-bottom: 1px solid #0066cc; padding-bottom: 3px;">Professional Summary</h3>
            <p style="margin: 0; font-size: 9px; line-height: 1.4;">${escapeHtml(data.summary)}</p>
          </div>
        ` : ""}

        <!-- Experience -->
        ${data.experience && data.experience.length > 0 ? `
          <div style="margin-bottom: 12px;">
            <h3 style="margin: 0 0 5px 0; font-size: 11px; font-weight: bold; color: #0066cc; border-bottom: 1px solid #0066cc; padding-bottom: 3px;">Professional Experience</h3>
            ${data.experience.map(exp => `
              <div style="margin-bottom: 8px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                  <span style="font-weight: bold; font-size: 10px;">${escapeHtml(exp.position || "")}</span>
                  <span style="font-size: 9px; color: #666;">${escapeHtml(exp.duration || "")}</span>
                </div>
                <div style="font-size: 9px; color: #666; margin-bottom: 2px;">${escapeHtml(exp.company || "")}</div>
                ${exp.description ? `<p style="margin: 2px 0 0 0; font-size: 9px;">${escapeHtml(exp.description)}</p>` : ""}
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- Education -->
        ${data.education && data.education.length > 0 ? `
          <div style="margin-bottom: 12px;">
            <h3 style="margin: 0 0 5px 0; font-size: 11px; font-weight: bold; color: #0066cc; border-bottom: 1px solid #0066cc; padding-bottom: 3px;">Education</h3>
            ${data.education.map(edu => `
              <div style="margin-bottom: 6px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                  <span style="font-weight: bold; font-size: 10px;">${escapeHtml(edu.degree || "")}</span>
                  <span style="font-size: 9px; color: #666;">${escapeHtml(edu.graduation || "")}</span>
                </div>
                <div style="font-size: 9px; color: #666;">${escapeHtml(edu.school || "")}</div>
                ${edu.field ? `<div style="font-size: 9px; margin-top: 2px;">${escapeHtml(edu.field)}</div>` : ""}
                ${edu.gpa ? `<div style="font-size: 9px;">GPA: ${escapeHtml(edu.gpa)}</div>` : ""}
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- Skills -->
        ${data.skills && data.skills.length > 0 ? `
          <div style="margin-bottom: 12px;">
            <h3 style="margin: 0 0 5px 0; font-size: 11px; font-weight: bold; color: #0066cc; border-bottom: 1px solid #0066cc; padding-bottom: 3px;">Skills</h3>
            <p style="margin: 0; font-size: 9px; line-height: 1.5;">${data.skills.map(s => escapeHtml(s)).join(" • ")}</p>
          </div>
        ` : ""}

        <!-- Certifications -->
        ${data.certifications && data.certifications.length > 0 ? `
          <div style="margin-bottom: 12px;">
            <h3 style="margin: 0 0 5px 0; font-size: 11px; font-weight: bold; color: #0066cc; border-bottom: 1px solid #0066cc; padding-bottom: 3px;">Certifications</h3>
            ${data.certifications.map(cert => `
              <div style="margin-bottom: 3px; font-size: 9px;">
                <strong>${escapeHtml(cert.name || "")}</strong>
                ${cert.issuer ? `• ${escapeHtml(cert.issuer)}` : ""}
                ${cert.date ? `• ${escapeHtml(cert.date)}` : ""}
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- Projects -->
        ${data.projects && data.projects.length > 0 ? `
          <div style="margin-bottom: 12px;">
            <h3 style="margin: 0 0 5px 0; font-size: 11px; font-weight: bold; color: #0066cc; border-bottom: 1px solid #0066cc; padding-bottom: 3px;">Projects</h3>
            ${data.projects.map(proj => `
              <div style="margin-bottom: 6px;">
                <div style="font-weight: bold; font-size: 10px;">${escapeHtml(proj.name || "")}</div>
                ${proj.description ? `<p style="margin: 2px 0; font-size: 9px;">${escapeHtml(proj.description)}</p>` : ""}
                ${proj.technologies ? `<div style="font-size: 8px; color: #666;">Tech: ${escapeHtml(proj.technologies)}</div>` : ""}
              </div>
            `).join("")}
          </div>
        ` : ""}
      </div>
    `;
  }
};

/**
 * Minimalist Resume Template - Simple and elegant
 */
export const minimalistTemplate: ResumeTemplate = {
  name: "Minimalist",
  generateHtml: (data: ResumeData) => {
    return `
      <div style="max-width: 800px; margin: 0 auto; font-family: 'Calibri', Arial, sans-serif; font-size: 10px; line-height: 1.4; color: #000;">
        <!-- Header -->
        <div style="margin-bottom: 12px;">
          <h1 style="margin: 0; font-size: 18px; font-weight: bold; color: #000;">${escapeHtml(data.fullName)}</h1>
          <p style="margin: 3px 0 0 0; font-size: 9px; color: #333;">
            ${data.email ? escapeHtml(data.email) : ""} 
            ${data.phone ? `| ${escapeHtml(data.phone)}` : ""} 
            ${data.location ? `| ${escapeHtml(data.location)}` : ""}
          </p>
        </div>

        <!-- Professional Summary -->
        ${data.summary ? `
          <div style="margin-bottom: 10px;">
            <h3 style="margin: 0 0 4px 0; font-size: 10px; font-weight: bold; color: #000; text-transform: uppercase; letter-spacing: 1px;">Summary</h3>
            <p style="margin: 0; font-size: 9px; line-height: 1.4;">${escapeHtml(data.summary)}</p>
          </div>
        ` : ""}

        <!-- Experience -->
        ${data.experience && data.experience.length > 0 ? `
          <div style="margin-bottom: 10px;">
            <h3 style="margin: 0 0 4px 0; font-size: 10px; font-weight: bold; color: #000; text-transform: uppercase; letter-spacing: 1px;">Experience</h3>
            ${data.experience.map(exp => `
              <div style="margin-bottom: 6px;">
                <div style="font-weight: bold; font-size: 9px;">${escapeHtml(exp.position || "")}</div>
                <div style="font-size: 9px; color: #555;">${escapeHtml(exp.company || "")} | ${escapeHtml(exp.duration || "")}</div>
                ${exp.description ? `<p style="margin: 2px 0 0 0; font-size: 9px;">${escapeHtml(exp.description)}</p>` : ""}
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- Education -->
        ${data.education && data.education.length > 0 ? `
          <div style="margin-bottom: 10px;">
            <h3 style="margin: 0 0 4px 0; font-size: 10px; font-weight: bold; color: #000; text-transform: uppercase; letter-spacing: 1px;">Education</h3>
            ${data.education.map(edu => `
              <div style="margin-bottom: 4px;">
                <div style="font-weight: bold; font-size: 9px;">${escapeHtml(edu.degree || "")}</div>
                <div style="font-size: 9px; color: #555;">${escapeHtml(edu.school || "")} • ${escapeHtml(edu.graduation || "")}</div>
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- Skills -->
        ${data.skills && data.skills.length > 0 ? `
          <div style="margin-bottom: 10px;">
            <h3 style="margin: 0 0 4px 0; font-size: 10px; font-weight: bold; color: #000; text-transform: uppercase; letter-spacing: 1px;">Skills</h3>
            <p style="margin: 0; font-size: 9px;">${data.skills.map(s => escapeHtml(s)).join(" • ")}</p>
          </div>
        ` : ""}

        <!-- Certifications -->
        ${data.certifications && data.certifications.length > 0 ? `
          <div style="margin-bottom: 10px;">
            <h3 style="margin: 0 0 4px 0; font-size: 10px; font-weight: bold; color: #000; text-transform: uppercase; letter-spacing: 1px;">Certifications</h3>
            ${data.certifications.map(cert => `
              <div style="margin-bottom: 2px; font-size: 9px;">• ${escapeHtml(cert.name || "")}</div>
            `).join("")}
          </div>
        ` : ""}

        <!-- Projects -->
        ${data.projects && data.projects.length > 0 ? `
          <div>
            <h3 style="margin: 0 0 4px 0; font-size: 10px; font-weight: bold; color: #000; text-transform: uppercase; letter-spacing: 1px;">Projects</h3>
            ${data.projects.map(proj => `
              <div style="margin-bottom: 4px;">
                <div style="font-weight: bold; font-size: 9px;">${escapeHtml(proj.name || "")}</div>
                ${proj.description ? `<p style="margin: 2px 0 0 0; font-size: 9px;">${escapeHtml(proj.description)}</p>` : ""}
              </div>
            `).join("")}
          </div>
        ` : ""}
      </div>
    `;
  }
};

/**
 * Convert resume data directly to HTML, bypassing LaTeX
 */
export const generateResumeHtml = (data: ResumeData, templateName: string = "modern"): string => {
  const templates: { [key: string]: ResumeTemplate } = {
    modern: modernTemplate,
    minimalist: minimalistTemplate,
  };

  const template = templates[templateName.toLowerCase()] || modernTemplate;
  return template.generateHtml(data);
};

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
