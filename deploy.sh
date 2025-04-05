
#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Create a deployment zip
echo "Creating deployment package..."
cd dist
zip -r ../deploy.zip *
cd ..

echo "Deployment package created: deploy.zip"
echo "Upload the contents of the deploy.zip file to your cPanel root directory"
echo "Make sure to include the .htaccess file in your upload"
