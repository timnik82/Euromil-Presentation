# CLAUDE.md - AI Assistant Guide for Euromil-Presentation

## Project Overview

**Euromil-Presentation** is an interactive educational presentation application about lottery probability, designed for children aged 5-15 years old. The content is in Russian and teaches probability concepts through engaging animations, interactive elements, and a friendly Einstein character guide.

**Stack:**
- React 18.3.1 with TypeScript (strict mode)
- Vite 5.4.2 (build tool)
- Tailwind CSS 3.4.1 (styling)
- Supabase 2.57.4 (backend/database)
- Lucide React 0.344.0 (icons)

**Project Origins:** Created from the `bolt-vite-react-ts` template (see `.bolt/config.json`)

## Repository Structure

```
/
├── src/
│   ├── components/
│   │   ├── slides/              # 10 presentation slide components
│   │   │   ├── Slide1Welcome.tsx
│   │   │   ├── Slide2Probability.tsx
│   │   │   ├── Slide3MoreApples.tsx
│   │   │   ├── Slide4HowLotteryWorks.tsx
│   │   │   ├── Slide4aCombinatorics.tsx
│   │   │   ├── Slide4bCalculation.tsx
│   │   │   ├── Slide5BigNumbers.tsx
│   │   │   ├── Slide6Comparisons.tsx
│   │   │   ├── Slide7TimeExperiment.tsx
│   │   │   └── Slide8Conclusion.tsx
│   │   ├── EinsteinCharacter.tsx      # Animated SVG character
│   │   ├── SlideLayoutWithCharacter.tsx  # Reusable slide wrapper
│   │   └── SlideNavigation.tsx        # Navigation controls
│   ├── hooks/
│   │   ├── useSession.ts              # Supabase session management
│   │   └── useSound.ts                # Web Audio API wrapper
│   ├── lib/
│   │   └── supabase.ts                # Supabase client initialization
│   ├── utils/
│   │   └── sounds.ts                  # Web Audio synthesized sounds
│   ├── App.tsx                        # Main app component
│   ├── main.tsx                       # React entry point
│   ├── index.css                      # Tailwind directives
│   └── vite-env.d.ts                  # Vite type definitions
├── supabase/
│   └── migrations/
│       └── 20251224123432_create_lottery_presentation_tables.sql
├── .bolt/
│   └── config.json                    # Bolt template config
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json, tsconfig.app.json, tsconfig.node.json
├── eslint.config.js
├── .gitignore
├── README.md
├── GITHUB_API_GUIDE.md                # GitHub API documentation
└── CLAUDE.md                          # This file
```

## Architecture & Design Patterns

### Component Architecture
- **Pure React Hooks** - No Redux, Context API, or state management libraries
- **Component-based design** - Each slide is a self-contained component
- **Composition pattern** - `SlideLayoutWithCharacter` wraps slide content
- **Hook-based state** - Custom hooks (`useSession`, `useSound`) for shared logic

### State Management Strategy
```typescript
// Local UI state
const [state, setState] = useState<Type>(initialValue);

// Memoized callbacks (prevents re-renders)
const handler = useCallback(() => { }, [dependencies]);

// Non-render-triggering refs (timing, animations)
const ref = useRef<Type>(initialValue);

// Session persistence
sessionStorage (for session ID between page reloads)
```

### Data Flow
1. **App.tsx** - Central state container (currentSlide, isTransitioning)
2. **Props drilling** - State passed down to child components
3. **Callback props** - Child components call parent handlers (onNext, playSound)
4. **Custom hooks** - Shared logic extracted to hooks

## Key Conventions

### File & Component Naming
- **Components:** `PascalCase.tsx` (e.g., `SlideNavigation.tsx`)
- **Slides:** `Slide{Number}{Title}.tsx` (e.g., `Slide4HowLotteryWorks.tsx`)
- **Hooks:** `use{Name}.ts` (e.g., `useSession.ts`)
- **Props interfaces:** `{ComponentName}Props` pattern

### TypeScript Standards
- **Strict mode enabled** - All type checking rules enforced
- **Explicit types** - Function parameters and returns typed
- **Interface over type** - Prefer `interface` for component props
- **No any** - Avoid using `any` type

