#!/bin/bash
cd frontend
npm install
npm run build
cd ..
cd backend
./mvnw clean package
