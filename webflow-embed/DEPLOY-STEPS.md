# GovFaceMatch v5 — Webflow Deployment Steps

## 1. AWS Login
```bash
aws sso login --profile AdministratorAccess-941377134432
```

## 2. Upload to S3
```bash
aws s3 sync s3-upload/govfacematch-v5/ s3://incode-videos/govfacematch-v5/ \
  --acl public-read \
  --profile AdministratorAccess-941377134432
```

## 3. Set CORS on bucket (if not already done from v4)
```bash
aws s3api put-bucket-cors \
  --bucket incode-videos \
  --cors-configuration '[{"AllowedOrigins":["*"],"AllowedMethods":["GET"],"AllowedHeaders":["*"]}]' \
  --profile AdministratorAccess-941377134432
```

## 4. Verify upload works
Open in browser:
- https://incode-videos.s3.us-east-2.amazonaws.com/govfacematch-v5/assets/index-BzGOiQV-.css
- https://incode-videos.s3.us-east-2.amazonaws.com/govfacematch-v5/assets/index-BTwpS2Ii.js
- https://incode-videos.s3.us-east-2.amazonaws.com/govfacematch-v5/background.png

## 5. Webflow — Head Code
Go to: **Project Settings → Custom Code → Head Code**

Paste contents of `webflow-embed/head-code.html`:
```html
<!-- Preload critical fonts -->
<link rel="preload" href="https://incode-videos.s3.us-east-2.amazonaws.com/govfacematch-v5/fonts/DMSans-Regular.ttf" as="font" type="font/ttf" crossorigin>
<link rel="preload" href="https://incode-videos.s3.us-east-2.amazonaws.com/govfacematch-v5/fonts/RethinkSans-VariableFont_wght.ttf" as="font" type="font/ttf" crossorigin>

<!-- Preload JS chunks -->
<link rel="modulepreload" crossorigin href="https://incode-videos.s3.us-east-2.amazonaws.com/govfacematch-v5/assets/animations-M-FPxDiN.js">
<link rel="modulepreload" crossorigin href="https://incode-videos.s3.us-east-2.amazonaws.com/govfacematch-v5/assets/modal-CTkEb5ux.js">
<link rel="modulepreload" crossorigin href="https://incode-videos.s3.us-east-2.amazonaws.com/govfacematch-v5/assets/interactions-6V8Bh7t5.js">

<!-- Stylesheet -->
<link rel="stylesheet" crossorigin href="https://incode-videos.s3.us-east-2.amazonaws.com/govfacematch-v5/assets/index-BzGOiQV-.css">
```

## 6. Webflow — Body Code
Go to: **Page Settings → Custom Code → Before </body> tag**

Paste contents of `webflow-embed/body-code.html`:
```html
<!-- Main content container -->
<main id="main-content"></main>

<!-- Entry point script -->
<script type="module" crossorigin src="https://incode-videos.s3.us-east-2.amazonaws.com/govfacematch-v5/assets/index-BTwpS2Ii.js"></script>
```

## 7. Publish & Test
- Publish the Webflow site
- Check page loads, fonts render, animations work
- Check video modal plays
- Check logo marquee scrolls
- Check tabs/accordion in unified flow section
