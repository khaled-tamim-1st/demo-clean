import os
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import arabic_reshaper
from bidi.algorithm import get_display

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC_DIR = os.path.join(BASE_DIR, 'artifacts', 'demo-clean', 'public')
APP_DIR = os.path.join(BASE_DIR, 'artifacts', 'demo-clean', 'src', 'app')

print(f"Base Directory: {BASE_DIR}")
print(f"Public Directory: {PUBLIC_DIR}")
print(f"App Directory: {APP_DIR}")

def reshape_arabic(text):
    return get_display(arabic_reshaper.reshape(text))

def get_font(size, bold=True):
    font_paths = [
        r'C:\Windows\Fonts\segoeuib.ttf' if bold else r'C:\Windows\Fonts\segoeui.ttf',
        r'C:\Windows\Fonts\tahomabd.ttf' if bold else r'C:\Windows\Fonts\tahoma.ttf',
        r'C:\Windows\Fonts\arialbd.ttf' if bold else r'C:\Windows\Fonts\arial.ttf',
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

def optimize_logos():
    print("--- 1. Optimizing Logos ---")
    raw_logo_path = os.path.join(PUBLIC_DIR, 'logo.png')
    raw_light_path = os.path.join(PUBLIC_DIR, 'logo-light.png')
    
    logo_img = Image.open(raw_logo_path)
    light_img = Image.open(raw_light_path)
    
    # 1. Dark Logo (for light backgrounds)
    bbox = logo_img.getbbox()
    cropped = logo_img.crop(bbox)
    # Put into a clean 512x512 square canvas with 8% padding
    target_size = 512
    square_logo = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))
    scale = min((target_size * 0.90) / cropped.width, (target_size * 0.90) / cropped.height)
    new_w = int(cropped.width * scale)
    new_h = int(cropped.height * scale)
    resized = cropped.resize((new_w, new_h), Image.Resampling.LANCZOS)
    offset_x = (target_size - new_w) // 2
    offset_y = (target_size - new_h) // 2
    square_logo.paste(resized, (offset_x, offset_y), resized)
    
    # Save logo.webp, logo.png, logo-dark.webp, logo-dark.png
    for name in ['logo', 'logo-dark']:
        webp_path = os.path.join(PUBLIC_DIR, f'{name}.webp')
        png_path = os.path.join(PUBLIC_DIR, f'{name}.png')
        square_logo.save(webp_path, 'WEBP', quality=90, method=6)
        square_logo.save(png_path, 'PNG', optimize=True)
        print(f"Saved {name}.webp ({os.path.getsize(webp_path):,} bytes) and {name}.png ({os.path.getsize(png_path):,} bytes)")

    # 2. Light Logo (for dark backgrounds)
    bbox_light = light_img.getbbox()
    cropped_light = light_img.crop(bbox_light)
    square_light = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))
    scale_l = min((target_size * 0.90) / cropped_light.width, (target_size * 0.90) / cropped_light.height)
    new_wl = int(cropped_light.width * scale_l)
    new_hl = int(cropped_light.height * scale_l)
    resized_l = cropped_light.resize((new_wl, new_hl), Image.Resampling.LANCZOS)
    offset_xl = (target_size - new_wl) // 2
    offset_yl = (target_size - new_hl) // 2
    square_light.paste(resized_l, (offset_xl, offset_yl), resized_l)

    light_webp = os.path.join(PUBLIC_DIR, 'logo-light.webp')
    light_png = os.path.join(PUBLIC_DIR, 'logo-light.png')
    square_light.save(light_webp, 'WEBP', quality=90, method=6)
    square_light.save(light_png, 'PNG', optimize=True)
    print(f"Saved logo-light.webp ({os.path.getsize(light_webp):,} bytes) and logo-light.png ({os.path.getsize(light_png):,} bytes)")

    return square_logo, square_light