### Code Style
```typescript
// Props interface definition
interface ComponentProps {
  prop1: string;
  prop2: (arg: Type) => void;
}

// Component definition with destructured props
export function Component({ prop1, prop2 }: ComponentProps) {
  // Implementation
}

// Event handlers
const handleClick = useCallback(() => {
    // Logic here
  }, [dependencies]);
```

### Import Order Convention
```typescript
// 1. External libraries
import { useState, useEffect, useCallback } from 'react';

// 2. Internal hooks
import { useSound } from './hooks/useSound';

// 3. Components (alphabetical)
import { ComponentA } from './components/ComponentA';
import { ComponentB } from './components/ComponentB';
```

## Development Workflow

### Environment Setup

**Required Environment Variables:**
Create `.env.local` in project root:
```bash
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Installation:**
```bash
npm install
```

### Development Commands

```bash
# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking (no compilation)
npm run typecheck

# Linting
npm run lint
```

### Git Workflow

**Branch Naming Convention:**
- Feature branches: `claude/add-{feature}-{session-id}` (for Claude AI work)
- Human branches: `feature/{description}`, `fix/{description}`, `refactor/{description}`

**Commit Message Style:**
Based on git log analysis, use conventional commit style:
- `feat:` - New features
- `fix:` - Bug fixes
- `update:` - Enhancements to existing features
- `refactor:` - Code restructuring
- `docs:` - Documentation changes
- `style:` - Formatting, whitespace

**PR Workflow:**
1. Create feature branch from main
2. Commit changes with descriptive messages
3. Push to remote: `git push -u origin branch-name`
4. Create PR using `gh` CLI (see GITHUB_API_GUIDE.md)
5. Address review feedback
6. Merge when approved

**Important:** See `GITHUB_API_GUIDE.md` for detailed GitHub API usage instructions when working with PRs.

## Database Schema (Supabase)

### Tables

**sessions**
```sql
- id: uuid PRIMARY KEY
- started_at: timestamptz
- last_active_at: timestamptz
- completed: boolean (default false)
- sound_enabled: boolean (default true)
- created_at: timestamptz
```

**slide_progress**
```sql
- id: uuid PRIMARY KEY
- session_id: uuid (references sessions)
- slide_number: int
- viewed_at: timestamptz
- time_spent_seconds: int (default 0)
- created_at: timestamptz
UNIQUE(session_id, slide_number)
```

**experiment_results**
```sql
- id: uuid PRIMARY KEY
- session_id: uuid (references sessions)
- user_age: int
- years_needed: numeric
- generations_needed: numeric
- created_at: timestamptz
```

### Database Operations Pattern

```typescript
// Using Supabase client
const { data, error } = await supabase
  .from('table_name')
  .operation()
  .filters();

// Fire-and-forget pattern (used in this project)
await supabase.from('table').insert({...});
// Note: No error handling in most cases
```

## Styling Guidelines

### Tailwind CSS Usage
- **Utility-first approach** - Use Tailwind classes directly in JSX
- **Responsive design** - Mobile-first with breakpoints (`md:`, `lg:`)
- **Custom animations** - Defined in `tailwind.config.js`

### Custom Animations Available
```javascript
// In tailwind.config.js
slideInFromTop: '0.5s slide-in from top with fade'
bounceIn: '0.4s bounce-in animation'

// Additional keyframes defined in component <style> tags:
@keyframes wave, breathe, fall, float, slideInLeft, slideInRight, shake, pop
```

### Color Palette
- **Primary:** Teal (`teal-500`, `teal-600`)
- **Accents:** Cyan, Amber, Green, Red
- **Gradients:** `from-cyan-400 via-blue-500 to-purple-600` (example)
- **Glass-morphism:** `bg-white/80`, `bg-white/90`

### Styling Pattern
```tsx
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600">
  <div className="bg-white/90 rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl">
    <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
      Title
    </h1>
  </div>
</div>
```

## Component Patterns

### Slide Component Template
```tsx
interface SlideProps {
  playSound: (name: string) => void;
}

