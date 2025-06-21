# Surge.sh ile Deploy

## Adımlar:

1. Build alın:
```bash
npm run build
```

2. Surge'ü global olarak yükleyin:
```bash
npm install -g surge
```

3. Build klasörüne gidin ve deploy edin:
```bash
cd build
surge
```

4. İlk kullanımda email ve şifre girmeniz istenecek
5. Domain adı soracak (örn: saat-formu.surge.sh)
6. Enter'a basın ve siteniz yayında!

## Özel domain kullanmak için:
```bash
surge --domain sizin-domain.surge.sh
``` 