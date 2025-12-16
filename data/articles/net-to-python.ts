import { BlogPost } from '../../types';

export const netToPython: { en: BlogPost; es: BlogPost } = {
  en: {
    id: "2",
    title: "Bridging the Gap: .NET to Python in AI Projects",
    date: "2023-08-22",
    readTime: "4 min read",
    tags: [".NET", "Python", "Integration"],
    excerpt: "Strategies for integrating modern Python-based AI microservices into legacy .NET enterprise monoliths.",
    content: `
      <p class="mb-4">Many enterprises run on robust .NET ecosystems. However, the cutting edge of AI development happens primarily in Python. How do we bridge this gap?</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li><strong>Microservices:</strong> Exposing Python AI models via FastAPI.</li>
        <li><strong>Message Queues:</strong> Using RabbitMQ or Azure Service Bus for asynchronous processing.</li>
        <li><strong>Process Integration:</strong> Using n8n to glue disparate systems together.</li>
      </ul>
    `
  },
  es: {
    id: "2",
    title: "Cerrando la Brecha: .NET a Python en Proyectos de IA",
    date: "22-08-2023",
    readTime: "4 min lectura",
    tags: [".NET", "Python", "Integración"],
    excerpt: "Estrategias para integrar microservicios modernos de IA basados en Python en monolitos empresariales heredados en .NET.",
    content: `
      <p class="mb-4">Muchas empresas funcionan con robustos ecosistemas .NET. Sin embargo, la vanguardia del desarrollo de IA ocurre principalmente en Python. ¿Cómo cerramos esta brecha?</p>
      <ul class="list-disc pl-5 mb-4 space-y-2">
        <li><strong>Microservicios:</strong> Exponiendo modelos de IA en Python vía FastAPI.</li>
        <li><strong>Colas de Mensajes:</strong> Usando RabbitMQ o Azure Service Bus para procesamiento asíncrono.</li>
        <li><strong>Integración de Procesos:</strong> Usando n8n para unir sistemas dispares.</li>
      </ul>
    `
  }
};