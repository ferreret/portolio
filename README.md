# Portfolio

Mi portfolio personal — [portfolio.nicolasbarcelo.dev](https://portfolio.nicolasbarcelo.dev)

Construido con React 19, TypeScript, Vite y Tailwind CSS v4. SPA bilingüe (EN/ES) con páginas de proyectos, blog, CV imprimible y ticker de actividad de GitHub.

## Stack

- **React 19** + **React Router 7** para la SPA
- **TypeScript** estricto
- **Vite 6** como build tool (alias `@` apunta a la raíz)
- **Tailwind CSS v4** vía PostCSS, con `dark:` driven por la clase `dark` en `<html>`
- **GitHub Actions** para regenerar `public/activity.json` cada 6 h

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo en http://localhost:3000
npm run build      # build de producción a dist/
npm run preview    # previsualizar el build de producción
npm run typecheck  # tsc --noEmit (mismo comando que corre el hook)
```

No hay tests ni linting configurados; `typecheck` es el único guardrail formal.

## Arquitectura del contenido

Todo el contenido vive en `contentData.ts`, que exporta `{ en, es }` — dos `AppContent` completos. El idioma activo se selecciona en runtime y se pasa como `data` por la app.

Proyectos y artículos se definen como pares bilingües `{ en, es }` en ficheros separados:

- `data/projects/*.ts` — cada uno exporta un `ProjectItem`
- `data/articles/*.ts` — cada uno exporta un `BlogPost`

Se importan y ensamblan en `contentData.ts`. Las interfaces TypeScript están en `types.ts`.

### Añadir un proyecto o artículo

Flujo recomendado usando los skills de Claude Code en `.claude/skills/`:

1. **`add-content-item`** — andamia el fichero bilingüe en `data/projects/<slug>.ts` o `data/articles/<slug>.ts` con el schema completo como placeholders y conecta los imports en `contentData.ts`.
2. Rellena una de las dos lenguas con contenido **real**.
3. **`sync-bilingual`** — produce la otra versión preservando estructura HTML, glosario y formato numérico.
4. **`bilingual-content-reviewer`** (subagente) — auditoría final de paridad antes de commit.

Regla: el contenido del portfolio (proyectos, métricas, posts) siempre es real, nunca inventado.

## CV imprimible

El CV se renderiza en `/cv` desde `data/cv/{en,es}.ts` mediante `components/CVView.tsx`. Para regenerar los PDF:

1. Abrir `/cv` en el navegador
2. Cambiar idioma con el toggle del header
3. `Ctrl+P` → Save as PDF, A4, **"Background graphics" activado**
4. Guardar como `public/cv-en.pdf` o `public/cv-es.pdf`

El botón "Download CV" en `HomeView` enlaza a `/cv-${language}.pdf`.

## Ticker de actividad

`components/ActivityTicker.tsx` consume `public/activity.json`, que se regenera por GitHub Actions:

- Workflow: `.github/workflows/update-activity.yml`
- Cron: cada 6 horas (`0 */6 * * *`)
- Hace fetch de los commits públicos recientes y commitea el JSON si ha cambiado

Esto evita pegarle a la API de GitHub desde el navegador del visitante.

## Quality gate

`.claude/hooks/tsc-on-edit.sh` corre `tsc --noEmit` después de cada edición de `.ts`/`.tsx` desde Claude Code, y bloquea si aparecen errores.

## Despliegue

Despliegue continuo vía **Dokploy** desde la rama `production`:

```bash
git checkout production
git merge main
git push
```

Dokploy hace pull, build y sirve el `dist/` resultante. El dominio real es `portfolio.nicolasbarcelo.dev` (no el apex).

## Estructura

```
.
├── App.tsx                  # layout + router
├── contentData.ts           # ensamblado bilingüe { en, es }
├── types.ts                 # interfaces (AppContent, ProjectItem, BlogPost, …)
├── components/              # vistas y UI
├── data/projects/           # un fichero por proyecto (par bilingüe)
├── data/articles/           # un fichero por artículo (par bilingüe)
├── data/cv/                 # contenido del CV por idioma
├── hooks/                   # custom React hooks
├── public/                  # estáticos: activity.json, cv-{en,es}.pdf, profile.png
├── .claude/                 # hooks y skills locales del proyecto
└── .github/workflows/       # automatizaciones (ticker de actividad)
```
