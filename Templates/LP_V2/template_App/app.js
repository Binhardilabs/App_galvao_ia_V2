// app.js - Galvao IA App Landing Page

document.addEventListener('DOMContentLoaded', () => {
    // Current Year Update
    const yearEl = document.getElementById('current-year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // ==========================================
    // LÓGICA DO RODAPÉ DINÂMICO
    try {
        const linkWhatsapp = document.getElementById('footer-whatsapp');
        const linkPhone = document.getElementById('footer-phone');
        const linkEmail = document.getElementById('footer-email');
        const linkInstagram = document.getElementById('footer-instagram');

        // Lendo as variáveis usando import.meta.env
        const phone = import.meta.env.VITE_SUPPORT_PHONE || '+55 (34) 9727-6996';
        const email = import.meta.env.VITE_SUPPORT_EMAIL || 'galvoinveste@gmail.com';
        const instagram = import.meta.env.VITE_INSTAGRAM || import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com/galvaoinveste';
        
        // Remove todos os caracteres não-numéricos para uso em links tel: e wa.me/
        const cleanPhone = phone.replace(/\D/g, '');

        // 1. Atualizar WhatsApp
        if (linkWhatsapp) {
            if (phone) {
                // Se houver a URL pronta no .env, usamos, senão construímos com o número formatado
                linkWhatsapp.href = import.meta.env.VITE_SUPPORT_WHATSAPP || `https://wa.me/${cleanPhone}`;
            } else {
                // Lida graciosamente caso não tenha o número no .env
                linkWhatsapp.style.display = 'none';
            }
        }

        // 2. Atualizar Telefone
        if (linkPhone) {
            if (phone) {
                linkPhone.href = `tel:+${cleanPhone}`;
            } else {
                linkPhone.style.display = 'none';
            }
        }

        // 3. Atualizar E-mail
        if (linkEmail) {
            if (email) {
                linkEmail.href = `mailto:${email}`;
            } else {
                linkEmail.style.display = 'none';
            }
        }

        // 4. Atualizar Instagram
        if (linkInstagram) {
            if (instagram) {
                linkInstagram.href = instagram;
            } else {
                linkInstagram.style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Erro ao processar variáveis do rodapé:', error);
    }

    // ==========================================
    // LÓGICA DO SIMULADOR INTERATIVO
    try {
        const btnSimular = document.getElementById('btn-simular');
        const chatWindow = document.getElementById('sim-chat-window');
        const barAlimentacao = document.getElementById('sim-bar-alimentacao');
        const txtAlimentacao = document.getElementById('sim-txt-alimentacao');
        const lampada = document.getElementById('sim-lampada');
        const simSubtitle = document.getElementById('sim-subtitle');
        
        // Impede duplo clique
        let isSimulating = false;

        if (btnSimular && chatWindow && barAlimentacao && lampada) {
            btnSimular.addEventListener('click', () => {
                if (isSimulating) return;
                isSimulating = true;
                
                // 1. Mostrar Mensagem do Usuário
                const userMsg = document.createElement('div');
                userMsg.className = 'self-end bg-[#075E54] text-white px-4 py-3 rounded-2xl rounded-tr-none max-w-[85%] text-sm shadow-sm transition-all duration-300 opacity-0 translate-y-2';
                userMsg.textContent = 'Gastei R$ 50 na padaria';
                chatWindow.appendChild(userMsg);
                
                // Refluxo forçado para animação CSS disparar e scrollar para o fundo
                requestAnimationFrame(() => {
                    userMsg.classList.remove('opacity-0', 'translate-y-2');
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                });

                // 2. Aguarda 1.0s para resposta da IA
                setTimeout(() => {
                    const iaMsg = document.createElement('div');
                    iaMsg.className = 'self-start bg-zinc-800 text-gray-200 px-4 py-3 rounded-2xl rounded-tl-none max-w-[85%] text-sm shadow-sm transition-all duration-300 opacity-0 translate-y-2';
                    iaMsg.innerHTML = 'Anotado! R$ 50 em Alimentação.<br><span class="text-gold text-[11px] font-semibold mt-1 block">Saldo atualizado com sucesso.</span>';
                    chatWindow.appendChild(iaMsg);
                    
                    requestAnimationFrame(() => {
                        iaMsg.classList.remove('opacity-0', 'translate-y-2');
                        chatWindow.scrollTop = chatWindow.scrollHeight;
                    });

                    // 3. Atualizar dashboard logo em seguida
                    setTimeout(() => {
                        // Aumentar barra (de 20% para 70%)
                        barAlimentacao.style.width = '70%';
                        barAlimentacao.classList.remove('bg-blue-500');
                        barAlimentacao.classList.add('bg-gold', 'shadow-[0_0_10px_rgba(245,197,24,0.5)]');
                        
                        // Atualizar texto
                        txtAlimentacao.textContent = 'R$ 200';
                        txtAlimentacao.classList.remove('text-gray-400');
                        txtAlimentacao.classList.add('text-gold', 'font-bold');

                        // Ligar lâmpada com brilho
                        lampada.classList.remove('text-gray-600');
                        lampada.classList.add('text-gold');
                        lampada.style.filter = 'drop-shadow(0 0 20px rgba(245, 197, 24, 0.8))';
                        lampada.style.transform = 'scale(1.15)';
                        
                        simSubtitle.textContent = 'Decisões no controle total da sua mão!';
                        simSubtitle.classList.replace('text-gray-500', 'text-gold');

                        // Apagar botão antigo
                        btnSimular.textContent = 'Simulação Terminada';
                        btnSimular.className = 'w-full bg-zinc-800 text-gray-500 font-bold py-3 px-4 rounded-xl flex items-center justify-center cursor-not-allowed transition-all duration-300';
                        
                        // Etapa Final de Conversão (Aparece o CTA após 2 Segundos)
                        setTimeout(() => {
                            btnSimular.classList.add('hidden');
                            
                            const btnContratar = document.getElementById('btn-contratar');
                            if (btnContratar) {
                                btnContratar.classList.remove('hidden');
                                // Pequeno delay (requestAnimationFrame) para que o navegador registre a troca de 'hidden' para 'block' antes de animar a opacidade
                                requestAnimationFrame(() => {
                                    btnContratar.classList.remove('opacity-0');
                                });
                            }
                        }, 2000);
                        
                    }, 500); // 500ms depois que a MSG IA chegou

                }, 1000); // Demora 1s real para a IA "digitar"
            });
        }
    } catch (error) {
        console.error('Erro no simulador interativo:', error);
    }
});
