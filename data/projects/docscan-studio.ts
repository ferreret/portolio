import { ProjectItem } from '../../types';

const contentEn = `
<h2>Overview</h2>
<p>DocScan Studio is a cross-platform desktop application for batch document capture, OCR, barcode reading, and AI-assisted field extraction. Built as an in-house replacement for a legacy capture system, it combines a configurable no-code pipeline with generative AI capabilities to automate document-heavy workflows.</p>

<h2>Key capabilities</h2>
<ul>
  <li><strong>Multi-application launcher</strong> — N independent process profiles, each with its own pipeline and configuration.</li>
  <li><strong>No-code configurable pipeline</strong> — composable steps (<code>image_op</code>, <code>barcode</code>, <code>ocr</code>, <code>script</code>) with no programming required.</li>
  <li><strong>AI MODE</strong> — conversational assistant with tool calling to create or modify applications from natural language.</li>
  <li><strong>Pipeline Assistant</strong> — per-pipeline AI to generate steps and event handler code.</li>
  <li><strong>Dual barcode engine</strong> — pyzbar + OpenCV and zxing-cpp for precision vs. speed trade-offs.</li>
  <li><strong>Multiple OCR engines</strong> — RapidOCR (primary), EasyOCR, Tesseract.</li>
  <li><strong>Embedded Python scripts</strong> for advanced automation.</li>
  <li><strong>Cross-platform</strong> — Linux (SANE) and Windows (TWAIN + WIA).</li>
  <li><strong>Export/Import</strong> applications as <code>.docscan</code> JSON bundles.</li>
</ul>

<h2>Technical stack</h2>
<ul>
  <li><strong>UI</strong>: PySide6 (Qt), QSS themes (dark/light)</li>
  <li><strong>Language</strong>: Python 3.14</li>
  <li><strong>Persistence</strong>: SQLAlchemy 2.x + SQLite (WAL)</li>
  <li><strong>Barcode</strong>: pyzbar + OpenCV, zxing-cpp</li>
  <li><strong>OCR</strong>: RapidOCR, EasyOCR, Tesseract</li>
  <li><strong>AI</strong>: Anthropic SDK, OpenAI SDK (tool calling)</li>
  <li><strong>PDF</strong>: PyMuPDF</li>
  <li><strong>Scanner</strong>: SANE (Linux), TWAIN + WIA (Windows)</li>
  <li><strong>Testing</strong>: pytest + pytest-qt</li>
</ul>

<h2>Project metrics</h2>
<ul>
  <li><strong>849</strong> automated tests (0 failures)</li>
  <li><strong>19,776</strong> lines of source code + <strong>11,618</strong> lines of tests</li>
  <li><strong>94</strong> source files</li>
  <li><strong>v0.1.0</strong> stable release (2026-03-26)</li>
</ul>

<h2>Repository</h2>
<p>Source code available on <a href="https://github.com/ferreret/docscan" target="_blank" rel="noopener noreferrer">GitHub · ferreret/docscan</a>.</p>
`;

const contentEs = `
<h2>Resumen</h2>
<p>DocScan Studio es una aplicación de escritorio multiplataforma para captura masiva de documentos, OCR, lectura de códigos de barras y extracción de campos asistida por IA. Desarrollada como reemplazo interno de un sistema de captura legacy, combina un pipeline configurable sin código con capacidades de IA generativa para automatizar flujos de trabajo documentales.</p>

<h2>Capacidades destacadas</h2>
<ul>
  <li><strong>Launcher multi-aplicación</strong> — N perfiles de proceso independientes, cada uno con su propio pipeline y configuración.</li>
  <li><strong>Pipeline configurable sin código</strong> — pasos componibles (<code>image_op</code>, <code>barcode</code>, <code>ocr</code>, <code>script</code>) sin necesidad de programar.</li>
  <li><strong>AI MODE</strong> — asistente conversacional con tool calling para crear o modificar aplicaciones desde lenguaje natural.</li>
  <li><strong>Pipeline Assistant</strong> — IA por pipeline que genera pasos y código de eventos.</li>
  <li><strong>Doble motor de códigos de barras</strong> — pyzbar + OpenCV y zxing-cpp para equilibrar precisión y velocidad.</li>
  <li><strong>Múltiples motores OCR</strong> — RapidOCR (principal), EasyOCR, Tesseract.</li>
  <li><strong>Scripts Python embebidos</strong> para automatización avanzada.</li>
  <li><strong>Multiplataforma</strong> — Linux (SANE) y Windows (TWAIN + WIA).</li>
  <li><strong>Export/Import</strong> de aplicaciones como paquetes JSON <code>.docscan</code>.</li>
</ul>

<h2>Stack técnico</h2>
<ul>
  <li><strong>UI</strong>: PySide6 (Qt), temas QSS (dark/light)</li>
  <li><strong>Lenguaje</strong>: Python 3.14</li>
  <li><strong>Persistencia</strong>: SQLAlchemy 2.x + SQLite (WAL)</li>
  <li><strong>Códigos de barras</strong>: pyzbar + OpenCV, zxing-cpp</li>
  <li><strong>OCR</strong>: RapidOCR, EasyOCR, Tesseract</li>
  <li><strong>IA</strong>: Anthropic SDK, OpenAI SDK (tool calling)</li>
  <li><strong>PDF</strong>: PyMuPDF</li>
  <li><strong>Escáner</strong>: SANE (Linux), TWAIN + WIA (Windows)</li>
  <li><strong>Tests</strong>: pytest + pytest-qt</li>
</ul>

<h2>Métricas del proyecto</h2>
<ul>
  <li><strong>849</strong> tests automáticos (0 fallos)</li>
  <li><strong>19.776</strong> líneas de código fuente + <strong>11.618</strong> líneas de test</li>
  <li><strong>94</strong> ficheros fuente</li>
  <li><strong>v0.1.0</strong> release estable (2026-03-26)</li>
</ul>

<h2>Repositorio</h2>
<p>Código disponible en <a href="https://github.com/ferreret/docscan" target="_blank" rel="noopener noreferrer">GitHub · ferreret/docscan</a>.</p>
`;

export const docscanStudio: { en: ProjectItem; es: ProjectItem } = {
  en: {
    id: "4",
    title: "DocScan Studio",
    description: "Cross-platform desktop application for batch document capture, OCR, barcode reading, and AI-powered field extraction with a no-code configurable pipeline. 849 tests, v0.1.0 released.",
    tags: ["Python", "PySide6", "OCR", "Generative AI"],
    imageUrl: "/docscan-studio.png",
    link: "https://github.com/ferreret/docscan",
    content: contentEn
  },
  es: {
    id: "4",
    title: "DocScan Studio",
    description: "Aplicacion de escritorio multiplataforma para captura masiva de documentos, OCR, lectura de codigos de barras y extraccion de campos con IA, mediante pipeline configurable sin codigo. 849 tests, v0.1.0 publicada.",
    tags: ["Python", "PySide6", "OCR", "IA Generativa"],
    imageUrl: "/docscan-studio.png",
    link: "https://github.com/ferreret/docscan",
    content: contentEs
  }
};
