@echo off
echo Initializing Git repository...
git init

echo Adding remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/KapilavaiHanumaan/PG-project-Web.git

echo Staging files...
git add .

echo Committing files...
git commit -m "Initial commit: PGTrust Hyderabad production landing page"

echo Setting main branch and pushing...
git branch -M main
git push -u origin main

echo Done!
pause
