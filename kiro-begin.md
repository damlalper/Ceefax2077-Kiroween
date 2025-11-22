# Ceefax 2077 - Distopik Teletext Projesi

🏗️ **1. Teknik Temel (Tech Stack)**
Basit tutacağız ama çıktısı çok karmaşık görünecek.

- **Framework**: React (Vite ile) veya Next.js
- **Stil**: Tailwind CSS (Grid yapısı için) + Custom Canvas (O eski tüplü TV / CRT efektini vermek için)
- **Veri**: News API (Gerçek haberler) + OpenAI/Claude (Haberleri özetleyip distopik hale getirmek için)

🧠 **2. Kiro Entegrasyon Planı** *(Jüri Puanları Buradan Gelecek)*
Yarışma kuralları 5 Kiro özelliğini soruyor. Projeyi geliştirirken bunları özellikle kullanacağız ve videoda göstereceğiz:

## A. Vibe Coding (Arayüz Tasarımı)
Teletext'in o meşhur 40x24 karakterli ızgarasını ve neon renklerini (Cyan, Yellow, Green, Magenta) elle yazmak zordur.

**Strateji**: Kiro'ya bir Teletext ekran görüntüsü atacağız ve diyeceğiz ki: *"Bana bu görseldeki grid yapısını ve renk paletini CSS değişkenleri olarak tanımla. CRT tarama çizgisi (scanline) efekti için bir CSS animasyonu yaz."*

**Sonuç**: Saniyeler içinde mükemmel bir retro arayüz.

## B. Specs (Navigasyon Kuralları)
Teletext'te sayfa numaraları vardır (100: Haberler, 300: Spor, 666: Kıyamet).

**Strateji**: `/.kiro/specs/routing.yaml` dosyası oluşturacağız.

**İçerik**: *"Sayfa 100 girilirse manşetleri çek. Sayfa 666 girilirse ekranı kırmızı yap ve korku modunu aç."* kuralını buraya yazacağız. Kiro kodun iskeletini bu dosyaya bakarak kuracak.

## C. Steering Docs (Yapay Zeka Personası)
Bu projenin "kalbi" burası. Haberleri sunan AI'ın kişiliği.

**Strateji**: `/.kiro/steering/editor_persona.md` dosyası oluşturacağız.

**Komut**: *"Sen 2077 yılından gelen, duygusuz, sadece gerçeği söyleyen ama insanlığın sonunun geldiğini bilen bir terminalsın. Haberleri özetlerken hep kinik ve soğuk bir dil kullan. Asla 3 satırı geçme."*

## D. MCP (Haber Entegrasyonu)
**Strateji**: Kiro'nun MCP sunucusunu kullanarak gerçek zamanlı bir RSS akışını (BBC News veya CNN) projeye bağlayacağız. Kiro, bu ham veriyi alıp yukarıdaki "Persona"ya göre yeniden yazacak.

## E. Hooks (Spooky Twist)
**Strateji**: `onPageChange` hook'u yazacağız. Eğer kullanıcı gece saat 00:00 ile 03:00 arasında siteye girerse, Kiro Hook devreye girecek ve sitenin fontlarını "bozuk" (glitched) karakterlere dönüştürecek.

🎬 **3. Demo Videosu Senaryosu** *(3 Dakikalık Şov)*
Videoda jüriyi şöyle etkileyeceğiz:

### Açılış (0-30sn)
Ekran karıncalı başlar. Eski bir TV açılma sesi. Karşımızda Ceefax 2077.

### Normal Mod (30-90sn)
Mouse yok! Sadece klavyeyle "100" yazıp haberlere bakıyorsun. Haberler çok kısa ve net. "Information Overload" çözülmüş.

### Kiro Show (90-120sn)
"Bunu nasıl yaptık?" bölümü. Kiro ile sohbet geçmişini gösteriyoruz. Spec dosyasını ekrana getiriyoruz.

### The Twist (120-180sn)
Kullanıcı "666" yazar. Müzik gerilir. Haberler değişir: *"Yapay Zeka kontrolü ele geçirdi... Kaçış yok..."* Ekran titrer ve kapanır.

---

## 🚀 Hemen Başlıyoruz: İlk Adım

Şimdi Kiro IDE'yi aç (veya VS Code + Kiro extension).

**İlk prompt'umuz şu olmalı** (Bunu Kiro'ya yapıştır):
Act as a creative frontend architect for a hackathon project named 'Ceefax 2077'. We are resurrecting the 1980s Teletext interface but using modern React and Tailwind CSS.

First, create the mandatory project structure including the /.kiro folder for specs and steering.

Then, using 'Vibe Coding', generate a robust TeletextContainer component that mimics the 40-column by 24-row grid system. It should support the classic Teletext color palette (Cyan, Yellow, Green, Magenta, Red, Blue, White) and use a monospaced pixel font.


# Ceefax 2077 - Restomod Stratejisi 🚗⚡

> *Eski arabaları modernize edenler (Restomod) gibi düşün. Dışarıdan baktığında 1967 model bir Mustang gibidir (Klasik), ama kaputu açtığında içinde 2025 model elektrikli motor vardır (İnovasyon).*

