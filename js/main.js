document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Load image grid from JSON
    fetch('assets/data/products.json')
        .then(response => response.json())
        .then(data => {
            const imageGrid = document.getElementById('imageGrid');
            data.heroImages.forEach(image => {
                const gridItem = document.createElement('div');
                gridItem.className = 'grid-item';
                
                const img = document.createElement('img');
                img.src = `assets/images/hero/${image.filename}`;
                img.alt = image.alt;
                
                const overlay = document.createElement('div');
                overlay.className = 'hover-overlay';
                
                const btn1 = document.createElement('button');
                btn1.className = 'hover-button';
                btn1.textContent = image.button1;
                
                const btn2 = document.createElement('button');
                btn2.className = 'hover-button';
                btn2.textContent = image.button2;
                
                overlay.appendChild(btn1);
                overlay.appendChild(btn2);
                gridItem.appendChild(img);
                gridItem.appendChild(overlay);
                imageGrid.appendChild(gridItem);
            });
            
            // Load flavor cards
            const flavorCards = document.getElementById('flavorCards');
            data.flavors.forEach(flavor => {
                const card = document.createElement('div');
                card.className = 'flavor-card';
                
                const title = document.createElement('h3');
                title.textContent = flavor.name;
                
                const desc = document.createElement('p');
                desc.textContent = flavor.description;
                
                const heat = document.createElement('div');
                heat.className = 'heat-level';
                
                for (let i = 0; i < 5; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'heat-dot' + (i < flavor.heat ? ' active' : '');
                    heat.appendChild(dot);
                }
                
                const btn = document.createElement('button');
                btn.className = 'neon-button small';
                btn.textContent = 'CRUNCH IT';
                
                card.appendChild(title);
                card.appendChild(desc);
                card.appendChild(heat);
                card.appendChild(btn);
                flavorCards.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading data:', error));
    
    // Form submission
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            // In a real app, you would send this to your server
            alert(`CRUNCHMAX ACTIVATED! Check ${email} for your welcome package.`);
            this.reset();
        });
    }
    
    // Add random glitch effects occasionally
    setInterval(() => {
        if (Math.random() > 0.7) {
            document.body.classList.add('glitch-active');
            setTimeout(() => {
                document.body.classList.remove('glitch-active');
            }, 200);
        }
    }, 5000);
});