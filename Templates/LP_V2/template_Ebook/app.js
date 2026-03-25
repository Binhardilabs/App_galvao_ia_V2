// app.js - Método GFI E-book Capture Application

document.addEventListener('DOMContentLoaded', () => {
    // Current Year Update
    const yearEl = document.getElementById('current-year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // ==========================================
    // 1. Animação 3D e Smooth Scroll (Botões CTA)
    // ==========================================
    const triggerButtons = document.querySelectorAll('.trigger-livro-btn');
    const livroScene = document.querySelector('.livro-scene');
    const capaBtn = document.getElementById('capa-btn'); // Opcional para clicar direto na capa

    const handleOpenBook = (e) => {
        if(e) e.preventDefault();
        
        // Aplica o smooth scroll até o topo (onde o livro se encontra)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Após 300ms, aciona a animação de abertura do livro
        setTimeout(() => {
            if(livroScene) {
                livroScene.classList.add('livro-aberto');
            }
        }, 300);
    };

    // Associa o evento a todos os botões CTA da página
    triggerButtons.forEach(btn => {
        btn.addEventListener('click', handleOpenBook);
    });

    if (capaBtn) {
        capaBtn.addEventListener('click', handleOpenBook);
    }

    // ==========================================
    // 2. Envio de Formulário e Webhook
    // ==========================================
    const ebookForm = document.getElementById('ebook-form');
    const btnSubmit = document.getElementById('btn-submit-form');
    
    if (ebookForm) {
        // Remove validação HTML nativa para que o alerta customizado via JS controle o erro visual
        ebookForm.setAttribute('novalidate', 'true');

        ebookForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Busca dados de input do formulário pela ordem: Nome, E-mail, WhatsApp
            const inputs = ebookForm.querySelectorAll('input');
            const nomeStr = inputs[0] ? inputs[0].value.trim() : '';
            const emailStr = inputs[1] ? inputs[1].value.trim() : '';
            const whatsStr = inputs[2] ? inputs[2].value.trim() : '';
            
            // Verificação de campos vazios
            if(!nomeStr || !emailStr || !whatsStr) {
                const originalText = btnSubmit.innerHTML;
                const originalBg = btnSubmit.style.backgroundColor;
                const originalColor = btnSubmit.style.color;
                
                // Exibe erro na UI
                btnSubmit.innerHTML = 'X Erro - Campo em Branco';
                btnSubmit.style.backgroundColor = '#ef4444'; // Vermelho (Tailwind red-500)
                btnSubmit.style.color = '#ffffff';
                
                setTimeout(() => {
                    // Restaura estado original após 3s
                    btnSubmit.innerHTML = originalText;
                    btnSubmit.style.backgroundColor = originalBg;
                    btnSubmit.style.color = originalColor;
                }, 3000);
                return;
            }

            // Monta o cabeçalho/payload que será enviado via POST
            const payload = {
                nome: nomeStr,
                email: emailStr,
                telefone: whatsStr,
                template: 'LP_V2 - E-book'
            };

            const webhookUrl = 'https://script.google.com/macros/s/AKfycbzUsD4wyVws52WJ4w88wCbeFE_fjKT1r9VmF_i9780elSnkVm5ioGDmeKSLwxCeH4JB/exec';

            // Altera botão para estado "Enviando"
            btnSubmit.innerHTML = 'Enviando...';
            btnSubmit.disabled = true;
            btnSubmit.style.opacity = '0.7';

            try {
                // Fetch Request
                await fetch(webhookUrl, {
                    method: 'POST',
                    mode: 'no-cors', // Fundamental para enviar dados pro GAS sem erros nativos CORS
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    body: JSON.stringify(payload)
                });
                
                // Sucesso: Muda Botão
                btnSubmit.innerHTML = '✓ Redirecionando para o WhatsApp';
                btnSubmit.style.backgroundColor = '#22c55e'; // Verde de sucesso (Tailwind green-500)
                btnSubmit.style.color = '#ffffff';
                btnSubmit.style.opacity = '1';

                // Redirecionamento após tempo limite
                setTimeout(() => {
                    window.location.href = 'https://chat.whatsapp.com/JLr0AcxlJujFCm2yPw13Ov';
                }, 1500);

            } catch (error) {
                console.error('Erro ao enviar webhook:', error);
                
                // Mensagem de Erro de Conexão
                btnSubmit.innerHTML = 'X Erro na Conexão';
                btnSubmit.style.backgroundColor = '#ef4444';
                btnSubmit.style.color = '#ffffff';
                
                setTimeout(() => {
                    btnSubmit.disabled = false;
                    btnSubmit.innerHTML = 'Quero receber o guia gratuito';
                    btnSubmit.style.backgroundColor = '';
                    btnSubmit.style.color = '';
                    btnSubmit.style.opacity = '1';
                }, 3000);
            }
        });
    }

    // ==========================================
    // LÓGICA DO RODAPÉ DINÂMICO
    try {
        const linkWhatsapp = document.getElementById('footer-whatsapp');
        const linkPhone = document.getElementById('footer-phone');
        const linkEmail = document.getElementById('footer-email');
        const linkInstagram = document.getElementById('footer-instagram');

        // WhatsApp
        if (linkWhatsapp && import.meta.env.VITE_SUPPORT_WHATSAPP) {
            linkWhatsapp.href = import.meta.env.VITE_SUPPORT_WHATSAPP;
            linkWhatsapp.innerText = `WhatsApp: ${import.meta.env.VITE_SUPPORT_PHONE}`;
        }

        // Telefone
        if (linkPhone && import.meta.env.VITE_SUPPORT_PHONE) {
            const rawPhone = import.meta.env.VITE_SUPPORT_PHONE;
            const cleanPhone = rawPhone.replace(/[^\d+]/g, '');
            linkPhone.href = `tel:${cleanPhone}`;
            linkPhone.innerText = `Telefone: ${rawPhone}`;
        }

        // E-mail
        if (linkEmail && import.meta.env.VITE_SUPPORT_EMAIL) {
            linkEmail.href = `mailto:${import.meta.env.VITE_SUPPORT_EMAIL}`;
            linkEmail.innerText = `E-mail: ${import.meta.env.VITE_SUPPORT_EMAIL}`;
        }

        // Instagram (muda apenas o link, mantém o texto)
        if (linkInstagram && import.meta.env.VITE_INSTAGRAM) {
            linkInstagram.href = import.meta.env.VITE_INSTAGRAM;
        }
    } catch (error) {
        console.error('Erro ao processar variáveis do rodapé:', error);
    }
});
