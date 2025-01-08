class MatrixAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        
        // Animasyon ayarları
        this.config = {
            fontSize: 14,
            characters: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789",
            color: '#0F0',
            opacity: 0.05,
            speed: 33,
            density: 0.975
        };

        // Animasyon durumu
        this.columns = 0;
        this.drops = [];
        
        // Başlangıç
        this.initialize();
        this.startAnimation();
    }

    initialize() {
        // Canvas boyutunu ayarla
        this.setCanvasSize();
        
        // Pencere boyutu değiştiğinde yeniden ayarla
        window.addEventListener('resize', () => {
            this.setCanvasSize();
            this.resetDrops();
        });

        this.resetDrops();
    }

    setCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.config.fontSize);
    }

    resetDrops() {
        // Her sütun için yeni damla pozisyonları oluştur
        this.drops = Array(this.columns).fill(1);
    }

    draw() {
        // Yarı saydam arka plan efekti
        this.ctx.fillStyle = `rgba(0, 0, 0, ${this.config.opacity})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Matrix karakterlerini çiz
        this.ctx.fillStyle = this.config.color;
        this.ctx.font = `${this.config.fontSize}px monospace`;

        // Her sütun için karakterleri çiz
        for (let i = 0; i < this.drops.length; i++) {
            // Rastgele karakter seç
            const char = this.config.characters[Math.floor(Math.random() * this.config.characters.length)];
            
            // Karakteri çiz
            const x = i * this.config.fontSize;
            const y = this.drops[i] * this.config.fontSize;
            this.ctx.fillText(char, x, y);

            // Damla pozisyonunu güncelle
            if (y > this.canvas.height && Math.random() > this.config.density) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }

    startAnimation() {
        const animate = () => {
            this.draw();
            requestAnimationFrame(animate);
        };
        animate();
    }
}

// Animasyonu başlat
document.addEventListener('DOMContentLoaded', () => {
    new MatrixAnimation('matrix-canvas');
}); 