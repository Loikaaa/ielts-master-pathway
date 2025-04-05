
#!/bin/bash

# Clear previous builds
echo "Cleaning previous builds..."
rm -rf dist deploy.zip deploy-htaccess.txt

# Build the project
echo "Building project..."
npm run build

# Copy essential files to the deployment package
echo "Creating deployment package..."
cd dist
zip -r ../deploy.zip *
cd ..

# Create a copy of the .htaccess file for easy access
cp .htaccess deploy-htaccess.txt

echo "Deployment package created: deploy.zip"
echo "==================== DEPLOYMENT INSTRUCTIONS ===================="
echo "1. Log into your cPanel account"
echo "2. Navigate to File Manager and go to your public_html directory"
echo "3. Upload the deploy.zip file"
echo "4. Upload the .htaccess file (or the deploy-htaccess.txt file and rename it to .htaccess)"
echo "5. Extract the deploy.zip file in the public_html directory"
echo "6. Make sure the .htaccess file is in the public_html directory"
echo "7. Delete the deploy.zip file (optional for cleanup)"
echo "8. Your website should now be accessible at your domain"
echo "==============================================================="
echo "NOTE: If your site doesn't work, check for errors in the cPanel error logs"
echo "      You may need to configure your domain's DNS settings if not already done"
echo "      For Windows users, use PowerShell to run this script or use Git Bash"

# Add a section about getting full source code
echo ""
echo "==================== SOURCE CODE EXPORT ===================="
echo "To get the complete source code for backup or transfer:"
echo "1. From Visual Studio Code, open terminal (Ctrl+` or Terminal > New Terminal)"
echo "2. Run: zip -r source-code.zip . -x \"node_modules/*\" -x \"dist/*\""
echo "3. This creates source-code.zip with all project files excluding node_modules and dist"
echo "4. Upload this zip to cPanel only if you need the development source code"
echo "NOTE: For just deploying the built site, use deploy.zip created above"
