# Security Guidelines

## 🔐 API Key Security

**IMPORTANT**: Never commit your actual API keys to version control!

### ✅ What's Safe:
- Using environment variables (`.env` file)
- The `.env.example` template file
- Configuration through environment variables

### ❌ What's Dangerous:
- Hardcoding API keys in source code
- Committing `.env` files with real keys
- Sharing API keys in public repositories

### 🛡️ Best Practices:

1. **Always use `.env` files** for sensitive configuration
2. **Keep `.env` in your `.gitignore`** (already configured)
3. **Use `.env.example`** as a template for others
4. **Rotate your API keys** regularly
5. **Monitor API usage** in your Google AI Studio dashboard

### 🔑 Getting Your API Key:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file
5. Keep your key private and secure

### 🚨 If Your Key is Compromised:

1. Immediately revoke the key in Google AI Studio
2. Generate a new API key
3. Update your `.env` file with the new key
4. Monitor your API usage for any suspicious activity
