// ==========================================
// INIZIALIZZAZIONE GLOBALE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ANIMAZIONI FADE-IN GLOBALI
    // ==========================================
    const fadeElements = document.querySelectorAll('.fade-in-up, .fade-in-up-slow');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); 

    fadeElements.forEach(element => observer.observe(element));

    // ==========================================
    // 2. LOGICA SEZIONE "CHI SIAMO"
    // ==========================================
    const teamData = {
        Cristina: {
            title: "Cristina – La Crystal Boss",
            desc: "Buongiorno, mi presento: sono la Crystal Boss, ma chiamatemi Cry. Non amo parlare di me ma ci proverò… Sono una persona generosa, allegra e molto testarda. Se mi metto in testa una cosa non ce n’è per nessuno... Amo tutte le sfumature del rosa, i glitter e far brillare ogni cosa… comprese le unghie di tutte le donne!"
        },
        Chiara: {
            title: "Chiara",
            desc: "Io sono Chiara, una persona pacata e sempre pronta a sorridere! La mia determinazione e testardaggine mi aiutano a raggiungere i miei obiettivi. Curiosa di natura, adoro scoprire e imparare sempre cose nuove. Il mio obiettivo è farvi sentire sereni e coccolati durante tutto il tempo trascorso insieme, facendovi dimenticare lo stress quotidiano."
        },
        Sofia: {
            title: "Sofia",
            desc: "Ciao a tutti, sono Sofia. Mi piace ascoltare gli altri e sono sempre disponibile per offrire supporto e consigli. La gentilezza per me è un valore fondamentale. Sono molto paziente, ma un po’ meno quando mi capita di incrociare qualcuno di incompetente alla guida... Questo devo ammetterlo! 😅 Cerco di diffondere positività e creatività ovunque io vada!"
        },
        Yilena: {
            title: "Ylenia",
            desc: "Ciao, sono Ylenia! 😊 Sono una persona semplice, determinata, solare e sempre positiva. Specializzata in trattamenti viso, corpo, mani e piedi... La mia più grande passione è curare ogni dettaglio per farvi sentire speciali. Essere estetista non è un semplice lavoro ma una scelta di vita."
        }
    };

    const cards = document.querySelectorAll('.team-card');
    const textWrapper = document.getElementById('text-wrapper');
    const titleElement = document.getElementById('team-title');
    const descElement = document.getElementById('team-desc');

    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('click', function() {
                const memberId = this.getAttribute('data-id');

                if (teamData[memberId] && titleElement.textContent !== teamData[memberId].title) {
                    textWrapper.classList.add('fade-out'); 
                    setTimeout(() => {
                        titleElement.textContent = teamData[memberId].title;
                        descElement.textContent = teamData[memberId].desc;
                        textWrapper.classList.remove('fade-out'); 
                    }, 400); 
                }

                if (this.classList.contains('card-1')) return;

                let remainingCards = Array.from(cards).filter(c => c !== this);
                remainingCards.sort((a, b) => {
                    let aNum = parseInt(a.className.match(/card-(\d)/)[1]);
                    let bNum = parseInt(b.className.match(/card-(\d)/)[1]);
                    return aNum - bNum;
                });

                cards.forEach(c => c.classList.remove('card-1', 'card-2', 'card-3', 'card-4'));

                this.classList.add('card-1');               
                remainingCards[0].classList.add('card-2');  
                remainingCards[1].classList.add('card-3');  
                remainingCards[2].classList.add('card-4');
            });
        });
    }

    // ==========================================
    // 3. MENU SERVIZI E TABS
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const serviceCategories = document.querySelectorAll('.service-category');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetCategory = btn.getAttribute('data-target');

            serviceCategories.forEach(category => {
                const catName = category.getAttribute('data-category');
                if (targetCategory === 'tutti' || targetCategory === catName) {
                    category.classList.add('active');
                } else {
                    category.classList.remove('active');
                }
            });
        });
    });

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            this.classList.toggle('active');
            content.classList.toggle('open');
            
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.classList.remove('open');
                }
            });
        });
    });

    const subTabBtns = document.querySelectorAll('.sub-tab-btn');
    subTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parentSidebar = btn.closest('.services-sidebar');
            const parentContainer = btn.closest('.split-services-container');
            const parentListArea = parentContainer.querySelector('.services-list-area');

            const siblingBtns = parentSidebar.querySelectorAll('.sub-tab-btn');
            siblingBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetId = btn.getAttribute('data-sub');
            const siblingPanels = parentListArea.querySelectorAll('.sub-panel');
            
            siblingPanels.forEach(panel => {
                if (panel.id === targetId) {
                    panel.classList.add('active'); 
                } else {
                    panel.classList.remove('active'); 
                }
            });
        });
    });

    // ==========================================
    // 4. MENU MOBILE E SISTEMA ANTI-BLOCCO
    // ==========================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Funzione centralizzata per chiudere il menu
    function closeMobileMenu() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = ''; // Sblocca lo scroll
    }

    if(hamburgerBtn && mobileMenu && closeBtn) {
        hamburgerBtn.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            document.body.style.overflow = 'hidden'; 
        });

        closeBtn.addEventListener('click', closeMobileMenu);
        mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
    }

    // FIX: Se l'utente gira il telefono in orizzontale o allarga la pagina, forza lo sblocco
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    // ==========================================
    // 5. SCROLLSPY AVANZATO CON URL PULITO
    // ==========================================
    const sezioni = document.querySelectorAll('section');
    const linkMenu = document.querySelectorAll('nav a'); 

    window.addEventListener('scroll', () => {
        let sezioneAttuale = '';

        sezioni.forEach(sezione => {
            const inizioSezione = sezione.offsetTop;
            if (window.scrollY >= (inizioSezione - 150)) { 
                sezioneAttuale = sezione.getAttribute('id');
            }
        });

        linkMenu.forEach(link => {
            link.classList.remove('active');
            if (sezioneAttuale && link.getAttribute('href') === `#${sezioneAttuale}`) {
                link.classList.add('active');
            }
        });

        // Gestione Pulizia URL
        let percorsoPulito = window.location.pathname.replace(/index\.html$/, '');
        if (percorsoPulito === '') percorsoPulito = '/';

        if (sezioneAttuale) {
            const nuovoHash = `#${sezioneAttuale}`;
            if (window.location.hash !== nuovoHash) {
                history.replaceState(null, null, percorsoPulito + nuovoHash);
            }
        } else if (window.scrollY === 0) {
            // Se scrollo tutto in alto, rimuovo completamente l'hashtag
            if (window.location.hash !== '') {
                history.replaceState(null, null, percorsoPulito);
            }
        }
    });
});