## Ceefax 2077 için Stratejimiz Şu Olmalı:

### 🔒 **A. Neyi KESİNLİKLE DEĞİŞTİRMEYECEĞİZ?** *(Eski Beden)*
Kullanıcıyı 1980'lerdeymiş gibi hissettiren kısıtlamaları koruyacağız. Bu kısıtlamalar projenin kimliğidir:

#### **Grid Yapısı:**
- Kesinlikle **40 karakter genişlik × 24 satır yükseklik**
- Bu ızgaranın dışına çıkmak yok
- Monospaced font zorunluluğu

#### **Renk Paleti:**
- Sadece o iğrenç ama harika **7 renk**:
  - 🖤 Siyah
  - ⚪ Beyaz  
  - 🔴 Kırmızı
  - 🟢 Yeşil
  - 🟡 Sarı
  - 🔵 Mavi
  - 🟣 Magenta
  - 🔷 Cyan
- **Ara renk yok, degrade yok, gradient yok**

#### **Navigasyon:**
- **Mouse yok!** (Veya çok sınırlı)
- Sayfalar arasında gezinmek için **numara tuşlanmalı** (100, 101, 666)
- Klavye odaklı kullanım

---

### 🚀 **B. Neyi "REIMAGINE" Edeceğiz?** *(Yeni Zihin)*
Eski Teletext'in yapamadığı ama Kiro ile yapabileceğimiz şeyler:

#### **🧠 İçerik (Canlı & AI)**
| Eski Sistem | Bizimki (Ceefax 2077) |
|-------------|----------------------|
| Bir editörün elle girdiği dünkü haberler | İnterneti saniyesinde tarayan, karmaşık haberi "Teletext'in sığabileceği kadar" özetleyen, **duygusuz bir AI** |
| Statik içerik | **Gerçek zamanlı** haber akışı |
| Manuel güncelleme | **Otomatik AI özetleme** ve distopik dönüştürme |

#### **🎨 Görsel (ASCII/Mosaic Art)**
| Eski Sistem | Bizimki (Ceefax 2077) |
|-------------|----------------------|
| Sadece metin ve basit şekiller | Modern bir fotoğrafı (JPG) anlık olarak analiz edip, onu **Teletext bloklarıyla** yeniden çizen bir görüntü işleme motoru |
| Limited graphics | **Resurrection burada parlar**: Modern medyayı eski formatta render ediyoruz |
| Pre-defined art | **Dynamic ASCII art generation** |

#### **⚡ Etkileşim (Spooky/Alive)**
| Eski Sistem | Bizimki (Ceefax 2077) |
|-------------|----------------------|
| Statik ekran | Ekranın seninle **"konuşması"** |
| Predictable behavior | **Context-aware reactions**:<br>• Hata verdiğinde statik karıncalanma<br>• Gece yarısı renklerin tersine dönmesi<br>• Metinlerin "glitch"lenerek bozulması |
| Basic navigation | **Intelligent routing** ve **time-based effects** |

---

## 🎯 **Özetle Tartışma Sonucu**

Projeyi şu cümleyle tanımlarsak doğru yoldayız demektir:

> **"Ceefax 2077, eğer 1980'lerdeki Teletext mühendislerinin elinde bugünkü Yapay Zeka gücü olsaydı, üretecekleri şeydir."**

### 📊 **Teknik Özet:**
Görüntü: %100 Retro (Eski)
Teknoloji: %100 AI (Yeni)
──────────
Deneyim: %100 Büyüleyici

text

### 🎪 **Kullanıcı Deneyimi Hedefi:**
- **İlk 10 saniye:** "Bu ne kadar retro!"
- **Sonraki 30 saniye:** "Bunu nasıl yaptılar?"
- **1. dakika:** "Bu aslında çok zeki bir sistem!"


---

**Sonraki Adımlar:**
1. ✅ Kiro ile proje yapısını oluştur
2. 🎨 Teletext arayüzünü kodla
3. 🔗 News API entegrasyonu
4. 🤖 AI persona ile haber işleme
5. ⚡ Özel efektler ve hook'lar
6. 🎥 Demo videosu hazırlığı

**Hedef:** Jürinin "Bu kadar retro ama bu kadar modern nasıl olabilir?" dediği bir proje! 🏆

## BRING BACK TELETEXT
<img width="255" height="197" alt="Teletexnews" src="https://github.com/user-attachments/assets/26f66eb3-c9da-4b19-8991-faf1454351aa" />
<img width="241" height="209" alt="images" src="https://github.com/user-attachments/assets/3d511c91-8a8e-44e2-98e5-9c1e12d14992" />
<img width="640" height="401" alt="TELEMMGLPICT000217527839_trans_NvBQzQNjv4BqIHpy6C6WvnRSxwhUqZu6JkjN6D269PF_XpfP5nclIbA" src="https://github.com/user-attachments/assets/7a3c032b-b91c-4588-9a5e-f7478cd36a8c" />