export function SlideName({ playSound }: SlideProps) {
  const [localState, setLocalState] = useState<Type>(initialValue);

  const handleInteraction = useCallback(() => {
    playSound('soundName');
    // Logic here
  }, [playSound]);

  return (
    <SlideLayoutWithCharacter
      character="pose"
      characterPosition="left"
      backgroundColor="bg-gradient-to-br from-color1 via-color2 to-color3"
    >
      {/* Slide content */}
    </SlideLayoutWithCharacter>
  );
}
```

### Einstein Character Poses
Available poses: `wave`, `thinking`, `surprised`, `pointing`, `excited`, `winking`, `watching`, `hero`

Usage:
```tsx
<EinsteinCharacter pose="thinking" position="left" />
```

### Sound Integration
```tsx
// In component
const handleClick = () => {
  playSound('playClick');
  // Action logic
};

// Available sounds (see src/utils/sounds.ts):
// playClick, playSuccess, playError, playWhoosh, playChime
```

## Interactive Elements

### Keyboard Navigation
- **Arrow Right / Space:** Next slide
- **Arrow Left:** Previous slide
- Implemented in App.tsx with `window.addEventListener('keydown')`

### Slide Navigation
- Previous/Next buttons (side edges)
- Progress indicators (bottom center)
- Sound toggle (top-left)
- Visible on slides 1-9 (hidden on welcome slide)

### Session Tracking
- Automatic session creation on first load
- Time tracking per slide using `useRef` for precision
- Auto-sync to Supabase on slide change
- Completion marking on final slide

## Testing Strategy

### Current State
⚠️ **No testing framework currently configured**

### Recommended Testing Approach (for future)
```bash
# Install Vitest (Vite-native testing)
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Add test script to package.json
"test": "vitest"

# Test file naming
ComponentName.test.tsx
```

### Test Coverage Priorities
1. **Hooks:** `useSession`, `useSound`
2. **Navigation logic:** Slide transitions, keyboard handlers
3. **Interactive elements:** Apple picker, lottery selector
4. **Database operations:** Session creation, progress tracking

## Common Tasks for AI Assistants

### Adding a New Slide

1. **Create slide component** in `src/components/slides/`:
```tsx
// SlideXNewSlide.tsx
interface SlideXNewSlideProps {
  playSound: (name: string) => void;
}

export function SlideXNewSlide({ playSound }: SlideXNewSlideProps) {
  return (
    <SlideLayoutWithCharacter
      character="thinking"
      characterPosition="left"
      backgroundColor="bg-gradient-to-br from-blue-400 to-purple-600"
    >
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold">Title</h1>
        {/* Content */}
      </div>
    </SlideLayoutWithCharacter>
  );
}
```

2. **Update App.tsx:**
```tsx
// Add import
import { SlideXNewSlide } from './components/slides/SlideXNewSlide';

// Update TOTAL_SLIDES constant
const TOTAL_SLIDES = 11; // Increment

// Add case in renderSlide()
case X:
  return <SlideXNewSlide playSound={playSound} />;
```

3. **Test navigation** to ensure slide appears in sequence

### Modifying Existing Slides

1. **Read the slide file first** using Read tool
2. **Understand current structure** before making changes
3. **Preserve existing patterns** (SlideLayoutWithCharacter, playSound)
4. **Test interactive elements** if modified

### Updating Database Schema

1. **Create new migration** in `supabase/migrations/`:
```sql
-- YYYYMMDDHHMMSS_description.sql
ALTER TABLE table_name ADD COLUMN new_column type;
```

2. **Update TypeScript types** if needed
3. **Update useSession hook** if adding new operations

### Fixing Type Errors

```bash
# Run type checking
npm run typecheck

