# Deployment Guide

## 🚀 Supported Platforms

### Vercel Deployment

- **Features**: Auto-deployment, edge network, serverless functions support
- **Config file**: `vercel.json`

### Netlify Deployment

- **Features**: Continuous deployment, form handling, redirect rules
- **Config file**: `netlify.toml`

## 🔧 Environment Variables

Configure the following environment variables before deployment:

```env
# Text Generation API (Recipe generation)
VITE_TEXT_GENERATION_BASE_URL=https://api.example.com/v1/
VITE_TEXT_GENERATION_API_KEY=your_text_api_key_here
VITE_TEXT_GENERATION_MODEL=your_model_name
VITE_TEXT_GENERATION_TEMPERATURE=0.7
VITE_TEXT_GENERATION_TIMEOUT=300000

# Image Generation API (Optional)
VITE_IMAGE_GENERATION_BASE_URL=https://api.example.com/v1/images/generations
VITE_IMAGE_GENERATION_API_KEY=your_image_api_key_here
VITE_IMAGE_GENERATION_MODEL=your_image_model
```

## 📋 Deployment Steps

### Vercel Deployment

1. **Fork the project** to your GitHub account
2. **Login to Vercel** and connect GitHub
3. **Import project**: Select your forked repository
4. **Configure environment variables**: Add the environment variables in Vercel project settings
5. **Deploy**: Vercel will automatically build and deploy

### Netlify Deployment

1. **Fork the project** to your GitHub account
2. **Login to Netlify** and connect GitHub
3. **New site**: Select your forked repository
4. **Build settings**:
   - Build command: `npm run build:netlify`
   - Publish directory: `dist`
   - Node version: `18`
5. **Environment variables**: Add environment variables in Netlify site settings
6. **Deploy**: Netlify will automatically build and deploy

## 🛠️ Custom Domain

### Vercel Custom Domain

1. In Vercel project settings, select **Domains**
2. Add your domain
3. Follow the prompts to configure DNS records

### Netlify Custom Domain

1. In Netlify site settings, select **Domain management**
2. Add custom domain
3. Configure DNS records or use Netlify DNS

## 🔄 Auto Deployment

Both platforms support Git-integrated auto deployment:

- **Push to main branch**: Automatically triggers production deployment
- **Push to other branches**: Creates preview deployment (Vercel) or branch deployment (Netlify)
- **Pull Request**: Automatically creates preview deployment

## 🚨 Troubleshooting

### Common Issues

1. **Build failure**: Check if environment variables are correctly configured
2. **404 pages**: Ensure SPA redirect rules are configured
3. **API call failures**: Check API keys and endpoint configuration
4. **Static resource loading failures**: Check build output directory configuration

### Debug Steps

1. Check build logs
2. Verify environment variable configuration
3. Test build command locally
4. Check network and API connections

## 📞 Support

If you encounter deployment issues:

1. Check project Issues
2. Refer to official documentation:
   - [Vercel Docs](https://vercel.com/docs)
   - [Netlify Docs](https://docs.netlify.com/)
3. Submit a new Issue describing the problem