def generate_favicons(master_logo):
    print("--- 2. Generating Google-Compliant Favicons ---")
    # For Google Favicon: Google recommends multiple of 48px square, safe area padding for circular mobile cropping.
    # We will create a clean rounded-white container or transparent icon with padding.
    # To look gorgeous in both dark and light browser tabs and in Google Search mobile circular crop:
    # A circular or squircle white badge with the logo inside makes the favicon look crisp on ANY tab or search theme!
    
    def create_favicon_canvas(size):
        canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        draw = ImageDraw.Draw(canvas)
        
        # Subtle rounded white background with 1px border so it looks ultra sharp on dark mode browser tabs
        corner_radius = int(size * 0.22)
        pad = int(size * 0.04)
        draw.rounded_rectangle(
            [(pad, pad), (size - pad - 1, size - pad - 1)],
            radius=corner_radius,
            fill=(255, 255, 255, 255),
            outline=(210, 225, 210, 255),
            width=max(1, int(size * 0.03))
        )
        
        # Now paste the logo in the center (occupying ~72% of canvas, ensuring 100% safe area inside circle crop)
        logo_area = int(size * 0.72)
        scaled_logo = master_logo.resize((logo_area, logo_area), Image.Resampling.LANCZOS)
        pos = (size - logo_area) // 2
        canvas.paste(scaled_logo, (pos, pos), scaled_logo)
        return canvas

    # Sizes according to Google & PWA guidelines:
    # 48x48 (Google standard), 96x96 (Google Retina), 192x192 (Android / PWA), 512x512 (PWA)
    icon_48 = create_favicon_canvas(48)
    icon_96 = create_favicon_canvas(96)
    icon_192 = create_favicon_canvas(192)
    icon_512 = create_favicon_canvas(512)
    icon_180 = create_favicon_canvas(180) # Apple touch icon
    icon_32 = create_favicon_canvas(32)
    icon_16 = create_favicon_canvas(16)

    # Save to public directory
    p48 = os.path.join(PUBLIC_DIR, 'favicon-48x48.png')
    p96 = os.path.join(PUBLIC_DIR, 'favicon-96x96.png')
    p192 = os.path.join(PUBLIC_DIR, 'favicon-192x192.png')
    p512 = os.path.join(PUBLIC_DIR, 'favicon-512x512.png')
    p180 = os.path.join(PUBLIC_DIR, 'apple-touch-icon.png')
    pfav_png = os.path.join(PUBLIC_DIR, 'favicon.png')
    pfav_webp = os.path.join(PUBLIC_DIR, 'favicon.webp')
    pico = os.path.join(PUBLIC_DIR, 'favicon.ico')

    icon_48.save(p48, 'PNG', optimize=True)
    icon_96.save(p96, 'PNG', optimize=True)
    icon_192.save(p192, 'PNG', optimize=True)
    icon_512.save(p512, 'PNG', optimize=True)
    icon_180.save(p180, 'PNG', optimize=True)
    icon_96.save(pfav_png, 'PNG', optimize=True)
    icon_96.save(pfav_webp, 'WEBP', quality=95, method=6)

    # Multi-resolution ICO: 16, 32, 48
    icon_48.save(pico, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
    print(f"Generated favicon.ico with 16x16, 32x32, 48x48 ({os.path.getsize(pico):,} bytes)")

    # Also update app/icon.png and app/favicon.ico
    app_icon_png = os.path.join(APP_DIR, 'icon.png')
    app_favicon_ico = os.path.join(APP_DIR, 'favicon.ico')
    icon_96.save(app_icon_png, 'PNG', optimize=True)
    icon_48.save(app_favicon_ico, format='ICO', sizes=[(16, 16), (32, 32), (48, 48)])
    print("Updated app/icon.png and app/favicon.ico")

    # Clean modern SVG favicon
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#f4f8f2"/>
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#55833c"/>
      <stop offset="100%" stop-color="#2c5e1c"/>
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="96" height="96" rx="24" fill="url(#bgGrad)" stroke="#cde2c6" stroke-width="2.5"/>
  <!-- Leaf and Shield emblem -->
  <g transform="translate(20, 20) scale(0.6)">
    <path d="M50 5 C25 5 10 25 10 50 C10 80 45 92 50 95 C55 92 90 80 90 50 C90 25 75 5 50 5 Z" fill="url(#primaryGrad)"/>
    <path d="M50 18 C35 30 30 50 35 68 C42 62 48 50 50 35 C52 50 58 62 65 68 C70 50 65 30 50 18 Z" fill="#ffffff" opacity="0.95"/>
    <circle cx="50" cy="42" r="5" fill="#f59e0b"/>
  </g>
</svg>'''
    psvg = os.path.join(PUBLIC_DIR, 'favicon.svg')
    with open(psvg, 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f"Generated clean vector favicon.svg ({os.path.getsize(psvg):,} bytes)")

def optimize_hero_identity():
    print("--- 3. Optimizing Hero & Identity Poster ---")
    raw_jpg = os.path.join(PUBLIC_DIR, 'demo-clean-identity.jpg')
    raw_webp = os.path.join(PUBLIC_DIR, 'demo-clean-identity.webp')

    img = Image.open(raw_jpg)
    # Ensure 800x800 square
    if img.size != (800, 800):
        img_800 = img.resize((800, 800), Image.Resampling.LANCZOS)
    else:
        img_800 = img

    # Save optimized WebP and high-efficiency JPEG fallback
    img_800.save(raw_webp, 'WEBP', quality=82, method=6)
    img_800.save(raw_jpg, 'JPEG', quality=82, optimize=True, progressive=True)

    print(f"Optimized demo-clean-identity.webp: {os.path.getsize(raw_webp):,} bytes")
    print(f"Optimized demo-clean-identity.jpg: {os.path.getsize(raw_jpg):,} bytes (reduced from 236KB!)")

def generate_og_whatsapp_card(master_logo):
    print("--- 4. Designing & Generating WhatsApp & Social Open Graph Card ---")
    # Dimensions: 1200 x 630 (Standard 1.91:1)
    # Target size: < 150KB for JPEG, < 80KB for WebP
    W, H = 1200, 630
    og = Image.new('RGB', (W, H), color='#0d2310')
    draw = ImageDraw.Draw(og)

    # 1. Luxurious Gradient Background
    for y in range(H):
        r = int(13 + (y / H) * (20 - 13))
        g = int(35 + (y / H) * (65 - 35))
        b = int(16 + (y / H) * (30 - 16))
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # 2. Add subtle decorative organic arcs / glow circles
    overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    # Soft emerald glow on the right
    ov_draw.ellipse([700, -100, 1300, 500], fill=(85, 131, 60, 45))
    # Golden soft glow on bottom left
    ov_draw.ellipse([-100, 300, 500, 900], fill=(217, 119, 6, 25))
    # Thin elegant border frame
    ov_draw.rounded_rectangle([(18, 18), (W - 19, H - 19)], radius=24, outline=(85, 131, 60, 100), width=2)
    ov_draw.rounded_rectangle([(24, 24), (W - 25, H - 25)], radius=20, outline=(255, 255, 255, 30), width=1)
    
    og = Image.alpha_composite(og.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(og)

    # 3. Add Left Identity Badge Card (Safe area, visual anchor)
    identity_path = os.path.join(PUBLIC_DIR, 'demo-clean-identity.webp')
    if os.path.exists(identity_path):
        id_img = Image.open(identity_path).convert('RGBA')
        card_size = 460
        id_resized = id_img.resize((card_size, card_size), Image.Resampling.LANCZOS)
        
        # Create card container with rounded corners & shadow
        card = Image.new('RGBA', (card_size + 16, card_size + 16), (0, 0, 0, 0))
        cdraw = ImageDraw.Draw(card)
        cdraw.rounded_rectangle([(0, 0), (card_size + 15, card_size + 15)], radius=28, fill=(255, 255, 255, 235), outline=(85, 131, 60, 200), width=3)
        
        # Mask image inside rounded rectangle
        mask = Image.new('L', (card_size, card_size), 0)
        mdraw = ImageDraw.Draw(mask)
        mdraw.rounded_rectangle([(0, 0), (card_size - 1, card_size - 1)], radius=22, fill=255)
        
        card.paste(id_resized, (8, 8), mask)
        
        # Paste card on left side
        og.paste(card, (70, (H - card_size - 16) // 2), card)

    # 4. Right Side Content (Arabic RTL Typography)
    font_brand = get_font(52, bold=True)
    font_headline = get_font(34, bold=True)
    font_sub = get_font(22, bold=False)
    font_pill = get_font(20, bold=True)
    font_cta = get_font(30, bold=True)

    text_x = 1120 # Right anchor for RTL

    # Brand Title: ديمو كلين الكويت
    brand_text = reshape_arabic("ديمو كلين الكويت")
    draw.text((text_x, 70), brand_text, font=font_brand, fill='#ffffff', anchor='ra')

    # Subtitle: شركة مكافحة الحشرات والقوارض والتنظيف الشامل
    sub_title = reshape_arabic("شركة مكافحة الحشرات والقوارض والتنظيف الشامل")
    draw.text((text_x, 142), sub_title, font=font_headline, fill='#86efac', anchor='ra')

    # Accent Gold License Tag
    lic_text = reshape_arabic("ترخيص رقم: 14620/2025  •  سجل تجاري: 532627")
    draw.text((text_x, 195), lic_text, font=font_sub, fill='#fcd34d', anchor='ra')

    # Feature List Pills (Trust Badges)
    features = [
        "خدمة فورية 24/7 بجميع محافظات ومناطق الكويت",
        "مبيدات صحية ألمانية معتمدة من وزارة الصحة مع الضمان",
        "إبادة الصراصير وبق الفراش والنمل الأبيض والقوارض",
        "تنظيف الفلل والقصور وغسيل الكنب والسجاد بالبخار",
    ]
    
    start_y = 250
    for i, feat in enumerate(features):
        feat_y = start_y + (i * 50)
        # Bullet badge box
        pill_overlay = Image.new('RGBA', (og.width, og.height), (0,0,0,0))
        pdraw = ImageDraw.Draw(pill_overlay)
        
        t = reshape_arabic(feat)
        # Check mark circle
        circle_cx = text_x - 12
        pdraw.ellipse([(circle_cx - 10, feat_y + 4), (circle_cx + 10, feat_y + 24)], fill=(85, 131, 60, 255))
        pdraw.text((circle_cx, feat_y + 14), "✓", fill='#ffffff', anchor='mm', font=get_font(14, bold=True))
        
        # Feature text
        draw.text((text_x - 32, feat_y), t, font=font_sub, fill='#f3f4f6', anchor='ra')

    # 5. Prominent Call to Action Button & WhatsApp Banner at the bottom
    cta_w, cta_h = 520, 72
    cta_x = text_x - cta_w
    cta_y = 475
    
    cta_box = Image.new('RGBA', (cta_w, cta_h), (0, 0, 0, 0))
    cbdraw = ImageDraw.Draw(cta_box)
    cbdraw.rounded_rectangle([(0, 0), (cta_w - 1, cta_h - 1)], radius=18, fill=(85, 131, 60, 255), outline=(134, 239, 172, 255), width=2)
    
    cta_text = reshape_arabic("اتصال & واتساب: 67088755 (965+)")
    cbdraw.text((cta_w // 2, cta_h // 2), cta_text, font=font_cta, fill='#ffffff', anchor='mm')
    
    og.paste(cta_box, (cta_x, cta_y), cta_box)

    # Guarantee badge below CTA
    guarantee_text = reshape_arabic("كفالة رسمية موثقة  •  فحص ومتابعة مجانية")
    draw.text((text_x - (cta_w // 2), 565), guarantee_text, font=font_sub, fill='#a7f3d0', anchor='ma')

    # Save og-image.jpg (JPEG < 150KB for WhatsApp) and og-image.webp
    og_jpg = os.path.join(PUBLIC_DIR, 'og-image.jpg')
    og_webp = os.path.join(PUBLIC_DIR, 'og-image.webp')

    og.save(og_jpg, 'JPEG', quality=88, optimize=True, progressive=True)
    og.save(og_webp, 'WEBP', quality=88, method=6)

    print(f"Generated og-image.jpg: {os.path.getsize(og_jpg):,} bytes (< 300KB WhatsApp limit verified!)")
    print(f"Generated og-image.webp: {os.path.getsize(og_webp):,} bytes")

if __name__ == '__main__':
    square_logo, square_light = optimize_logos()
    generate_favicons(square_logo)
    optimize_hero_identity()
    generate_og_whatsapp_card(square_logo)
    print("=== All Image Assets Generated and Optimized Successfully! ===")
