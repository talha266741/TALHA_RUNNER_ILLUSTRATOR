# Talha Runner Illustrator

**Durum: GELİŞTİRME AŞAMASINDA — ÇALIŞMA DURDURULDU / SONRA DEVAM EDİLECEK**  
**Son doğrulama: 3 Kasım 2026**  
**Sürüm: 0.1.0 (CEP ön sürüm)**

Talha Runner V2'nin Illustrator için ayrı CEP uyarlaması. Amaç mevcut InDesign Runner V2'nin **arayüzünü ve genel kod yapıştır → çalıştır deneyimini korumak**; Illustrator JSX/ExtendScript'i dosya oluşturmadan doğrudan çalıştırmak. Yeni ve karmaşık bir Illustrator üretim sistemi geliştirmek bu projenin kapsamı değildir. **Mevcut InDesign Runner V2 deposuna dokunulmadı.**

## Şu an gerçekten çalışan ve doğrulananlar (3 Kasım 2026)

- Windows'ta **Illustrator 2026, sürüm 30.8.2**, CEP 12 üzerinde eklenti **Pencere → Uzantılar (Eski) → Talha Runner Illustrator** menüsünde görünüyor ve panel açılıyor.
- Runner V2 görünümünden uyarlanan **kod editörü, Çalıştır, Temizle, Favoriler, Geçmiş ve diğer düğmeler** panelde görüntüleniyor.
- `alert("Talha Runner Illustrator çalışıyor!");` kodu Runner'dan çalıştırıldı; Illustrator/ExtendScript uyarısı çıktı.
- `app.activeDocument.pathItems.rectangle(...)` ile **düzenlenebilir vektör dikdörtgen** oluşturuldu, CMYK C100 M0 Y0 K0 dolgu uygulandı. Uyarı penceresi çıktı ve kullanıcı nesnenin gerçekten oluştuğunu doğruladı. Dikdörtgen, sabit koordinatlar yüzünden çalışma yüzeyinin yukarısına yerleşmişti; bu Runner hatası değil, test kodunun konumlandırmasıydı.
- Böylece **JSX çalıştırma köprüsü ve Illustrator belgesini değiştirebilme** gerçek uygulamada doğrulandı.
- **Not:** Favoriler, geçmiş, temizleme seçeneği, Ctrl+Enter, hata bildirimleri ve güncelleme davranışları tek tek kullanıcı testinden geçirilmiş değil. Görünür olmaları doğrulanmış çalıştıkları anlamına gelmez.

## Kritik kurulum bilgisi ve çözülen hata

İlk denemede panel **tamamen boş/gri** açılıyordu. Hata kaydı:

```text
CEPHtmlEngine12-ILST-30.8.2-com.talha.runner.illustrator.panel.log
ERROR Signature verification failed for "com.talha.runner.illustrator.panel"!
```

**Kök neden:** `PlayerDebugMode` başlangıçta yanlışlıkla `CSXS.11` için açılmıştı. Gerçekte Illustrator **CEP 12** kullanıyor. `CSXS.12` için geliştirme modu açılınca önce basit yeşil HTML test sayfası, ardından gerçek Runner paneli sorunsuz görüntülendi.

Windows PowerShell (kullanıcı bağlamında, yönetici gerektirmez):

```powershell
New-Item -Path "HKCU:\Software\Adobe\CSXS.12" -Force | Out-Null
New-ItemProperty -Path "HKCU:\Software\Adobe\CSXS.12" -Name "PlayerDebugMode" -Value "1" -PropertyType String -Force | Out-Null
Get-ItemPropertyValue -Path "HKCU:\Software\Adobe\CSXS.12" -Name "PlayerDebugMode"
```

Beklenen çıktı: `1`. **Bu ayar yalnız güvenilir, imzasız geliştirme eklentilerini test etmek içindir.** Illustrator/CEP sürümü ileride değişirse uygun CSXS anahtarı yeniden doğrulanmalı.

## Windows kurulum (geliştirme sürümü)

