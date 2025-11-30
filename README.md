# swipegrocery

# 🛒 SwipeGrocery

A mobile-friendly web app for discovering and saving grocery store coupons through an intuitive swipe interface.

## Features

- **Swipe Interface**: Tinder-style card swiping
- **Real-time Stats**: Track saved coupons and total savings
- **Mobile Responsive**: Works seamlessly on all devices
- **Visual Feedback**: Animated overlays show save/skip actions
- **Sample Coupons**: Pre-loaded with deals from popular grocery stores

## Demo

Swipe right (→) to save coupons you want to use  
Swipe left (←) to skip coupons you're not interested in

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/swipegrocery.git
cd swipegrocery
```

2. Open `index.html` in your browser or serve with any web server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

3. Visit `http://localhost:8000`

## Customization

### Adding Your Own Coupons

Edit the `coupons` array in `script.js`:
```javascript
const coupons = [
    {
        store: "Store Name",
        discount: "$10 OFF",
        product: "Product Category",
        description: "Detailed offer description",
        expiry: "Expires: Dec 31, 2025",
        value: 10
    },
    // Add more coupons here
];
```

### Styling

Modify `styles.css` to customize colors, fonts, and animations.

## Technologies Used

- HTML5
- CSS3 (Flexbox, Animations)
- Vanilla JavaScript
- No external dependencies

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Backend integration for dynamic coupon loading
- [ ] User accounts and saved coupon storage
- [ ] Push notifications for new deals
- [ ] Store location filtering
- [ ] Barcode scanning for in-store redemption

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
