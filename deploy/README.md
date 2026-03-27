# GestorEPI Landing Page - Deploy

## Opção 1: Hospedagem Estática (Sem Formulário)

Para hospedagem simples (Netlify, Vercel, GitHub Pages, Apache, Nginx):

1. Faça upload da pasta `deploy/static/` para sua hospedagem
2. O formulário redirecionará para WhatsApp (ajuste no código se necessário)

### Estrutura:
```
static/
├── index.html          # Página principal
├── logo-gestao-epi.jpg # Logo
└── static/
    ├── js/main.*.js    # JavaScript (~57KB gzipado)
    └── css/main.*.css  # CSS (~6KB gzipado)
```

**Tamanho total: ~344KB**

---

## Opção 2: Hospedagem Completa (Com Formulário + Resend)

Para hospedagem com backend (Vercel, Railway, Render, VPS):

### Backend (Python/FastAPI)
```bash
cd deploy/full/backend
pip install -r requirements.txt
uvicorn server:app --host 0.0.0.0 --port 8001
```

### Variáveis de Ambiente (.env)
```
RESEND_API_KEY=sua_chave_resend
CONTACT_EMAIL=seu_email@dominio.com
```

### Frontend
Servir a pasta `deploy/full/frontend_build/` como arquivos estáticos.

---

## Configurações

### WhatsApp
Edite no arquivo `src/pages/LandingPage.js`:
```javascript
const WHATSAPP_NUMBER = '5511999999999';
```

### E-mail de Contato
Edite no arquivo `backend/.env`:
```
CONTACT_EMAIL=seu_email@dominio.com
```

---

## Tecnologias
- React 18
- TailwindCSS 3
- Lucide Icons
- FastAPI (backend)
- Resend (envio de e-mail)