# Common fixes:
# 1. Add missing prop types
# 2. Fix strict null checks (use optional chaining ?.)
# 3. Add proper return types to functions
# 4. Use type assertions sparingly (as Type)
```

### Debugging Session Tracking

1. Check browser console for Supabase errors
2. Verify environment variables are set
3. Check sessionStorage for session ID: `sessionStorage.getItem('lottery-session-id')`
4. Inspect Supabase dashboard for data

## Performance Considerations

### Optimization Techniques Used
- `useCallback` for stable function references
- `useRef` for non-render-triggering state
- Lucide icons (tree-shakeable)
- Web Audio API synthesis (no external audio files)
- Tailwind CSS JIT (Just-In-Time compilation)

### Avoid These Anti-Patterns
❌ Inline function definitions in props
❌ Missing dependency arrays in hooks
❌ Unnecessary state (use refs for values that don't trigger renders)
❌ Over-fetching from database
❌ Blocking the main thread with heavy computations

## Accessibility Guidelines

### Current Implementation
- ✅ ARIA labels in Russian
- ✅ `sr-only` class for screen readers
- ✅ Semantic HTML (`<button>`, not `<div onClick>`)
- ✅ Keyboard navigation support
- ✅ `aria-live="polite"` for dynamic content

### Enhancement Opportunities
- Add focus management for slide transitions
- Improve color contrast for text readability
- Add alt text for decorative elements
- Test with screen readers

## Security Considerations

### Current Security Posture
- ✅ Environment variables for sensitive data
- ✅ Supabase RLS (Row-Level Security) enabled
- ✅ No user authentication (by design - educational app)
- ✅ Anonymous sessions only

### Important Notes
- **No sensitive data** - All data is anonymous educational tracking
- **RLS policies** - Allow anonymous read/write (appropriate for this use case)
- **.gitignore** - Properly configured to exclude `.env`, `.env.local`

## Deployment

### Build Process
```bash
# Production build
npm run build

# Output: dist/ directory
# Contains optimized static files ready for deployment
```

### Deployment Targets
- **Vite static hosting** - Any static file host (Netlify, Vercel, GitHub Pages)
- **Environment variables** - Must be configured in hosting platform
- **Supabase** - Already cloud-hosted, no deployment needed

### Pre-deployment Checklist
- [ ] Run `npm run typecheck` - No errors
- [ ] Run `npm run lint` - No errors
- [ ] Test in production mode (`npm run build && npm run preview`)
- [ ] Verify environment variables in hosting platform
- [ ] Test Supabase connection from deployed app

## Troubleshooting

### Common Issues

**Issue:** "Supabase client not initialized"
- **Cause:** Missing environment variables
- **Fix:** Create `.env.local` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

**Issue:** Slides not transitioning
- **Cause:** `isTransitioning` state stuck
- **Fix:** Check timeout durations, ensure setState callbacks are firing

**Issue:** Sound not playing
- **Cause:** Web Audio API requires user interaction
- **Fix:** Sounds only work after first user interaction (by design)

**Issue:** Type errors after adding new code
- **Cause:** TypeScript strict mode
- **Fix:** Run `npm run typecheck`, address errors one by one

**Issue:** Tailwind classes not applying
- **Cause:** JIT mode requires exact class names
- **Fix:** Don't use string interpolation for Tailwind classes

## Resources & References

### Internal Documentation
- `README.md` - Basic project info
- `GITHUB_API_GUIDE.md` - GitHub API usage for PRs
- `CLAUDE.md` - This file

### External Documentation
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Lucide React Icons](https://lucide.dev/)

## AI Assistant Quick Reference

### Before Making Changes
1. ✅ Read relevant component files first
2. ✅ Understand existing patterns and conventions
3. ✅ Check TypeScript types
4. ✅ Preserve consistent code style

### Making Changes
1. ✅ Follow established naming conventions
2. ✅ Use TypeScript strict mode (no `any`)
3. ✅ Add proper prop types
4. ✅ Use `useCallback` for handlers
5. ✅ Keep components focused and single-purpose

### After Making Changes
1. ✅ Run `npm run typecheck`
2. ✅ Run `npm run lint`
3. ✅ Test in browser (visual + interactive)
4. ✅ Commit with descriptive message

### Communication Style
- 🇷🇺 **User-facing text:** Russian language
- 💬 **Code comments:** English (minimal, only where needed)
- 📝 **Commit messages:** English
- 🎯 **ARIA labels:** Russian

---

## Changelog

**2026-01-11** - Initial CLAUDE.md creation
- Comprehensive codebase documentation
- Architecture and pattern descriptions
- Development workflow guidelines
- Troubleshooting guide

---

**For updates to this document:** Keep it synchronized with actual codebase state. Update when:
- New conventions are established
- Architecture changes are made
- New tools or dependencies are added
- Development workflow evolves
