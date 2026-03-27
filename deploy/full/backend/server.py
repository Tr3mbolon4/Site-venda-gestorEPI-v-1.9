from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
import resend

load_dotenv()

app = FastAPI(title='GestorEPI Landing API')

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

# Resend Config
resend.api_key = os.environ.get('RESEND_API_KEY')
CONTACT_EMAIL = os.environ.get('CONTACT_EMAIL', 'alexandre_santos@prismaxshop.com.br')

class ContactFormRequest(BaseModel):
    nome: str
    empresa: str
    telefone: str
    mensagem: Optional[str] = None

@app.get('/api/health')
async def health_check():
    return {'status': 'healthy', 'service': 'gestorepi-landing'}

@app.post('/api/contact')
async def send_contact_form(data: ContactFormRequest):
    if not resend.api_key:
        return {'status': 'error', 'message': 'Serviço de email não configurado'}
    
    html_content = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f97316, #ea580c); padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Nova Solicitação - GestorEPI</h1>
        </div>
        <div style="background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Dados do Contato</h2>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Nome:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">{data.nome}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Empresa:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">{data.empresa}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #555;">Telefone:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #333;">{data.telefone}</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #555; vertical-align: top;">Mensagem:</td>
                    <td style="padding: 10px 0; color: #333;">{data.mensagem or 'Não informada'}</td>
                </tr>
            </table>
            <div style="margin-top: 30px; padding: 15px; background: #fff3e0; border-radius: 8px; border-left: 4px solid #f97316;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                    <strong>Próximo passo:</strong> Entre em contato com o cliente o mais breve possível.
                </p>
            </div>
        </div>
    </div>
    """
    
    params = {
        "from": "GestorEPI <onboarding@resend.dev>",
        "to": [CONTACT_EMAIL],
        "subject": f"Nova Solicitação: {data.empresa} - {data.nome}",
        "html": html_content
    }
    
    try:
        email = resend.Emails.send(params)
        return {
            "status": "success",
            "message": "Mensagem enviada com sucesso!",
            "email_id": email.get("id")
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8001)