1. Bu deponun ZIP'ini indir ve aç.
2. `CSXS`, `host`, `index.html`, `panel.css`, `panel.js` aynı klasör yapısıyla `%APPDATA%\Adobe\CEP\extensions\com.talha.runner.illustrator` içine yerleştir.
3. Yukarıdaki `CSXS.12` geliştirme ayarını uygula.
4. Illustrator'ı yeniden başlat; **Pencere → Uzantılar (Eski) → Talha Runner Illustrator** panelini aç.

**Dikkat:** Hata ayıklama sırasında yerel `index.html` geçici yeşil test HTML'iyle değiştirilmiş, daha sonra GitHub'daki gerçek `index.html` geri yüklenmiştir. Son testte gerçek Runner arayüzü çalışmıştır.

## Mevcut teknik yapı

- `CSXS/manifest.xml`: CEP eklenti tanımı
- `index.html` + `panel.css` + `panel.js`: panel arayüzü ve istemci davranışı
- `host/runner.jsx`: Illustrator ExtendScript tarafındaki `talhaRunnerExecute` fonksiyonu
- İletişim: `window.__adobe_cep__.evalScript` → `talhaRunnerExecute`.
- InDesign'a özgü `app.doScript`, `UndoModes.ENTIRE_SCRIPT` ve TR Library Illustrator'a aktarılmaz.
- Favoriler ve geçmiş Illustrator'a özgü ayrı `localStorage` anahtarlarında saklanacak şekilde kodlanmıştır.

## Yapılacaklar — kaldığımız yerden devam planı

1. **Önce çalışan 0.1.0 sürümünü koru.** Test edilmeden geniş çaplı refaktör yapma; gerektiğinde ayrı dal/sürüm kullan.
2. Panel işlevlerini sırayla doğrula: **Ctrl+Enter, Temizle, çalıştırınca temizle, son 7 işlem geçmişi, favori kaydet/yükle/kaldır, hata mesajı**. Hataları düzelt.
3. **Talha Runner V2 ile arayüz/işlev eşitliği** denetimi yap. Mevcut V2'deki özellikler ile Illustrator sürümünü karşılaştır; yalnız Illustrator'ın teknik farkları nedeniyle zorunlu değişiklik yap.
4. **Güncelleme altyapısını** Illustrator deposuna bağımsız şekilde uyarlayıp test et. InDesign Runner V2 güncellemeleri Illustrator eklentisini değiştirmemeli.
5. **Durdur / Acil Durdur** için Illustrator ExtendScript/CEP sınırlarını araştır. Senkron JSX'in güvenilir biçimde iptal edilemediği durumda düğmeleri yanıltıcı şekilde çalışıyor gösterme; uygun açıklama veya alternatif tasarım kullan.
6. **Geri alma davranışını** Illustrator'da doğrula; InDesign'daki tek Undo garantisini otomatik varsayma.
7. **Paketleme ve dağıtım:** kolay kurulum / imzalı ZXP-CCX uygunluğu ve güncel Illustrator CEP uyumluluğunu araştır, gerçek uygulamada test et. İmzasız geliştirme kurulumunu nihai dağıtım olarak sunma.
8. Testler tamamlandıktan sonra sürümü artır, README'yi güncelle, GitHub'da izlenebilir commitlerle ilerle.

## Testte kullanılan kodlar

```javascript
alert("Talha Runner Illustrator çalışıyor!");
```

```javascript
var doc = app.activeDocument;
var rect = doc.pathItems.rectangle(500, 100, 200, 120);
var color = new CMYKColor();
color.cyan = 100;
color.magenta = 0;
color.yellow = 0;
color.black = 0;
rect.filled = true;
rect.fillColor = color;
rect.stroked = false;
alert("Cyan dikdortgen olusturuldu!");
```

## Güvenlik ve kapsam

Runner, yapıştırılan JSX'i Illustrator üzerinde doğrudan çalıştırır; güvenilmeyen kodlar dosyalara veya belgelere zarar verebilir. Önce kopya belgelerde test et. `Durdur`/`Acil Durdur` düğmeleri şu anda senkron JSX'i güvenilir biçimde durdurmaz. Güncelleme düğmesi henüz gerçek güncelleme yapmaz. Tek tık imzalı kurulum henüz yoktur.

Kaynak: [TALHA_RUNNER_V2](https://github.com/talha266741/TALHA_RUNNER_V2) — MIT lisansı, © 2026 Talha İnce.
