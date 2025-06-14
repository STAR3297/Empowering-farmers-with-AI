#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}Starting deployment process...${NC}"

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}Git is not installed. Please install git first.${NC}"
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed. Please install npm first.${NC}"
    exit 1
fi

# Install dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
npm install

# Build the project
echo -e "${GREEN}Building the project...${NC}"
npm run build

# Commit changes
echo -e "${GREEN}Committing changes...${NC}"
git add .
git commit -m "Deploy: $(date +%Y-%m-%d_%H-%M-%S)"

# Push to GitHub
echo -e "${GREEN}Pushing to GitHub...${NC}"
git push origin main

echo -e "${GREEN}Deployment process completed!${NC}"
echo -e "${GREEN}Your application will be automatically deployed to Render and Netlify.${NC}"
echo -e "${GREEN}Check the deployment status at:${NC}"
echo -e "Backend: https://dashboard.render.com"
echo -e "Frontend: https://app.netlify.com" 