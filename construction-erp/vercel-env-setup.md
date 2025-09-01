# Vercel Environment Variables Setup

To deploy your Construction ERP to Vercel, you need to set up these environment variables in your Vercel dashboard:

## Required Environment Variables

1. **MONGODB_URI**
   - Value: `mongodb+srv://botnoob101251:RnXJe8K7tJDyzrMF@cluster0.t7xe9u5.mongodb.net/construction-erp`
   - Description: MongoDB Atlas connection string

2. **JWT_SECRET**
   - Value: `your-production-jwt-secret-key-change-this-in-production`
   - Description: Secret key for JWT token generation
   - **Important**: Change this to a secure random string in production

3. **NODE_ENV**
   - Value: `production`
   - Description: Environment mode

## How to Set Environment Variables in Vercel

### Option 1: Using Vercel CLI
```bash
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add NODE_ENV
```

### Option 2: Using Vercel Dashboard
1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with its value
4. Make sure to select "Production", "Preview", and "Development" environments

## Deployment Commands

```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Deploy to Vercel
vercel

# Or deploy with environment variables inline (for testing)
vercel --env MONGODB_URI="mongodb+srv://botnoob101251:RnXJe8K7tJDyzrMF@cluster0.t7xe9u5.mongodb.net/construction-erp" --env JWT_SECRET="your-production-jwt-secret-key-change-this-in-production" --env NODE_ENV="production"
```

## Testing After Deployment

1. **Login Test**: Try logging in with `admin` / `admin123`
2. **Site Manager Test**: Login with `sitemanager` / `password123`
3. **Site Incharge Test**: Login with `siteincharge` / `password123`
4. **Attendance Flow Test**: 
   - Login as site manager
   - Submit attendance
   - Login as site incharge
   - Verify attendance appears in pending list

## Important Notes

- The MongoDB Atlas database is already set up and contains your migrated data
- The attendance issue has been fixed - foremen submissions will now appear for site incharge approval
- All API endpoints have been tested and are working correctly
- The system supports the full attendance workflow: submission → review → approval/rejection