// app.js - Método GFI Main Application

document.addEventListener('DOMContentLoaded', () => {
    // Current Year Update
    const yearEl = document.getElementById('current-year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // 1. Load Environment Variables from Vite
    // Note: Due to Vite processing, these are statically replaced during build/dev
    const whatsappNumber = import.meta.env.VITE_SUPPORT_WHATSAPP || 'N/A';
    const phoneNumber = import.meta.env.VITE_SUPPORT_PHONE || 'N/A';
    const emailAddress = import.meta.env.VITE_SUPPORT_EMAIL || 'N/A';
    const instagramUrl = import.meta.env.VITE_INSTAGRAM || '#';

    // 2. Inject Variables into DOM
    
    // WhatsApp
    const whatsappEl = document.getElementById('support-whatsapp');
    if(whatsappEl) {
        whatsappEl.textContent = `WhatsApp: ${whatsappNumber}`;
        whatsappEl.addEventListener('click', () => {
             // In a real scenario, you can map this to an api.whatsapp.com link
             window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber.replace(/\D/g, '')}`, '_blank');
        });
    }

    // Phone
    const phoneEl = document.getElementById('support-phone');
    if(phoneEl) {
        phoneEl.textContent = `Telefone: ${phoneNumber}`;
        phoneEl.addEventListener('click', () => {
            window.location.href = `tel:${phoneNumber.replace(/\D/g, '')}`;
        });
    }

    // Email
    const emailEl = document.getElementById('support-email');
    if(emailEl) {
        emailEl.textContent = emailAddress;
        emailEl.href = `mailto:${emailAddress}`;
    }

    // Instagram
    const instagramEl = document.getElementById('support-instagram');
    if(instagramEl) {
        instagramEl.href = instagramUrl;
    }

    // Console confirmation
    console.log('✅ App Módulo Principal Carregado com Sucesso.');
    console.log('🔗 Variáveis de Ambiente Injetadas.');
});
