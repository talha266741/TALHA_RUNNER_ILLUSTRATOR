# Talha Runner Illustrator

Talha Runner V2 arayüzünün Illustrator CEP uyarlaması. **Geliştirme ön sürümü 0.1.0; Illustrator üzerinde henüz test edilmedi.**

## Windows kurulum (geliştirme testi)

1. Depoyu ZIP olarak indirip aç.
2. İçindeki `CSXS`, `host`, `index.html`, `panel.css`, `panel.js` dosyalarını `%APPDATA%\Adobe\CEP\extensions\com.talha.runner.illustrator` klasörüne aynı yapıyla yerleştir.
3. İmzasız CEP uzantıları için geliştirme test modunu etkinleştir. Illustrator sürümünün kullandığı CSXS kayıt anahtarında `PlayerDebugMode` dize değeri `1` olmalı (örnek: `HKCU\Software\Adobe\CSXS.11`). Güvenmediğin uzantılar için bunu etkinleştirme.
4. Illustrator'ı yeniden başlat; **Pencere > Uzantılar (Eski)** bölümünden **Talha Runner Illustrator** panelini aç.

## Mevcut özellikler

- Runner V2'den taşınan panel görünümü; JSX editörü; Ctrl+Enter; çalıştırma durumu; geçmiş (son 7); favoriler; temizleme.
- Illustrator ExtendScript host köprüsü: `window.__adobe_cep__.evalScript` → `talhaRunnerExecute`.
- InDesign'a özgü `app.doScript` ve TR Library otomatik olarak eklenmez.

## Henüz tamamlanmayanlar

- Illustrator üzerinde gerçek çalışma ve kurulum testi.
- İmzalı/tek tık kurulum paketi.
- Güncelleme altyapısı.
- Durdur/Acil Durdur: Illustrator'da senkron JSX çalışmasını güvenilir biçimde kesen bir mekanizma henüz uygulanmadı; düğmeler bilgilendirir.
- InDesign'daki tek Undo davranışı Illustrator'da garanti edilmez.

Kaynak: [TALHA_RUNNER_V2](https://github.com/talha266741/TALHA_RUNNER_V2), MIT lisansı © 2026 Talha İnce. Mevcut InDesign deposu değiştirilmedi.
