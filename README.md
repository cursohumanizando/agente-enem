# Agente Elaborador ENEM · Humanizando

Gerador de questões padrão ENEM para Ciências Humanas (Geografia, História, Filosofia, Sociologia).

## Deploy no Vercel (5 minutos)

### 1. Suba para o GitHub
- Crie um repositório no [github.com](https://github.com) (pode ser privado)
- Faça upload de todos estes arquivos

### 2. Conecte ao Vercel
- Acesse [vercel.com](https://vercel.com) e faça login com GitHub
- Clique em **"Add New Project"**
- Selecione o repositório que você criou
- Clique em **"Deploy"**

### 3. Configure a chave de API
- No painel do Vercel, vá em **Settings → Environment Variables**
- Adicione:
  - **Name:** `ANTHROPIC_API_KEY`
  - **Value:** sua chave (começa com `sk-ant-...`)
- Clique em **Save**
- Vá em **Deployments → Redeploy** para aplicar

### 4. Pronto!
Sua URL será algo como `agente-enem.vercel.app`

## Onde obter a chave de API
Acesse [console.anthropic.com](https://console.anthropic.com) → API Keys → Create Key
