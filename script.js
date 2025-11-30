const coupons = [
    {
        store: "Whole Foods",
        discount: "$5 OFF",
        product: "Organic Produce",
        description: "Save $5 on $30+ purchase of organic fruits and vegetables",
        expiry: "Expires: Dec 15, 2025",
        value: 5
    },
    {
        store: "Trader Joe's",
        discount: "20% OFF",
        product: "Wine Selection",
        description: "Get 20% off any bottle of wine from our premium selection",
        expiry: "Expires: Dec 10, 2025",
        value: 8
    },
    {
        store: "Safeway",
        discount: "$3 OFF",
        product: "Frozen Foods",
        description: "Save $3 when you buy 3 participating frozen dinner items",
        expiry: "Expires: Dec 20, 2025",
        value: 3
    },
    {
        store: "Kroger",
        discount: "Buy 1 Get 1",
        product: "Cereal",
        description: "Buy one, get one free on select cereal brands",
        expiry: "Expires: Dec 18, 2025",
        value: 6
    },
    {
        store: "Target",
        discount: "$10 OFF",
        product: "Household Items",
        description: "Save $10 on $50+ purchase of cleaning supplies and paper products",
        expiry: "Expires: Dec 25, 2025",
        value: 10
    },
    {
        store: "Walmart",
        discount: "15% OFF",
        product: "Bakery Items",
        description: "Get 15% off fresh bakery items including bread, pastries, and cakes",
        expiry: "Expires: Dec 12, 2025",
        value: 4
    },
    {
        store: "Costco",
        discount: "$7 OFF",
        product: "Rotisserie Chicken",
        description: "Save $7 on combo: 2 rotisserie chickens + Caesar salad kit",
        expiry: "Expires: Dec 8, 2025",
        value: 7
    },
    {
        store: "Albertsons",
        discount: "30% OFF",
        product: "Snacks",
        description: "Get 30% off chips, crackers, and snack bars",
        expiry: "Expires: Dec 22, 2025",
        value: 5
    }
];

let currentIndex = 0;
let savedCount = 0;
let totalValue = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;

const container = document.getElementById('swipe-container');
const savedCountEl = document.getElementById('saved-count');
const totalValueEl = document.getElementById('total-value');

function createCard(coupon) {
    const card = document.createElement('div');
    card.className = 'coupon-card';
    card.innerHTML = `
        <div class="store-logo">${coupon.store}</div>
        <div class="discount">${coupon.discount}</div>
        <div class="coupon-details">
            <div class="product">${coupon.product}</div>
            <div class="description">${coupon.description}</div>
        </div>
        <div class="expiry">${coupon.expiry}</div>
        <div class="action-overlay saved-overlay">♥</div>
        <div class="action-overlay skip-overlay">✕</div>
    `;
    return card;
}

function loadCard() {
    if (currentIndex >= coupons.length) {
        container.innerHTML = '<div class="no-more">🎉 You\'ve seen all coupons!<br><br>Check back tomorrow for more deals!</div>';
        return;
    }

    const card = createCard(coupons[currentIndex]);
    container.appendChild(card);

    card.addEventListener('mousedown', handleStart);
    card.addEventListener('touchstart', handleStart);
}

function handleStart(e) {
    isDragging = true;
    const card = e.currentTarget;
    card.classList.add('swiping');
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('touchmove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchend', handleEnd);
}

function handleMove(e) {
    if (!isDragging) return;

    currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const diff = currentX - startX;
    const card = container.querySelector('.coupon-card');
    
    if (card) {
        const rotate = diff * 0.1;
        card.style.transform = `translateX(${diff}px) rotate(${rotate}deg)`;

        const savedOverlay = card.querySelector('.saved-overlay');
        const skipOverlay = card.querySelector('.skip-overlay');

        if (diff > 50) {
            savedOverlay.style.opacity = Math.min(diff / 150, 1);
            skipOverlay.style.opacity = 0;
        } else if (diff < -50) {
            skipOverlay.style.opacity = Math.min(Math.abs(diff) / 150, 1);
            savedOverlay.style.opacity = 0;
        } else {
            savedOverlay.style.opacity = 0;
            skipOverlay.style.opacity = 0;
        }
    }
}

function handleEnd(e) {
    if (!isDragging) return;
    isDragging = false;

    const diff = currentX - startX;
    const card = container.querySelector('.coupon-card');

    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('touchmove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
    document.removeEventListener('touchend', handleEnd);

    if (Math.abs(diff) > 100) {
        const direction = diff > 0 ? 1 : -1;
        card.style.transform = `translateX(${direction * 1000}px) rotate(${direction * 50}deg)`;
        card.style.opacity = '0';

        if (direction === 1) {
            savedCount++;
            totalValue += coupons[currentIndex].value;
            savedCountEl.textContent = savedCount;
            totalValueEl.textContent = `$${totalValue}`;
        }

        setTimeout(() => {
            card.remove();
            currentIndex++;
            loadCard();
        }, 300);
    } else {
        card.classList.remove('swiping');
        card.style.transform = '';
        card.querySelector('.saved-overlay').style.opacity = 0;
        card.querySelector('.skip-overlay').style.opacity = 0;
    }

    startX = 0;
    currentX = 0;
}

loadCard();
