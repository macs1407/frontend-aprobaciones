#!/bin/bash

# Variables
BUCKET_NAME=flujo-aprobaciones-frontend
REGION=us-east-2
BUILD_DIR=dist

# Paso 1: Compilar el frontend
echo "🛠️ Ejecutando build del proyecto..."
npm run build

# Paso 2: Crear el bucket si no existe
echo "🪣 Verificando o creando bucket S3..."
aws s3 mb s3://$BUCKET_NAME --region $REGION || true

# Paso 3: Habilitar hosting estático
aws s3 website s3://$BUCKET_NAME/ --index-document index.html --error-document index.html

# Paso 4: Aplicar política pública de lectura
echo "🔓 Aplicando política pública al bucket..."
aws s3api put-bucket-policy --bucket $BUCKET_NAME --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::'"$BUCKET_NAME"'/*"
    }
  ]
}'

# Paso 5: Sincronizar archivos al bucket
echo "☁️ Subiendo archivos a S3..."
aws s3 sync $BUILD_DIR/ s3://$BUCKET_NAME --delete

# Paso 6: Mostrar la URL del sitio
echo "🌐 Sitio desplegado en:"
echo "http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com"
