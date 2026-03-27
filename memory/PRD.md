# GestorEPI Landing Page - PRD

## Projeto
Landing page comercial do sistema GestorEPI - Gestão de Equipamentos de Proteção Individual com reconhecimento facial.

## Data
27/03/2026

## Problema Original
O site completo estava pesado demais para hospedagem simples. O arquivo `main.*.js` estava causando problemas no upload devido ao tamanho excessivo.

## Solução Implementada
Criação de build otimizado e leve da landing page comercial, removendo todas as dependências não utilizadas.

## O que foi feito
1. **Análise do projeto original** - Sistema full-stack React + FastAPI + MongoDB
2. **Extração da landing page** - Mantido apenas LandingPage.js
3. **Remoção de dependências pesadas**:
   - face-api.js
   - html5-qrcode  
   - recharts
   - react-router-dom
   - radix-ui components (não utilizados)
   - react-hook-form
   - date-fns
   - embla-carousel
   - react-webcam
   - E outras ~30 dependências
4. **Criação de backend mínimo** - Apenas endpoint /api/contact com Resend
5. **Build de produção otimizado** - Sem sourcemaps

## Arquitetura Final

### Frontend (React)
- `src/App.js` - Componente principal
- `src/pages/LandingPage.js` - Landing page completa
- `src/index.css` - Estilos Tailwind

### Backend (FastAPI - opcional)
- `server.py` - Endpoint /api/contact
- Integração com Resend para envio de e-mails

## Tamanhos

### Build Original (estimado)
- JS: ~2-3MB
- CSS: ~500KB
- Total: ~4MB+

### Build Otimizado
- JS: 192KB (57KB gzipado)
- CSS: 28KB (6KB gzipado)
- Total: **344KB**
- Redução: **~90%**

## Pacotes de Deploy

1. **gestorepi-static.zip** (160KB)
   - Build estático puro
   - Para: Netlify, Vercel, GitHub Pages, Apache, Nginx

2. **gestorepi-full.zip** (164KB)
   - Build + backend mínimo
   - Para: Hospedagens com Python (Vercel Functions, Railway, Render)

## Funcionalidades da Landing Page
- Hero section com CTA
- Seção de problemas
- Seção de soluções
- Galeria de screenshots do sistema
- Diferenciais
- Benefícios
- Planos de preços (12, 24, 36 meses)
- Formulário de contato (envia email via Resend)
- Integração WhatsApp
- Design responsivo
- Menu mobile

## Configurações

### WhatsApp
```javascript
const WHATSAPP_NUMBER = '5511999999999';
```

### E-mail de Contato
```
CONTACT_EMAIL=alexandre_santos@prismaxshop.com.br
RESEND_API_KEY=re_xxxxx
```

## Backlog / Melhorias Futuras
- P1: Configurar domínio próprio
- P1: Validar recebimento de e-mails pelo Resend
- P2: Adicionar analytics (Google Analytics/Plausible)
- P2: Otimizar imagens com lazy loading
- P3: Adicionar mais depoimentos de clientes
- P3: Integrar chat ao vivo

## Tecnologias
- React 18.2
- TailwindCSS 3.4
- Lucide Icons
- FastAPI 0.115
- Resend (email)
