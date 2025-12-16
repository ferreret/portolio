import { BlogPost } from '../../types';

export const orchestratingAgents: { en: BlogPost; es: BlogPost } = {
  en: {
    id: "1",
    title: "Orchestrating AI Agents: Beyond the Chatbot",
    date: "2023-10-15",
    readTime: "5 min read",
    tags: ["AI Agents", "LangChain", "Architecture"],
    excerpt: "Why single-turn LLM interactions are not enough for enterprise automation and how multi-agent systems solve complex tasks.",
    content: `
      <p class="mb-4">Large Language Models (LLMs) have revolutionized how we interact with text. However, for real-world enterprise automation, a simple chatbot interface is rarely sufficient. We need systems that can plan, execute, and verify actions.</p>
      <h3 class="text-xl font-bold mb-2">The Rise of Agents</h3>
      <p class="mb-4">By giving LLMs access to tools—such as calculators, APIs, or database connectors—we transform them into Agents. Frameworks like LangChain and LangGraph allow us to define cyclical graphs where agents can reason, act, observe the result, and act again.</p>
      <p>In my recent work, I've implemented these patterns to automate document workflows that previously required significant human oversight...</p>
    `
  },
  es: {
    id: "1",
    title: "Orquestando Agentes de IA: Más allá del Chatbot",
    date: "15-10-2023",
    readTime: "5 min lectura",
    tags: ["Agentes IA", "LangChain", "Arquitectura"],
    excerpt: "Por qué las interacciones LLM de un solo turno no son suficientes para la automatización empresarial y cómo los sistemas multi-agente resuelven tareas complejas.",
    content: `
      <p class="mb-4">Los Grandes Modelos de Lenguaje (LLMs) han revolucionado la forma en que interactuamos con el texto. Sin embargo, para la automatización empresarial del mundo real, una simple interfaz de chatbot rara vez es suficiente. Necesitamos sistemas que puedan planificar, ejecutar y verificar acciones.</p>
      <h3 class="text-xl font-bold mb-2">El auge de los Agentes</h3>
      <p class="mb-4">Al dar a los LLMs acceso a herramientas—como calculadoras, APIs o conectores de base de datos—los transformamos en Agentes. Frameworks como LangChain y LangGraph nos permiten definir grafos cíclicos donde los agentes pueden razonar, actuar, observar el resultado y actuar de nuevo.</p>
      <p>En mi trabajo reciente, he implementado estos patrones para automatizar flujos de trabajo documentales que anteriormente requerían una supervisión humana significativa...</p>
    `
  }
};