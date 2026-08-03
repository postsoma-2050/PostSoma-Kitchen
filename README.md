# 🍳 What to Eat

> AI Recipe Generator & Personal Recipe Manager

A modern web application that helps you generate recipes using AI or create and manage your own custom recipes. All recipes are saved locally and can be easily managed in a unified collection.

## ✨ Core Features

### 1. AI Recipe Generation
- Generate complete recipes from ingredients and cuisine preferences
- Support for multiple cuisines (Chinese Eight Great Cuisines + International)
- Detailed cooking steps with time and temperature guidance
- Professional cooking tips and techniques

### 2. Manual Recipe Management
- Create your own custom recipes with a comprehensive form
- Edit and update your saved recipes
- Add ingredients, steps, cooking tips, and images
- Full control over recipe details

### 3. Unified Recipe Collection
- Save both AI-generated and manually created recipes
- All recipes stored in a unified favorites list
- Search and filter by name, ingredients, or cuisine
- Organize and manage your personal recipe library

### 4. Local Storage Persistence
- All recipes saved locally in your browser
- No account required - your data stays private
- Persistent storage across sessions

### 5. Dynamic Settings
- Configure AI API endpoints and models at runtime
- Switch between different AI service providers
- No need to restart - settings apply immediately
- Test API connections before saving

## 🛠️ Tech Stack

- **Frontend Framework:** Vue 3.4 (Composition API) + TypeScript 5.3+
- **Styling:** Tailwind CSS 3.4+
- **Build Tool:** Vite 5.0+
- **State Management:** Pinia (via LocalStorage)
- **Routing:** Vue Router 4.2+

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables (optional)
# Copy .env.example to .env and add your AI API keys if you want to use AI features
cp .env.example .env
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Type check and build for production
npm run build

# Preview production build
npm run preview
```

## 📖 Usage Guide

### Creating Recipes Manually

1. Navigate to "创建菜谱" (Create Recipe) from the navigation menu
2. Fill in the recipe details:
   - Recipe name and cuisine type
   - Add ingredients (click "+ 添加食材")
   - Add cooking steps (click "+ 添加步骤")
   - Optionally add cooking tips and image URL
3. Click "保存菜谱" to save to your collection

### Generating Recipes with AI

1. Go to the home page
2. Select ingredients and choose cuisine preferences
3. Click "开始生成菜谱" to generate recipes
4. Generated recipes can be saved to your collection

### Managing Your Recipes

- View all saved recipes in "我的收藏" (My Favorites)
- Search recipes by name or ingredients
- Filter by cuisine type
- Edit manual recipes (click ✏️ icon)
- Add notes to any recipe

### Configuring AI Settings

1. Click the ⚙️ settings button in the navigation
2. Configure your AI API endpoints and keys
3. Test the connection before saving
4. Settings are saved locally and persist across sessions

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── RecipeCard.vue        # Recipe display card
│   ├── GlobalNavigation.vue  # Navigation bar
│   ├── SettingsModal.vue     # Settings configuration
│   └── ...
├── config/              # Configuration files
│   ├── cuisines.ts           # Cuisine definitions
│   ├── ingredients.ts        # Ingredient lists
│   └── ...
├── services/            # Business logic services
│   ├── aiService.ts          # AI recipe generation
│   ├── favoriteService.ts    # Recipe storage (LocalStorage)
│   ├── imageService.ts       # Image generation
│   └── ...
├── stores/              # State management
│   └── settings.js           # App settings
├── types/               # TypeScript type definitions
│   └── index.ts              # Shared Recipe interface
├── views/               # Page components
│   ├── Home.vue              # AI recipe generation
│   ├── CreateRecipe.vue      # Manual recipe creation
│   ├── Favorites.vue         # Recipe collection
│   └── ...
└── utils/               # Utility functions
    └── apiConfig.js          # API configuration helpers
```

## 🔧 Environment Variables

If you want to use AI features, configure these environment variables:

```env
# Text Generation API (Recipe generation)
VITE_TEXT_GENERATION_BASE_URL=https://api.example.com/v1/
VITE_TEXT_GENERATION_API_KEY=your_api_key_here
VITE_TEXT_GENERATION_MODEL=your_model_name
VITE_TEXT_GENERATION_TEMPERATURE=0.7
VITE_TEXT_GENERATION_TIMEOUT=300000

# Image Generation API (Optional)
VITE_IMAGE_GENERATION_BASE_URL=https://api.example.com/v1/images/generations
VITE_IMAGE_GENERATION_API_KEY=your_api_key_here
VITE_IMAGE_GENERATION_MODEL=your_image_model
```

**Note:** The application works without AI features - you can use it purely as a manual recipe manager!

## 📝 Development

### Type Checking

```bash
npm run type-check
```

### Adding New Features

1. Create new components in `src/components/`
2. Add new views in `src/views/`
3. Update routes in `src/main.ts`
4. Add navigation links in `src/components/GlobalNavigation.vue`

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - Progressive JavaScript framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
